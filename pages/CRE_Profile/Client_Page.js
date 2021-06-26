/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/12/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Client {
	constructor() {
		this.profile = element(by.xpath("//p-dropdown/div/div[4]/span"));
		this.clientdata = element(by.xpath("//span[text()='Client']"));
		this.clientfields = element.all(by.xpath("//tbody/tr/td"));
		this.editBtn = element(by.xpath("//span[text()='Edit']"))
		this.nameField = element(by.xpath("//p-table[@datakey='id']/div/div/table/tbody/tr/td"))
		this.submitBtn = element(by.xpath("//span[text()='Submit']"))
		this.yesBtn = element(by.xpath("//span[text()='Yes']"))

	}

	//********************************************************************
	//* Description     : Updating Existing Profile
	//* Parameter        :data- Xl Sheet Data
	//* return Values   : Return Toast message
	//********************************************************************
	editProfile(data) {
		this.nav_helper_view(data)
		util.elementClickable(this.editBtn)
		//   var name=element(by.xpath("//input[@ng-reflect-model='"+data.Name+"']"));
		//   util.elementClickable(this.nameField)
		//   name.sendKeys(data.NewProfileName)
		//   util.inputValidation(name,data.NewProfileName,"Name","Edit Profile")
		util.elementClickable(this.submitBtn)
		util.elementClickable(this.yesBtn)
		return util.resultMessage(data.TestResultType)

	}

	//********************************************************************
	//* Description     : selecting Profile from Dropdown and click on Client Tab
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper_view(data) {
		browser.sleep(3000)
		util.selectDropDown(this.profile, data.Name, 'Profile', 'EPC Profile');
		util.elementClickable(this.clientdata);

	}

}



module.exports = new Client();