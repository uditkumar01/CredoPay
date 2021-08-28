import {
  Box,
  Button,
  InputGroup,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  InputLeftAddon,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { v4 } from "uuid";
import {
  BlockchainTransfer,
  transfer,
  TransferPayload,
  WalletTrasfer,
} from "../../lib/transferApi";

function Field({
  name,
  placeHolder,
  label,
  leftAddOn,
  value,
  setValue,
}: {
  name: string;
  placeHolder: string;
  label: string;
  leftAddOn: string;
  value: string;
  setValue: (value: string) => void;
}): JSX.Element {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }
  return (
    <>
      <FormControl>
        <FormLabel mb="0.2rem" htmlFor={name}>
          {label}
        </FormLabel>
        <InputGroup>
          {leftAddOn && <InputLeftAddon>{leftAddOn}</InputLeftAddon>}
          <Input
            name={name}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>
    </>
  );
}

export function MakeTransfer(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [chainType, setChainType] = useState("ETH");
  const [currency, setCurrency] = useState("USD");
  const [isWallet, setIsWallet] = useState(true);

  async function handleSubmit(): Promise<null> {
    let destination: BlockchainTransfer | WalletTrasfer = {
      type: "blockchain",
      address: "",
      chain: "",
    };

    if (isWallet) {
      destination = {
        type: "wallet",
        id: receiverAddress,
      };
    } else {
      destination = {
        type: "blockchain",
        address: receiverAddress,
        chain: chainType,
      };
    }
    // "1000128582"
    const payload: TransferPayload = {
      source: { type: "wallet", id: senderAddress },
      destination,
      amount: { amount, currency },
      idempotencyKey: v4(),
    };

    // console.log(payload);
    const res = await transfer(payload);

    console.log(res);
    return null;
  }

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
        Make Transfer
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Box
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                w="100%"
                p="1rem 1rem 2rem 1rem"
              >
                <Stack spacing={4}>
                  <Field
                    name="sender-walletID"
                    placeHolder="12343"
                    label="Sender wallet ID"
                    leftAddOn=""
                    value={senderAddress}
                    setValue={setSenderAddress}
                  />
                  <FormControl>
                    <FormLabel htmlFor="chain">Currency</FormLabel>
                    <Select
                      name="chain"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      {["USD", "ETH", "BTC"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <Field
                    name="amount"
                    label="Amount"
                    placeHolder="3.14"
                    leftAddOn={currency}
                    value={amount}
                    setValue={setAmount}
                  />
                </Stack>
              </Box>
              <Box
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                w="100%"
              >
                <Tabs isFitted onChange={(e) => setIsWallet(e === 0)}>
                  <TabList>
                    <Tab _focus={{ outline: "none" }}>Wallet</Tab>
                    <Tab _focus={{ outline: "none" }}>Blockchain</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Stack spacing={4}>
                        <Field
                          name="reciever-walletID"
                          label="Reciever Wallet ID"
                          placeHolder="12345"
                          leftAddOn=""
                          value={receiverAddress}
                          setValue={setReceiverAddress}
                        />
                      </Stack>
                    </TabPanel>
                    <TabPanel>
                      <Stack spacing={6}>
                        <Field
                          name="blockChainID"
                          label="Blockchain Address"
                          placeHolder="nkn32khk2n312hjk3b1h3g12jb3n1..."
                          leftAddOn=""
                          value={receiverAddress}
                          setValue={setReceiverAddress}
                        />
                        <FormControl>
                          <FormLabel htmlFor="chain">Blockchain type</FormLabel>
                          <Select
                            name="chain"
                            value={chainType}
                            onChange={(e) => setChainType(e.target.value)}
                          >
                            {["ETH", "ALGO", "SOL", "XLM", "TRX", "BTC"].map(
                              (option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Stack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>Transfer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
