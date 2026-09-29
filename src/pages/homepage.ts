import { expect , Page , Locator} from "@playwright/test"
export class HomePage 
{
    readonly page: Page;
    readonly mainheading: Locator;
    readonly specialSaleHeading : Locator;
    readonly learnMoreLink :Locator;
    readonly learnMoreButton : Locator;
    readonly navigationLink : Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.mainheading = page.getByRole("heading", {name: "Think different. Make different."});
        this.specialSaleHeading = page.getByText("Special Sale: Elevate Your SDET Skills! ");
        this.learnMoreLink = page.getByRole("link", { name: "Learn more"}).first();
        this.learnMoreButton = page.locator(".elementor-button-text" ,{hasText: "elementor-button-text"}).first();
        this.navigationLink = page.locator(".zak-primary-menu");
    }

    async navigateToHomePage():Promise<void>
    {
    await this.page.goto("https://practice.sdetunicorns.com" ,{ waitUntil: "domcontentloaded"});
    }

    async clickLearnMore():Promise<void>
    {
    await this.learnMoreLink.click();
    }

    async clickLearnMoreGetNewTab() :Promise<Page>
    {
       const[newtab] = await Promise.all([
    this.page.context().waitForEvent("page"),
    this.learnMoreLink.click(),
       ])

       await newtab.waitForLoadState();
       return newtab;

    }

    async navigatePageLink(LinkName:string) :Promise<void> 
    {
          this.navigationLink.getByRole('link', { name: LinkName , exact: true });
   
    }

    async getPricingplan(plan:string) : Promise<void>
    {
          this.page.getByRole('heading' ,{name: plan ,exact :true});
    }


}