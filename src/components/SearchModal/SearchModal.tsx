import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Center,
  Heading,
  Stack,
  Image,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import useAuth from "../../context/AuthContext/AuthContext";
import { AuthUserType } from "../../context/AuthContext/AuthContext.types";
import { useStaticData } from "../../context/StaticData/StaticData";
import { formatFullName } from "../../utils/formatName";

interface SearchResultProps extends AuthUserType {
  onClick: (value: string) => void;
}

function SearchResult({
  photoURL,
  displayName,
  credTag,
  walletId,
  onClick,
}: SearchResultProps): JSX.Element {
  return (
    <Button
      variant="unstyled"
      w="full"
      height="full"
      onClick={() => onClick(walletId)}
    >
      <HStack
        spacing={3}
        dir="row"
        border="none"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="black.600"
        p="0.7rem 1rem"
        _hover={{
          bg: "black.800",
          cursor: "pointer",
          borderColor: "black.800",
        }}
      >
        <Image
          src={photoURL}
          alt={displayName}
          w="50px"
          h="50px"
          rounded="md"
        />
        <Stack spacing={1}>
          <Heading fontSize="1.1rem">
            {formatFullName(displayName || "")}
          </Heading>
          <Badge w="min-content" colorScheme="brand" textTransform="none">
            {credTag}
          </Badge>
        </Stack>
      </HStack>
    </Button>
  );
}

export function SearchModal({
  setValue,
  addressValue,
}: {
  setValue: Dispatch<SetStateAction<string>>;
  addressValue: string;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { allUsers } = useStaticData();
  const [search, setSearch] = useState("");
  const { authState } = useAuth();

  function handleSetValue(value: string): void {
    setValue(value);
    onClose();
  }
  console.log(search);

  const filteredUsersFromQuery =
    allUsers && search.length > 0
      ? allUsers.filter((user) => {
          return (
            user?.credTag !== authState.user?.credTag &&
            user?.credTag?.includes(search)
          );
        })
      : [];

  return (
    <>
      <Box
        as={Button}
        w="full"
        p="0.5rem 1rem"
        rounded="md"
        border="1px solid"
        borderColor="gray.600"
        color="whiteAlpha.700"
        variant="unstyled"
        textAlign="left"
        onClick={onOpen}
      >
        {addressValue || "Reciever's Wallet Id"}
      </Box>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <BiSearch />
            </InputLeftElement>
            <Input
              placeholder="Type user's CredTag"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <ModalBody p="1rem 0">
            {filteredUsersFromQuery.length < 1 ? (
              <Center p="2rem" color="whiteAlpha.600">
                <Stack align="center" justify="center" spacing={4}>
                  <Heading fontSize="4rem">
                    <BiSearch />
                  </Heading>
                  <Heading fontSize="2rem">&nbsp;&nbsp;Search Users</Heading>
                </Stack>
              </Center>
            ) : (
              filteredUsersFromQuery.map((userItem) => {
                return (
                  <SearchResult
                    key={userItem.uid}
                    onClick={handleSetValue}
                    {...userItem}
                  />
                );
              })
            )}
          </ModalBody>
          <ModalFooter> </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
