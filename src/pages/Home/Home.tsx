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
  Center,
  DarkMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiPlayCircle, FaEthereum, FcGoogle } from "react-icons/all";
import {
  CreateWalletModal,
  DemoSection,
  EarlyAccess,
  FeaturesSection,
  Footer,
  ScrollTo,
} from "../../components";
import { Layout } from "../../components/Layout/Layout";
import useAuth from "../../context/AuthContext/AuthContext";
import { auth, firestore } from "../../Firebase";
import { createUserEntity } from "../../Firebase/User";
import { getWalletInfo } from "../../lib/getWalletInfo";

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
  const {
    signIn,
    authState: { isLoggedIn },
    showLoadingScreen,
  } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnStatus, setBtnStatus] = useState("signin");
  // get user from firestore using email
  useEffect(() => {
    if (!showLoadingScreen && isLoggedIn) {
      const email = auth()?.currentUser?.email;
      let progressBtn = "signin";
      if (email) {
        setBtnLoading(true);
        console.debug(email);

        (async () => {
          let userRef = firestore().collection("users");
          // getting user if his email is found in firestore
          let snapshot = await userRef.where("email", "==", email).get();
          if (snapshot.empty) {
            await createUserEntity(auth().currentUser);
            userRef = firestore().collection("users");
            // getting user if his email is found in firestore
            snapshot = await userRef.where("email", "==", email).get();
          }

          const user = snapshot.docs[0].data();
          console.debug(user);
          try {
            const res = await getWalletInfo(user?.walletId || "");
            console.debug({ res });
            if (res) {
              progressBtn = "dashboard";
            } else {
              progressBtn = "wallet";
            }
          } catch (e) {
            console.debug("error while checking wallet id", e);
          }
          console.debug({ progressBtn });
          setBtnStatus(progressBtn);
        })();
      }
      console.debug(progressBtn, "progress");
      setBtnLoading(false);
    }
  }, [showLoadingScreen, isLoggedIn]);
  console.debug(btnStatus, "btn status");

  const getDashBoardBtn = (): JSX.Element => {
    switch (btnStatus) {
      case "dashboard":
        return (
          <Button
            as="a"
            w="full"
            maxW="350px"
            variant="outline"
            leftIcon={<Image src="/svgs/logo.svg" h="26px" />}
            size="lg"
            colorScheme="blue"
            isLoading={btnLoading}
            href="/dashboard"
            textDecoration="none"
          >
            <Center>
              <Text>Go to DashBoard</Text>
            </Center>
          </Button>
        );
      case "wallet":
        return (
          <CreateWalletModal
            btnStyles={{
              w: "full",
              maxW: "350px",
              variant: "outline",
              size: "lg",
              colorScheme: "blue",
              leftIcon: <Image src="/svgs/logo.svg" h="26px" />,
            }}
            isLoading={btnLoading}
            setBtnStatus={setBtnStatus}
          >
            <Center>
              <Text>Create your Wallet</Text>
            </Center>
          </CreateWalletModal>
        );
      default:
        return (
          <Button
            w="full"
            maxW="350px"
            variant="outline"
            leftIcon={<FcGoogle />}
            size="lg"
            colorScheme="blue"
            isLoading={btnLoading}
            onClick={() => {
              (async () => {
                setBtnLoading(true);
                try {
                  await signIn();
                } catch (e) {
                  console.debug(e);
                }
                setBtnLoading(false);
              })();
            }}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        );
    }
  };

  return (
    <Layout>
      <Flex direction="column" w="full" pos="relative">
        <Container maxW="7xl" w="full" pos="relative" zIndex={1}>
          <Stack
            pos="relative"
            align="flex-start"
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column-reverse", md: "row" }}
            minH={"100vh"}
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
                  color="blue.400"
                  _after={{
                    content: "''",
                    width: "100%",
                    height: "30%",
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    zIndex: 1,
                    opacity: "0.9",
                  }}
                >
                  UPI
                </Text>
                <br />
                <Text as="span" color="brand.400">
                  {"🤝🏻"} Crypto
                </Text>
              </Heading>
              <Text color="gray.500">
                Scan any UPI QR code and pay with crypto. Credopay is the easy
                way to send, spend, bank, and invest.
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: "column", sm: "row" }}
              >
                <DarkMode>
                  {getDashBoardBtn()}
                  {/* <ScrollTo scrollToId="early-access-form">
                    <Button
                      w="full"
                      colorScheme="orange"
                      maxW="350px"
                      variant="outline"
                      size="lg"
                    >
                      Join the waitlist
                    </Button>
                  </ScrollTo> */}
                  <ScrollTo scrollToId="watch-demo">
                    <Button
                      leftIcon={<BiPlayCircle size={25} />}
                      w="full"
                      maxW="350px"
                      variant="outline"
                      size="lg"
                    >
                      Watch the Demo
                    </Button>
                  </ScrollTo>
                </DarkMode>
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
                color={"gray.900"}
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
                  icon={
                    <FaEthereum style={{ width: "82px", height: "82px" }} />
                  }
                  size="lg"
                  color="white"
                  position="absolute"
                  left="50%"
                  top="50%"
                  transform="translateX(-50%) translateY(-50%)"
                />
                <Image
                  alt=""
                  fit="cover"
                  align="center"
                  w="100%"
                  h="100%"
                  opacity="0.9"
                  src="/images/hero.webp"
                />
              </Box>
            </Flex>
            <Blob
              w="20%"
              h="20%"
              position="absolute"
              bottom="0%"
              right={"-50%"}
              zIndex={-1}
              color={"gray.900"}
            />

            <Blob
              w="30%"
              transform={`rotate(${useColorModeValue("180deg", "0deg")})`}
              h="30%"
              position="absolute"
              bottom="0%"
              left="-50%"
              zIndex={-1}
              opacity={0.2}
              color={"gray.400"}
            />

            <Blob
              w="20%"
              transform={`rotate(${useColorModeValue("270deg", "0deg")})`}
              h="150%"
              position="absolute"
              top="-30%"
              left="-60%"
              zIndex={-1}
              opacity={0.2}
              color={"blue.900"}
            />
          </Stack>
          <FeaturesSection />
          <DemoSection />
          <EarlyAccess />
        </Container>
        <Image
          src="/images/bgwave.png"
          w="full"
          pos="absolute"
          zIndex={0}
          opacity={0.1}
          left={0}
          bottom={0}
        />
        <Footer />
      </Flex>
    </Layout>
  );
}
