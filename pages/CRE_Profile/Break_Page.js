/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/19/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Break  {
	constructor()  {

		this.breakdata=element(by.xpath("//span[text()='Breaks']"));
		this.profile=element(by.xpath("//p-dropdown/div/div[4]/span")); 
		this.breakfields=element.all(by.xpath("//tbody[@ng-reflect-columns='breakID,sourceID,fileHeaderRow']/tr/td"));
	}

	//********************************************************************
	//* Description     : selecting Profile from Dropdown and click on Break Tab
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	 nav_helper_view(data)  {
		browser.sleep(3000)
		util.selectDropDown(this.profile,data.Name,'Profile','EPC Profile');
		util.elementClickable(this.breakdata);
	}
}

module.exports= new Break();