import {
  BankDetailType,
  BillingInfoType,
  InvoiceData,
  InvoiceInfoType,
  RecipientType,
} from "./types";
export const mockBillingInfo: BillingInfoType = {
  name: "株式会社ゴエモン",
  postalCode: "987-6543",
  address: "東京都目黒区青葉台2-5-8",
};
export const mockRecipient: RecipientType = {
  name: "ヤマダタロウ",
  postalCode: "123-4567",
  address: "東京都新宿区西新宿2-8-1 新宿住友ビルディング 18F",
};
export const mockData: InvoiceData[] = [
  {
    name: "案件Alpha",
    quantity: 50,
    unit: "時間",
    pricePerUnit: 5000,
    taxRate: 10,
  },
  {
    name: "案件Beta",
    quantity: 30,
    unit: "時間",
    pricePerUnit: 7000,
    taxRate: 8,
  },
];
export const mockBankDetail: BankDetailType = {
  bankName: "三菱UFJ銀行",
  branchName: "ABC支店",
  accountType: "普通",
  accountNumber: "1234567",
  accountName: "ヤマダタロウ",
  accountNameKana: "ヤマダタロウ",
};
export const mockInvoiceInfo: InvoiceInfoType = {
  publishNumber: "30",
  invoiceNumber: "T1234567890",
};
