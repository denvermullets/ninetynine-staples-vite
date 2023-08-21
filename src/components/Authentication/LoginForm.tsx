import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
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
import { UserContext } from "../../providers/CurrentUserProvider";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);
  const { login, emailError, passwordError } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const success = await login(email, password, remember);
    success && navigate("/");
  };

  return (
    <Container variant="login">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "md" }} as="h1" variant="loginHeading">
              Log in to your account
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
                variant="authInput"
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {emailError && (
                <FormErrorMessage style={{ marginBottom: "6px" }}>Valid email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError}>
              <FormLabel htmlFor="password" variant="loginLabel">
                Password
              </FormLabel>
              <Input
                variant="authInput"
                id="password"
                placeholder="********"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {passwordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox variant="loginForm" isChecked={remember} onChange={() => setRemember(!remember)}>
              Remember me
            </Checkbox>
            <Button variant="link" colorScheme="green" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button variant="brand" onClick={handleSubmit}>
              Sign in
            </Button>
          </Stack>
        </Stack>
        <HStack spacing="1" justify="center">
          <Text fontSize="sm">Dont have an account?</Text>
          <Link to="/sign-up">
            <Button variant="link" colorScheme="green" size="sm" marginBottom="4px" marginLeft="4px">
              Sign up
            </Button>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
