package jwt

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"os"
	"strings"
	"time"
)

type Claims struct {
	Subject   string
	Issued    time.Time
	NotBefore time.Time
	Expires   time.Time
	Issuer    string
	Audiences []string
}

func (c *Claims) base64URLEncode(data []byte) string {
	encoded := base64.RawURLEncoding.EncodeToString(data)
	return strings.TrimRight(encoded, "=")
}

func (c *Claims) base64URLDecode(s string) ([]byte, error) {

	switch len(s) % 4 {
	case 2:
		s += "=="
	case 3:
		s += "="
	}

	return base64.RawURLEncoding.DecodeString(s)
}

func (c *Claims) claims(token string) (map[string]interface{}, error) {

	publicKey, err := c.loadPublicKey("./crypto/public.key")

	if err != nil {
		return nil, err
	}

	//split JWT and ensure 3 parts are present
	parts := strings.Split(token, ".")

	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	//Decode payload and check for error
	jsonPayload, err := c.base64URLDecode(parts[1])

	if err != nil {
		return nil, err
	}

	//parse payload into map
	var claims map[string]interface{}
	if err := json.Unmarshal(jsonPayload, &claims); err != nil {
		return nil, err
	}

	//verify signatures
	message := fmt.Sprintf("%s.%s", parts[0], parts[1])
	signature, err := c.base64URLDecode(parts[2])

	if err != nil {
		return nil, err
	}

	hashed := sha256.Sum256([]byte(message))

	if err := rsa.VerifyPKCS1v15(publicKey, crypto.SHA256, hashed[:], signature); err != nil {
		return nil, err
	}

	return claims, nil
}

func (c *Claims) createJWT() (string, error) {

	privateKey, err := c.loadPrivateKey("./crypto/private.key")

	if err != nil {
		return "", err
	}

	header := map[string]interface{}{
		"alg": "RS256",
		"typ": "JWT",
	}

	headerJson, err := json.Marshal(header)
	if err != nil {
		return "", err
	}

	payload := c.mapClaim()

	payloadJson, err := json.Marshal(payload)

	if err != nil {
		return "", err
	}

	message := fmt.Sprintf("%s.%s", c.base64URLEncode(headerJson), c.base64URLEncode(payloadJson))

	//Sign message using RS256

	signature, err := c.signMessage(privateKey, message)

	if err != nil {
		return "", err
	}

	//combine all parts into the final JWT
	jwt := fmt.Sprintf("%s.%s", message, signature)

	return jwt, nil
}

func (c *Claims) loadPublicKey(path string) (*rsa.PublicKey, error) {
	keyData, err := os.ReadFile(path)

	if err != nil {
		return nil, err
	}

	block, _ := pem.Decode(keyData)
	if block == nil || block.Type != "PUBLIC KEY" {
		return nil, errors.New("failed to decode PEM block containing public key")
	}

	key, err := x509.ParsePKIXPublicKey(block.Bytes)

	if err != nil {
		return nil, err
	}

	rsaKey, ok := key.(*rsa.PublicKey)

	if !ok {
		return nil, errors.New("failed to decode PEM block containing public key")
	}

	return rsaKey, nil

}

func (c *Claims) loadPrivateKey(path string) (*rsa.PrivateKey, error) {

	keyData, err := os.ReadFile(path)

	if err != nil {
		return nil, err
	}

	block, _ := pem.Decode(keyData)

	if block == nil || block.Type != "PRIVATE KEY" {

		return nil, errors.New("invalid private key")
	}

	key, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}

	rsaKey, ok := key.(*rsa.PrivateKey)

	if !ok {
		return nil, errors.New("invalid private key")
	}

	return rsaKey, nil
}

func (c *Claims) mapClaim() map[string]interface{} {

	claims := make(map[string]interface{})

	claims["iss"] = c.Issuer
	claims["aud"] = c.Audiences
	claims["exp"] = c.Expires
	claims["nbf"] = c.NotBefore
	claims["iat"] = c.Issued
	claims["sub"] = c.Subject

	return claims
}

func (c *Claims) mapValues(claims map[string]interface{}) {

	c.Issuer = claims["iss"].(string)
	c.Audiences = claims["aud"].([]string)
	c.Expires = time.Unix(claims["exp"].(int64), 0)
	c.NotBefore = time.Unix(claims["nbf"].(int64), 0)
	c.Issued = time.Unix(claims["iat"].(int64), 0)
	c.Subject = claims["sub"].(string)
}

// // HMAC Sha 256 signature
func (c *Claims) signMessage(privateKey *rsa.PrivateKey, message string) (string, error) {

	hashed := sha256.Sum256([]byte(message))
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, hashed[:])

	if err != nil {
		return "", err
	}

	return c.base64URLEncode(signature), nil
}
func (c *Claims) verifyJWT(token string) error {

	publicKey, err := c.loadPublicKey("./crypto/public.key")
	if err != nil {
		return err
	}

	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return errors.New("invalid token")
	}

	message := fmt.Sprintf("%s.%s", parts[0], parts[1])

	signature, err := base64.RawURLEncoding.DecodeString(parts[2])

	if err != nil {
		return fmt.Errorf("invalid signature: %w", err)
	}

	hashed := sha256.Sum256([]byte(message))

	if err = rsa.VerifyPKCS1v15(publicKey, crypto.SHA256, hashed[:], signature); err != nil {
		return fmt.Errorf("invalid signature: %w", err)
	}

	return nil
}
