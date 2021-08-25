import { Box, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import { CreateCardModal } from "../../components/CreateCardModal/CreateCardModal";
import { AssetContainer } from "../../components/AssetContainer/AssetContainer";
import { Layout } from "../../components/Layout/Layout";
import { PayModel } from "../../components/PayModel/PayModel";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ButtonList } from "./Dashboard.types";
import { MakeTransfer } from "../../components";

export default function DashBoard(): JSX.Element {
  const buttonList: ButtonList[] = [
    {
      component: (
        <>
          <CreateCardModal />
        </>
      ),
    },
    {
      component: (
        <>
          <MakeTransfer />
        </>
      ),
    },
  ];

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
                color="whiteAlpha.900"
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
            <Sidebar title="Manage Account" buttonList={buttonList} />
            <PayModel />
          </VStack>
        </Flex>
        <AssetContainer />
        <AssetContainer />
      </Flex>
    </Layout>
  );
}
