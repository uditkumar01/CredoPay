import {
  Avatar,
  Box,
  DarkMode,
  Flex,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import {
  BiHome,
  BiCommentAdd,
  BiCreditCard,
  BiUserCircle,
  BiWallet,
  BiRedo,
  BiNews,
  BiEnvelope,
  BiPurchaseTagAlt,
  BiRecycle,
} from "react-icons/bi";
import {
  Logo,
  ScrollArea,
  MobileMenuButton,
  NavBreadcrumb,
  NavGroup,
  NavItem,
  UserInfo,
} from "..";
import { useMobileMenuState } from "../../custom-hooks/useMobileMenuState";
import { CryptoStats } from "../CryptoStats/CryptoStats";
import { Timeline } from "../Timeline/Timeline";

export const AccountShell = (): JSX.Element => {
  const { isOpen, toggle } = useMobileMenuState();
  console.log(isOpen, toggle);
  return (
    <DarkMode>
      <Flex
        height="100vh"
        bg="#171923"
        overflow="hidden"
        sx={{ "--sidebar-width": "16rem" }}
      >
        <Box
          as="nav"
          display="block"
          flex="1"
          width="var(--sidebar-width)"
          left="0"
          py="5"
          px="3"
          color="gray.200"
          position="fixed"
        >
          <Box fontSize="sm" lineHeight="tall">
            <Box
              as="a"
              href="#"
              p="3"
              display="block"
              transition="background 0.1s"
              rounded="xl"
              _hover={{ bg: "whiteAlpha.200" }}
              whiteSpace="nowrap"
            >
              <Logo name="CredoPay" email="contact@credopay.com" />
            </Box>
            <ScrollArea pt="5" pb="6">
              <Stack spacing="8" flex="1" overflow="auto" pt="8">
                <Stack spacing="1">
                  <NavItem active icon={<BiHome />} label="Get Started" />
                  <NavItem icon={<BiCommentAdd />} label="Inbox" />
                </Stack>
                <NavGroup label="Your Business">
                  <NavItem icon={<BiCreditCard />} label="Transactions" />
                  <NavItem icon={<BiUserCircle />} label="Customers" />
                  <NavItem icon={<BiWallet />} label="Income" />
                  <NavItem icon={<BiRedo />} label="Transfer" />
                </NavGroup>

                <NavGroup label="Seller Tools">
                  <NavItem icon={<BiNews />} label="Payment Pages" />
                  <NavItem icon={<BiEnvelope />} label="Invoices" />
                  <NavItem icon={<BiPurchaseTagAlt />} label="Plans" />
                  <NavItem icon={<BiRecycle />} label="Subsription" />
                </NavGroup>
              </Stack>
            </ScrollArea>
          </Box>
        </Box>
        <Box
          flex="1"
          marginStart={{ md: "var(--sidebar-width)" }}
          position="relative"
          left={isOpen ? "var(--sidebar-width)" : "0"}
          transition="left 0.2s"
        >
          <Box maxW="2560px" bg="black.900" height="100%" pb="6">
            <Flex w="100%" direction="column" height="full">
              <Flex
                w="full"
                py="4"
                justify="space-between"
                align="center"
                px="10"
              >
                <Flex align="center" minH="8">
                  <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                  <NavBreadcrumb />
                </Flex>
                <Avatar
                  name="Dan Abrahmov"
                  size="sm"
                  src="https://bit.ly/dan-abramov"
                />
              </Flex>
              <Flex
                w="full"
                direction="column"
                alignItems="center"
                flex="1"
                overflow="auto"
                px={["0", "10"]}
                pt="8"
              >
                <UserInfo />
                <CryptoStats />
                <Timeline />
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </DarkMode>
  );
};
