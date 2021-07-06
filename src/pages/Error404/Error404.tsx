import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";

export default function Error404(): JSX.Element {
  return (
    <Layout>
      <Container maxW="5xl">
        <Stack
          textAlign="center"
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight="110%"
          >
            404{" "}
            <Text as="span" color="brand.500">
              Error
            </Text>
          </Heading>
          <Text color="gray.500" maxW="3xl">
            The page you are trying to access does not exists. Please type the
            url properly. Or you can go to dashboard using the button given
            below.
          </Text>
          <Stack spacing={6} direction="row">
            <Link to="/dashboard">
              <Button
                rounded="full"
                px={6}
                colorScheme="brand"
                bg="brand.500"
                _hover={{ bg: "brand.600" }}
              >
                Go to dashboard
              </Button>
            </Link>
          </Stack>
          <Flex w="full">
            <Image src="/images/error404.png" alt="error png" />
          </Flex>
        </Stack>
      </Container>
    </Layout>
  );
}
