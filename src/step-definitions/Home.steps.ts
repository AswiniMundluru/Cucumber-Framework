import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world.js";
import { expect } from "@playwright/test";
import { HomePage } from "../pages/homepage.js";
import { exec } from "node:child_process";

let homePage :HomePage;

Given('Im on the SDET unicorn Homepage', { timeout: 30000}, async function (this: CustomWorld) 
{
  
   homePage = new HomePage(this.page);
   await homePage.navigateToHomePage();

})  

Then('I Should see the Homepage heading {string}',async function (this: CustomWorld ,expectedHeading: string) {
 
  await expect(homePage.mainheading).toHaveText(expectedHeading);
})

Then('I should see the Special Sale Heading {string}', async function (this: CustomWorld ,exepectedHeading: string) {
    await expect(homePage.specialSaleHeading).toContainText(exepectedHeading);
  
})


Then('I should see the home navigation links {string}', async function (this: CustomWorld , Linkname: string)  {
  
   await homePage.navigatePageLink(Linkname);

})


Then('I should see the following pricing', async function (this : CustomWorld , datatable :DataTable) 
{
  
   const plans= datatable.hashes().map((row)=>row.Planname);
   for (const plan of plans)
    {
    
  await homePage.getPricingplan(plan);

   }

})

When('click on the {string} Button', async function (this: CustomWorld , ButtonText: string) 
  {

if (ButtonText)
{

}

})



Then('I should go to new page {string}', (s: string) => {
  // Write code here that turns the phrase above into concrete actions
})

Then('I should comeback to the parent page', () => {
  // Write code here that turns the phrase above into concrete actions
})





