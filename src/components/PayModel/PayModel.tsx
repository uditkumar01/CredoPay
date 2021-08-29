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
} from "@chakra-ui/react";
import QrReader from "react-qr-reader";
import { ReactElement, useRef, useState } from "react";
import { BiCreditCard } from "react-icons/bi";
import { NavItem } from "../NavItem/NavItem";

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

  const [decodedString, setDecodedString] = useState("");
  const handleScan = (data: string | null): void => {
    if (data) {
      setDecodedString(data);
    }
  };
  const handleError = (err: string): void => {
    /* eslint-disable no-console */
    console.error(err);
    /* eslint-enable no-console */
  };

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
          <ModalHeader color="black.50">Pay No</ModalHeader>
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
                <Text m="1rem 0">{decodedString}</Text>
              </Flex>
              <Divider mb="2rem" />
              <Flex align="flex-end" mt="1rem">
                <FormControl id="upi" mr="1rem">
                  <Input
                    type="upi"
                    borderColor="black.300"
                    placeholder="UPI address"
                  />
                </FormControl>
                <Button
                  bg="brand.600"
                  _hover={{
                    bg: "brand.700",
                  }}
                  m="0"
                >
                  Pay now
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter> {decodedString}</ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
}
