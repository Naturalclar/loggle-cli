import * as React from "react";
import { PriceDetailType } from "./types";
type Props = {
  detail: PriceDetailType;
};

export const PriceDetail = React.memo<Props>(({ detail }) => {
  return (
    <table style={styles.container}>
      <tr>
        <th style={styles.header}>小計</th>
        <td style={styles.data}>￥{detail.totalWithoutTax.toLocaleString()}</td>
      </tr>
      <tr>
        <th style={styles.header}>消費税</th>
        <td style={styles.data}> ￥{detail.taxTotal.toLocaleString()}</td>
      </tr>
      <tr>
        <th style={styles.header}>合計</th>
        <td style={styles.data}> ￥{detail.total.toLocaleString()}</td>
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
    backgroundColor: "#dddddd",
    padding: 4,
    margin: 0,
  },
} as const;
