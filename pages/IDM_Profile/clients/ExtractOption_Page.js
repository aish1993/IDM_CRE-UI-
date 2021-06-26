/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 05/02/2020
 * Updated by: 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var p11 = require("../../../pages/IDM_Profile/clients/ReportOption_Page");
var p1 = require("../../../pages/IDM_Profile/clients/ClientSetting_Page");
var p2 = require("../../../pages/IDM_Profile/clients/SettingInfo_Page");
var p3 = require("../../../pages/IDM_Profile/clients/SortPattern_Page");
var p4 = require("../../../pages/IDM_Profile/clients/ClientRules_Page");
var p5 = require("../../../pages/IDM_Profile/clients/TransportConfigSource_Page");
var p6 = require("../../../pages/IDM_Profile/clients/SequentialCapture_Page");
var p7 = require("../../../pages/IDM_Profile/clients/WorkflowStage_Page");
var p8 = require("../../../pages/IDM_Profile/clients/TransportConfigOutput_Page");
var p9 = require("../../../pages/IDM_Profile/clients/MICRVerification_Page");
var p10 = require("../../../pages/IDM_Profile/clients/OutputFormat_Page");
var p12 = require("../../../pages/IDM_Profile/clients/ExtractOption_Page");
const { browser } = require("protractor");


// var monitor=require("../../../pages/IDM_Monitor/Monitor_Page");

"use strict"

class ExtractOption {
	constructor() {
		this.extractOptions = element(by.xpath("//th[contains(text(),'Extract Options')]"));
		this.extractOn = element(by.xpath("//p-spinner[@formcontrolname='FrequencyNumber']/span/input"));
		this.initiatedate = element(by.xpath("//p-calendar[@formcontrolname='DateToInitiateExtract']"));
		this.date = element.all(by.xpath("//table[@class='ui-datepicker-calendar']/tbody/tr/td"));

		//a)CHECKBOX

		this.enableFreeScanSchedulingChkbox = element(by.xpath("//p-checkbox[@formcontrolname='FreeScanEnabled']/div"));

		//b)DROPDOWN

		this.extractPeriodDpn = element(by.xpath("//p-dropdown[@formcontrolname='FrequencyID']/div/div[3]/label"));
		this.dataSourceDpn = element(by.xpath("//p-dropdown[@formcontrolname='DataSource']/div/div[3]/label"));
		this.sourceImageFormatDpn = element(by.xpath("//p-dropdown[@formcontrolname='SourceImageFormat']/div/div[3]/label"));

		//c)RADIOBUTTON

		this.includedataRdBtn_No = element(by.xpath("//p-radiobutton[@label='No']/div/div[2]"));
		this.includedataRdBtn_Yes = element(by.xpath("//p-radiobutton[@label='Yes']/div/div[2]"));

		//d)BUTTON

		this.backBtn = element(by.xpath("//p-table[12]//span[text()='Back']"));
		this.submitBtn = element(by.xpath("//*[@class='ui-button-success ng-star-inserted']//span[text()='Submit']"));
		this.submitconfirmdialogbtn = element(by.xpath("//*[@class='ui-dialog-content ui-widget-content']//span[text()='Submit']"))

		//Next Page Button
		this.nextBtn9 = element(by.xpath("//p-table[9]//span[text()='Next']"));
		this.nextBtn10 = element(by.xpath("//p-table[10]//span[text()='Next']"));
		this.nextBtn10a = element(by.xpath("//p-table/div/div/table/tfoot/tr/td[2]/p-button/button/span"));
		this.nextBtn11 = element(by.xpath("//p-table[11]//span[text()='Next']"));
		this.editBtn = element(by.xpath("//p-table[12]//button[text()='Edit']"))
		this.yes = element(by.xpath("//span[text()='Yes']"))
		this.presentDate = element(by.xpath("//*[contains(@class,'ui-datepicker-today ng-star-inserted')]"));

	}

