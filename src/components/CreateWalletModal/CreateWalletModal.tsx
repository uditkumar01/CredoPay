import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Progress,
  Heading,
  chakra,
  InputGroup,
  InputRightElement,
  Tooltip,
  IconButton,
  DarkMode,
  FormHelperText,
} from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/all";
import { v4 } from "uuid";
import useAuth from "../../context/AuthContext/AuthContext";
import { useStaticData } from "../../context/StaticData/StaticData";
import { auth, firestore } from "../../Firebase";
import { createUserEntity } from "../../Firebase/User";
import { createETHAddress } from "../../lib/createETHAddress";
import { createWallet } from "../../lib/createWallet";
import { formatName } from "../../utils/formatName";
import { BtnStyles } from "../PayModel/PayModel";

export interface CreateWalletPayload {
  idempotencyKey: string;
  description: string;
}

export interface CreateETHWalletPayload {
  idempotencyKey: string;
  currency: string;
  chain: string;
}

export function CreateWalletModal({
  children,
  btnStyles,
  isLoading,
  setBtnStatus,
}: {
  children: ReactNode;
  btnStyles?: BtnStyles;
  isLoading?: boolean;
  setBtnStatus: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credTag, setCredTag] = useState("");
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();
  const { allUsers } = useStaticData();
  const [alreadyUsed, setAlreadyUsed] = useState(false);

  const colors = ["gray", "cyan", "blue", "teal", "blue", "teal", "blue"];

  // function to update user's doc on firestore
  async function updateUserDoc(payload: any): Promise<void> {
    try {
      const email = authState.user?.email || auth()?.currentUser?.email;
      if (email) {
        console.debug(email);

        const userRef = firestore().collection("users");
        // getting user if his email is found in firestore
        const snapshot = await userRef.where("email", "==", email).get();

        // if user is not present create a new user
        if (snapshot.empty) {
          await createUserEntity(auth().currentUser);
          updateUserDoc(payload);
        }

        const user = snapshot.docs[0].data();

        // updating user doc in firestore
        userRef.doc(user.uid).update({
          ...payload,
        });
        setBtnStatus("dashboard");
      }
    } catch (err) {
      console.debug("Error while updating user doc", err);
    }
  }

  // onSubmitHandler function to create a new wallet
  const onSubmitHandler = async (): Promise<void> => {
    setLoading(true);
    try {
      const idempotencyKey = v4();
      const createWalletPayload: CreateWalletPayload = {
        idempotencyKey,
        description: `${credTag}'s wallet`,
      };

      const resCreateWallet = await createWallet(createWalletPayload);

      const payload: CreateETHWalletPayload = {
        idempotencyKey: v4(),
        currency: "USD",
        chain: "ETH",
      };
      const resETHAddress = await createETHAddress(
        resCreateWallet?.walletId,
        payload
      );

      updateUserDoc({
        ...resCreateWallet,
        credTag,
        ethAddresses: [{ ...resETHAddress, ...payload }],
      });

      onClose();
      // navigate user to dashboard
      // window.location.href = "/dashboard";
    } catch (err) {
      console.debug("Error while creating wallet", err);
    }
    setLoading(false);
  };

  return (
    <DarkMode>
      <Button onClick={onOpen} {...btnStyles} isLoading={isLoading || loading}>
        {children}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent rounded="md" overflow="hidden">
          {!loading ? (
            <Progress
              colorScheme={colors[credTag.length % colors.length]}
              value={(credTag.length / 6) * 100}
              size="xs"
              hasStripe
              isAnimated
            />
          ) : (
            <Progress colorScheme="blue" size="xs" isIndeterminate />
          )}
          <ModalHeader> </ModalHeader>
          <ModalBody>
            <Box p={4}>
              <Stack spacing={8}>
                <Stack spacing={4} textAlign="center">
                  <Heading fontSize="2rem" color="whiteAlpha.800">
                    <chakra.span>Hola</chakra.span>,{" "}
                    <chakra.span color="blue.300">
                      {formatName(auth().currentUser?.displayName || "")}
                    </chakra.span>
                  </Heading>
                  <Heading fontSize="1.4rem" color="whiteAlpha.600">
                    Let&apos;s setup you wallet
                  </Heading>
                </Stack>
                <FormControl isRequired>
                  <FormLabel htmlFor="credTag" color="whiteAlpha.800">
                    CredTag
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id="credTag"
                      color="whiteAlpha.900"
                      isInvalid={alreadyUsed}
                      placeholder={`For example ${
                        auth().currentUser?.displayName?.split(" ")[0] ||
                        "rohan"
                      }0110`}
                      onChange={(e) => {
                        if (
                          allUsers &&
                          allUsers?.some(
                            (user) =>
                              user?.credTag?.toLowerCase() ===
                              e.target.value?.toLowerCase()
                          )
                        ) {
                          setAlreadyUsed(true);
                        } else {
                          if (alreadyUsed) {
                            setAlreadyUsed(false);
                          }
                          setCredTag(e.target.value);
                        }
                      }}
                    />
                    <InputRightElement>
                      <Tooltip
                        label="CredTag is your unique identity which will be used for making transactions. And it should have atleast 6 characters.
                        "
                        placement="auto"
                        hasArrow
                      >
                        <IconButton
                          variant="ghost"
                          aria-label="what-is-credTag"
                          icon={<RiQuestionnaireFill />}
                        />
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="red.400" h="20px">
                    {alreadyUsed &&
                      `${credTag} is already in use. Please try another one.`}
                  </FormHelperText>
                </FormControl>
                <Stack spacing={4}>
                  <Button
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={onSubmitHandler}
                    isDisabled={credTag.length < 6 || alreadyUsed}
                  >
                    Create Wallet
                  </Button>
                  <Button color="whiteAlpha.700" onClick={onClose}>
                    Close
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter> </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
}
