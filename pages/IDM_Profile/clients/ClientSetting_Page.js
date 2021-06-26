const { browser } = require("protractor");

/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 01/27/2020
 * Updated by: 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var ClientPage12 = require("../../../pages/IDM_Profile/clients/ExtractOption_Page");
var AddTC_DATA = util.read_from_excel('AddClient', 'Client_TestData');
var p2 = require("../../../pages/IDM_Profile/clients/SettingInfo_Page");
var p11 = require("../../../pages/IDM_Profile/clients/ReportOption_Page");
var p3 = require("../../../pages/IDM_Profile/clients/SortPattern_Page");
var p4 = require("../../../pages/IDM_Profile/clients/ClientRules_Page");
var p5 = require("../../../pages/IDM_Profile/clients/TransportConfigSource_Page");
var p6 = require("../../../pages/IDM_Profile/clients/SequentialCapture_Page");
var p7 = require("../../../pages/IDM_Profile/clients/WorkflowStage_Page");
var p8 = require("../../../pages/IDM_Profile/clients/TransportConfigOutput_Page");
var p9 = require("../../../pages/IDM_Profile/clients/MICRVerification_Page");
var p10 = require("../../../pages/IDM_Profile/clients/OutputFormat_Page");

"use strict";


class ClientSetting {

	constructor() {

		this.label = element(by.xpath("//th[contains(text(),'Client Settings')]"));
		this.group = element(by.xpath("//p-dropdown[@formcontrolname='group']"));
		this.clientName = element(by.xpath("//p-dropdown[@formcontrolname='client']/div"));
		this.clientNameInput = element(by.xpath("//input[@formcontrolname='clientName']"));
		//		this.clientInfo=element.all(by.xpath("//p-table//tbody/tr[2]/td/div/span"));
		this.clientAddInfo = element(by.xpath("//span[contains(text(),'Added')]"));		//Updated by: Sanjay 04/11/2020	
		this.clientUpdatedInfo = element(by.xpath("//span[contains(text(),'Updated')]"));
		this.clientNumber = element(by.xpath("//input[@formcontrolname='clientNumber']"));
		this.address1 = element(by.xpath("//input[@formcontrolname='address1']"));
		this.address2 = element(by.xpath("//input[@formcontrolname='address2']"));
		this.city = element(by.xpath("//input[@formcontrolname='city']"));
		this.state = element(by.xpath("//input[@formcontrolname='state']"));
		this.zip = element(by.xpath("//input[@placeholder='Enter Zip']"));
		this.phone = element(by.xpath("//input[@placeholder='Enter Phone Number']"));
		this.fax = element(by.xpath("//p-inputmask[@formcontrolname='fax']/input"));
		this.faxContact = element(by.xpath("//input[@formcontrolname='faxContact']"));
		this.thresholdcheckbox = element(by.xpath("//p-checkbox[@formcontrolname='validateThreshold']/div/div[2]"));

		//		*******Validate Info Section********** 
		this.validateThresholdChk = element.all(by.xpath("//p-table[1]//input[@type='checkbox']"));
		this.accountThreshold = element(by.xpath("//p-spinner[@formcontrolname='threshold']//input"));
		this.thresholdUnit = element.all(by.xpath("//p-selectbutton[@formcontrolname='thresholdUnit']/div/div"));
		this.password = element(by.xpath("//input[@formcontrolname='password']"));
		this.waterMarkImage = element(by.xpath("//input[@formcontrolname='watermark']"));
		this.accountThresholdspinner = element(by.xpath("//p-spinner[@formcontrolname='threshold']/span/input"))
		//		*******Bottom CheckBoxes***************

		this.allowForceBalanceChk = element(by.xpath("//p-checkbox[@formcontrolname='forceBalance']/div"));
		this.rnrDataSourceChk = element(by.xpath("//p-checkbox[@formcontrolname='dataSource']/div"));
		this.allowMissingAccountChk = element(by.xpath("//p-checkbox[@formcontrolname='missingAccount']/div"));

		//		****************Buttons***************    
		this.nextBtn = element(by.xpath("//p-table[1]//span[text()='Next']"));
		this.cancelBtn = element(by.xpath("//p-table[1]//span[text()='Cancel']"));
		this.disableBtn = element(by.xpath("//p-table[1]//span[text()='Disable']"));
		this.editBtn = element(by.xpath("//p-table[1]//span[text()='Edit']"));
		this.clonebtn = element(by.xpath("//p-table[1]//span[text()='Clone']"));
		this.cloneclientName = element(by.xpath("//input[@formcontrolname='clientName']"));
		this.oKbtn = element(by.xpath("//span[text()='Ok']"))
		this.lastpagenavigator = element(by.xpath("//span[text()='12']"))
		// this.submitBtn = element(by.xpath("//span[text()='Submit']"));
		this.yes = element(by.xpath("//span[text()='Yes']"))

		// ******************** Disable *****************************
		this.disablebtn = element(by.xpath("//span[text()='Disable']"));
		this.reason = element(by.xpath("//input[@formcontrolname='Message']"));
		this.cancelbtn = element.all(by.xpath("//span[text()='Cancel']"));
		this.popup = element.all(by.xpath("//input[@formcontrolname='Message']"));
		this.no = element.all(by.xpath("//span[text()='No']"));
		this.submitbtn = element.all(by.xpath("//p-button[@label='Submit']"))

	}


