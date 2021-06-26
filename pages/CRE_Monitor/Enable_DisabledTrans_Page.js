/*******************************************
 * Author : neha(neha@hcl.com)
 * Date : 12/01/2021
 * Updated by: 
 *******************************************/

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class EnabledDisabledTrans {

	constructor() {
		this.transdrp = element(by.xpath("//*[label='Select a Transmission']/label"));
		this.enabled = element(by.xpath("//p-checkbox[@label='Enabled']/div/div[2]"));
		this.submitBtn = element(by.xpath("//span[text()='Submit']"));
		this.yesBtn = element(by.xpath("//span[text()='Yes']"));
		this.reason = element(by.xpath("//input[@formcontrolname='Message']"))

	}

	//**********************************************************************
	//* Description     : EOD Processing
	//* Return Values   : return the text 
	//**********************************************************************
	enableddisabled(data) {
		util.selectDropDown(this.transdrp, data.TransName, 'Transmission Name', 'Enabled/Disabled Transmission');
		browser.sleep(4000)
		var enabledbtn = element(by.xpath("//p-checkbox[@label='Enabled']/div/div[2]"));
		util.elementClickable(enabledbtn);
		util.elementClickable(this.submitBtn);
		util.inputValidation(this.reason, data.Reason, 'Reason', 'Enabled/Disabled Transmission')
		util.elementClickable(this.yesBtn);
		return util.resultMessage(data.TestResultType);
	}
	get_Enabled_Disabled() {
		return this.enabled.getAttribute('class').then(function (returnValue) {
			if (returnValue.includes('ui-state-active')) {
				console.log("Transmission is Enable before")
				return '1'
			}
			else {
				console.log("Transmission is Disable before")
				return '0'

			}
		})
	}
}
module.exports = new EnabledDisabledTrans();
