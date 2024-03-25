import * as React from "react";
import { BankDetailType } from "./types";
type Props = {
  detail: BankDetailType;
};

export const BankDetail = React.memo<Props>(({ detail }) => {
  return (
    <table style={styles.container}>
      <tr>
        <th colSpan={2} style={styles.header}>
          振込先
        </th>
      </tr>
      <tr>
        <th style={styles.header}>銀行名</th>
        <td style={styles.data}>{detail.bankName}</td>
      </tr>
      <tr>
        <th style={styles.header}>支店名</th>
        <td style={styles.data}> {detail.branchName}</td>
      </tr>
      <tr>
        <th style={styles.header}>口座種別</th>
        <td style={styles.data}> {detail.accountType}</td>
      </tr>
      <tr>
        <th style={styles.header}>口座番号</th>
        <td style={styles.data}> {detail.accountNumber}</td>
      </tr>
      <tr>
        <th style={styles.header}>口座名義</th>
        <td style={styles.data}> {detail.accountName}</td>
      </tr>
      <tr>
        <th style={styles.header}>フリガナ</th>
        <td style={styles.data}> {detail.accountNameKana}</td>
      </tr>
    </table>
  );
});
const styles = {
  container: { width: "30%" },
  data: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 4,
    margin: 0,
    textAlign: "right",
  },
  header: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "gray",
    padding: 4,
    margin: 0,
  },
} as const;
