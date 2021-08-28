import {
  Box,
  Flex,
  HStack,
  SlideFade,
  useBoolean,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {
  FiPhoneCall,
  FiVideo,
  HiChevronDown,
  HiChatAlt,
  HiChartBar,
  HiPlay,
  HiMail,
} from "react-icons/all";
import { MenuItem, MenuBottomLink } from "..";

interface Link {
  title: string;
  description: string;
  icon: React.ReactElement;
}

export const links: Link[] = [
  {
    title: "Analytics",
    description:
      "Get a better understanding of where you traffic is coming from",
    icon: <HiChartBar />,
  },
  {
    title: "Messaging",
    description: "Control and orchestrate network calls in minutes",
    icon: <HiChatAlt />,
  },
  {
    title: "Video API",
    description: "Build High-Definition video applications with ease.",
    icon: <HiPlay />,
  },
  {
    title: "Envelop Email API",
    description: "Send, receive, and manage emails in one place",
    icon: <HiMail />,
  },
];

export const Menu = (): JSX.Element => {
  const [show, { toggle }] = useBoolean(true);
  return (
    <Box as="header" minH="560px" pos="relative">
      <Box maxW="7xl" px={{ base: "4", md: "6", lg: "8" }} py="6">
        <HStack
          as="button"
          onClick={toggle}
          fontWeight="semibold"
          color={mode("gray.600", "gray.400")}
        >
          <span>Submenu</span>
          <Box as={HiChevronDown} fontSize="lg" color="gray.500" />
        </HStack>
        <Box
          as={SlideFade}
          in={show}
          pos="absolute"
          top="16"
          bg={mode("white", "gray.700")}
          borderWidth="1px"
          pt="2"
          w="full"
          maxW="sm"
          rounded="lg"
          overflow="hidden"
          shadow="lg"
        >
          <Box as="ul" listStyleType="none" px="2" pb="2">
            {links.map((link, index) => (
              <Box as="li" key={index.toString()}>
                <MenuItem
                  icon={link.icon}
                  title={link.title}
                  description={link.description}
                />
              </Box>
            ))}
          </Box>
          <Flex
            borderTopWidth="1px"
            w="100%"
            fontWeight="semibold"
            color={mode("gray.600", "gray.400")}
          >
            <MenuBottomLink icon={<FiVideo />} borderEndWidth="1px">
              Watch Demo
            </MenuBottomLink>
            <MenuBottomLink icon={<FiPhoneCall />}>
              Contact Sales
            </MenuBottomLink>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
