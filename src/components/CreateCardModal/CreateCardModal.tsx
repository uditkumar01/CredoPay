import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  InputGroup,
  InputRightElement,
  Flex,
  InputLeftAddon,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { createCard, getPCIPublicKey } from "../../lib/cardsApi";
import { openPGPEncryption } from "../../lib/openpgp";
import { CreateCardPayload } from "./CreateCardModal.types";

/* eslint-disable max-len */
function CardIcon(): JSX.Element {
  return (
    <svg
      stroke="aqua"
      fill="aqua"
      strokeWidth="0"
      viewBox="0 0 576 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z">
        {" "}
      </path>
    </svg>
  );
}

function CalenderIcon(): JSX.Element {
  return (
    <svg
      stroke="aqua"
      fill="aqua"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z">
        {" "}
      </path>
    </svg>
  );
}

/* eslint-enable max-len */

export function CreateCardModal(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [cardNo, setCardNo] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [expDate, setExpDate] = useState<string>("");

  // expDateChangeHandler function
  const expDateChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    return setExpDate(() => {
      let expDateValue = event.target.value;
      if (expDateValue && expDateValue.length === 2) {
        expDateValue += "/";
      } else if (expDateValue && expDateValue.length === 3) {
        expDateValue = expDateValue.replace("/", "");
      }
      return expDateValue;
    });
  };

  const cardNoChangeHandler = (event: ChangeEvent<HTMLInputElement>): null => {
    const cardNoValue = event.target.value;
    // check if string contains only numbers
    if (
      !cardNoValue.length ||
      (cardNoValue.length < 17 && cardNoValue.match(/^\d+$/))
    ) {
      setCardNo(cardNoValue);
    }
    return null;
  };

  const amountChangeHandler = (event: ChangeEvent<HTMLInputElement>): null => {
    const amountValue = event.target.value;
    console.log(amountValue, !amountValue.length, amountValue.match(/^\d+$/));
    // check if string contains only numbers
    if (!amountValue.length || amountValue.match(/^\d+$/)) {
      setAmount(amountValue);
    }
    return null;
  };

  const cvvChangeHandler = (event: ChangeEvent<HTMLInputElement>): null => {
    const cvvValue = event.target.value;
    // check if string contains only numbers
    if (!cvvValue.length || (cvvValue.length < 4 && cvvValue.match(/^\d+$/))) {
      setCvv(cvvValue);
    }
    return null;
  };

  // submission handler
  const submitHandler = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const cardDetails = {
        number: "4007400000000007",
        cvv: "123",
      };
      const payload: CreateCardPayload = {
        idempotencyKey: uuid(),
        expMonth: 1,
        expYear: 2025,
        keyId: "",
        encryptedData: "",
        billingDetails: {
          line1: "Test",
          line2: "",
          city: "Test City",
          district: "MA",
          postalCode: "11111",
          country: "US",
          name: "Customer 0001",
        },
        metadata: {
          phoneNumber: "+12025550180",
          email: "customer-0001@circle.com",
          sessionId: "xxx",
          ipAddress: "172.33.222.1",
        },
      };
      const publicKey = await getPCIPublicKey();

      const encryptedData = await openPGPEncryption(cardDetails, publicKey);
      const { encryptedMessage, keyId } = encryptedData;

      payload.keyId = keyId;
      payload.encryptedData = encryptedMessage;

      const cardRes = await createCard(payload);
      console.log(cardRes.data);
    } catch (error) {
      console.log(error);
    }
    return setIsLoading(false);
  };

  const isDisabled =
    cardNo.length === 16 && cvv.length === 3 && expDate.length === 5;

  return (
    <>
      <Button
        p="0.7rem 1.6rem"
        cursor="pointer"
        transition="0.2s all ease"
        m="0"
        w="100%"
        justifyContent="flex-start"
        borderRadius="0"
        bg="gray.700"
        color="whiteAlpha.800"
        onClick={onOpen}
        _hover={{ bg: "black.500" }}
        _active={{ bg: "black.500" }}
      >
        Create Card
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whiteAlpha.900">Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl m="1rem 0">
                <InputGroup>
                  <InputLeftAddon>$</InputLeftAddon>
                  <Input
                    ref={initialRef}
                    placeholder="Amount"
                    type="text"
                    value={amount}
                    onChange={amountChangeHandler}
                  />
                </InputGroup>
              </FormControl>
              <FormControl m="0">
                <InputGroup>
                  <Input
                    ref={initialRef}
                    placeholder="Card number"
                    type="text"
                    value={cardNo}
                    maxLength={16}
                    onChange={cardNoChangeHandler}
                  />
                  <InputRightElement>
                    <CardIcon />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex>
                <FormControl mt="1rem" mr="1.2rem">
                  <InputGroup>
                    <Input
                      placeholder="mm/yy"
                      maxLength={5}
                      type="text"
                      value={expDate}
                      onChange={expDateChangeHandler}
                    />
                    <InputRightElement>
                      <CalenderIcon />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl mt="1rem">
                  <InputGroup>
                    <Input
                      maxLength={3}
                      placeholder="CVV"
                      value={cvv}
                      type="password"
                      onChange={cvvChangeHandler}
                      autoComplete="off"
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              isDisabled={!isDisabled}
              onClick={submitHandler}
              type="submit"
              colorScheme="teal"
              bg="brand.500"
              mr={3}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}