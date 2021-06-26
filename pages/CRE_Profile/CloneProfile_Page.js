/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 3/03/2020
 * Updated by: 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
const { browser } = require("protractor");
//var profile=require("../../pages/CRE_Profile/Break_Page");
var client = require("../../pages/CRE_Profile/Client_Page")

"use strict";

class CloneProfile {
	constructor() {
		this.profile = element(by.xpath("//p-dropdown/div/div[4]/span"));
		this.clientName = element(by.xpath("//input[@formcontrolname='sName']"));
		this.clientDescription = element(by.xpath("//input[@formcontrolname='sDescription']"));
		this.accountNumber = element(by.xpath("//input[@formcontrolname='cDestination']"));
		this.lockboxNumber = element(by.xpath("//input[@formcontrolname='lockboxNo']"));

		//**************Button**************
		this.cloneProfileBtn = element(by.xpath("//span[text() ='Clone Profile']"));
		this.cancelBtn = element(by.xpath("//span[text() ='Cancel']"));
		this.preview = element(by.xpath("//span[text() ='Preview']"));
		this.submit = element(by.xpath("//span[text() ='Submit']"));
		this.disablebtn = element(by.xpath("//*[text()='Disable']"))
		this.enablebtn = element(by.xpath("//*[text()='Enable']"))
		this.yesbtn = element(by.xpath("//*[text()='Yes']"))
		this.nobtn = element(by.xpath("//*[text()='No']"))
		this.reason = element(by.xpath("//input[@formcontrolname='Message']"))

	}

	//********************************************************************
	//* Description     : Cloning the Profile 
	//* Argument Values   : data-xl Sheet data
	//* return Value      : return Text Message
	//********************************************************************

	add_Value(data) {
		util.elementClickable(this.cloneProfileBtn);
		if (data.Category == 'New') {
			data.ClientName = data.ClientName + util.randomnumbergeneration(999);
		}
		if (data.AccountNumber != undefined) {
			data.AccountNumber = data.AccountNumber + util.randomnumbergeneration(999);
		}
		if (data.LockboxNumber != undefined) {
			data.LockboxNumber = data.LockboxNumber + util.randomnumbergeneration(999);
		}
		util.inputValidation(this.clientName, data.ClientName, 'Client Name', 'Client Setting');
		
		util.inputValidation(this.clientDescription, data.ClientDescription, 'Description', 'Client Setting');
		util.inputValidation(this.accountNumber, data.AccountNumber, 'Account no', 'Client Setting');
		if(this.lockboxNumber.isPresent())
		util.inputValidation(this.lockboxNumber,data.LockboxNumber,'Lockbox number','Client Setting');
		browser.wait(EC.presenceOf(this.submit), 3000, 'element not found within specified wait time');
		util.elementClickable(this.submit);
		if (data.TestResultType != 'Inline')
			util.elementClickable(this.yesbtn);
		return [util.resultMessage(data.TestResultType), data.ClientName];
	}

	//********************************************************************
	//* Description     :   Helper method for selecting profile 
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper(data) {
		browser.sleep(2000)
		util.selectDropDown(this.profile, data.Profile, 'Profile', 'Clone');
		browser.sleep(2000)
	}
	nav_enable_disable(data) {
		var Active;
		client.nav_helper_view(data);
		console.log("Active " + data.ClientEnabled);
		if (data.ClientEnabled == '0') {
			util.elementClickable(this.enablebtn);
			Active = 1;
		}
		else {
			util.elementClickable(this.disablebtn);
			Active = 0;
		}
		this.reason.sendKeys('disable/enable');
		util.elementClickable(this.yesbtn);
		browser.sleep(1000)
		return [util.resultMessage(data.TestResultType),Active];

	}
}
module.exports = new CloneProfile();