import * as React from "react";
import { BankDetail } from "./BankDetail";
import { BillingInfo } from "./BillingInfo";
import { BillingPrice } from "./BillingPrice";
import { InvoiceInfo } from "./InvoiceInfo";
import { InvoiceTable } from "./InvoiceTable";
import { PriceDetail } from "./PriceDetail";
import { RecipientInfo } from "./RecipientInfo";
import { TaxDetail } from "./TaxDetail";
import {
  BankDetailType,
  BillingInfoType,
  InvoiceData,
  PriceDetailType,
  RecipientType,
  InvoiceInfoType,
} from "./types";

const getPriceDetail = (data: InvoiceData[]): PriceDetailType => {
  return data.reduce(
    (acc, cur) => ({
      tax10:
        cur.taxRate === 10
          ? acc.tax10 + cur.pricePerUnit * cur.quantity
          : acc.tax10,
      tax8:
        cur.taxRate === 8
          ? acc.tax8 + cur.pricePerUnit * cur.quantity
          : acc.tax8,
      tax10Total:
        cur.taxRate === 10
          ? acc.tax10Total +
            (cur.pricePerUnit * cur.quantity * cur.taxRate) / 100
          : acc.tax10Total,
      tax8Total:
        cur.taxRate === 8
          ? acc.tax8Total +
            (cur.pricePerUnit * cur.quantity * cur.taxRate) / 100
          : acc.tax8Total,
      totalWithoutTax: acc.totalWithoutTax + cur.pricePerUnit * cur.quantity,
      taxTotal:
        acc.taxTotal + (cur.pricePerUnit * cur.quantity * cur.taxRate) / 100,
      total:
        acc.total +
        (cur.pricePerUnit * cur.quantity * cur.taxRate) / 100 +
        cur.pricePerUnit * cur.quantity,
    }),
    {
      tax10: 0,
      tax8: 0,
      tax10Total: 0,
      tax8Total: 0,
      totalWithoutTax: 0,
      taxTotal: 0,
      total: 0,
    }
  );
};

type Props = {
  /**
   * format: YYYY-MM-DD
   **/
  issueDate: string;
  data: InvoiceData[];
  bankDetail: BankDetailType;
  billingInfo: BillingInfoType;
  recipientInfo: RecipientType;
  invoiceInfo: InvoiceInfoType;
};
export const Invoice = React.memo<Props>(
  ({
    issueDate,
    data,
    bankDetail,
    billingInfo,
    recipientInfo,
    invoiceInfo,
  }) => {
    const priceDetail = getPriceDetail(data);

    return (
      <html>
        <head>
          <title>請求書</title>
          <meta charSet="utf-8" />
          <style>
            {`* {
                box-sizing: border-box;
                font-family: sans-serif;
                padding: 0;
                margin: 0;
                }
              html {
                  -webkit-print-color-adjust: exact;
                }
              table {
                  border-collapse: collapse;
                  border-spacing: 0px;
                }
            `}
          </style>
        </head>
        <body style={styles.body}>
          <h1 style={styles.title}>請求書</h1>
          <div style={styles.rowEnd}>
            <InvoiceInfo
              date={issueDate}
              publishNumber={invoiceInfo.publishNumber}
              invoiceNumber={invoiceInfo.invoiceNumber}
            />
          </div>
          <div style={styles.row}>
            <BillingInfo info={billingInfo} />
            <RecipientInfo info={recipientInfo} />
          </div>
          <p>下記の通り、ご請求申し上げます。</p>
          <BillingPrice price={priceDetail.total} />
          <InvoiceTable issueDate={issueDate} data={data} />
          <div style={styles.rowBetween}>
            <TaxDetail detail={priceDetail} />
            <PriceDetail detail={priceDetail} />
          </div>
          <BankDetail detail={bankDetail} />

          {/* Add more content here */}
        </body>
      </html>
    );
  }
);
Invoice.displayName = "Invoice";

const styles = {
  body: {
    fontFamily: "sans-serif",
    letterSpacing: "0.05em",
    width: "794px",
    height: "1123px",
    margin: 0,
    paddingTop: 40,
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    gap: 20,
  },
  title: {
    fontSize: 24,
    letterSpacing: "0.3em",
    alignText: "center",
    alignSelf: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: 40,
  },
} as const;
