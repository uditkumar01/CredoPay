import {
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { CryptoIndicator } from "..";
import useAuth from "../../context/AuthContext/AuthContext";
import { TotalBalances } from "../../context/AuthContext/AuthReducer.types";
import {
  useStaticData,
  Wallet,
  WalletBalance,
} from "../../context/StaticData/StaticData";
import { roundOff } from "../../utils/roundOff";

export interface CryptoStatCardProps {
  icon: React.ElementType;
  accentColor: string;
  data: {
    symbol: string;
    label: string;
    currency: string;
    value: number;
    change: {
      value: number;
      percent: number;
    };
  };
}

function format(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    currency: "USD",
  }).format(value);
}

export const CryptoStatCard = ({
  data,
  accentColor,
  icon,
}: CryptoStatCardProps): JSX.Element => {
  const { label, currency, change, symbol } = data;
  const isNegative = change.percent < 0;
  const {
    authState: { assets },
  } = useAuth();
  // get total balance of all wallets for all currencies

  return (
    <Box
      bg={mode("white", "gray.700")}
      px="6"
      py="4"
      shadow="base"
      rounded="lg"
    >
      <HStack>
        <Circle bg={accentColor} color="white" rounded="full" size="6">
          <Box as={icon} />
        </Circle>
        <Text fontWeight="medium" color={mode("gray.500", "gray.400")}>
          {label}
        </Text>
      </HStack>

      <Heading
        as="h4"
        size="lg"
        my="3"
        color="whiteAlpha.800"
        fontWeight="extrabold"
        d="flex"
        alignItems="center"
      >
        <Box
          as={MdAccountBalanceWallet}
          height="24px"
          color="cyan.600"
          mr={2}
        />
        {assets && format(assets[symbol as keyof TotalBalances] ?? 0)}
      </Heading>
      <Flex
        justify="space-between"
        align="center"
        fontWeight="medium"
        fontSize="sm"
      >
        <HStack spacing="0" color={mode("gray.500", "gray.400")}>
          <CryptoIndicator type={isNegative ? "down" : "up"} />
          <Text>
            {currency}
            {format(
              roundOff(change?.percent ? Number(change.percent) : 0, 1)
            )}{" "}
            ({isNegative ? "" : "+"}
            {roundOff(change?.percent ? Number(change.percent) : 0, 1)}%)
          </Text>
        </HStack>
        <Text color="gray.400">{symbol}</Text>
      </Flex>
    </Box>
  );
};
