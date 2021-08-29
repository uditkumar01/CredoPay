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
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { NavItem } from "..";
import useAuth from "../../context/AuthContext/AuthContext";
import { auth } from "../../Firebase";
import { formatFullName } from "../../utils/formatName";
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
  icon?: ReactElement;
  navBtn?: boolean;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authState } = useAuth();
  const toast = useToast();
  return (
    <>
      {!navBtn ? (
        <Button onClick={onOpen} {...btnStyles}>
          Pay Now
        </Button>
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
              <Flex pos="relative" zIndex="1" justify="center" mt={-20}>
                <Avatar
                  height="170px"
                  width="170px"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  alt="Author"
                  css={{
                    borderWidth: "5px",
                    borderColor: "cyan",
                  }}
                />
              </Flex>

              <Box p={6} pos="relative" zIndex="1">
                <Stack spacing={1} align="center" mb={5}>
                  <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
                    {formatFullName(authState?.user?.displayName || "")}
                  </Heading>
                  <Text
                    as={Badge}
                    bg="teal.900"
                    color="brand.500"
                    fontSize="md"
                    textTransform="none"
                  >
                    @{authState?.user?.credTag}
                  </Text>
                </Stack>
                <Stack spacing={0} align="center" mb={5}>
                  <Heading>$12312.00</Heading>
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
                      23k
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
                      23k
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
                <Stack direction="row" justify="center" spacing={6}>
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
                      23k
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
                      23k
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
                        "Your CredTag has been copied to your clipboard",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                    navigator.clipboard.writeText(
                      authState?.user?.credTag || ""
                    );
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
              </Box>
            </Box>
          </Center>
          {/* </ModalBody> */}
        </ModalContent>
      </Modal>
    </>
  );
}
