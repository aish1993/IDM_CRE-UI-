/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/18/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Source  {
	constructor()  {
		this.profile=element(by.xpath("//p-dropdown/div/div[4]/span")); 
		this.sourcedata=element(by.xpath("//span[text()='Source']"));
		this.sourcefields=element.all(by.xpath("//tbody[@ng-reflect-columns='sid,sName,sDescription,sDataba']/tr/td"));
	}

	//********************************************************************
	//* Description     : selecting Profile from Dropdown and click on Source  Tab
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper_view(data)  {
		browser.sleep(2000)
		util.selectDropDown(this.profile,data.Name,'Profile','EPC Profile');
		util.elementClickable(this.sourcedata);
	}
}



module.exports= new Source();