/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/19/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Extract  {
	constructor()  {
		this.profile=element(by.xpath("//p-dropdown/div/div[4]/span")); 
		this.extractdata=element(by.xpath("//span[text()='Extract Fields']"));
		this.extractfields=element.all(by.xpath("//tbody[@ng-reflect-columns='efid,efProfileID,efFieldType,e']/tr/td"));	

	}


	//********************************************************************
	//* Description     : Selecting Profile from Dropdown and click on Extract Tab 
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper_view(data)  {
		browser.sleep(2000)
		util.selectDropDown(this.profile,data.Name,'Profile','EPC Profile');
		util.elementClickable(this.extractdata)


	}
}



module.exports= new Extract();