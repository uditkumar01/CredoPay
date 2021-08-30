import {
  Badge,
  Box,
  BoxProps,
  HStack,
  useColorModeValue,
  Flex,
  VStack,
  Button,
  Text,
  useToast,
  Link,
} from "@chakra-ui/react";
import { GoArrowRight } from "react-icons/all";
import useAuth from "../../context/AuthContext/AuthContext";
import { Transaction } from "../../context/HistoryData/HistoryData";

// function to get ether scan links for different crypto currencies
// const getEtherScanLink = (
//   transactionHash: string,
//   network = "ropsten",
//   currency = "ETH"
// ): string => {
//   switch (currency) {
//     case "ETH":
//       return `https://${network}.etherscan.io/tx/${transactionHash}`;
//     case "BTC":
//       return `https://${network}.blockexplorer.com/tx/${transactionHash}`;
//     default:
//       return "";
//   }
// };

export const TimelineBox = ({
  transactionHash,
  source,
  destination,
  amount,
  status,
}: Transaction): JSX.Element => {
  const toast = useToast();
  const { authState } = useAuth();
  const checkifNull = (
    value: string | number | null | undefined
  ): string | number => (!value ? "Ext Wallet" : value);

  const checkIfIdIsSame = (id: string | undefined): string => {
    if (!id) return "Ext Wallet";
    return authState.user?.walletId === id ? "You" : id;
  };

  const bg = useColorModeValue("gray.50", "gray.700");

  const isSpentFromWallet =
    source &&
    source.type === "wallet" &&
    authState.user?.walletId === source.id;

  return (
    <>
      {source && destination && amount && (
        <Box
          bg={bg}
          w="full"
          maxW="100vw"
          overflow="hidden"
          height="auto"
          rounded="xl"
          p="1.2rem"
        >
          <VStack spacing={5}>
            <Flex
              justify={{ base: "center", md: "space-between" }}
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "center", md: "flex-start" }}
              w="full"
            >
              <HStack h="full">
                <Badge
                  fontSize={{ base: "0.85em", md: "1em" }}
                  colorScheme="cyan"
                >
                  <Text maxW="110px" isTruncated>
                    {source.type === "wallet"
                      ? checkIfIdIsSame(source.id)
                      : checkifNull(source.address)}
                  </Text>
                </Badge>
                <Badge
                  as={GoArrowRight}
                  fontSize={{ base: "1em", md: "1.2em" }}
                  variant="ghost"
                />
                <Badge
                  fontSize={{ base: "0.85em", md: "1em" }}
                  colorScheme="blue"
                >
                  <Text maxW="110px" isTruncated>
                    {destination.type === "wallet"
                      ? checkIfIdIsSame(destination.id)
                      : checkifNull(destination.address)}
                  </Text>
                </Badge>
              </HStack>
              <Flex>
                <Text
                  as={Badge}
                  bg="transparent"
                  mt={{ base: "0.9rem", md: "0" }}
                  fontSize={{ base: "1.3em", md: "0.9em" }}
                  mr="2px"
                >
                  {source.type !== "blockchain" && status === "complete" && (
                    <>{isSpentFromWallet ? "- " : "+ "}</>
                  )}
                  {parseFloat(amount.amount).toFixed(2)}
                </Text>
                <Text
                  as={Badge}
                  mt={{ base: "0.9rem", md: "0" }}
                  fontSize={{ base: "1.3em", md: "0.9em" }}
                >
                  {amount.currency}
                </Text>
              </Flex>
            </Flex>
            {transactionHash && (
              <Flex
                w="full"
                justifyContent={{ base: "center", lg: "flex-end" }}
                flexDir={{ base: "column", lg: "row" }}
              >
                <Button
                  m="0.5rem"
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => {
                    navigator.clipboard.writeText(transactionHash);
                    toast({
                      title: "Copied Successfully !!!",
                      description:
                        "You've successfully copied the transaction hash",
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                  }}
                >
                  Copy transaction hash
                </Button>
                <Button
                  as={Link}
                  m="0.5rem"
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  href={`https://ropsten.etherscan.io/tx/${transactionHash}`}
                  isExternal
                >
                  View on Etherscan
                </Button>
              </Flex>
            )}
          </VStack>
        </Box>
      )}
    </>
  );
};
