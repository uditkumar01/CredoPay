import { Container, Heading, chakra, Text, Flex } from "@chakra-ui/react";

export function DemoSection(): JSX.Element {
  return (
    <Container my={10} w="full" maxW={"7xl"}>
      <Heading color="blue.200" textAlign="center" mb={6}>
        Watch how easy it is to use Credopay
        <chakra.span color="blue.500">.</chakra.span>
      </Heading>
      <Text textAlign="center" color="whiteAlpha.500" size="">
        Try playing the demo video below to see how easy it is to use Credopay
      </Text>
      <Flex
        id="watch-demo"
        justifyContent="center"
        align={"center"}
        w="full"
        height="80vw"
        maxH="800px"
        mt={20}
        mb={20}
        shadow="2xl"
        border={"5px solid #21337073"}
        borderRadius={"lg"}
        overflow="hidden"
      >
        <iframe
          title="Credopay Demo"
          src="https://www.loom.com/embed/6a83d0dc1ce54f7186c3780afaae3141"
          frameBorder="0"
          style={{
            width: "100%",
            height: "100%",
          }}
          allowFullScreen
        />
      </Flex>
    </Container>
  );
}
