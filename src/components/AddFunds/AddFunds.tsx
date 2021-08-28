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
} from "@chakra-ui/react";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useStaticData } from "../../context/StaticData/StaticData";

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

export function AddFunds({
  btnStyles,
}: {
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
  const { cryptoAccounts } = useStaticData();

  return (
    <>
      <Button onClick={onOpen} {...btnStyles}>
        Add Funds
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              w="100%"
              p="1rem 1rem 2rem 1rem"
            >
              <Stack spacing="1rem">
                <FormControl>
                  <FormLabel htmlFor="chain-address">Currency</FormLabel>
                  <Select
                    name="chain-address"
                    value={blockChainAddress}
                    onChange={(e) => setBlockChainAddress(e.target.value)}
                    isDisabled={!cryptoAccounts || cryptoAccounts.length < 1}
                  >
                    {cryptoAccounts?.map((option, index) => (
                      <option key={index.toString()} value={option.address}>
                        {option.address}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                {blockChainAddress && (
                  <Flex justifyContent="center" pt="1rem">
                    <QRCode
                      value={blockChainAddress}
                      size={200}
                      bgColor="transparent"
                      fgColor="teal"
                    />
                  </Flex>
                )}
              </Stack>
            </Box>
          </ModalBody>
          <ModalFooter> </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
