const { browser } = require("protractor");


var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');
//var creProfileHome = requirePage("/CRE_Profile/CREProfileHome_Page");
//var idmProfileHome = requirePage("/IDM_Profile/IDMPofileHome_Page");

"use strict";
//var epcProfile = element(by.xpath("//ul[@role='tablist']/li/a/span[text()='CRE Profile']"));
var Profile_clientName = element(by.xpath("//tr[1]/td[1]"));
var Profile_accountNumber = element(by.xpath("//tr[1]/td[2]"));
var Profile_profileName = element(by.xpath("//tr[1]/td[3]"));
var Profile_description = element(by.xpath("//tr[1]/td[4]"));
var Profile_maker = element(by.xpath("//tr[1]/td[5]"));
var Profile_createdDate = element(by.xpath("//tr[1]/td[6]"));
var Profile_requestedType = element(by.xpath("//tr[1]/td[7]"));
//Common Locators
var approve = element(by.xpath("//*[normalize-space(text())='client need to be clone']/ancestor::tr//td[last()]//img[@alt='Approve']"));
var reject = element.all(by.xpath("//*[normalize-space(text())='client need to be clone']/ancestor::tr//td[last()]//img[@alt='Reject']"));
var referBack = element.all(by.xpath("//*[normalize-space(text())='client need to be clone']/ancestor::tr//td[last()]//img[@alt='Refer back']"));
var reject = element.all(by.xpath("//td[7]/div/span[4]/a[2]/img"));
var popup_message = element.all(by.xpath("//input[@formcontrolname='Message']"));
var yes = element.all(by.xpath("//span[text()='Yes']"));
var no = element.all(by.xpath("//span[text()='No']"));
var createdDate = element.all(by.xpath("//tr/td[6]"))
var maker
var details

//locators for CRE Transmit tab

var profileId
var transmitName
var clientName
var profileName

//********************************************************************
//* Description     : Get Column Index 
//* Input Params    : Column Name                   
//* Return Values   : Index Number
//********************************************************************
function get_col_index(col_name) {
	return element.all(by.xpath('//thead/tr/th')).each(function (elem, index) {
		return elem.getText().then(function (text) {
			if (text == col_name) {
				steps_util.info_step('Checker Page 50' + index);
				return index;
			}
		});
	});
}


//********************************************************************
//* Description     : Get UI data from particular column
//* Input Params    : Column Name                   
//* Return Values   : Specific data
//********************************************************************
function get_column_ui_data(col_name) {
	var index = get_col_index(col_name);
	console.log(index);

}

//********************************************************************
//* Description     : Navitation to CRE Checker page
//* Input Params    : Null                   
//* Return Values   : Null
//********************************************************************
function navigate_CREChecker() {

	creProfileHome.click_menu_item('Admin Tools', 'Checker View');
}


//********************************************************************
//* Description     : Navitation to CRE Checker>CRE Individual tab
//* Input Params    : tab Name                   
//* Return Values   : Null
//********************************************************************
function navigate_checker_tabs(tab_name) {
	var tab_element = element(by.xpath("//ul[@role='tablist']/li/a/span[contains(text(),'" + tab_name + "')]"));
	browser.sleep(2000)
	util.elementClickable(tab_element)

}

