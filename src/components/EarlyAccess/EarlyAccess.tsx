import { FormEvent, ChangeEvent, useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { addWaitListUser } from "../../Firebase/waitlist/addWaitlistUser";

export function EarlyAccess(): JSX.Element {
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const toast = useToast();

  return (
    <Flex minH={"50vh"} maxW="7xl" w="full" align={"center"} justify={"center"}>
      <Container
        id="early-access-form"
        w="full"
        bg="#23344e"
        bgImage={`url("/images/imggd.png")`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        maxW="7xl"
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
        direction={"column"}
        align={"center"}
        position={"relative"}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "4xl" }}
          textAlign={"center"}
          mb={5}
          color={"whiteAlpha.900"}
        >
          Join Waitlist for Early Access
        </Heading>
        <Text
          textAlign={"center"}
          color={"whiteAlpha.500"}
          fontSize={{ base: "md", sm: "lg" }}
          mb={5}
        >
          Enter your email to get early access to Credopay.
        </Text>

        <Stack
          my={8}
          maxW={"lg"}
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const email = formData.get("email") as string;
            if (!email) {
              return toast({
                title: "Email is required",
                description: "Please enter your email",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            }

            setState("submitting");

            const userRes = await addWaitListUser(email);

            if (!userRes.success) {
              setState("initial");
              return toast({
                title: "Unable to add user",
                description: "Please try again later",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            }

            setState("success");
            return toast({
              title: "Successfully added to waitlist",
              description: "You have been added to the waitlist",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }}
        >
          <FormControl>
            <Input
              variant={"solid"}
              name={"email"}
              type={"email"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"email"}
              placeholder={"Your Email"}
              aria-label={"Your Email"}
              disabled={state !== "initial"}
              required
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={state === "success" ? "green" : "blue"}
              isLoading={state === "submitting"}
              w="100%"
              type={state === "success" ? "button" : "submit"}
            >
              {state === "success" ? <AiOutlineCheck /> : "Submit"}
            </Button>
          </FormControl>
        </Stack>
        <Text mt={2} textAlign={"center"} color={"gray.500"}>
          {"You won't receive any spam! ✌️"}
        </Text>
      </Container>
    </Flex>
  );
}
