import { DarkMode, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    // <DarkMode>
    <Flex flexDirection="column" bg="black.1000">
      <Navbar />
      {children}
    </Flex>
    // </DarkMode>
  );
}
