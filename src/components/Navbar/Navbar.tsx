import {
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Box,
  Button,
  IconButton,
  VStack,
  CloseButton,
  useDisclosure,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/all";
import { Link } from "react-router-dom";

export function Navbar(): JSX.Element {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        zIndex="2"
        position="fixed"
        top="0"
        left="0"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          maxWidth="1500px"
        >
          <Flex>
            <chakra.a
              href="/"
              title="CredoPay"
              display="flex"
              alignItems="center"
            >
              <Image src="/svgs/logo.svg" height="30" />
              <VisuallyHidden>CredoPay</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              CredoPay
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            </HStack>
            <Link to="/create-wallet">
              <Button
                colorScheme="blue"
                bg="brand.500"
                _hover={{ bg: "brand.600" }}
                size="sm"
              >
                Create Wallet
              </Button>
            </Link>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Link to="/login">
                  <Button w="full" variant="ghost">
                    Login
                  </Button>
                </Link>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
      <Box height="72px" overflow="hidden" width="100%">
        .
      </Box>
    </>
  );
}
