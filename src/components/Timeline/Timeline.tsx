import { Box } from "@chakra-ui/react";
import moment from "moment";
import { TimelineBox, TimelineList, TimelineListItem } from "..";
import useAuth from "../../context/AuthContext/AuthContext";
import { useHistoryData } from "../../context/HistoryData/HistoryData";
import { removeUnderscores } from "../../utils/removeUnderscores";

export const Timeline = ({ maxW }: { maxW?: string }): JSX.Element => {
  const {
    historyDataState: { transactionsHistory },
  } = useHistoryData();
  const { authState } = useAuth();
  let sortedTransactions = transactionsHistory;
  if (transactionsHistory && authState?.user?.transactions) {
    sortedTransactions = [
      ...transactionsHistory,
      ...authState?.user?.transactions,
    ];
    sortedTransactions.sort((a: any, b: any) => {
      return (new Date(b.createDate) as any) - (new Date(a.createDate) as any);
    });
  }
  return (
    <Box as="section" w="full" maxW="100vw">
      <Box
        maxW={maxW || "1200px"}
        w="full"
        mx="auto"
        p={{ base: "4", md: "8" }}
      >
        <TimelineList spacing="12">
          {transactionsHistory &&
            sortedTransactions?.map((transaction) => {
              let transactionTitle = "Transaction successful";
              if (transaction?.status?.toLowerCase() === "pending") {
                transactionTitle = "Transaction in process";
              } else if (transaction?.status?.toLowerCase() === "failed") {
                transactionTitle = removeUnderscores(
                  transaction?.errorCode || ""
                );
              }

              return (
                <TimelineListItem
                  key={transaction.id}
                  title={transactionTitle}
                  subTitle={moment(transaction.createDate).format("LLL")}
                  status={transaction?.status}
                >
                  <TimelineBox key={`${transaction.id}box`} {...transaction} />
                </TimelineListItem>
              );
            })}
        </TimelineList>
      </Box>
    </Box>
  );
};
