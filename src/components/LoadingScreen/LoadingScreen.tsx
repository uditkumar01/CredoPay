import { Center, Spinner } from "@chakra-ui/react";

export function LoadingScreen(): JSX.Element {
  return (
    <Center bg="black.900" w="100vw" h="100vh" pos="absolute" top="0" left="0">
      <Spinner />
    </Center>
  );
}
