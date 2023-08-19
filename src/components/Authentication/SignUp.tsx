import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext, UserContext } from "../../providers/CurrentUserProvider";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { createAccount, emailError, passwordError, usernameError } = useContext<CurrentUserContext>(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email && password && username) {
      const success = await createAccount(email, password, username);
      success && navigate("/");
    }
  };

  return (
    <Container variant="login">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "md" }} variant="loginHeading">
              Create your account
            </Heading>
            <Text>Start making your dreams come true</Text>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={emailError}>
              <FormLabel htmlFor="email" variant="loginLabel">
                Email
              </FormLabel>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                variant="authInput"
                value={email}
              />
              {emailError && (
                <FormErrorMessage style={{ marginBottom: "6px" }}>Valid email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={usernameError}>
              <FormLabel htmlFor="username" variant="loginLabel">
                Username
              </FormLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                type="error"
                onChange={(e) => setUsername(e.target.value)}
                variant="authInput"
                value={username}
              />
              {usernameError && (
                <FormErrorMessage style={{ marginBottom: "6px" }}>
                  This username {username !== "" ? "is already taken" : "can't be blank"}.
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError}>
              <FormLabel htmlFor="password" variant="loginLabel">
                Password
              </FormLabel>
              <Input
                id="password"
                placeholder="********"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                variant="authInput"
                value={password}
              />
              {passwordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
            </FormControl>
          </Stack>
          <Stack spacing="4">
            <Button variant="brand" onClick={handleSubmit}>
              Create Account
            </Button>
          </Stack>
        </Stack>
        <HStack spacing="1" justify="center">
          <Text fontSize="sm">Already have an account?</Text>
          <Link to="/login">
            <Button variant="link" colorScheme="green" size="sm" marginBottom="4px" marginLeft="4px">
              Sign in
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default SignUp;
