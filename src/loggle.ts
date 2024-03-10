import { Browser, BrowserContext, Page, chromium } from "playwright";
import fs from "node:fs";
import { promptAuth } from "./auth/prompt";
import { checkRemember, fillEmail, fillPassword } from "./auth/login";

export class Loggle {
  private browser: Browser;
  private context: BrowserContext;
  private page: Page;
  private isReady: boolean;

  constructor() {
    this.isReady = false;
  }

  async init() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    await this.loadCookies();

    await this.page.goto("https://loggle.jp");

    this.isReady = true;

    return;
  }

  async getAuthState() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    const title = await this.page.title();
    const isLoggedIn = !title.includes("ログイン");

    return isLoggedIn ? "loggedIn" : "unauthorized";
  }

  async login() {
    if (!this.isReady) {
      throw new Error("not ready");
    }

    const authState = await this.getAuthState();

    if (authState === "loggedIn") {
      console.log("already logged in");
      return;
    }

    const { email, password } = await promptAuth();

    await fillEmail(this.page, email);
    await fillPassword(this.page, password);
    await checkRemember(this.page);

    const submitButton = await this.page.$('button[type="submit"]');

    if (!submitButton) {
      throw new Error("submit button not found");
    }

    await submitButton.click();

    await this.saveCookies();
  }

  async saveCookies() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    const cookies = await this.page.context().cookies();
    fs.writeFileSync("cookies.json", JSON.stringify(cookies));
  }

  async loadCookies() {
    try {
      const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf-8"));
      await this.page.context().addCookies(cookies);
    } catch (e) {
      console.error("failed to load cookies");
    }
  }

  async listProjects() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    const authState = await this.getAuthState();

    if (authState === "unauthorized") {
      throw new Error("not authorized");
    }

    // get each fom that has wire:key
    const projects = await this.page.$$("[wire\\:key]");

    console.log("ProjectID | ProjectName | State");
    for (const project of projects) {
      const projectId = await project.getAttribute("wire:key");

      const rows = (await project.innerText()).split("\n");
      const projectName = rows.at(0);
      const state = rows.at(-1);

      console.log(`${projectId} | ${projectName} | ${state}`);
    }
  }

  async getProjectDom(projectId: string) {
    const project = await this.page.$(`[wire\\:key="${projectId}"]`);

    if (!project) {
      throw new Error("project not found");
    }

    return project;
  }

  async getProjectInfo(projectId: string) {
    const project = await this.getProjectDom(projectId);
    const rows = (await project.innerText()).split("\n");
    const projectName = rows.at(0);
    const state = rows.at(-1);

    return { projectName, state };
  }

  async showProjectInfo(projectId: string) {
    const { projectName, state } = await this.getProjectInfo(projectId);
    console.log(`${projectId} | ${projectName} | ${state}`);
  }

  async startProject(projectId: string) {
    const { state } = await this.getProjectInfo(projectId);

    if (state === "稼働中") {
      console.log("already started");
      return;
    }
    const project = await this.getProjectDom(projectId);
    const startButton = await project.$("button");

    if (!startButton) {
      throw new Error("start button not found");
    }

    await startButton.click();
  }

  async stopProject(projectId: string) {
    const { state } = await this.getProjectInfo(projectId);

    if (state === "非稼働") {
      console.log("already stopped");
      return;
    }
    const project = await this.getProjectDom(projectId);
    const stopButton = await project.$("button");

    if (!stopButton) {
      throw new Error("start button not found");
    }
    await stopButton.click();
  }

  async close() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    await this.browser.close();
  }
}
