import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { PlaywrightUtils } from '../support/PlaywrightUtils.js';
import { CustomWorld } from '../support/world.js';
import { error } from 'node:console';

let homePage: HomePage;

Given('Im on the SDET unicorn Homepage', async function (this: CustomWorld) {
homePage = new HomePage(this.page);
await homePage.navigate();
});

Then('I Should see the Homepage heading {string}', async function (this: CustomWorld, expectedHeading: string){
await expect(homePage.mainHeading).toHaveText(expectedHeading); 

});

Then('I should see the Special Sale Heading {string}', async function (this: CustomWorld, expectedHeading: string) {
//verifyMainHeading(expectedHeading);
  await expect(homePage.specialSaleHeading).toHaveText(expectedHeading);
});

Then('I should see the home navigation links {string}', async function ( this: CustomWorld , Linkname:string){
  
  await expect(homePage.getNavigationLink(Linkname)).toBeVisible();
});

Then('I should see the following pricing', async function (this: CustomWorld , datatable:DataTable){
  
  const plans =  datatable.hashes().map((row)=>row.Planname);

  for ( const plan of plans)
  {

    await expect (homePage.getPricingPlan(plan)).toBeVisible();
  }
  
})

When('click on the {string} Button', async function (this:CustomWorld , buttontext:string) {
  
  if (buttontext !=='Learn more')
  {
    throw new Error(`button not implemented : ${buttontext}`)
  }

  const opensNewTab = await homePage.isLearnMoreOpeningNewTab();
  if (opensNewTab)
    {
      const newPagePromise = this.context.waitForEvent('page');
      await homePage.clickLearnMore();
      this.page = await newPagePromise;
      homePage = new HomePage(this.page);
      await this.page.waitForLoadState('domcontentloaded');
      return;
  }

  await homePage.clickLearnMore();

});

Then('I should go to new page {string}',  async function( this:CustomWorld ,expectedmessage:string ) {
 
  await expect(homePage.getRedirectedPageText(expectedmessage)).toBeVisible();
})

Then('I should comeback to the parent page', async function(this:CustomWorld){
  
  this.page = await PlaywrightUtils.switchtoparentPage(this.context , this.page);
  homePage = new HomePage(this.page);
  await this.page.waitForLoadState('domcontentloaded');

});







      

 