import * as React from "react";
import { InvoiceData } from "./types";
type Props = {
  data: InvoiceData[];
};

export const InvoiceTable = React.memo<Props>(({ data }) => {
  return (
    <table style={styles.container}>
      <tr>
        <th style={styles.header}>日付</th>
        <th style={styles.header}>内容</th>
        <th style={styles.header}>数量</th>
        <th style={styles.header}>単位</th>
        <th style={styles.header}>単価(税抜)</th>
        <th style={styles.header}>税率</th>
        <th style={styles.header}>金額(税抜)</th>
      </tr>
      {data.map((d, i) => (
        <tr key={i}>
          <td style={styles.dataCenter}>{d.date}</td>
          <td style={styles.dataLeft}>{d.name}</td>
          <td style={styles.data}>{d.quantity}</td>
          <td style={styles.data}>{d.unit}</td>
          <td style={styles.data}>￥{d.pricePerUnit.toLocaleString()}</td>
          <td style={styles.data}>{d.taxRate}%</td>
          <td style={styles.data}>
            ￥{(d.pricePerUnit * d.quantity).toLocaleString()}
          </td>
        </tr>
      ))}
      {[...Array(Math.max(0, 5 - data.length))].map((_, i) => (
        <DummyRow key={i} />
      ))}
    </table>
  );
});

const DummyRow = () => (
  <tr style={styles.dummyHeight}>
    <td style={styles.dataCenter}></td>
    <td style={styles.dataLeft}></td>
    <td style={styles.data}></td>
    <td style={styles.data}></td>
    <td style={styles.data}></td>
    <td style={styles.data}></td>
    <td style={styles.data}></td>
  </tr>
);
const styles = {
  container: { width: "100%" },
  dummyHeight: { height: 30 },
  data: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 4,
    margin: 0,
    textAlign: "right",
  },
  dataCenter: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 4,
    margin: 0,
    textAlign: "center",
  },
  dataLeft: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 4,
    margin: 0,
    textAlign: "left",
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
