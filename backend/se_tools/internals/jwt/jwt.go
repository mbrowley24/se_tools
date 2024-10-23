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

// Claims struct holds JWT claims.
type Claims struct {
	Subject   string    `json:"sub"`
	Issued    time.Time `json:"iat"`
	NotBefore time.Time `json:"nbf"`
	Expires   time.Time `json:"exp"`
	Issuer    string    `json:"iss"`
	Audiences []string  `json:"aud"`
	CSRF      string    `json:"csrf"`
}

// GenerateJWT creates a JWT from the Claims struct.
func (c *Claims) GenerateJWT(privateKeyPath string) (string, error) {
	privateKey, err := loadPrivateKey(privateKeyPath)
	if err != nil {
		return "", err
	}

	// Create the JWT header
	header := map[string]interface{}{
		"alg": "RS256",
		"typ": "JWT",
	}
	headerJSON, _ := json.Marshal(header)

	// Create the JWT payload (claims)
	payloadJSON, _ := json.Marshal(c)

	// Concatenate the header and payload
	message := fmt.Sprintf("%s.%s",
		base64URLEncode(headerJSON), base64URLEncode(payloadJSON))

	// Sign the message using RS256
	signature, err := signMessage(privateKey, message)
	if err != nil {
		return "", err
	}

	// Combine all parts into the final JWT
	return fmt.Sprintf("%s.%s", message, signature), nil
}

// ValidateJWT verifies the token's signature and extracts claims.
func (c *Claims) ValidateJWT(token, publicKeyPath string) error {
	publicKey, err := loadPublicKey(publicKeyPath)
	if err != nil {
		return err
	}

	// Split the token into header, payload, and signature
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return errors.New("invalid token format")
	}

	// Verify the signature
	message := fmt.Sprintf("%s.%s", parts[0], parts[1])
	signature, err := base64URLDecode(parts[2])

	if err != nil {
		println("error here")
		return err
	}

	hashed := sha256.Sum256([]byte(message))
	if err = rsa.VerifyPKCS1v15(publicKey, crypto.SHA256, hashed[:], signature); err != nil {
		return fmt.Errorf("invalid signature: %w", err)
	}

	// Decode and parse the payload into the Claims struct
	payload, err := base64URLDecode(parts[1])
	if err != nil {
		return err
	}
	return json.Unmarshal(payload, c)
}

// Helper functions for encoding/decoding, key loading, and signing.

func base64URLEncode(data []byte) string {
	return strings.TrimRight(base64.URLEncoding.EncodeToString(data), "=")
}

func base64URLDecode(s string) ([]byte, error) {

	switch len(s) % 4 {
	case 2:
		s += "=="
	case 3:
		s += "="
	}

	return base64.URLEncoding.DecodeString(s)
}

func loadPublicKey(path string) (*rsa.PublicKey, error) {
	keyData, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	block, _ := pem.Decode(keyData)
	if block == nil || block.Type != "PUBLIC KEY" {
		return nil, errors.New("invalid public key")
	}
	key, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	return key.(*rsa.PublicKey), nil
}

func loadPrivateKey(path string) (*rsa.PrivateKey, error) {
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
	return key.(*rsa.PrivateKey), nil
}

func signMessage(privateKey *rsa.PrivateKey, message string) (string, error) {
	hashed := sha256.Sum256([]byte(message))
	signature, err := rsa.SignPKCS1v15(rand.Reader, privateKey, crypto.SHA256, hashed[:])
	if err != nil {
		return "", err
	}
	return base64URLEncode(signature), nil
}