	//**********************************************************************
	//* Description     : For Edit Client for Client setting page
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record
	//**********************************************************************
	editClient(data) {
		this.nav_helper_edit(data);
		util.inputValidation(this.address1, data.Address1, "Address 1", "Client Settings");
		util.inputValidation(this.address2, data.Address2, "Address 2", "Client Settings");
		util.inputValidation(this.city, data.city, "city", "Client Settings");
		util.inputValidation(this.state, data.state, "state", "Client Settings");
		browser.actions().sendKeys(protractor.Key.TAB).perform()
		browser.actions().sendKeys(data.zip).perform()
		util.elementClickable(this.nextBtn)
		return util.resultMessage(data.TestResultType);
	}
	//**********************************************************************
	//* Description     :  Add Client method for Client setting page
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record
	//**********************************************************************
	addClient(data) {
		this.nav_helper_add(data);
		if (data.ClientName != undefined)
			data.ClientName = data.ClientName + util.randomnumbergeneration(9999);
		util.inputValidation(this.clientNameInput, data.ClientName, 'Client Name', 'Client Settings')
		util.inputValidation(this.address1, data.Address1, "Address 1", "Client Settings");
		util.inputValidation(this.address2, data.Address2, "Address 2", "Client Settings");
		util.inputValidation(this.city, data.city, "city", "Client Settings");
		util.inputValidation(this.state, data.state, "state", "Client Settings");
		util.inputValidation(this.zip, data.zip, "zip", "Client Settings");
		if (data.ThresholdValidate == 'yes') {
			util.elementClickable(this.thresholdcheckbox)
			util.inputValidation(this.accountThresholdspinner, data.AccountValidate, 'Account Validate', 'Client Settings')
		}
		util.inputValidation(this.faxContact, data.faxContact, "faxContact", "Client Settings");
		util.elementClickable(this.nextBtn)
		if (data.TestResultType == 'Inline')
			return util.resultMessage(data.TestResultType);
	}


	//**********************************************************************
	//* Description     : Clone the client 
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record
	//**********************************************************************

