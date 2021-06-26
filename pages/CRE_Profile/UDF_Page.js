/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/12/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Monitor  {
	constructor()  {
		this.profile=element(by.xpath("//p-dropdown/div/div[4]/span")); 
		this.udfdata=element(by.xpath("//span[text()='UDF']"));
		this.udffields=element.all(by.xpath("//tr[2]//td"));
	}

	
	//********************************************************************
	//* Description     : selecting Profile from Dropdown and click on UDF  Tab
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper_view(data)  {
		browser.sleep(2000)
		util.selectDropDown(this.profile,data.Name,'Profile','EPC Profile');
		this.udfdata.click()
	}
}



module.exports= new Monitor();