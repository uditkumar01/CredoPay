import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  IconProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/all";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";

/* eslint-disable max-len */

export const Blob = (props: IconProps): JSX.Element => {
  return (
    <Icon
      width="100%"
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

/* eslint-enable max-len */

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Container maxW="7xl">
        <Stack
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }} marginTop="2rem">
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as="span"
                position="relative"
                fontSize={["3.6rem", "4rem"]}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                  opacity: "0.9",
                }}
              >
                Payments,
              </Text>
              <br />
              <Text as="span" color="blue.400">
                made easy!
              </Text>
            </Heading>
            <Text color="gray.500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, in
              sed corrupti deserunt eligendi nisi sint, cupiditate voluptate
              ducimus est . Velit.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Link to="/create-wallet">
                <Button
                  rounded="full"
                  size="lg"
                  fontWeight="normal"
                  px={6}
                  colorScheme="blue"
                  bg="blue.400"
                  _hover={{ bg: "blue.500" }}
                >
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  rounded="full"
                  size="lg"
                  fontWeight="normal"
                  px={6}
                  leftIcon={<FaEthereum style={{ color: "#9e9e9e" }} />}
                >
                  Login
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="full"
            marginTop="2rem"
          >
            <Blob
              w="150%"
              h="150%"
              position="absolute"
              top="-20%"
              left={0}
              zIndex={-1}
              color={useColorModeValue("blue.50", "blue.400")}
            />
            <Box
              position="relative"
              height="300px"
              rounded="2xl"
              boxShadow="2xl"
              width="full"
              overflow="hidden"
            >
              <IconButton
                aria-label="Play Button"
                variant="ghost"
                _hover={{ bg: "transparent" }}
                icon={<FaEthereum style={{ width: "82px", height: "82px" }} />}
                size="lg"
                color="white"
                position="absolute"
                left="50%"
                top="50%"
                transform="translateX(-50%) translateY(-50%)"
              />
              <Image
                alt="Hero Image"
                fit="cover"
                align="center"
                w="100%"
                h="100%"
                opacity="0.9"
                src="https://dat-rs.com/images/block-crypto-ETH.jpg"
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Layout>
  );
}
