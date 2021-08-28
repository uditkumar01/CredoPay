import {
  Box,
  HStack,
  Text,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";

interface LogoProps {
  name: string;
  image?: string;
  email: string;
}

export const Logo = (props: LogoProps): JSX.Element => {
  const { name, image, email } = props;
  return (
    <HStack display="inline-flex">
      <Image src="/svgs/logo.svg" height="30" />
      <Box lineHeight="1" ml="2px">
        <Text fontWeight="semibold">{name}</Text>
        <Text fontSize="xs" mt="1" color={mode("whiteAlpha.700", "gray.400")}>
          {email}
        </Text>
      </Box>
    </HStack>
  );
};
