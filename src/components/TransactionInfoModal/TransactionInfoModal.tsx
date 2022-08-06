import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Badge,
  Box,
  DarkMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export function TransactionInfoModal({
  children,
  source,
  destination,
  amount,
  currency,
}: {
  children: ReactNode;
  source: string;
  destination: string;
  amount: string;
  currency: string;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box w="full" rounded="full" onClick={onOpen}>
        {children}
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <DarkMode>
            <ModalHeader color="gray.100">Transaction Info</ModalHeader>
            <ModalCloseButton color="gray.400" />
            <ModalBody>
              <Table size="sm" borderColor="grey.400">
                <Tbody color="#fff">
                  <Tr>
                    <Th>From</Th>
                    <Td isNumeric>{source}</Td>
                  </Tr>
                  <Tr>
                    <Th>To</Th>
                    <Td isNumeric>{destination}</Td>
                  </Tr>
                  <Tr>
                    <Th>Amount</Th>
                    <Td isNumeric>
                      {amount} <Badge>{currency}</Badge>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} variant="outline" colorScheme="red">
                Close
              </Button>
            </ModalFooter>
          </DarkMode>
        </ModalContent>
      </Modal>
    </>
  );
}
