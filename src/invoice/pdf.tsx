import * as playwright from "playwright";
import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { Invoice } from "./Invoice";
import {
  mockBankDetail,
  mockBillingInfo,
  mockData,
  mockRecipient,
} from "./mockData";

(async () => {
  // Render the React component to an HTML string
  const htmlContent = ReactDOMServer.renderToString(
    React.createElement(Invoice, {
      data: mockData,
      bankDetail: mockBankDetail,
      recipientInfo: mockRecipient,
      billingInfo: mockBillingInfo,
    })
  );

  // Use Playwright to launch a browser and create a PDF
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: "output.pdf", format: "A4" });
  await browser.close();
})();
