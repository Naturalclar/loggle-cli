import * as React from "react";
import { PriceDetailType } from "./types";
type Props = {
  detail: PriceDetailType;
};

export const TaxDetail = React.memo<Props>(({ detail }) => {
  return (
    <table style={styles.container}>
      <tr>
        <th style={styles.header}>税率区分</th>
        <th style={styles.header}>消費税</th>
        <th style={styles.header}>金額(税抜)</th>
      </tr>
      <tr>
        <td style={styles.data}> 10%対象</td>
        <td style={styles.data}> ￥{detail.tax10Total.toLocaleString()}</td>
        <td style={styles.data}> ￥{detail.tax10.toLocaleString()}</td>
      </tr>
      <tr>
        <td style={styles.data}> 8%対象</td>
        <td style={styles.data}> ￥{detail.tax8Total.toLocaleString()}</td>
        <td style={styles.data}> ￥{detail.tax8.toLocaleString()}</td>
      </tr>
    </table>
  );
});
const styles = {
  container: { width: "50%" },
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