	cloneClient(data) {
		util.elementClickable(this.clonebtn)
		if (data.Category != undefined) {
			data.CloneClientName = data.CloneClientName + util.randomnumbergeneration(1000);
			util.inputValidation(this.cloneclientName, data.CloneClientName, 'Client Name', 'Clone Client')
		}
		util.elementClickable(this.oKbtn);
		util.elementClickable(this.nextBtn)
		util.inputValidation(p2.internalClientNum, data.InternalClientNum, 'InternalClientNum', 'Add Client');
		browser.actions().sendKeys(protractor.Key.TAB).perform()
		browser.actions().sendKeys(data.ClientIdLbxNum).perform()
		util.elementClickable(p2.nextBtn)
		util.elementClickable(p3.nextBtn)
		util.elementClickable(p4.nextBtn)
		util.elementClickable(p5.nextBtn)
		util.elementClickable(p6.nextbtn)
		util.elementClickable(p7.nextBtn)
		util.elementClickable(p8.nextBtn)
		util.elementClickable(p9.nextBtn)
		util.elementClickable(p10.nextBtn);
		browser.sleep(2000)
		// util.elementClickable(p10.archiveIndexAvailableFormatfieldData)
		// util.elementClickable(p7.rightarrowbtn.get(3));
		util.elementClickable(p10.nextBtn1)
		util.elementClickable(p10.nextBtn1)
		util.elementClickable(p11.nextBtn)

		if (data.Category != undefined) {
			util.elementClickable(this.lastpagenavigator);
			util.elementClickable(this.submitbtn.get(0));
			util.elementClickable(this.submitbtn.get(1));
			util.elementClickable(this.yes);
		}
		return [util.resultMessage(data.TestResultType), data.CloneClientName];
	}
	//**********************************************************************
	//* Description     : Getting value from Ui for Client Setting Page
	//* Return Values   : return the value from ui
	//**********************************************************************
	get_Label() {
		return this.label.getText().then(function (returnValue) {
			var value = returnValue.split(/\((.*)\)/).slice(1, 2).toString();
			return value;
		});
	}
	get_AddedTimeStamp() {
		return this.clientAddInfo.getText().then(function (returnValue) {
			var value = returnValue.split(" ").slice(2, 4).toString();
			var date = new Date(value);
			date.setHours(date.getHours() + 5);
			date.setMinutes(date.getMinutes() + 30);
			return (date.toUTCString());
		});
	}
	get_AddedBy() {
		return this.clientAddInfo.getText().then(function (returnValue) {
			var value = returnValue.split(" ").slice(5).toString();
			return value;
		});
	}
	get_UpdatedTimeStamp() {
		return this.clientUpdatedInfo.getText().then(function (returnValue) {
			var value = returnValue.split(" ").slice(2, 4).toString();
			var date = new Date(value);
			date.setHours(date.getHours() + 5);
			date.setMinutes(date.getMinutes() + 30);
			return (date.toUTCString());
		});
	}
	get_UpdatedBy() {
		return this.clientUpdatedInfo.getText().then(function (returnValue) {
			var value = returnValue.split(" ").slice(5).toString();
			return value;
		});
	}
	get_ClientNumber() {
		return this.clientNumber.getAttribute('value').then(function (returnValue) {
			return returnValue * 1;
		});
	}
	get_Address1() {
		return this.address1.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_Address2() {
		return this.address2.getAttribute('value').then(function (returnValue) {
			return returnValue;
		})
	}
	get_City() {
		return this.city.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_State() {
		return this.state.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_Zip() {
		return this.zip.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_Phone() {
		return this.phone.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_Fax() {
		return this.fax.getText().then(function (returnValue) { //getting 'Null' value using get Attribute. @Twinkle
			return returnValue;
		});
	}
	get_FaxContact() {
		return this.faxContact.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}

	get_AccountThreshold() {
		return this.accountThreshold.getAttribute('value').then(function (returnValue) {
			return (returnValue * 1).toString();
		});
	}
	get_ThresholdUnit_I() {
		return (this.thresholdUnit.get(0)).isSelected().then(function (returnValue) {
			if (returnValue === false) {
				return (0);
			}
			else {
				return (1);
			}
		});
	}
	get_ThresholdUnit_P() {
		return (this.thresholdUnit.get(1)).isSelected().then(function (returnValue) {
			if (returnValue === true) {
				return (1);
			}
			else {
				return (0);
			}
		});
	}
	get_Password() {
		return this.password.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_WaterMarkImage() {
		return this.waterMarkImage.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_ActiveClient() {
		browser.ignoreSynchronization = true;
		return this.activeClientChk.getAttribute('class').then(function (returnValue) {
			if (returnValue.includes('ui-state-active')) {
				return 1;
			}
			else
				return 0
		})
	}
	get_ValidateThreshold() {
		return this.validateThresholdChk.get(0).isSelected().then(function (returnValue) {
			return returnValue;
		});
	}
	get_AllowForceBalance() {
		return this.allowForceBalanceChk.isSelected().then(function (returnValue) {
			return returnValue;
		});
	}
	get_RnrDataSource() {
		return this.rnrDataSourceChk.isSelected().then(function (returnValue) {
			if (returnValue === true) {
				return (1);
			}
			else {
				return (0);
			}
		});
	}
	get_AllowMissingAccount() {
		return this.allowMissingAccountChk.isSelected().then(function (returnValue) {
			return returnValue;
		});
	}

	//Boundary Value Function
	get_name_len() {
		return (this.clientNameDpn.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}
	get_address1_len() {
		return (this.address1.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}
	get_address2_len() {
		return (this.address2.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}
	get_city_len() {
		return (this.city.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}
	get_state_len() {
		return (this.state.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}
	get_zip_len() {
		return (this.zip.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}
	get_phone_len() {
		return (this.phone.getAttribute('maxlength')).then(function (returnValue) {
			return returnValue;
		});
	}

	/********************************************************************
	//* Description     : Helper method for View and Edit/Add
	//* Input Params    : data-Excel sheet data
	//* Return Values   : NILL
	/********************************************************************/
	nav_helper_view(data) {
		browser.sleep(3000)
		util.selectDropDown(this.group, data.Group, 'Group', 'Client Settings');
		console.log(data.ClientName)
		browser.sleep(3000)
		util.selectDropDown(this.clientName, data.ClientName, 'Client Name', 'Client Settings');
	}
	nav_helper_edit(data) {
		browser.sleep(3000)
		util.selectDropDown(this.group, data.Group, 'Group', 'Client Settings');
		util.selectDropDown(this.clientName, data.ClientName, 'Client Name', 'Client Settings');
		// this.editBtn=element(by.xpath("//button[text()='Edit']"));
		browser.sleep(3000)
		util.elementClickable(this.editBtn);

	}
	nav_helper_add(data) {
		util.selectDropDown(this.group, data.Group, 'Group', 'Client Settings');
		browser.sleep(3000)
	}
	nav_helper_disable(data) {
		// browser.sleep(5000)
		util.elementClickable(this.disablebtn)
		util.inputValidation(this.reason, data.Reason, 'Reason', 'Client Settings');
		this.yes.click()
		return util.resultMessage(data.TestResultType);

	}
}
module.exports = new ClientSetting();