	/********************************************************************
	//* Description     : Edit Client
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	editClient(data) {
		//page 1
		p1.nav_helper_edit(data)
		util.inputValidation(p1.address1, data.Address1, "Address 1", "Client Settings");
		util.inputValidation(p1.address2, data.Address2, "Address 2", "Client Settings");
		util.inputValidation(p1.city, data.city, "city", "Client Settings");
		util.inputValidation(p1.state, data.state, "state", "Client Settings");
		util.elementClickable(p1.nextBtn)

		//page2
		util.inputValidation(p2.internalClientNum, data.InternalClientNum, 'InternalClientNum', 'Add Client');
		browser.actions().sendKeys(protractor.Key.TAB).perform()
		browser.actions().sendKeys(data.ClientIdLbxNum).perform()
		util.elementClickable(p2.nextBtn)

		//page3
		util.elementClickable(p3.addSortpatternBtn);
		util.inputValidation(p3.workType, data.WorkType, 'WorkType', 'Add Client');
		util.inputValidation(p3.sortPattern, data.SortPattern, 'SortPattern', 'Add Client');
		util.inputValidation(p3.description, data.Description, 'Description', 'Add Client');
		util.elementClickable(p3.slaApplyBtn)
		util.elementClickable(p3.nextBtn)

		//page4
		util.elementClickable(p4.nextBtn)

		//page5
		util.inputValidation(p5.capturePassConfigName, data.capturePassConfigName, 'capturePassConfigName', 'Add Client');
		util.inputValidation(p5.encodePassConfigName, data.encodePassConfigName, 'encodePassConfigName', 'Add Client');
		if (data.RearImageCapture == 'yes')
			util.elementClickable(p5.rearImageCapture);
		if (data.FrontGreyScaleCapture == 'yes')
			util.elementClickable(p5.frontGreyScaleCapture);
		if (data.RearGreyScaleCapture == 'yes')
			util.elementClickable(p5.rearGreyScaleCapture);
		if (data.VerifyMICRData == 'yes')
			util.elementClickable(p5.verifyMICRData);
		if (data.EnableMicroFilm == 'yes')
			util.elementClickable(p5.enableMicroFilm);
		if (data.FrontImageCapture == 'yes')
			util.elementClickable(p5.chkFrontImageCapture);
		if (data.NodisplayImages == 'yes')
			util.elementClickable(p5.displayImages.get(0));
		else
			util.elementClickable(p5.displayImages.get(1));
		util.elementClickable(p5.captureToFile);
		util.elementClickable(p5.useControlDocument);
		util.inputValidation(p5.imageDataRetention, data.imageDataRetention, 'capturePassConfigName', 'Add Client');
		util.elementClickable(p5.nextBtn)

		//page6
		util.inputValidation(p6.captureDirectory, data.captureDirectory, 'Capture Directory', 'Add Client');
		util.selectDropDown(p6.fileName, data.fileName, 'fileName', 'Add Client');
		util.elementClickable(p6.nextbtn)

		//page7
		util.elementClickable(p7.availableStages)
		util.elementClickable(p7.rightarrowbtn.get(1));
		util.elementClickable(p7.nextBtn7)

		//page8
		util.inputValidation(p8.maxItems_Pocket, data.maxItems_Pocket, 'MaxItems Pocket', 'Add Client');
		util.inputValidation(p8.rejectPocketID, data.rejectPocketID, 'Reject PocketID', 'Add Client');
		util.elementClickable(p8.nextBtn)

		//page9
		util.inputValidation(p9.micrVerifedPocket, data.micrVerifedPocket, 'Micr Verifed Pocket', 'Add Client');
		util.inputValidation(p9.micrReviewPocket, data.micrReviewPocket, 'Micr Review Pocket', 'Add Client');
		util.elementClickable(p9.nextBtn)

		//page10
		util.selectDropDown(p10.selectMedia, data.selectMedia, 'selectMedia', 'Add Client');
		util.elementClickable(p10.availableFormats);
		util.elementClickable(p10.leftarrowrytBtn.get(2));
		util.inputValidation(p10.noOfCopies, '1', 'Micr Review Pocket', 'Add Client');
		util.elementClickable(p10.nextBtn);
		browser.sleep(2000)
		util.elementClickable(p10.archiveIndexAvailableFormatfieldData)
		util.elementClickable(p7.rightarrowbtn.get(3));
		util.elementClickable(p10.nextBtn1)

		//page11
		util.elementClickable(p11.nextBtn)
		// this.nav_helper_edit(data);
		//Page 12
		util.selectDropDown(this.dataSourceDpn, data.DataSource, 'Data Source ', 'Edit Client');
		util.selectDropDown(this.sourceImageFormatDpn, data.SourceImageFormat, 'SourceImageFormat ', 'Edit Client');
		if (data.EnableFreeScanScheduling == 'yes') {
			util.elementClickable(this.enableFreeScanSchedulingChkbox);
			util.selectDropDown(this.extractPeriodDpn, data.ExtractPeriod, 'ExtractPeriod ', 'Add Client');
			util.inputValidation(this.extractOn, data.ExtractOn, 'ExtractOn', 'Add Client');
			if (data.includedataRdBtn_No = 'yes')
				util.elementClickable(this.includedataRdBtn_Yes);
			else
				util.elementClickable(this.includedataRdBtn_No);
			if (data.ProcessDate != undefined) {
				util.elementClickable(this.initiatedate)
				this.presentDate.click()
			}
		}
		util.scrolldown(this.submitBtn)
		browser.sleep(2000)
		util.elementClickable(this.submitBtn);
		if (data.TestResultType != 'Inline') {
			util.elementClickable(this.submitconfirmdialogbtn);
			util.elementClickable(this.yes);
		}
		return util.resultMessage(data.TestResultType);
	}

	/********************************************************************
	//* Description     : Adding  new  Client
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	addClient(data) {
		//page 1
		util.selectDropDown(p1.group, data.Group, 'Group', 'Client Settings');
		if (data.ClientName != undefined)
			data.ClientName = data.ClientName + util.randomnumbergeneration(9999);
		util.inputValidation(p1.clientNameInput, data.ClientName, 'Client Name', 'Client Settings')
		util.inputValidation(p1.address1, data.Address1, "Address 1", "Client Settings");
		util.inputValidation(p1.address2, data.Address2, "Address 2", "Client Settings");
		util.inputValidation(p1.city, data.city, "city", "Client Settings");
		util.inputValidation(p1.state, data.state, "state", "Client Settings");
		util.elementClickable(p1.nextBtn)

		//page2
		util.inputValidation(p2.internalClientNum, data.InternalClientNum, 'InternalClientNum', 'Add Client');
		browser.actions().sendKeys(protractor.Key.TAB).perform()
		browser.actions().sendKeys(data.ClientIdLbxNum).perform()
		util.elementClickable(p2.nextBtn)

		//page3
		util.elementClickable(p3.addSortpatternBtn);
		util.inputValidation(p3.workType, data.WorkType, 'WorkType', 'Add Client');
		util.inputValidation(p3.sortPattern, data.SortPattern, 'SortPattern', 'Add Client');
		util.inputValidation(p3.description, data.Description, 'Description', 'Add Client');
		util.elementClickable(p3.slaApplyBtn)
		util.elementClickable(p3.nextBtn)

		//page4
		util.elementClickable(p4.nextBtn)

		//page5
		util.inputValidation(p5.capturePassConfigName, data.capturePassConfigName, 'capturePassConfigName', 'Add Client');
		util.inputValidation(p5.encodePassConfigName, data.encodePassConfigName, 'encodePassConfigName', 'Add Client');
		if (data.RearImageCapture == 'yes')
			util.elementClickable(p5.rearImageCapture);
		if (data.FrontGreyScaleCapture == 'yes')
			util.elementClickable(p5.frontGreyScaleCapture);
		if (data.RearGreyScaleCapture == 'yes')
			util.elementClickable(p5.rearGreyScaleCapture);
		if (data.VerifyMICRData == 'yes')
			util.elementClickable(p5.verifyMICRData);
		if (data.EnableMicroFilm == 'yes')
			util.elementClickable(p5.enableMicroFilm);
		if (data.FrontImageCapture == 'yes')
			util.elementClickable(p5.chkFrontImageCapture);
		if (data.NodisplayImages == 'yes')
			util.elementClickable(p5.displayImages.get(0));
		else
			util.elementClickable(p5.displayImages.get(1));
		util.elementClickable(p5.captureToFile);
		util.elementClickable(p5.useControlDocument);
		util.inputValidation(p5.imageDataRetention, data.imageDataRetention, 'capturePassConfigName', 'Add Client');
		util.elementClickable(p5.nextBtn)

		//page6
		util.inputValidation(p6.captureDirectory, data.captureDirectory, 'Capture Directory', 'Add Client');
		util.selectDropDown(p6.fileName, data.fileName, 'fileName', 'Add Client');
		util.elementClickable(p6.nextbtn)

		//page7
		util.elementClickable(p7.availableStages)
		util.elementClickable(p7.rightarrowbtn.get(1));
		util.elementClickable(p7.nextBtn7)

		//page8
		util.inputValidation(p8.maxItems_Pocket, data.maxItems_Pocket, 'MaxItems Pocket', 'Add Client');
		util.inputValidation(p8.rejectPocketID, data.rejectPocketID, 'Reject PocketID', 'Add Client');
		util.elementClickable(p8.nextBtn)

		//page9
		util.inputValidation(p9.micrVerifedPocket, data.micrVerifedPocket, 'Micr Verifed Pocket', 'Add Client');
		util.inputValidation(p9.micrReviewPocket, data.micrReviewPocket, 'Micr Review Pocket', 'Add Client');
		util.elementClickable(p9.nextBtn)

		//page10
		util.selectDropDown(p10.selectMedia, data.selectMedia, 'selectMedia', 'Add Client');
		util.elementClickable(p10.availableFormats);
		util.elementClickable(p10.arrowrytBtn.get(2));
		util.inputValidation(p10.noOfCopies, '1', 'Micr Review Pocket', 'Add Client');
		util.elementClickable(p10.nextBtn);
		browser.sleep(2000)
		util.elementClickable(p10.archiveIndexAvailableFormatfieldData)
		util.elementClickable(p7.rightarrowbtn.get(3));
		util.elementClickable(p10.nextBtn1)

		//page11
		util.elementClickable(p11.nextBtn)

		//page12
		util.selectDropDown(this.dataSourceDpn, data.DataSource, 'Data Source ', 'Add Client');
		util.selectDropDown(this.sourceImageFormatDpn, data.SourceImageFormat, 'SourceImageFormat ', 'Add Client');
		if (data.EnableFreeScanScheduling == 'yes') {
			util.elementClickable(this.enableFreeScanSchedulingChkbox);
			util.selectDropDown(this.extractPeriodDpn, data.ExtractPeriod, 'ExtractPeriod ', 'Add Client');
			util.inputValidation(this.extractOn, data.ExtractOn, 'ExtractOn', 'Add Client');
			if (data.includedataRdBtn_No = 'yes')
				util.elementClickable(this.includedataRdBtn_Yes);
			else
				util.elementClickable(this.includedataRdBtn_No);
			if (data.ProcessDate != undefined) {
				util.elementClickable(this.initiatedate)
				this.presentDate.click()
			}
		}
		util.scrolldown(this.submitBtn)
		browser.sleep(2000)
		// util.elementClickable(this.submitBtn);
		// browser.sleep(4000)
		util.multipleClickOnElement(this.submitBtn).multipleClickOnElement(this.submitconfirmdialogbtn).elementClickable(this.yes);;
		// util.elementClickable(this.submitconfirmdialogbtn);
		// if (data.TestResultType != 'Inline')
		// util.elementClickable(this.submitconfirmdialogbtn);
		return util.resultMessage(data.TestResultType);
	}


	/********************************************************************
	//* Description     : Getting value from UI 
	//* Input Params    : NILL
	//* Return Values   : return the UI Value
	/********************************************************************/
	get_ExtractOptions() {
		return this.extractOptions.getText().then(function (returnValue) {
			var value = returnValue.split(/\((.*)\)/).slice(1, 2).toString();
			return value;
		})
	}
	get_DataSource() {
		return this.dataSourceDpn.getText().then(function (returnValue) {
			//var value = returnValue.split(" ",2);
			//return value;
			return returnValue;
		})
	}
	get_SourceImageFormat() {
		return this.sourceImageFormatDpn.getText().then(function (returnValue) {
			return returnValue;
		})
	}
	//Free Scan Scheduling
	get_EnableFreeScanScheduling() {
		return this.enableFreeScanSchedulingChkbox.getAttribute('class').then(function (returnValue) {
			if (returnValue.includes('ui-label-active')) {
				return true
			}
			else
				return false;
		})
	}
	get_ExtractPeriod() {
		return this.extractPeriodDpn.getText().then(function (returnValue) {
			return returnValue;
		})
	}
	get_ExtractOn() {
		return this.extractOn.getAttribute('value').then(function (returnValue) {
			return returnValue;
		})
	}
	//Extract Range
	get_Includedata() {

		return this.includedataRdBtn_No.getAttribute('class').then(function (returnValue) {
			if (returnValue.includes('ui-state-active')) {
				console.log("Transmission is Enable before")
				return true
			}
			else
				return false

		})
	}
	get_Initiatedate() {
		return this.initiatedate.getAttribute('value').then(function (returnValue) {
			return returnValue;
		})
	}
	/********************************************************************
	//* Description     : Helper method for View and Edit/Add
	//* Input Params    : data-Excel sheet data
	//* Return Values   : NILL
	/********************************************************************/
	nav_helper_view(data) {
		p11.nav_helper_view(data);
		util.elementClickable(p11.nextBtn)
	}
	nav_helper_edit(data) {
		p11.nav_helper_edit(data);
		util.elementClickable(p11.nextBtn)
	}
	nav_helper_add(data) {
		p11.nav_helper_add(data);
		util.elementClickable(p11.nextBtn)
	}
}
module.exports = new ExtractOption();