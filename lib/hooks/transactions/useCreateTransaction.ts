import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { CreateTransactionRequest } from "@/lib/types/transactions/add-expense.types";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTxn: CreateTransactionRequest) => {
      const token = sessionStorage.getItem("ACCESS_TOKEN");

      const endpoint =
        newTxn.type === "INCOME" ? "/api/transactions/income" : "/api/transactions/expense";

      const body = {
        amount: newTxn.amount,
        note: newTxn.note,
        accountId: Number(newTxn.accountId),
        transactionDate: newTxn.transactionDate,
      };

      return api(
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
