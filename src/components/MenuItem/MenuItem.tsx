import {
  Box,
  HStack,
  Square,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

interface MenuItemProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const MenuItem = ({
  icon,
  title,
  description,
  children,
}: MenuItemProps): JSX.Element => {
  return (
    <HStack
      as="button"
      spacing="4"
      p="3"
      rounded="md"
      className="group"
      transition="0.2s background"
      _hover={{ bg: mode("gray.50", "gray.600") }}
      _focus={{
        outline: "1px dashed",
        outlineColor: "blue.300",
        bg: mode("blue.50", "gray.600"),
      }}
    >
      <Square
        size="12"
        rounded="md"
        bg="blue.500"
        color="white"
        fontSize="1.75rem"
      >
        {icon}
      </Square>
      <Box as="dl">
        <Text
          as="dt"
          fontWeight="semibold"
          transition="0.2s all"
          _groupHover={{ color: mode("blue.500", "inherit") }}
        >
          {title}
        </Text>
        <Text
          as="dt"
          fontSize="sm"
          color={mode("gray.600", "gray.400")}
          fontWeight="medium"
        >
          {description}
        </Text>
        {children}
      </Box>
    </HStack>
  );
};
