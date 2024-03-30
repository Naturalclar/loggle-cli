import * as playwright from "playwright";
import * as ReactDOMServer from "react-dom/server";
import * as React from "react";
import { Invoice } from "./Invoice";
import { mockData } from "./mockData";
import dayjs from "dayjs";
import * as config from "../../config.json";
import { Loggle } from "../loggle";
import { getTotalAmount } from "../utils/amount";

(async () => {
  const issueDate = dayjs().endOf("month").format("YYYY-MM-DD");

  const loggle = new Loggle();

  await loggle.init();
  const projectInfos = await loggle.getAllProjectInfos();

  const data = projectInfos.map((projectInfo) => {
    const { rate, time } = projectInfo;
    const amount = getTotalAmount(rate || "0円", time || "0:00");
    return {
      name: projectInfo.projectName ?? "",
      quantity: amount.time,
      unit: "時間",
      pricePerUnit: amount.rate ?? 0,
      taxRate: 10,
    };
  });

  // Render the React component to an HTML string
  const htmlContent = ReactDOMServer.renderToString(
    React.createElement(Invoice, {
      issueDate,
      data,
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
  loggle.close();
})();
