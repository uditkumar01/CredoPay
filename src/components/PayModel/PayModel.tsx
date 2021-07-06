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
} from "@chakra-ui/react";
import QrReader from "react-qr-reader";
import { useRef, useState } from "react";

export function PayModel(): JSX.Element {
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
    <>
      <Button ref={btnRef} onClick={onOpen} variant="outline" minW="150px">
        Pay Now
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Now</ModalHeader>
          <ModalCloseButton />
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
                  <Input type="upi" placeholder="UPI address" />
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
          <ModalFooter> </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
