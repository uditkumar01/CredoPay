import {
  Button,
  DarkMode,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ButtonList } from "../../pages/DashBoard/Dashboard.types";

interface SidebarProps {
  title: string;
  buttonList: ButtonList[];
}

export function Sidebar({ title, buttonList }: SidebarProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <DarkMode>
      <Button
        colorScheme="teal"
        bg="brand.500"
        onClick={onOpen}
        variant="solid"
        minW="150px"
        mr={{ base: "1rem", md: "0" }}
      >
        Manage
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" color="brand.500">
            {title}
          </DrawerHeader>
          <DrawerBody p="0.5rem 0">
            <VStack align="stretch">
              {buttonList.map(({ component }) => component)}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </DarkMode>
  );
}
