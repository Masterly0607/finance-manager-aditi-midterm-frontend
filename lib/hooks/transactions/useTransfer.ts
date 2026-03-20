import { api } from "@/lib/api/client";
import { CreateTransferRequest, TransferResponse } from "@/lib/types/transfer/tranfer.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTransfer = (data: CreateTransferRequest) => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;

  return api<TransferResponse>(
    "/api/transfers",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );
};

export const useTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
