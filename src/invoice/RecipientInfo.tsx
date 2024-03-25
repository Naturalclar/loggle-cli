import * as React from "react";
import { RecipientType } from "./types";
type Props = {
  info: RecipientType;
};
export const RecipientInfo = React.memo<Props>(({ info }) => {
  return (
    <div style={styles.container}>
      <h3>{info.name}</h3>
      <p>〒{info.postalCode}</p>
      <p>{info.address}</p>
    </div>
  );
});

const styles = {
  container: {},
} as const;
RecipientInfo.displayName = "RecipientInfo";
