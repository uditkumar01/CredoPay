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
  useDisclosure,
  InputLeftAddon,
  FormControl,
  Select,
  Flex,
  useToast,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMessageAltAdd } from "react-icons/bi";
import QRCode from "qrcode.react";
import { v4 } from "uuid";
import { useStaticData } from "../../context/StaticData/StaticData";
import { NavItem } from "../NavItem/NavItem";
import { createETHAddress } from "../../lib/createETHAddress";
import useAuth from "../../context/AuthContext/AuthContext";
import { CreateETHWalletPayload } from "../CreateWalletModal/CreateWalletModal";
import { firestore } from "../../Firebase";

// function Field({
//   name,
//   placeHolder,
//   label,
//   leftAddOn,
//   value,
//   setValue,
// }: {
//   name: string;
//   placeHolder: string;
//   label: string;
//   leftAddOn: string;
//   value: string;
//   setValue: (value: string) => void;
// }): JSX.Element {
//   function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
//     setValue(e.target.value);
//   }
//   return (
//     <>
//       <FormControl>
//         <FormLabel mb="0.2rem" htmlFor={name}>
//           {label}
//         </FormLabel>
//         <InputGroup>
//           {leftAddOn && <InputLeftAddon>{leftAddOn}</InputLeftAddon>}
//           <Input
//             name={name}
//             value={value}
//             placeholder={placeHolder}
//             onChange={handleChange}
//           />
//         </InputGroup>
//       </FormControl>
//     </>
//   );
// }

export function AddFunds({
  btnStyles,
  navBtn,
}: {
  navBtn?: boolean;
  btnStyles?: {
    [key: string]:
      | string
      | Array<string>
      | {
          [key: string]: string;
        };
  };
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [blockChainAddress, setBlockChainAddress] = useState("");
  const [chain, setChain] = useState("");
  const [currency, setCurrency] = useState("");
  const { cryptoAccounts } = useStaticData();
  const { authState, showLoadingScreen } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!showLoadingScreen && authState.isLoggedIn) {
      // if (!cryptoAccounts || cryptoAccounts.length) {
      //   // create a new block chain address
      //   (async () => {
      //     const payload: CreateETHWalletPayload = {
      //       idempotencyKey: v4(),
      //       currency: "USD",
      //       chain: "ETH",
      //     };
      //     const newETHAddress = await createETHAddress(
      //       authState?.user?.walletId,
      //       payload
      //     );
      //     const userRef = firestore().collection("users");
      //     userRef.doc(authState?.user?.uid).update({
      //       ...payload,
      //       ethAddresses: [
      //         ...(authState?.user?.ethAddresses || []),
      //         { ...payload, ...newETHAddress },
      //       ],
      //     });
      //   })();
      // }
      if (cryptoAccounts) {
        try {
          const firstAddress = cryptoAccounts[0].address;
          const firstChain = cryptoAccounts[0].chain;
          const firstCurrency = cryptoAccounts[0].currency;
          setBlockChainAddress(firstAddress);
          setChain(firstChain);
          setCurrency(firstCurrency);
        } catch (e) {
          (async () => {
            const payload: CreateETHWalletPayload = {
              idempotencyKey: v4(),
              currency: "USD",
              chain: "ETH",
            };
            const newETHAddress = await createETHAddress(
              authState?.user?.walletId,
              payload
            );
            const userRef = firestore().collection("users");
            userRef.doc(authState?.user?.uid).update({
              ...payload,
              ethAddresses: [
                ...(authState?.user?.ethAddresses || []),
                { ...payload, ...newETHAddress },
              ],
            });
          })();
          console.log(e);
        }
      }
    }
  }, [cryptoAccounts, showLoadingScreen, authState]);
  return (
    <>
      {!navBtn ? (
        <Button onClick={onOpen} {...btnStyles}>
          Add Funds
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
          <NavItem icon={<BiMessageAltAdd />} label="Add Funds" />
        </Button>
      )}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whiteAlpha.800">Add Funds</ModalHeader>
          <ModalCloseButton color="whiteAlpha.700" />
          <ModalBody>
            <Box
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              w="100%"
              p="1rem 1rem 2rem 1rem"
              color="white"
              borderColor="gray.600"
            >
              <Stack spacing="1rem">
                <FormControl isRequired>
                  <FormLabel color="whiteAlpha.800" htmlFor="chain-address">
                    {!cryptoAccounts || cryptoAccounts.length < 1
                      ? "You currently have no blockchain address"
                      : "Choose an address"}
                  </FormLabel>
                  <Select
                    name="chain-address"
                    borderColor="gray.600"
                    value={blockChainAddress}
                    isDisabled={!cryptoAccounts || cryptoAccounts.length < 1}
                  >
                    {cryptoAccounts?.map((option, index) => (
                      <option
                        key={index.toString()}
                        value={option?.address}
                        onClick={() => {
                          setBlockChainAddress(option?.address);
                          setChain(option?.chain);
                          setCurrency(option?.currency);
                        }}
                      >
                        {option.address}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                {blockChainAddress && (
                  <Flex justifyContent="center" pt="1rem">
                    <QRCode
                      value={blockChainAddress}
                      bgColor="transparent"
                      fgColor="cyan"
                    />
                  </Flex>
                )}
              </Stack>
              <Table size="sm" mt={10}>
                <Tbody>
                  <Tr>
                    <Th>Currency</Th>
                    <Td isNumeric>
                      <Badge>{currency}</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Chain</Th>
                    <Td isNumeric>
                      <Badge>{chain}</Badge>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* button to copy address and show a success toast */}
            <Flex justify="center" w="full">
              <Button
                colorScheme="blue"
                onClick={() => {
                  navigator.clipboard.writeText(blockChainAddress);
                  toast({
                    title: "Address copied",
                    description: "Address copied to clipboard",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  onClose();
                }}
              >
                Copy Address
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
