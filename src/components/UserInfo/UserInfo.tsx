import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useStaticData,
  Wallet,
  WalletBalance,
} from "../../context/StaticData/StaticData";
import { AddFunds } from "../AddFunds/AddFunds";
import { TotalBalances } from "../CryptoStatCard/CryptoStatCard";
import { PayModel } from "../PayModel/PayModel";

interface DescriptionProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

const Description = (props: DescriptionProps): JSX.Element => {
  const { title, children, ...rest } = props;
  return (
    <Stack as="dl" spacing="1" {...rest}>
      <Text
        as="dt"
        fontWeight="bold"
        fontSize="xs"
        casing="uppercase"
        color="gray.500"
        whiteSpace="nowrap"
      >
        {title}
      </Text>
      <Text fontSize="sm" fontWeight="medium">
        {children}
      </Text>
    </Stack>
  );
};

export const UserInfo = (): JSX.Element => {
  const { userWallets, cryptoData } = useStaticData();
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

  let totalBalance = 0;
  if (totalBalances) {
    // calculate total balance and round to 2 decimal places
    totalBalance = cryptoData.reduce((acc: number, currency) => {
      const tot =
        acc +
        (totalBalances
          ? totalBalances[currency.symbol as keyof TotalBalances] *
            currency.value
          : 0);
      return tot;
    }, 0);

    totalBalance = Math.round(totalBalance * 100) / 100;
  }
  return (
    <Flex
      bgImage="/images/cardImage.webp"
      bgAttachment="fixed"
      width="97%"
      padding="1.3rem 1.5rem"
      margin="1rem 0rem"
      mt="4rem"
      borderRadius="5px"
      maxWidth="1100px"
      align="center"
      justify={{ base: "center", md: "space-between" }}
      flexDir={{ base: "column", md: "row" }}
    >
      <Box mb={{ base: "2rem", md: "0" }}>
        <Text
          color="brand.500"
          fontSize="1.2rem"
          fontWeight="600"
          marginBottom="0.5rem"
          textAlign={{ base: "center", md: "left" }}
        >
          Current Balance
        </Text>
        <Flex>
          <Text
            fontSize="1.6rem"
            marginRight="0.3rem"
            color="black.100"
            fontWeight="600"
          >
            $
          </Text>
          <Heading
            fontSize="2.6em"
            color="whiteAlpha.900"
            textAlign={{ base: "center", md: "left" }}
          >
            {!totalBalance ? "0.00" : totalBalance.toFixed(2)}
          </Heading>
        </Flex>
      </Box>
      <VStack
        spacing={{ base: 0, md: 3 }}
        mr={1}
        color="brand.500"
        d="flex"
        flexDir={{ base: "row", md: "column" }}
      >
        <PayModel
          btnStyles={{
            variant: "outline",
            minW: ["120px", "150px"],
            fontSize: ["14px", "16px"],
            m: "0 0.5rem",
          }}
        />
        <AddFunds
          btnStyles={{
            variant: "outline",
            fontSize: ["14px", "16px"],
            minW: ["120px", "150px"],
            m: "0 0.5rem",
          }}
        />
      </VStack>
    </Flex>
  );
};
