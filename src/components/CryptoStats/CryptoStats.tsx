import { Box, SimpleGrid, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import { FaBitcoin, FaDollarSign, FaEthereum } from "react-icons/fa";
import { CryptoStatCard } from "..";
import { useStaticData } from "../../context/StaticData/StaticData";

type Icons = Record<string, { icon: React.ElementType; color: string }>;

export const icons: Icons = {
  BTC: {
    icon: FaBitcoin,
    color: "#f2a900",
  },
  USDC: {
    icon: FaDollarSign,
    color: "#ee8c28",
  },
  ETH: {
    icon: FaEthereum,
    color: "#3c3c3d",
  },
};

export const CryptoStats = (): JSX.Element => {
  const { cryptoData } = useStaticData();
  return (
    <Box as="section" p="2.5rem 0" w="100%" maxW="1100px">
      <Box px={{ base: "6", md: "8" }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
          {cryptoData &&
            cryptoData.map((stat, index) => {
              const { icon, color: accentColor } = icons[stat.symbol];
              return (
                <CryptoStatCard
                  key={index.toString()}
                  icon={icon}
                  accentColor={accentColor}
                  data={stat}
                />
              );
            })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
