import * as React from "react";
import { BillingInfoType } from "./types";
type Props = {
  info: BillingInfoType;
};
export const BillingInfo = React.memo<Props>(({ info }) => {
  return (
    <div style={styles.container}>
      <h2>{info.name} 御中</h2>
      <p>〒{info.postalCode}</p>
      <p>{info.address}</p>
    </div>
  );
});

const styles = {
  container: {},
} as const;
BillingInfo.displayName = "BillingInfo";
