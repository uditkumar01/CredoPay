import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
} from "@chakra-ui/react";
import * as React from "react";
import { HiChevronRight } from "react-icons/hi";

export const NavBreadcrumb = (props: BreadcrumbProps): JSX.Element => (
  <Breadcrumb
    fontSize="sm"
    {...props}
    separator={
      <Box
        as={HiChevronRight}
        color="gray.400"
        fontSize="md"
        top="2px"
        pos="relative"
      />
    }
  >
    <BreadcrumbItem color="black.200" fontWeight="600" fontSize="lg">
      <BreadcrumbLink>Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);
