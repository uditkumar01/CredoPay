import { Box, Button, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import { AssetContainer } from "../../components/AssetContainer/AssetContainer";
import { Layout } from "../../components/Layout/Layout";
import { PayModel } from "../../components/PayModel/PayModel";

export default function DashBoard(): JSX.Element {
  return (
    <Layout>
      <Flex flexDir="column" align="center" width="100%">
        <Flex
          background="black.800"
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
                textAlign={{ base: "center", md: "left" }}
              >
                200.00
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
            <Button variant="solid" minW="150px" mr={{ base: "1rem", md: "0" }}>
              Add funds
            </Button>
            <PayModel />
          </VStack>
        </Flex>
        <AssetContainer />
        <AssetContainer />
      </Flex>
    </Layout>
  );
}
