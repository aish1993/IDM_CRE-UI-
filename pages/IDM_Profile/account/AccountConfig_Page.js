
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var p1 = require("../../../pages/IDM_Profile/Account/AccountInfo_Page");
"use strict";


class AccountConfig {
	constructor() {
		this.depositAccountNumber = element(by.xpath("//input[@formcontrolname='DepositAcctNum']"));
		this.thresholdValue = element(by.xpath("//p-spinner[@formcontrolname='Threshold']/span/input"));
		this.password = element(by.xpath("//input[@formcontrolname='Password']"));
		this.watermarkImage = element(by.xpath("//input[@formcontrolname='WaterMarkImage']"));
		this.allowForceBalanceChk = element(by.xpath("//p-checkbox[@formcontrolname='AllowMissingAccounts']/div/div[2]"));
		this.allowMissingAccountsChk = element(by.xpath("//p-checkbox[@formcontrolname='AllowForceBalance']/div/div[2]"));
		this.backBtn = element(by.xpath("//p-table[2]//span[text()='Back']"));
		this.nextBtn2 = element(by.xpath("//p-table[2]//span[text()='Next']"));
		this.finishBtn = element(by.xpath("//span[text()='Finish']"));
		this.submitBtn = element(by.xpath("//span[text()='Submit']"));
		this.testChkBox = element.all(by.xpath("//input[@type='checkbox']"));
		this.nextBtn1 = element(by.xpath("//p-table[2]//span[text()='Next']"));
	}

	//**********************************************************************
	//* Description     : For Adding Account(Page 2)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record
	//**********************************************************************
	add_account(data) {
		util.inputValidation(this.depositAccountNumber, '2435454', 'Deposit Account Number', 'Account Info')
		util.inputValidation(this.depositAccountNumber, data.DepositAccountNumber, 'Deposit Account Number', 'Account Info')
		util.inputValidation(this.thresholdValue, data.ThresholdValue, 'Threshold Value', 'Account Info');
		console.log("fgfdgfdg")
		util.inputValidation(this.password, data.Password, 'Password', 'Account Info');
		util.inputValidation(this.watermarkImage, data.WatermarkImage, 'Watermark Image', 'Account Info');
		if (data.AllowForceBalance == 'Yes') {
			util.elementClickable(this.allowForceBalanceChk)
		}
		if (data.AllowMissingAccounts == 'Yes') {
			util.elementClickable(this.allowMissingAccountsChk)
		}
		util.scrolldown(this.nextBtn2)
		util.elementClickable(this.nextBtn2)
		return util.resultMessage(data.TestResultType);
	}

	//**********************************************************************
	//* Description     : For Editing Account(Page 2)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after Editing the record
	//**********************************************************************
	edit_account(data) {
		util.inputValidation(this.depositAccountNumber, data.DepositAccountNumber, 'Deposit Account Number', 'Account Info')
		util.inputValidation(this.thresholdValue, data.ThresholdValue, 'Threshold Value', 'Account Info');
		util.inputValidation(this.password, data.Password, 'Password', 'Account Info');
		util.inputValidation(this.watermarkImage, data.WatermarkImage, 'Watermark Image', 'Account Info');
		if (data.AllowForceBalance == 'Yes') {
			util.elementClickable(this.allowForceBalanceChk)
		}
		if (data.AllowMissingAccounts == 'Yes') {
			util.elementClickable(this.allowMissingAccountsChk)
		}
		// util.scrolldown(this.nextBtn2)
		util.elementClickable(this.nextBtn2)
		return util.resultMessage(data.TestResultType);
	};

	//**********************************************************************
	//* Description     : For getting Value from UI(Page 2)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after Editing the record
	//**********************************************************************	
	get_DepositAccountNumber() {
		return this.depositAccountNumber.getAttribute('value').then(function (returnValue) {
			console.log(returnValue);
			logger.info('Retrive DepositAccountNumber from UI' + returnValue)
			return returnValue;
		});
	}
	get_Password() {
		return this.password.getAttribute('value').then(function (returnValue) {
			console.log(returnValue);
			logger.info('Retrive Password from UI' + returnValue)
			return returnValue;
		});
	}
	get_WatermarkImage() {
		return this.watermarkImage.getAttribute('value').then(function (returnValue) {
			console.log(returnValue);
			logger.info('Retrive WatermarkImage from UI' + returnValue)
			return returnValue;
		});
	}

	get_ThresholdValue() {
		return this.thresholdValue.getAttribute('value').then(function (returnValue) {
			console.log(returnValue);
			logger.info('Retrive ThresholdValue from UI' + returnValue)
			return returnValue;
		});
	}
	get_AllowForceBalance() {
		return (this.testChkBox.get(0)).isSelected().then(function (value) {
			console.log(value);
			//return value ;
			if (value === true) {

				logger.info('Retrive AllowForceBalance from UI' + value)
				return 1;
			}
			else {
				logger.info('Retrive AllowForceBalance from UI' + value)
				return 0;
			}
		});
	}
	get_AllowMissingAccounts() {
		return this.testChkBox.get(1).isSelected().then(function (value) {
			logger.info('Retrive AllowMissingAccounts from UI' + value)
			return value;
		});
	}

	//**********************************************************************
	//* Description     : calling Account Page 1 nav_helper_add for enter the mandatory field 
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_add(data) {
		p1.nav_helper_add(data);
		browser.sleep(2000)
	}

	//**********************************************************************
	//* Description     : calling Account Page 1 nav_helper_edit for enter the mandatory field an click on next Page
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_edit(data) {
		p1.nav_helper_edit(data);
		util.elementClickable(p1.nextBtn1);
	}

	//**********************************************************************
	//* Description     :click on next page 
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_view2(data) {
		p1.nav_helper_view1(data);
		util.scrolldown(p1.nextBtn1)
		util.elementClickable(p1.nextBtn1)
		browser.sleep(3000);
	}
}


module.exports = new AccountConfig();