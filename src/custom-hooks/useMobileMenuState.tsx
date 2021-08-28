import { useBoolean, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";

export interface UseMobileMenuState {
  on: () => void;
  off: () => void;
  toggle: () => void;
  isOpen: boolean;
}

export const useMobileMenuState = (): UseMobileMenuState => {
  const [isMenuOpen, actions] = useBoolean();
  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */

  const isMobileBreakpoint = useBreakpointValue({
    base: true,
    lg: false,
  });
  useEffect(() => {
    if (!isMobileBreakpoint) {
      actions.off();
    }
  }, [isMobileBreakpoint, actions]);
  return {
    isOpen: isMenuOpen,
    ...actions,
  };
};
