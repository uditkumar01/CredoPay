import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  Box,
  useColorModeValue,
  Flex,
  Avatar,
  Stack,
  Heading,
  useDisclosure,
  Text,
  Badge,
  Icon,
  IconProps,
  useToast,
  IconButton,
  HStack,
  chakra,
} from "@chakra-ui/react";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { NavItem } from "..";
import useAuth from "../../context/AuthContext/AuthContext";
import { TotalBalances } from "../../context/AuthContext/AuthReducer.types";
import {
  useStaticData,
  Wallet,
  WalletBalance,
} from "../../context/StaticData/StaticData";
import { formatFullName } from "../../utils/formatName";
import { CreateCardModal } from "../CreateCardModal/CreateCardModal";
import { BtnStyles } from "../PayModel/PayModel";

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
        fill="teal"
      />
    </Icon>
  );
};

export function AccountModal({
  btnStyles,
  navBtn,
}: {
  btnStyles?: BtnStyles;
  navBtn?: boolean;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authState } = useAuth();
  const toast = useToast();

  return (
    <>
      {!navBtn ? (
        <IconButton onClick={onOpen} aria-label="user-image" rounded="full">
          <Avatar
            name={authState?.user?.displayName || ""}
            size="sm"
            src={authState?.user?.photoURL || ""}
          />
        </IconButton>
      ) : (
        <Button
          variant="unstyled"
          textAlign="left"
          fontSize="0.85rem"
          fontWeight="light"
          _focus={{
            outline: "none",
          }}
          onClick={onOpen}
        >
          <NavItem icon={<RiAccountPinBoxFill />} label="Account Info" />
        </Button>
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" shadow="none">
          {/* <ModalBody> */}
          <Center py={6}>
            <Box
              maxW="350px"
              w="full"
              bg={useColorModeValue("white", "gray.800")}
              boxShadow="2xl"
              rounded="md"
              pos="relative"
              color="whiteAlpha.900"
            >
              <Box
                top="0px"
                zIndex="0"
                w="100%"
                opacity="0.1"
                pos="absolute"
                overflow="hidden"
              >
                <Box
                  h="300px"
                  transform="rotate(-30deg)"
                  top="-190px"
                  pos="relative"
                  as={Blob}
                />
              </Box>
              <Flex
                pos="relative"
                zIndex="1"
                flexDir="column"
                align="center"
                mt={-20}
              >
                <Avatar
                  height="170px"
                  width="170px"
                  src={authState?.user?.photoURL || ""}
                  alt="Author"
                  css={{
                    borderWidth: "5px",
                    borderColor: "cyan",
                  }}
                />
                <Text
                  as={Badge}
                  fontSize="xs"
                  color="blue.900"
                  bg="cyan.600"
                  p="0.2rem 0.5rem"
                  rounded="full"
                  pos="relative"
                  top="-0.7rem"
                >
                  Test network
                </Text>
              </Flex>

              <Box p={6} pos="relative" mt={-3} zIndex="1">
                <Stack spacing="0.5rem" align="center" mb={5}>
                  <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
                    {formatFullName(authState?.user?.displayName || "")}
                  </Heading>
                  <Heading
                    as={Badge}
                    variant="ghost"
                    fontSize="sm"
                    fontWeight={500}
                    fontFamily="body"
                    p="0.2rem 0.5rem"
                    textTransform="none"
                    rounded="full"
                    mb={2}
                  >
                    {authState?.user?.email || ""}
                  </Heading>
                  <HStack>
                    <Text
                      as={Badge}
                      bg="teal.900"
                      color="brand.500"
                      fontSize="sm"
                      textTransform="none"
                      p="0.2rem 0.5rem"
                      rounded="full"
                    >
                      @{authState?.user?.credTag}
                    </Text>
                    <Text
                      as={Badge}
                      fontSize="sm"
                      bg="blue.900"
                      color="brand.500"
                      textTransform="none"
                      p="0.2rem 0.5rem"
                      rounded="full"
                    >
                      {authState?.user?.walletId}
                    </Text>
                  </HStack>
                </Stack>
                <Stack spacing={0} align="center" mb={5}>
                  <Heading color="brand.500">
                    <chakra.span color="brand.600">$ </chakra.span>
                    {authState.balance.toFixed(2)}
                  </Heading>
                </Stack>
                <Stack direction="row" justify="center" spacing={6}>
                  <Stack
                    spacing={1}
                    align="center"
                    bg={useColorModeValue("#151f21", "gray.900")}
                    height="90px"
                    flex="1"
                    rounded="md"
                    justify="center"
                    mb="1.2rem"
                  >
                    <Text fontWeight={600} fontSize="1.3rem">
                      {authState?.assets && authState.assets?.BTC?.toFixed(2)}
                    </Text>
                    <Text
                      minW="50px"
                      textAlign="center"
                      as={Badge}
                      fontSize="sm"
                      color="gray.500"
                    >
                      BTC
                    </Text>
                  </Stack>
                  <Stack
                    spacing={1}
                    align="center"
                    bg={useColorModeValue("#151f21", "gray.900")}
                    height="90px"
                    flex="1"
                    rounded="md"
                    justify="center"
                  >
                    <Text fontWeight={600} fontSize="1.3rem">
                      {authState?.assets && authState?.assets?.ETH?.toFixed(2)}
                    </Text>
                    <Text
                      minW="50px"
                      textAlign="center"
                      as={Badge}
                      fontSize="sm"
                      color="gray.500"
                    >
                      ETH
                    </Text>
                  </Stack>
                </Stack>
                <Stack direction="row" justify="center" spacing={6}>
                  <Stack
                    spacing={1}
                    align="center"
                    bg={useColorModeValue("#151f21", "gray.900")}
                    height="90px"
                    minW="150px"
                    rounded="md"
                    justify="center"
                  >
                    <Text fontWeight={600} fontSize="1.3rem">
                      {authState?.assets && authState?.assets?.USDC?.toFixed(2)}
                    </Text>
                    <Text
                      minW="50px"
                      textAlign="center"
                      as={Badge}
                      fontSize="sm"
                      color="gray.500"
                    >
                      USDC
                    </Text>
                  </Stack>
                </Stack>

                <Button
                  w="full"
                  mt={8}
                  bg={useColorModeValue("#151f21", "gray.900")}
                  color="white"
                  rounded="md"
                  onClick={() => {
                    toast({
                      title: "Copied Successfully",
                      description:
                        "Your Wallet Id has been copied to your clipboard",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                    navigator.clipboard.writeText(
                      authState?.user?.walletId || ""
                    );
                    onClose();
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Copy Wallet ID
                </Button>
                <Button
                  w="full"
                  mt={4}
                  bg="brand.800"
                  color="white"
                  rounded="md"
                  onClick={() => {
                    toast({
                      title: "Copied Successfully",
                      description:
                        "Your CredTag has been copied to your clipboard",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                    navigator.clipboard.writeText(
                      authState?.user?.credTag || ""
                    );
                    onClose();
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Copy CredTag
                </Button>
                <CreateCardModal
                  btnStyles={{
                    mt: "1rem",
                    mb: "-1rem",
                  }}
                />
              </Box>
            </Box>
          </Center>
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
}
