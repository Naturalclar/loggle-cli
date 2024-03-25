import { memo } from "react";
type Props = {
  // 発行日
  // ex： YYYY-MM-DD
  date: string;
  // 請求番号
  // ex: 1000
  publishNumber: number;
  // 登録番号
  // ex: T1234567890
  invoiceNumber: string;
};
export const InvoiceInfo = memo<Props>(
  ({ date, publishNumber, invoiceNumber }) => {
    return (
      <div style={styles.container}>
        <div style={styles.row}>
          <p>発行日：</p>
          <p>{date}</p>
        </div>
        <div style={styles.row}>
          <p>請求番号：</p>
          <p>{publishNumber}</p>
        </div>
        <div style={styles.row}>
          <p>登録番号：</p>
          <p>{invoiceNumber}</p>
        </div>
      </div>
    );
  }
);

const styles = {
  container: { width: 250 },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

InvoiceInfo.displayName = "InvoiceInfo";
