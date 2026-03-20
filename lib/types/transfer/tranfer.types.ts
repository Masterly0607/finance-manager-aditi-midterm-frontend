export interface CreateTransferRequest {
  fromAccountId: number;
  toAccountId: number;
  note?: string;
  amount: number;
}

export interface TransferResponse {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  note?: string;
  amount: number;
  createdAt: string;
}
