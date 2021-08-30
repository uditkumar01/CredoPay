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
import { ReactElement, useState } from "react";
import { MdTransferWithinAStation } from "react-icons/md";
import { v4 } from "uuid";
import useAuth from "../../context/AuthContext/AuthContext";
import { useHistoryData } from "../../context/HistoryData/HistoryData";
import {
  BlockchainTransfer,
  transfer,
  TransferPayload,
  WalletTrasfer,
} from "../../lib/transferApi";
import { NavItem } from "../NavItem/NavItem";
import { BtnStyles } from "../PayModel/PayModel";
import { SearchModal } from "../SearchModal/SearchModal";

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
            borderColor="gray.600"
          />
        </InputGroup>
      </FormControl>
    </>
  );
}

export function MakeTransfer({
  btnStyles,
  navBtn,
}: {
  btnStyles?: BtnStyles;
  icon?: ReactElement;
  navBtn?: boolean;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [chainType, setChainType] = useState("ETH");
  const [currency, setCurrency] = useState("USD");
  const [isWallet, setIsWallet] = useState(true);
  const { authState } = useAuth();
  const { historyDataDispatch } = useHistoryData();

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
      source: { type: "wallet", id: authState.user?.walletId || "" },
      destination,
      amount: { amount, currency },
      idempotencyKey: v4(),
    };

    // console.log(payload);
    const res = await transfer(payload);

    historyDataDispatch({
      type: "ADD_HISTORY_ITEM",
      payload: {
        transactionsHistory: [res],
      },
    });

    console.log(res);
    onClose();
    setReceiverAddress("");
    return null;
  }

  return (
    <>
      {!navBtn ? (
        <Button onClick={onOpen} {...btnStyles}>
          Transfer
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
          <NavItem icon={<MdTransferWithinAStation />} label="Transfer" />
        </Button>
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whiteAlpha.800">Transfer</ModalHeader>
          <ModalCloseButton color="whiteAlpha.700" />
          <ModalBody>
            <Stack spacing={8}>
              <Box
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.600"
                overflow="hidden"
                w="100%"
                p="1rem 1rem 2rem 1rem"
                color="white"
              >
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel color="whiteAlpha.800" htmlFor="chain">
                      Currency
                    </FormLabel>
                    <Select
                      name="chain"
                      borderColor="gray.600"
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
                borderColor="gray.600"
                color="whiteAlpha.900"
              >
                <Tabs
                  borderColor="gray.600"
                  isFitted
                  onChange={(e) => setIsWallet(e === 0)}
                >
                  <TabList>
                    <Tab _focus={{ outline: "none" }} color="whiteAlpha.800">
                      Wallet
                    </Tab>
                    <Tab _focus={{ outline: "none" }} color="whiteAlpha.800">
                      Blockchain
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Stack spacing={4}>
                        <SearchModal
                          setValue={setReceiverAddress}
                          addressValue={receiverAddress}
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
                          <FormLabel htmlFor="chain" color="whiteAlpha.800">
                            Blockchain type
                          </FormLabel>
                          <Select
                            name="chain"
                            borderColor="gray.600"
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
            <Button
              colorScheme="brand"
              onClick={handleSubmit}
              isDisabled={!receiverAddress || !amount}
            >
              Transfer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
