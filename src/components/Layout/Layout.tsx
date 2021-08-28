import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
  noNavbar?: boolean;
}

export function Layout({ children, noNavbar }: LayoutProps): JSX.Element {
  return (
    <Flex flexDirection="column" bg="black.1000">
      {!noNavbar && <Navbar />}
      {children}
    </Flex>
  );
}
