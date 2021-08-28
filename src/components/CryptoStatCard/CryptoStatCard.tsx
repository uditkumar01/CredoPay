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

export interface TotalBalances {
  USDC: number;
  BTC: number;
  ETH: number;
  SOL: number;
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
  const { userWallets } = useStaticData();
  // get total balance of all wallets for all currencies

  let totalBalances: TotalBalances | null = null;
  if (userWallets && userWallets.length > 0) {
    totalBalances = userWallets.reduce(
      (acc: TotalBalances, wallet: Wallet) => {
        wallet.balances.forEach((balance: WalletBalance) => {
          acc[balance.currency as keyof TotalBalances] += Number(
            balance.amount
          );
        });
        return acc;
      },
      {
        USDC: 0,
        BTC: 0,
        ETH: 0,
        SOL: 0,
      } as TotalBalances
    );
  }

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
        {totalBalances &&
          format(totalBalances[symbol as keyof TotalBalances] ?? 0)}
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
              roundOff(change?.percent ? Number(change.percent) : 0, 2)
            )}{" "}
            ({isNegative ? "" : "+"}
            {roundOff(change?.percent ? Number(change.percent) : 0, 2)}%)
          </Text>
        </HStack>
        <Text color="gray.400">{symbol}</Text>
      </Flex>
    </Box>
  );
};
