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
import useAuth from "../../context/AuthContext/AuthContext";
import { AddFunds } from "../AddFunds/AddFunds";
import { PayModel } from "../PayModel/PayModel";

interface DescriptionProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

export const UserInfo = (): JSX.Element => {
  const {
    authState: { balance },
  } = useAuth();
  return (
    <Flex
      bgImage="linear-gradient(to bottom, #073892 0%, #07549267 100%)"
      // bgAttachment="fixed"
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
            {!balance ? "0.00" : balance.toFixed(2)}
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
