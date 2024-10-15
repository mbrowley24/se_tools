package env

import (
	"bufio"
	"errors"
	"os"
	"strings"
)

func Load() error {

	file, err := os.Open(".env")

	if err != nil {
		return err
	}

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {

		line := scanner.Text()

		envString := strings.Split(line, "=")

		if len(envString) != 2 {
			readErr := errors.New("invalid env line: " + line)

			return readErr
		}

		if err := os.Setenv(envString[0], envString[1]); err != nil {

			return err
		}
	}

	return nil
}
