import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  FormControl,
  Text,
  Input,
  Divider,
  DarkMode,
  Stack,
  FormLabel,
  useToast,
  Select,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import QrReader from "react-qr-reader";
import { ReactElement, useRef, useState } from "react";
import { BiCreditCard } from "react-icons/bi";
import { v4 } from "uuid";
import { NavItem } from "../NavItem/NavItem";
import {
  initiateTransfer,
  parseUpi,
  queneTransfer,
} from "../../lib/createDecentroTransfer";
import useAuth from "../../context/AuthContext/AuthContext";
import { firestore } from "../../Firebase";
import { transfer, TransferPayload } from "../../lib/transferApi";
import { useStaticData } from "../../context/StaticData/StaticData";

export interface BtnStyles {
  [key: string]:
    | string
    | Array<string>
    | ReactElement
    | {
        [key: string]: string;
      };
}

export function PayModel({
  btnStyles,
  navBtn,
}: {
  btnStyles?: BtnStyles;
  icon?: ReactElement;
  navBtn?: boolean;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { authState, authDispatch } = useAuth();
  const { cryptoData } = useStaticData();
  // const [decodedString, setDecodedString] = useState<{ pa: ""; am: "" } | null>(
  //   null
  // );
  const [currency, setCurrency] = useState<string>("ETH");
  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");
  const toast = useToast();

  const handleScan = (data: string | null): void => {
    if (data) {
      const decoded = parseUpi(data);
      if (decoded && decoded?.am) {
        setAmount(decoded?.am);
      }
      if (decoded && decoded?.pa) {
        setUpi(decoded?.pa);
      }
    }
  };
  const handleError = (err: string): void => {
    /* eslint-disable no-console */
    console.error(err);
    /* eslint-enable no-console */
  };

  // submission handler
  async function handleSubmit(): Promise<void> {
    onClose();
    try {
      // convert n inr to eth
      const idempotencyKey = v4();

      const ethValue = cryptoData.find((c) => c.symbol === "ETH")?.value;
      const USDValue = 73.5;
      let inrToEthAmount = Number((Number(amount) / USDValue).toFixed(2));
      if (currency === "ETH") {
        inrToEthAmount = Number(amount) / Number(ethValue);
      }

      const payload: TransferPayload = {
        source: { type: "wallet", id: authState.user?.walletId || "" },
        destination: { type: "wallet", id: "1000128582" },
        amount: {
          amount: `${inrToEthAmount}`,
          currency: currency === "USDC" ? "USD" : currency,
        },
        idempotencyKey,
      };

      const resTransfer = await transfer(payload);

      await queneTransfer(
        idempotencyKey,
        upi,
        amount,
        authState?.user?.walletId || "creadopay",
        authState?.user?.uid || "",
        authState?.user?.pendingTransactions || [],
        inrToEthAmount,
        authState.user?.walletId || "",
        "1000128582"
      );

      // const res = await initiateTransfer(
      //   idempotencyKey,
      //   upi,
      //   amount,
      //   authState?.user?.walletId || "creadopay"
      // );
      // console.log(res);
      // const transactions = [...(authState?.user?.transactions || [])];
      // transactions.unshift({
      //   id: idempotencyKey,
      //   amount: {
      //     amount,
      //     currency: "INR",
      //   },
      //   source: {
      //     type: "wallet",
      //     id: authState?.user?.walletId || "creadopay",
      //   },
      //   destination: {
      //     type: "wallet",
      //     id: upi,
      //   },
      //   status: res?.status === "success" ? "complete" : "failed",
      //   createDate: new Date().toISOString(),
      // });
      // update current user firebase modal
      // const userDoc = await firestore()
      //   .collection("users")
      //   .doc(authState?.user?.uid)
      //   .update({
      //     transactions,
      //   });
      // console.log(userDoc);
      // update current user local state
      // authDispatch({
      //   type: "UPDATE_TRANSACTION",
      //   payload: transactions,
      // });

      // console.log({ payload, resTransfer });

      // success toast for payment

      // toast({
      //   title: "Payment Successful",
      //   description: `You have successfully paid ${amount} to ${upi}`,
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // });
    } catch (error) {
      console.log(error);
      // failed toast for payment
      toast({
        title: "Payment Failed",
        description: `You have failed to pay ${amount} to ${upi}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  console.log(currency);

  return (
    <DarkMode>
      {!navBtn ? (
        <Button ref={btnRef} onClick={onOpen} {...btnStyles}>
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
          <NavItem icon={<BiCreditCard />} label="Pay Now" />
        </Button>
      )}

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="black.50">Pay Now</ModalHeader>
          <ModalCloseButton color="black.50" />
          <ModalBody>
            <Flex
              height="auto"
              align="center"
              justify="center"
              flexDir="column"
              mt="3rem"
            >
              <Flex height="400px" width="400px" mb="4rem" flexDir="column">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
              </Flex>
              <Divider mb="2rem" />
              <Stack align="center" spacing={3} mt="1rem" w="full">
                <FormControl>
                  <FormLabel
                    color="whiteAlpha.800"
                    fontWeight="bold"
                    htmlFor="chain"
                  >
                    Currency
                  </FormLabel>
                  <Select
                    name="chain"
                    borderColor="gray.600"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {["USDC", "ETH", "BTC"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="upi">
                  <FormLabel htmlFor="upi-address">
                    <Text fontWeight="bold">UPI Address</Text>
                  </FormLabel>
                  <Input
                    type="upi"
                    name="upi-address"
                    borderColor="black.300"
                    placeholder="UPI address"
                    value={upi}
                    onChange={(e): void => setUpi(e.target.value)}
                  />
                </FormControl>

                <FormControl id="upi">
                  <FormLabel htmlFor="amount-pay">
                    <Text fontWeight="bold">Amount</Text>
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>₹</InputLeftAddon>
                    <Input
                      name="amount-pay"
                      type="upi"
                      borderColor="black.300"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Stack align="center" w="full">
              <Button
                bg="brand.600"
                color="black.900"
                _hover={{
                  bg: "brand.700",
                }}
                onClick={handleSubmit}
                isDisabled={!upi || !amount}
              >
                Pay now
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
}
