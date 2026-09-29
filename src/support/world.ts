import { setWorldConstructor, World, After,Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "playwright";

export class CustomWorld extends World 

{
browser!: Browser;
context!: BrowserContext;
page!: Page;
ScenarioName = '';

}

Before(async function name (this:CustomWorld) {

    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
})
After( async function (this: CustomWorld){
await this.context?.close();
await this.browser?.close();

})

setDefaultTimeout(3000);
setWorldConstructor(CustomWorld);

