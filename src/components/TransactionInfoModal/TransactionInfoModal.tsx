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
  Thead,
  Tr,
  Badge,
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
      <Button w="full" rounded="full" onClick={onOpen}>
        {children}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table size="sm" borderColor="grey.400">
              <Tbody>
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
                    {amount}
                    <Badge>{currency}</Badge>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
