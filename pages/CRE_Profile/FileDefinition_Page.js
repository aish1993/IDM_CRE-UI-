/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/18/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class FileDefinition  {
	constructor()  {
		this.profile=element(by.xpath("//p-dropdown/div/div[4]/span")); 
		this.filerdefinetiondata=element(by.xpath("//span[text()='File Definition']"));
		this.filefields=element.all(by.xpath("//tbody[@ng-reflect-columns='fdid,fdSourceID,fdFieldName,fd']/tr/td"));
	}
	
	//********************************************************************
	//* Description     : selecting Profile from Dropdown and click on FileDefinetion  Tab
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper_view(data)  {
		browser.sleep(2000)
		util.selectDropDown(this.profile,data.Name,'Profile','EPC Profile');
		util.elementClickable(this.filerdefinetiondata);
	}
}



module.exports= new FileDefinition();