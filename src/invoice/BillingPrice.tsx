import * as React from "react";
type Props = {
  price: number;
};

export const BillingPrice = React.memo<Props>(({ price }) => {
  return (
    <table style={styles.container}>
      <tr>
        <th style={styles.header}>ご請求金額(税込)</th>
      </tr>
      <tr>
        <td style={styles.data}> ￥{price.toLocaleString()}</td>
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
