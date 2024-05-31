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

    console.log("ProjectID | ProjectName | State");
    // get each fom that has wire:key

    const projectInfos = await this.getAllProjectInfos();

    projectInfos.forEach((project) => {
      console.log(
        `${project.projectId} | ${project.projectName} | ${project.state}`,
      );
    });
  }

  async getAllProjectInfos() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    const authState = await this.getAuthState();

    if (authState === "unauthorized") {
      throw new Error("not authorized");
    }

    // get each fom that has wire:key
    const projects = await this.page.$$("[wire\\:key]");

    const projectInfos = [];
    for (const project of projects) {
      const projectId = await project.getAttribute("wire:key");

      const rows = (await project.innerText()).split("\n");
      const projectName = rows.at(0);
      const rate = rows.at(4);
      const time = rows.at(6);
      const state = rows.at(-1);

      projectInfos.push({ projectId, projectName, rate, time, state });
    }
    return projectInfos;
  }

  async getProfileName() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    const authState = await this.getAuthState();

    if (authState === "unauthorized") {
      throw new Error("not authorized");
    }

    await this.page.goto("https://loggle.jp/mypage");

    const profile = await this.page.locator('[id="name"]');
    if (!profile) {
      throw new Error("profile not found");
    }

    return await profile.inputValue();
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
    const rate = rows.at(4);
    const time = rows.at(7);
    const state = rows.at(-1);

    return { projectName, rate, time, state };
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
    console.log("Success");
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
    console.log("Success");
  }

  async close() {
    if (!this.isReady) {
      throw new Error("not ready");
    }
    await this.browser.close();
  }
}
