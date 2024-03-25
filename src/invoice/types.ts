export type InvoiceData = {
  date: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  taxRate: number;
};

// TODO: param名整理する
export type PriceDetailType = {
  // 10%対象の金額(税抜)
  tax10: number;
  // 8%対象の金額(税抜)
  tax8: number;
  // 10%対象の消費税
  tax10Total: number;
  // 8%対象の消費税
  tax8Total: number;
  // 税抜合計
  totalWithoutTax: number;
  // 消費税合計
  taxTotal: number;
  // 合計
  total: number;
};

export type BillingInfoType = {
  name: string;
  postalCode: string;
  address: string;
};
export type RecipientType = {
  name: string;
  postalCode: string;
  address: string;
};

export type BankDetailType = {
  bankName: string;
  branchName: string;
  accountType: string;
  accountNumber: string;
  accountName: string;
  accountNameKana: string;
};
