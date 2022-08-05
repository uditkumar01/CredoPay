import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";

// Replace test data with your own
const features = [
  {
    title: "Send",
    text: "Pay anyone instantly with CredoPay",
  },
  {
    title: "Spend",
    text: "Easily scan UPI QR code and pay anywhere",
  },
  {
    title: "Grow",
    text: "Get upto 15% APR on your stablecoin deposits",
  },
  {
    title: "Invest",
    text: "Invest in Bitcoin, Ethereum and other 100+ cryptocurrencies",
  },
];

export function FeaturesSection(): JSX.Element {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading color="whiteAlpha.900" fontSize={"5xl"}>
          Features & Benefits
        </Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          CredoPay is a decentralized payment platform that enables anyone to
        </Text>
      </Stack>

      <Container maxW={"7xl"} my={40}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, index) => (
            <HStack key={`feature-item-${feature.title}`} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={AiOutlineCheck} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600} color="whiteAlpha.800">
                  {feature.title}
                </Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
