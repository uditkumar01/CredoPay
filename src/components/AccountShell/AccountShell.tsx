import {
  Avatar,
  Box,
  Button,
  DarkMode,
  Flex,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import {
  BiHome,
  BiTransferAlt,
  BiNews,
  HiOutlineLogout,
} from "react-icons/all";
import {
  Logo,
  ScrollArea,
  MobileMenuButton,
  NavBreadcrumb,
  NavGroup,
  NavItem,
  UserInfo,
} from "..";
import useAuth from "../../context/AuthContext/AuthContext";
import { useMobileMenuState } from "../../custom-hooks/useMobileMenuState";
import { AccountModal } from "../AccountModal/AccountModal";
import { AddFunds } from "../AddFunds/AddFunds";
import { CryptoStats } from "../CryptoStats/CryptoStats";
import { MakeTransfer } from "../MakeTransfer/MakeTransfer";
import { PayModel } from "../PayModel/PayModel";
import { Timeline } from "../Timeline/Timeline";

export const AccountShell = (): JSX.Element => {
  const { isOpen, toggle } = useMobileMenuState();
  const { authState, signOut } = useAuth();
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
                  <NavItem active icon={<BiHome />} label="Dashboard" />
                </Stack>
                <NavGroup label="Your Business">
                  <PayModel navBtn />
                  <AddFunds navBtn />
                  <MakeTransfer navBtn />
                </NavGroup>

                <NavGroup label="Your Account">
                  <AccountModal navBtn />
                  <Button
                    variant="unstyled"
                    textAlign="left"
                    fontSize="0.85rem"
                    fontWeight="light"
                    _focus={{
                      outline: "none",
                    }}
                    onClick={signOut}
                  >
                    <NavItem icon={<HiOutlineLogout />} label="Logout" />
                  </Button>
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
                  src={authState?.user?.photoURL || ""}
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
