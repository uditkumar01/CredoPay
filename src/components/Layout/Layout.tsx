import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Flex flexDirection="column" customColor="red">
      <Navbar />
      {children}
    </Flex>
  );
}
