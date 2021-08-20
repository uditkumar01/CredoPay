import { Flex, Heading, Image } from "@chakra-ui/react";

export function AssetContainer(): JSX.Element {
  return (
    <>
      <Flex
        background="black.800"
        width="97%"
        padding="1.3rem 1.5rem"
        borderRadius="5px"
        maxWidth="1100px"
        align="center"
        mt="0.6rem"
        justify="space-between"
      >
        <Flex align="center">
          <Flex
            height="40px"
            width="40px"
            justify="center"
            align="center"
            background="black.600"
            borderRadius="50%"
          >
            <Image src="/svgs/ethereum.svg" height="30" />
          </Flex>
          <Heading ml="1rem" color="brand.500" fontSize="1.6rem">
            ETH
          </Heading>
        </Flex>
        <Heading ml="1rem" color="whiteAlpha.900">
          0.145
        </Heading>
      </Flex>
    </>
  );
}
