import {
  Stack,
  Flex,
  Circle,
  Text,
  useColorModeValue,
  Heading,
  StackProps,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/all";

export interface ListItemProps extends StackProps {
  title: string;
  subTitle: string;
  isLastItem?: boolean;
  status?: string;
}
// function to get Icon JSX
const StatusIcon = ({ status }: { status: string }): JSX.Element => {
  switch (status) {
    case "complete":
      return <Icon as={FaCheck} color="green.500" />;
    case "pending":
      return <Icon as={Spinner} color="blue.500" />;
    default:
      return <Icon as={FaTimes} color="red.500" />;
  }
};

export const TimelineListItem = (props: ListItemProps): JSX.Element => {
  const { title, subTitle, isLastItem, status, children, ...stackProps } =
    props;

  return (
    <Stack as="li" direction="row" spacing="4" {...stackProps}>
      <Flex direction="column" alignItems="center" aria-hidden="true">
        <Circle
          bg="blackAlpha.500"
          size="12"
          borderWidth="4px"
          borderColor={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("white", "black")}
        >
          <StatusIcon status={status || ""} />
        </Circle>
        {!isLastItem && <Flex flex="1" borderRightWidth="1px" mb="-12" />}
      </Flex>
      <Stack spacing="4" pt="1" flex="1">
        <Flex direction="column">
          <Heading fontSize="md" fontWeight="semibold">
            {title}
          </Heading>
          <Text
            fontSize="xs"
            pt="2px"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {subTitle}
          </Text>
        </Flex>
        <Flex>{children}</Flex>
      </Stack>
    </Stack>
  );
};
