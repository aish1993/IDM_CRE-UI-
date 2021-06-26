/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/04/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var p9 = require("../../../pages/IDM_Profile/clients/MICRVerification_Page");
"use strict";

class OutputFormat {
	constructor() {
		this.selectMedia = element(by.xpath("//p-dropdown[@formcontrolname='media']/div/div[3]/label"));
		this.noOfCopies = element(by.xpath("//p-spinner[@formcontrolname='formatCopies']/span/input"));
		this.assignedFormats = element(by.xpath("//p-picklist[@sourceheader='Available Formats']/div/div[4]/ul/li[2]/span"));
		this.leftarrowrytBtn = element.all(by.xpath("//p-picklist/div/div[3]/div/button[1]/span[1]"));
		this.rightarrowbtn=element.all("//p-picklist/div/div[3]/div/button[4]/span[1]")
		this.backBtn = element(by.xpath("//p-table[1]//span[text()='Back']"));
		this.priority = element(by.xpath("//p-spinner[@formcontrolname='formatPriority']/span/input"));
		this.availableFormats = element(by.xpath("//p-picklist[@sourceheader='Available Formats']/div/div[2]/ul/li[2]"));
		this.nextBtn = element(by.xpath("//p-table[10]//span[text()='Next']"));
		this.nextBtn1 = element(by.xpath("//p-table/div/div/table/tfoot/tr/td[2]/p-button/button/span"));
		this.editBtn = element(by.xpath("//p-table[10]//button[text()='Edit']"))
		this.description = element(by.xpath("//p-table[10]/div/div/table/tbody/tr[5]/td[2]"));
		this.className = element(by.xpath("//p-table[10]/div/div/table/tbody/tr[6]/td[2]"));
		this.archiveIndexAvailableFormatfieldData = element(by.xpath("//p-table[1]/div/div/table/tbody/tr[1]/td/p-picklist/div/div[2]/ul/li[2]"))
	}
	/********************************************************************
	//* Description     : Edit Client for Output Format
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	editClient(data) {
		this.nav_helper_edit(data)
		// util.selectDropDown(this.selectMedia, data.selectMedia, 'selectMedia', 'Edit Client');
		util.elementClickable(this.availableFormats);
		util.elementClickable(this.leftarrowrytBtn.get(2));
		if(data.ExpectedResult=='Assigned Formats is required'){
			util.elementClickable(this.rightarrowbtn.get(0));
			}
		util.elementClickable(this.nextBtn);
		if (data.TestResultType != 'Inline')
		util.elementClickable(this.nextBtn1)
		return util.resultMessage(data.TestResultType)
	}
	/********************************************************************
	//* Description     : Add Client for Output Format
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	addClient(data) {
		this.nav_helper_add(data)
		util.selectDropDown(this.selectMedia, data.selectMedia, 'selectMedia', 'Edit Client');
		if(data.TestResultType!='Inline'){
		util.elementClickable(this.availableFormats);
		util.elementClickable(this.leftarrowrytBtn.get(2));
		}
		util.inputValidation(this.noOfCopies, data.NoOfCopies, 'Micr Review Pocket', 'Add Client');
		util.elementClickable(this.nextBtn);
		util.elementClickable(this.nextBtn1)
		if (data.TestResultType == 'Inline')
			return util.resultMessage(data.TestResultType)
	}


	/********************************************************************
	//* Description     : Getting value from UI 
	//* Input Params    : NILL
	//* Return Values   : return the UI Value
	/********************************************************************/
	get_SelectMedia() {
		return this.selectMedia.getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_AssignedFormats() {
		return this.assignedFormats.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	get_NoOfCopies() {
		return this.noOfCopies.getAttribute('value').then(function (returnValue) {
			console.log("Number Of Copies " + returnValue);
			return returnValue;
		});
	}

	get_priority() {
		return this.priority.getAttribute('value').then(function (returnValue) {
			return returnValue;
		});
	}
	/********************************************************************
	//* Description     : Helper method for View and Edit/Add
	//* Input Params    : data-Excel sheet data
	//* Return Values   : NILL
	/********************************************************************/
	nav_helper_view(data) {
		p9.nav_helper_view(data);
		util.elementClickable(p9.nextBtn)
		browser.sleep(2000)
		util.elementClickable(this.assignedFormats)
	}
	nav_helper_edit(data) {
		p9.nav_helper_edit(data);
		util.elementClickable(p9.nextBtn)
		util.elementClickable(this.assignedFormats)

	}
	nav_helper_add(data) {
		p9.nav_helper_add(data);
		util.elementClickable(p9.nextBtn)

	}

}


module.exports = new OutputFormat();
