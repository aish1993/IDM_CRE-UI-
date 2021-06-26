/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 02/11/2020
 * Updated by: Sanjay M(mundu.s@hcl.com) 12/10/2020
 *******************************************/

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var dashBoard = requirePage('DashBoard_Page');
"use strict";

var status = element.all(by.xpath("//tr//td[1]//span[2][@class='ng-star-inserted']"));
var profileID = element.all(by.xpath("//tr/td[2]"));
var customer = element.all(by.xpath("//tr/td[3]"));
var profile = element.all(by.xpath("//tr/td[4]"));
var inFile = element.all(by.xpath("//tr/td[5]"));
var dateTime = element.all(by.xpath("//tr/td[6]"));
var lockBoxNumber = element.all(by.xpath("//tr/td[7]"));
var detailsbtn = element(by.xpath("//span[text()='Details']"));
var transProfile = element(by.xpath("//input[@formcontrolname='profilId']"));
var client = element(by.xpath("//input[@formcontrolname='clientId']"));
var epcProfile = element(by.xpath("//input[@formcontrolname='epcprofile']"));
var tName = element(by.xpath("//input[@formcontrolname='tName']"));
var runTransmission = element(by.xpath("//input[@formcontrolname='runTransmision']"));
var inputProces = element(by.xpath("//input[@formcontrolname='inputProces']"));
var retryUntil = element(by.xpath("//input[@formcontrolname='retryUntil']"));
var addtionData = element(by.xpath("//input[@formcontrolname='addtionData']"));
var outputProces = element(by.xpath("//input[@formcontrolname='outputProces']"));
var transBlankFile = element(by.xpath("//p-checkbox[@formcontrolname='transBlankFile']/div/div[2]"));
var checkbox = element.all(by.xpath("//p-checkbox/div/div[2]/span"));
var reqVerify = element(by.xpath("//p-checkbox[@formcontrolname='reqVerify']/div/div[2]"));
var convertToUnix = element(by.xpath("//p-checkbox[@formcontrolname='convertToUnix']/div/div[2]"));
var tarnsmitTo = element(by.xpath("//input[@formcontrolname='tarnsmitTo']"));
var fileName = element(by.xpath("//input[@formcontrolname='fileName']"));
var refresh = element(by.xpath("//span[text()='Refresh']"));
var close = element(by.xpath("//span[text()='Close']"));
var hostName = element(by.xpath("//input[@formcontrolname='hostName']"));
var hostUser = element(by.xpath("//input[@formcontrolname='hostUser']"));
var statusdpn = element(by.xpath("//p-dropdown[@appendto='body']/div"));
var eodbtn = element(by.xpath("//button[@label='EOD']/span"))
var lastLogin_close = element(by.xpath("//span[@class='last-login']"));


//Menu Item locators

function navigate_creMonitor() {
	dashBoard.navigate_creMonitor();
}

//********************************************************************
//* Description     : method navigation to submodules
//* Input Params    : NILL
//* Return Values   : NILL
//********************************************************************

function navigate_cre_menu(menu, subMenu) {
	// dashBoard.navigate_creMonitor();
	browser.sleep(5000);
	var menu_item = browser.driver.findElement(by.xpath("//span[text()='" + menu + "'][@class='ui-menuitem-text']"))
	var subMenu_item = browser.driver.findElement(by.xpath("//span[text()='" + subMenu + "'][@class='ui-menuitem-text']"))
	menu_item.click()
	browser.sleep(2000);
	subMenu_item.click();
	browser.refresh();
}

function navigate_addTransmission() {
	dashBoard.navigate_creMonitor();
}

//********************************************************************
//* Description     : method navigating to View profile
//* Input Params    : NILL
//* Return Values   : NILL
//******************************************************************** 
function navigate_viewProfile() {
	browser.sleep(4000);
	browser.driver.findElement(By.xpath("//table/tbody/tr[1]")).click();
	var test=browser.driver.findElement(By.xpath("//table/tbody/tr[1]"));
	browser.actions().mouseMove(test).perform();
	browser.actions().click(protractor.Button.RIGHT).perform();
	browser.sleep(2000);
	browser.driver.findElement(By.xpath("//span[text()='View Profile']")).click();
	browser.refresh();
}

//********************************************************************
//* Description     : Getting value from UI
//* Input Params    : NILL
//* Return Values   : Value from UI
//********************************************************************

