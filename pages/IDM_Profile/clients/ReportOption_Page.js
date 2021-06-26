/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/05/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
const { element } = require("protractor");
var p10 = require("../../../pages/IDM_Profile/clients/OutputFormat_Page");
var p7 = require("../../../pages/IDM_Profile/clients/WorkflowStage_Page");

"use strict";

class ReportOption {
	constructor() {
		this.transportConfigurationOutput = element(by.xpath("//th[contains(text(),'Report Options ')]"));
		this.applicationPrinterDpn = element(by.xpath("//p-dropdown[@formcontrolname='AppDefaultPrinter']/div/div[3]/span"));
		this.itemSummaryDpn = element(by.xpath("//p-dropdown[@formcontrolname='SummaryRptStage']/div/div[3]/label"));
		this.itemDetailDpn = element(by.xpath("//p-dropdown[@formcontrolname='DetailRptStage']/div/div[3]/label"));
		this.itemSummaryChkbox = element(by.xpath("//p-checkbox[@label='Item Summary']/div/div[2]"));
		this.detailSummaryChkbox = element(by.xpath("//p-checkbox[@label='Item Detail']/div/div[2]"));
		this.editBtn = element(by.xpath("//p-table[11]//button[text()='Edit']"))
		this.nextBtn = element(by.xpath("//p-table[11]//span[text()='Next']"));

	}

	/********************************************************************
	//* Description     : Edit Client for Report Option
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	editClient(data) {
		this.nav_helper_edit(data);
		/*if(data.itemSummaryDpn!=undefined)  {
			util.elementClickable(this.itemSummaryChkbox);
			util.selectDropDown(this.itemSummaryDpn,data,itemSummaryDpn,'item Summary Dpn','Edit Client')
		}*/
		// if(data.itemDetailDpn!=undefined)  {
		// 	this.detailSummaryChkbox.click();
		// 	util.selectDropDown(this.itemDetailDpn,data.itemDetailDpn,'item Summary Dpn','Edit Client')
		// }
		// browser.sleep(2000)
		// this.nextBtn.click()
		return util.resultMessage(data.TestResultType);
	}
	/********************************************************************
	//* Description     : Add Client for Report Option
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	addClient(data) {
		this.nav_helper_add(data);
		/*if(data.itemSummaryDpn!=undefined)  {
			util.elementClickable(this.itemSummaryChkbox);
			util.selectDropDown(this.itemSummaryDpn,data,itemSummaryDpn,'item Summary Dpn','Edit Client')
		}*/
		if (data.itemDetailDpn != undefined) {
			util.elementClickable(this.detailSummaryChkbox);
			util.selectDropDown(this.itemDetailDpn, data.itemDetailDpn, 'item Summary Dpn', 'Edit Client')
		}
		browser.sleep(2000)
		util.elementClickable(this.nextBtn)
		if (data.TestResultType == 'Inline')
			return util.resultMessage(data.TestResultType);
	}


	/********************************************************************
	//* Description     : Getting value from UI 
	//* Input Params    : NILL
	//* Return Values   : return the UI Value
	/********************************************************************/
	get_ItemSummaryvalue() {
		return this.itemSummaryDpn.getText().then(function (returnValue) {
			console.log("Item Summary" + returnValue)
			if (returnValue != 'None')
				return true;
			else
				return false;
		});
	}
	get_ItemDetailvalue() {
		return this.itemDetailDpn.getText().then(function (returnValue) {
			console.log("ItemDetail" + returnValue)
			if (returnValue != 'None')
				return true;
			else
				return false;
		});
	}
	get_ApplicationPrinterDpn() {
		return this.applicationPrinterDpn.getText().then(function (returnValue) {
			console.log("Application Printer Dpn" + returnValue)
			return returnValue;
		});
	}
	get_ItemSummaryDpn() {
		return this.itemSummaryDpn.getText().then(function (returnValue) {
			console.log("Item Summary Dpn" + returnValue)
			if (returnValue == 'None')
				return false;
			else
				return returnValue
		});
	}
	get_ItemDetailDpn() {
		return this.itemDetailDpn.getText().then(function (returnValue) {
			console.log("Item Detail Dpn" + returnValue)
			if (returnValue == 'None')
				return false;
			else
				return returnValue
		});
	}
	/********************************************************************
	//* Description     : Helper method for View and Edit/Add
	//* Input Params    : data-Excel sheet data
	//* Return Values   : NILL
	/********************************************************************/
	nav_helper_view(data) {
		p10.nav_helper_view(data)
		util.elementClickable(p10.nextBtn)
		util.elementClickable(p10.nextBtn1)
		// util.elementClickable(p10.nextBtn1)

	}
	nav_helper_edit(data) {
		p10.nav_helper_edit(data)
		util.elementClickable(p10.nextBtn)
		util.elementClickable(p10.archiveIndexAvailableFormatfieldData)
		util.elementClickable(p7.rightarrowbtn.get(3));
		util.elementClickable(p10.nextBtn1)

	}
	nav_helper_add(data) {
		p10.nav_helper_add(data)
		util.elementClickable(p10.nextBtn)
		util.elementClickable(p10.nextBtn1)
	}
}

module.exports = new ReportOption();
