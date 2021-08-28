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
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { RiQuestionnaireFill } from "react-icons/all";
import { auth } from "../../Firebase";
import { formatName } from "../../utils/formatName";
import { BtnStyles } from "../PayModel/PayModel";

export function CreateWalletModal({
  children,
  btnStyles,
}: {
  children: ReactNode;
  btnStyles?: BtnStyles;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credTag, setCredTag] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(auth().currentUser);
  return (
    <>
      <Button onClick={onOpen} {...btnStyles}>
        {children}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent rounded="md" overflow="hidden">
          {loading && <Progress size="xs" isIndeterminate />}
          <ModalHeader> </ModalHeader>
          <ModalBody>
            <Box p={4}>
              <Stack spacing={8}>
                <Stack spacing={4} textAlign="center">
                  <Heading fontSize="2rem">
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
                  <FormLabel htmlFor="credTag">CredTag</FormLabel>
                  <InputGroup>
                    <Input
                      id="credTag"
                      placeholder={`${
                        auth().currentUser?.displayName?.split(" ")[0] ||
                        "rohan"
                      }0110`}
                      onChange={(e) => setCredTag(e.target.value)}
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
                </FormControl>
                <Stack spacing={4}>
                  <Button
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: "blue.500",
                    }}
                    isDisabled={credTag.length < 6}
                  >
                    Create Wallet
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                </Stack>
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter> </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}