function get_Status() {
	browser.wait(EC.presenceOf(status.get(0)), 3000, 'element not found within specified wait time');
	return status.get(0).getText().then(function (returnValue) {
		return returnValue;
	});

}
function get_ProfileID() {
	browser.wait(EC.presenceOf(profileID.get(0)), 3000, 'element not found within specified wait time');
	return profileID.get(0).getText().then(function (returnValue) {
		return returnValue * 1;
	});
}
function get_Customer() {

	browser.wait(EC.presenceOf(customer.get(0)), 3000, 'element not found within specified wait time');
	return customer.get(0).getText().then(function (returnValue) {
		return returnValue;
	})
}
function get_Profile() {

	browser.wait(EC.presenceOf(profile.get(0)), 3000, 'element not found within specified wait time');
	return profile.get(0).getText().then(function (returnValue) {
		return returnValue;
	});
}
function get_InFile() {

	browser.wait(EC.presenceOf(inFile.get(0)), 3000, 'element not found within specified wait time');
	return inFile.get(0).getText().then(function (returnValue) {
		return returnValue;
	});
}
function get_DateTime() {

	browser.wait(EC.presenceOf(dateTime.get(0)), 3000, 'element not found within specified wait time');
	return dateTime.get(0).getText().then(function (returnValue) {
		var a = returnValue.split('/');
		var newVal = a[1] + '-' + a[0] + '-' + a[2]
		var date = new Date(newVal);
		date.setHours(date.getHours() + 5);
		date.setMinutes(date.getMinutes() + 30);
		var date2 = date.toUTCString();
		return date2;
	});
}
function get_LockBoxNumber() {

	browser.wait(EC.presenceOf(lockBoxNumber.get(0)), 3000, 'element not found within specified wait time');
	return lockBoxNumber.get(0).getText().then(function (returnValue) {
		return returnValue;
	});
}

//********Detail button**************//

function get_transProfile() {
	return transProfile.getAttribute('value').then(function (returnValue) {
		console.log("***************" + returnValue)
		return returnValue;
	});
}
function get_client() {
	return client.getAttribute('value').then(function (returnValue) {
		console.log("***********" + returnValue)
		return returnValue;
	});
}
function get_epcProfile() {
	return epcProfile.getAttribute('value').then(function (returnValue) {
		console.log("***********" + returnValue)
		return returnValue;
	});
}
function get_tName() {
	return tName.getAttribute('value').then(function (returnValue) {
		console.log("***********" + returnValue)
		return returnValue;
	});
}

function get_runTransmission() {
	return runTransmission.getAttribute('value').then(function (retValue) {
		return retValue;
	})
}

function get_inputProces() {
	return inputProces.getAttribute('value').then(function (returnValue) {
		return returnValue;
	});
}
function get_retryUntil() {
	return retryUntil.getAttribute('value').then(function (returnValue) {
		return returnValue;
	});
}
function get_addtionData() {
	return addtionData.getAttribute('value').then(function (returnValue) {
		return returnValue;
	});
}
function get_outputProces() {
	return outputProces.getAttribute('value').then(function (returnValue) {
		return returnValue;
	});
}
function get_transBlankFile() {
	return transBlankFile.getAttribute('class').then(function (returnValue) {
		if (returnValue.includes('ui-state-active')) {
			return true;
		}
		else {
			return false;
		}
	});
}

function get_reqVerify() {
	return reqVerify.getAttribute('class').then(function (returnValue) {
		if (returnValue.includes('ui-state-active')) {
			return true;
		}
		else
			return false
	});
}
function get_convertToUnix() {
	return convertToUnix.getAttribute('class').then(function (returnValue) {
		if (returnValue.includes('ui-state-active')) {
			return true;
		}
		else
			return false
	});
}
function get_tarnsmitTo() {
	return tarnsmitTo.getText().then(function (returnValue) {
		console.log(returnValue)
		return returnValue;
	});
}
function get_hostName() {
	return hostName.getAttribute('value').then(function (returnValue) {
		console.log(returnValue)
		return returnValue;
	});
}
function get_hostUser() {
	return hostUser.getAttribute('value').then(function (returnValue) {
		console.log(returnValue)
		return returnValue;
	});
}
function get_fileName() {
	return fileName.getAttribute('value').then(function (returnValue) {
		console.log(returnValue)
		return returnValue;
	});
}

module.exports = {

		navigate_creMonitor:navigate_creMonitor,
		navigate_addTransmission: navigate_addTransmission,
		navigate_viewProfile: navigate_viewProfile,
		navigate_cre_menu: navigate_cre_menu,
		get_Status: get_Status,
		get_ProfileID: get_ProfileID,
		get_Customer: get_Customer,
		get_Profile: get_Profile,
		get_InFile: get_InFile,
		get_DateTime: get_DateTime,
		get_LockBoxNumber: get_LockBoxNumber,
		get_transProfile: get_transProfile,
		get_client: get_client,
		get_epcProfile: get_epcProfile,
		get_tName: get_tName,
		get_runTransmission: get_runTransmission,
		get_inputProces: get_inputProces,
		get_retryUntil: get_retryUntil,
		get_addtionData: get_addtionData,
		get_outputProces: get_outputProces,
		get_transBlankFile: get_transBlankFile,
		get_reqVerify: get_reqVerify,
		get_convertToUnix: get_convertToUnix,
		get_tarnsmitTo: get_tarnsmitTo,
		get_hostName: get_hostName,
		get_hostUser: get_hostUser,
		get_fileName: get_fileName,
}
