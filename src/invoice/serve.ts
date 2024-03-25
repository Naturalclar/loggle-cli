import * as React from "react";
import * as ReactDomServer from "react-dom/server";
import * as http from "node:http";
import { Invoice } from "./Invoice";
import {
  mockBankDetail,
  mockBillingInfo,
  mockData,
  mockRecipient,
} from "./mockData";

const htmlContent = ReactDomServer.renderToString(
  React.createElement(Invoice, {
    data: mockData,
    bankDetail: mockBankDetail,
    recipientInfo: mockRecipient,
    billingInfo: mockBillingInfo,
  })
);

http
  .createServer((_, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  })
  .listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
