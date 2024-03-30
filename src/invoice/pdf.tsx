import * as playwright from "playwright";
import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { Invoice } from "./Invoice";
import { mockData } from "./mockData";
import dayjs from "dayjs";
import * as config from "../../config.json";

(async () => {
  const issueDate = dayjs().endOf("month").format("YYYY-MM-DD");

  // Render the React component to an HTML string
  const htmlContent = ReactDOMServer.renderToString(
    React.createElement(Invoice, {
      issueDate,
      data: mockData,
      bankDetail: config.bankDetail,
      recipientInfo: config.recipientInfo,
      billingInfo: config.billingInfo,
      invoiceInfo: config.invoiceInfo,
    })
  );

  // Use Playwright to launch a browser and create a PDF
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.pdf({ path: "output.pdf", format: "A4" });
  await browser.close();
})();
