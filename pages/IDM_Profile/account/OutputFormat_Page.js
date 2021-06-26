var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
const { browser } = require("protractor");
var p2 = require("../../../pages/IDM_Profile/Account/AccountConfig_Page");
"use strict";

class OutputFormat {
	constructor() {
		this.selectMedia = element(by.xpath("//p-dropdown[@ng-reflect-model='4']/div/div[3]/span"));
		this.arrowBtn = element(by.xpath("//button[@icon='pi pi-angle-right']"));
		this.spinnerData = element.all(by.xpath("//input[@class='ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all']"));
		this.spinner = element.all(by.xpath("//span[@class='ui-spinner ui-widget ui-corner-all']/input"));
		this.assignedFormats = element(by.xpath("//p-table/div/div/table/tbody/tr[2]/td/p-picklist/div/div[4]/ul/li[2]/span"));
		this.arrowBtn = element(by.xpath("//button[@icon='pi pi-angle-right']"));
		this.backBtn = element(by.xpath("//p-table[1]//span[text()='Back']"));
		this.yesBtn = element(by.xpath("//span[text()='Yes']"));
		this.submitBtn = element(by.xpath("//span[text()='Submit']"));
		this.ReviewBtn = element(by.xpath("//span[text()='Review']"));
		this.priority = element(by.xpath("//p-table/div/div/table/tbody/tr[4]/td[2]/p-spinner/span/input"));
		this.availableFormats = element(by.xpath("//p-table/div/div/table/tbody/tr[2]/td/p-picklist/div/div[2]/ul/li[2]/span"));
		this.nextBtn1 = element(by.xpath("//p-table[2]//span[text()='Next']"));
	}

	//**********************************************************************
	//* Description     : For Adding Account(Page 3)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record
	//********************************************************************** 
	add_account(data) {
		util.elementClickable(this.availableFormats)
		util.elementClickable(this.arrowBtn)
		util.elementClickable(this.assignedFormats)
		browser.sleep(2000)
		util.inputValidation(this.spinner.get(1), data.NumberOfCopies, 'Number of Copies', 'Account Info');
		browser.sleep(5000);
		util.inputValidation(this.spinner.get(1), data.Priority, 'Priority', 'Account Info');
		browser.sleep(5000);
		util.elementClickable(this.submitBtn)
		util.elementClickable(this.yesBtn)
		return util.resultMessage(data.TestResultType);
	}

	//**********************************************************************
	//* Description     : for adding account 
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record and newly created account name 
	//********************************************************************** 
	add_accountE2E(data) {
		util.elementClickable(this.availableFormats)
		util.elementClickable(this.arrowBtn)
		util.elementClickable(this.assignedFormats)
		browser.sleep(2000)
		util.inputValidation(this.spinner.get(1), data.NumberOfCopies, 'Number of Copies', 'Account Info');
		browser.sleep(5000);
		util.inputValidation(this.spinner.get(1), data.Priority, 'Priority', 'Account Info');
		browser.sleep(5000);
		util.elementClickable(this.submitBtn)
		util.elementClickable(this.yesBtn)
		return [util.resultMessage(data.TestResultType), data.AccountName];
	}
	//**********************************************************************
	//* Description     : For Editing Account(Page 3)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after Editing the record
	//**********************************************************************
	edit_account(data) {
		this.availableFormats.click();
		this.arrowBtn.click();
		this.submitBtn.click();
		this.yesBtn.click();
		return util.resultMessage(data.TestResultType);
	}

	//**********************************************************************
	//* Description     : For getting Value from UI(Page 3)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after Editing the record
	//**********************************************************************
	get_SelectMedia() {
		return this.selectMedia.getAttribute('value').then(function (returnValue) {
			return returnValue||'';
		});
	}

	get_AssignedFormats() {
		return this.assignedFormats.getText().then(function (returnValue) {
			return returnValue||'';
		}, 2000);
	}

	get_NoOfCopies() {
		return this.spinner.get(1).getAttribute('value').then(function (returnValue) {
			console.log("No of Copies" + returnValue)
			return returnValue||'';
		});
	}

	get_priority() {
		return this.spinner.get(2).getText().then(function (returnValue) {
			return returnValue||'';
		});
	}

	//**********************************************************************
	//* Description     : calling Account Page 2 nav_helper_add for enter the mandatory field and click on next page
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_add(data) {
		p2.nav_helper_add(data);
		// browser.sleep(2000)
		util.elementClickable(p2.nextBtn2)
		browser.sleep(3000);
	}

	//**********************************************************************
	//* Description     : calling Account Page 2 nav_helper_edit for enter the mandatory field an click on next Page
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_edit(data) {
		p2.nav_helper_edit(data);
		util.elementClickable(p2.nextBtn2)
	}

	//**********************************************************************
	//* Description     :click on the assigned formats field data from Account Page 3
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_view3() {
		p2.nav_helper_view2(data);
		util.elementClickable(p2.nextBtn2);
		browser.sleep(3000);
		util.elementClickable(this.assignedFormats)
	}
}


module.exports = new OutputFormat();
