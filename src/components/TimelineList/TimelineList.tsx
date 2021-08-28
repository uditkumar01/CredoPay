import { Stack, StackProps } from "@chakra-ui/react";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useMemo,
} from "react";
import { ListItemProps } from "../TimelineListItem/TimelineListItem";

export const TimelineList = (props: StackProps): JSX.Element => {
  const { children, ...stackProps } = props;
  const items = useMemo(
    () =>
      Children.toArray(children)
        .filter<ReactElement<ListItemProps>>(isValidElement)
        .map((item, index, array) =>
          index + 1 === array.length
            ? cloneElement(item, { isLastItem: true })
            : item
        ),
    [children]
  );
  return (
    <Stack as="ul" {...stackProps}>
      {items}
    </Stack>
  );
};