function get_row_number(element_name, column_name) {
	// var index =
	return get_col_index(column_name).then(async function (index) {
		var row_data = element.all(by.xpath("//table/tbody/tr/td[" + index + "]/span"));
		steps_util.info_step('row_data lengthChecker 102' + row_data.length)
		steps_util.info_step('row_data count Checker 103' + await row_data.count())
		row_data.count().then(function (txt) {
			steps_util.info_step('row_data count Checker 105' + txt)
		})
		for (var i = 0; i < row_data.count(); i++) {
			steps_util.info_step('Index of the element' + i)
			row_data.get(i).getText().then(function (txt) {
				steps_util.info_step('Text' + txt)
				if (txt == column_name) {
					return i;
				}
			})
		}

	})

}
//********************************************************************
//* Description     : performing action based on the Action Item (Aprove,refer Back)
//* Input Params    : element_name- Name for which action item required eg: Client Name
//*                 : column_name - Name of the Column 
//*                 : actionItem  - Aprove,Refer Back)
//* Return Values   :  Boolean value (True/False)
//********************************************************************
function approve_record(element_name, column_name, actionItem) {
	if (actionItem == 'Approve') {
		var approve_btn = element(by.xpath("//*[normalize-space(text())='" + element_name + "']/ancestor::tr//td[last()]//img[@alt='Approve']"));
		var approve_label = element(by.xpath("//*[normalize-space(text())='" + element_name + "']/ancestor::tr//span[text()='Approved']"));
		steps_util.info_step('Clicking on the Approve Action');
		browser.sleep(2000)
		approve_btn.isDisplayed().then(function(res){
			steps_util.info_step('Record not present in Checker screen for further action'+ res);
		})
		util.elementClickable(approve_btn)
		browser.sleep(3000)
		popup_message.sendKeys('This is Approved by Test Automation Script')
		yes.click()
		steps_util.info_step('Approve the newly created Transmisison with name' + element_name);
		browser.sleep(3000)
		return approve_label.isPresent().then(function (res) {
			if (res) {
				steps_util.info_step('Status for Approval' + res);
				return res
			}
			else
				return res
		})
	}
	else if (actionItem == 'Refer Back') {
		var referBack_btn = element(by.xpath("//*[normalize-space(text())='" + element_name + "']/ancestor::tr//td[last()]//img[@alt='Refer back']"));
		var referBack_label = element(by.xpath("//*[normalize-space(text())='" + element_name + "']/ancestor::tr//span[text()='Referred back']"));
		steps_util.info_step('Clicking on the Refer Back Action');
		browser.sleep(2000)
		referBack_btn.isDisplayed().then(function(res){
			steps_util.info_step('Record not present in Checker screen for further action'+ res);
		})
		util.elementClickable(referBack_btn)
		browser.sleep(2000)
		popup_message.sendKeys('This is Refer Back by Test Automation Script')
		yes.click()
		steps_util.info_step('Refer Back the newly created Transmisison with name' + element_name);
		browser.sleep(3000)
		return referBack_label.isPresent().then(function (res) {
			if (res) {
				steps_util.info_step('Status for Refer Back');
				return res
			}
			else
				return res
		})
	}

}

//********************************************************************
//* Description     : Getting Value from UI from Checker Screen
//* Return Values   : Value from UI
//********************************************************************

function get_ClientName() {
	return clientName.get(0).getText().then(function (returnValue) {
		console.log("returnValue");
		steps_util.info_step('Retrive ClientName from UI' + returnValue)
		return returnValue;
	});
}
function get_AccountNumber() {
	return accountNumber.get(0).getText().then(function (returnValue) {
		steps_util.info_step('Retrive AccountNumber from UI' + returnValue)
		return returnValue;
	});
}
function get_Description() {
	return description.get(0).getText().then(function (returnValue) {
		steps_util.info_step('Retrive Description from UI' + returnValue)
		return returnValue;
	});
}
function get_CreatedBy() {
	return createdBy.get(0).getText().then(function (returnValue) {
		steps_util.info_step('Retrive CreatedBy from UI' + returnValue)
		return returnValue;
	});
}
function get_CreatedByList() {
	return createdBy.getText().then(function (returnValue) {
		steps_util.info_step('Retrive CreatedByList from UI' + returnValue)
		return returnValue;
	});
}
function get_CreatedDate() {
	return createdDate.get(0).getText().then(function (returnValue) {
		steps_util.info_step('Retrive CreatedDate from UI' + returnValue)
		return returnValue.toString().split(' ')[0];
	});
}
function get_CreatedTime() {
	return createdDate.get(0).getText().then(function (returnValue) {
		return returnValue.toString().split(' ')[1];
		steps_util.info_step('Retrive CreatedTime from UI' + returnValue)
	});
}
function get_ProfileName() {
	return profileName.get(0).getText().then(function (returnValue) {
		steps_util.info_step('Retrive ProfileName from UI' + returnValue)
		return returnValue;
	});
}
function get_Count() {
	return profileName.count().then(function (returnValue) {
		steps_util.info_step('Retrive Count from UI' + returnValue)
		return returnValue;
	});
}


module.exports = {
	get_column_ui_data: get_column_ui_data,
	navigate_CREChecker: navigate_CREChecker,
	// navigate_IDMChecker: navigate_IDMChecker,
	navigate_checker_tabs: navigate_checker_tabs,
	approve_record: approve_record,

}






