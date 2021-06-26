const { browser } = require("protractor");

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');

var transProfile = requirePage("/CRE_Monitor/transmission/TransmissionProfile_Page");
"use strict";

var runAt = element(by.xpath("//p-calendar[@formcontrolname='runAt']/span/input"));
var retryUntil = element(by.xpath("//p-calendar[@formcontrolname='retryUntil']/span/input"));
var inputProcess = element(by.xpath("//p-dropdown[@formcontrolname='inputProcess']/div/div[3]/label"));
var clientid = element(by.xpath("//p-inputmask[@formcontrolname='additionalData']/input"));
var sequenceNumber = element(by.xpath("//p-inputmask[@formcontrolname='seqNum']/input"));;
var lbxNum = element(by.xpath("//input[@placeholder='Enter Lockbox Number']"));
var additionalData = element(by.xpath("//input[@formcontrolname='additionalData']"));
var sourcename = element(by.xpath("//input[@formcontrolname='serverName']"));
var outputProcess = element(by.xpath("//p-dropdown[@formcontrolname='outputProcess']/div/div[3]"));
var transmitTo = element(by.xpath("//p-dropdown[@formcontrolname='transmitTo']/div/div[3]/label"));

var userid = element(by.xpath("//input[@formcontrolname='userID']"));
var password = element(by.xpath("//input[@formcontrolname='password']"));
var confirmpassword = element(by.xpath("//input[@formcontrolname='confirmPassword']"));

var transmitBlank = element(by.xpath("//p-checkbox[@formcontrolname='transmitBlank']/div/div[2]"));
var rVerification = element(by.xpath("//p-checkbox[@formcontrolname='rVerification']/div/div[2]"));
var convertToUnix = element(by.xpath("//p-checkbox[@formcontrolname='convertToUnix']/div/div[2]"));
var checkbox = element.all(by.xpath("//input[@type='checkbox']"));

var sun = element(by.xpath("//p-checkbox[@formcontrolname='sun']/div/div[2]"));
var mon = element(by.xpath("//p-checkbox[@formcontrolname='mon']/div/div[2]"));
var tue = element(by.xpath("//p-checkbox[@formcontrolname='tue']/div/div[2]"));
var wed = element(by.xpath("//p-checkbox[@formcontrolname='wed']/div/div[2]"));
var thu = element(by.xpath("//p-checkbox[@formcontrolname='thu']/div/div[2]"));
var fri = element(by.xpath("//p-checkbox[@formcontrolname='fri']/div/div[2]"));
var sat = element(by.xpath("//p-checkbox[@formcontrolname='sat']/div/div[2]"));

var submitbtn = element.all(by.xpath("//span[text()='Submit']"));
var nextBtn1 = element(by.xpath("//p-panel[1]//span[text()='Next']"));
var nextbtn2 = element.all(by.xpath("//button//span[text()='Next']"))
var yesbtn = element(by.xpath("//span[text()='Yes']"))

var serverName = element(by.xpath("//input[@formcontrolname='serverName']"));
var userid = element(by.xpath("//input[@formcontrolname='userID']"));
var password = element(by.xpath("//input[@formcontrolname='password']"));
var confirmPassword = element(by.xpath("//input[@formcontrolname='confirmPassword']"));
var path = element(by.xpath("//input[@formcontrolname='path']"));
var passiveConnection = element(by.xpath("//p-checkbox[@formcontrolname='passiveConnection']/div/div[2]"));
var clientid = element(by.xpath("//input[@placeholder='Enter Client Id']"))
var sequenceNo = element(by.xpath("//input[@placeholder='Enter Sequence Number']"))
var fileName = element(by.xpath("//input[@formcontrolname='fileName']"))


async function navigate_transConfig() {
	var trans_name = await transProfile.navigate_transConfig();
	return trans_name;
}
async function editnavigate_transConfig() {
	var trans_name = await transProfile.editnavigate_transConfig();
	return trans_name;
}
async function navigate_addTransConfig(data) {
	transProfile.navigate_addTransConfig(data);
}
async function navigate_transDest() {
	var trans_name = await transProfile.navigate_transConfig()
	util.elementClickable(this.nextBtn1)
	return trans_name;
}

//********************************************************************
//* Description     : Creating new Transmission 
//* Input Params    : data- Excel shett Data data 
//* Return Values   : Toast message
//********************************************************************
function add_transmission(data) {
	transProfile.navigate_addTransConfig(data);
	browser.sleep(3000);
	util.selectDropDown(inputProcess, data.InputProcess, 'Input Process', ' Transmission');
	util.inputValidation(runAt, data.RunTransmissionAt, 'Run Transmission at', 'Add Transmission');
	if (data.Category == 'Yes')
		data.LockboxNumber = util.randomnumbergeneration(9999999)
	if (data.ClientId != undefined)
		util.inputValidation(clientid, data.ClientId, 'ClientId ', 'Add Transmission');
	if (data.SequenceNo != undefined)
		util.inputValidation(sequenceNo, data.SequenceNo, 'Sequence Number', 'Add Transmission');
	browser.sleep(3000);
	util.selectDropDown(outputProcess, data.OutputProcess, 'Output Process', 'Add Transmission');

	if (data.InputProcess != 'EDS National Lockbox')
		util.inputValidation(lbxNum, data.LockboxNumber, 'Lockbox Number', 'Add Transmission');
	browser.sleep(3000);
	util.inputValidation(retryUntil, data.RetryUntil, 'Retry until', 'Add Transmission');
	util.scrolldown(transmitBlank)

	if (data.TransmitBlankFile == 'Yes') {

		util.elementClickable(transmitBlank)
	}
	if (data.RequiresVerification == 'Yes') {
		util.elementClickable(rVerification)
	}
	if (data.ConvertToUnix == 'Yes') {
		util.elementClickable(convertToUnix)
	}
	if (data.Sun == 'Yes') {
		util.elementClickable(sun)
	}
	if (data.Mon == 'Yes') {
		util.elementClickable(mon)
	}
	if (data.Tue == 'Yes') {
		util.elementClickable(tue)
	}
	if (data.Wed == 'Yes') {
		util.elementClickable(wed)
	}
	if (data.Thu == 'Yes') {
		util.elementClickable(thu)
	}
	if (data.Fri == 'Yes') {
		util.elementClickable(fri)
	}
	if (data.Sat == 'Yes') {
		util.elementClickable(sat)
	}
	util.scrolldown(transmitTo)

	util.selectDropDown(transmitTo, data.TransmitTo, 'TransmitTo', 'Add Transmission');

	if (data.TransmitTo == 'PC Directory') {
		util.elementClickable(nextbtn2.get(1))
		util.inputValidation(fileName, data.FileName, 'FileName', 'FileName');
		if (data.TestResultType == 'Inline')
			util.elementClickable(submitbtn.get(0))
		else {
			util.elementClickable(submitbtn.get(0))
			browser.sleep(2000)
			util.elementClickable(submitbtn.get(2))
			util.elementClickable(yesbtn)
		}
	}
	else {
		if (data.TestResultType == 'Inline')
			util.elementClickable(submitbtn.get(0))
		else {
			util.elementClickable(submitbtn.get(0))
			browser.sleep(2000)
			util.elementClickable(submitbtn.get(2))
			util.elementClickable(yesbtn)
		}
	}
	browser.sleep(5000);
	return util.resultMessage(data.TestResultType);
}

//********************************************************************
//* Description     : Creating new Transmission for End to End tc
//* Input Params    : data- Excel shett Data data 
//* Return Values   : Toast message/Name
//********************************************************************
function add_transmission_E2E(data) {
	var transmission_name = transProfile.navigate_addTransConfigE2E(data);
	runAt.sendKeys(protractor.Key.TAB);
	browser.sleep(3000);
	retryUntil.sendKeys(protractor.Key.TAB);
	util.selectDropDown(inputProcess, data.InputProcess, 'Input Process', ' Transmission');
	browser.sleep(3000);
	util.selectDropDown(outputProcess, data.OutputProcess, 'Output Process', 'Add Transmission');

	util.inputValidation(lbxNum, util.randomnumbergeneration(9999999), 'Lockbox Number', 'Add Transmission');


	if (data.TransmitBlankFile == 'Yes') {
		util.elementClickable(transmitBlank)
	}
	if (data.RequiresVerification == 'Yes') {
		util.elementClickable(rVerification)
	}
	if (data.ConvertToUnix == 'Yes') {
		util.elementClickable(convertToUnix)
	}
	if (data.Sun == 'Yes') {
		util.elementClickable(sun)
	}
	if (data.Mon == 'No') {
		util.elementClickable(mon)
	}
	if (data.Tue == 'No') {
		util.elementClickable(tue)
	}
	if (data.Wed == 'No') {
		util.elementClickable(wed)
	}
	if (data.Thu == 'No') {
		util.elementClickable(thu)
	}
	if (data.Fri == 'No') {
		util.elementClickable(fri)
	}
	if (data.Sat == 'Yes') {
		util.elementClickable(sat)
	}
	util.scrolldown(transmitTo)
	browser.sleep(3000);
	util.selectDropDown(transmitTo, data.TransmitTo, 'TransmitTo', 'Add Transmission');
	util.elementClickable(submitbtn.get(0))
	util.elementClickable(submitbtn.get(2))
	util.elementClickable(yesbtn)
	var message = util.resultMessage('Dialog');
	browser.sleep(5000);
	return [message, transmission_name];
}

//********************************************************************
//* Description     :  Updating Existing Transmission 
//* Input Params    : data- Excel shett Data data 
//* Return Values   : Toast message
//********************************************************************
function edit_transmission(data) {


	if (data.Sun == 'Yes') {
		util.elementClickable(sun)
	}
	if (data.Mon == 'No') {
		util.elementClickable(mon)
	}
	if (data.Tue == 'No') {
		util.elementClickable(tue)
	}
	if (data.Wed == 'No') {
		util.elementClickable(wed)
	}
	if (data.Thu == 'No') {
		util.elementClickable(thu)
	}
	if (data.Fri == 'No') {
		util.elementClickable(fri)
	}
	if (data.Sat == 'Yes') {
		util.elementClickable(sat)
	}
	util.selectDropDown(transmitTo, data.TransmitTo, 'TransmitTo', 'Edit Transmission');
	if (data.TransmitTo == 'PC Directory') {
		util.elementClickable(nextbtn2.get(1))
		util.inputValidation(clientid, data.ClientID, 'Client ID', 'Edit Transmission');
		browser.sleep(2000)
		util.inputValidation(sequenceNumber, data.SequenNumber, 'Sequence Number', 'Edit Transmission');
		util.inputValidation(serverName, data.ServerName, 'Sequence Name', 'Edit Transmission');
		util.inputValidation(userid, data.LoginId, 'Login ID', 'Edit Transmission');
		util.inputValidation(password, data.Password, 'Password', 'Edit Transmission');
		util.inputValidation(confirmPassword, data.ConfirmPassword, 'ConfirmPassword', 'Edit Transmission');
		util.inputValidation(path, data.Path, 'Path', 'Edit Transmission');
		if (data.PassiveConnection == 'Yes') {
			util.elementClickable(passiveConnection)
		}
		util.elementClickable(nextbtn2.get(2))
		if (data.TestResultType == 'Record successfully sent for approval') {
			util.elementClickable(submitbtn.get(0))
			browser.sleep(2000)
			util.elementClickable(submitbtn.get(2))
			util.elementClickable(yesbtn)
		}
		return util.resultMessage(data.TestResultType);
	}
	else {
		util.elementClickable(submitbtn.get(0))
		if (data.TestResultType != 'Inline') {
			util.elementClickable(submitbtn.get(2))
			util.elementClickable(yesbtn)
		}
		return util.resultMessage(data.TestResultType);
	}
}

//********************************************************************
//* Description     : Getting Value from UI
//* Input Params    : NILL
//* Return Values   : NILL
//********************************************************************
function get_ClientID() {
	return clientId.getAttribute('value').then(function (returnValue) {
		return returnValue
	})
}
function get_SequenceNo() {
	return sequenceNo.getAttribute('value').then(function (returnValue) {
		var num = Number(returnValue)
		return num
	})
}
function get_SourceName() {
	return sourcename.getAttribute('value').then(function (returnValue) {
		return returnValue
	})
}
function get_UserID() {
	return userid.getAttribute('value').then(function (returnValue) {
		return returnValue
	})
}
function get_Password() {
	return password.getAttribute('value').then(function (returnValue) {
		return returnValue
	})
}
function get_Path() {
	return path.getAttribute('value').then(function (returnValue) {
		return returnValue
	})
}

//Get method for Transmission Config screen

function get_RunAt() {
	return runAt.getAttribute('value').then(function (returnValue) {
		return returnValue;
	});
}
function get_RetryUntil() {
	return retryUntil.getAttribute('value').then(function (returnValue) {
		return returnValue;
	})
}
function get_InputProcess() {
	return inputProcess.getText().then(function (returnValue) {
		console.log("-----------------" + returnValue)
		return returnValue
	})
}

function get_AdditionalData() {
	return additionalData.getAttribute('value').then(function (returnValue) {
		console.log("-------------------" + returnValue)
		return returnValue
	})
}
function get_AdditionalData_len() {
	return additionalData.getAttribute('maxlength').then(function (returnValue) {
		console.log("-------------------" + returnValue)
		return returnValue
	})
}
function get_OutputProcess() {
	return outputProcess.getText().then(function (returnValue) {
		console.log("-------------------" + returnValue)
		return returnValue
	})
}
function get_TransmitTo() {
	return transmitTo.getText().then(function (returnValue) {
		steps_util.info_step('Transmission To in UI field: ' + returnValue);
		switch (returnValue) {
			case 'Mainframe':
				return 'M';
				break;
			case 'PC Directory':
				return 'P';
				break;
			case 'DBExchange':
				return 'X';
				break;
			default:
				return 'Failed';
		}

	})
}
function get_TransmitBlank() {
	return transmitBlank.getAttribute('class').then(function (returnValue) {
		console.log("------------------" + returnValue)
		if (returnValue.includes('ui-state-active')) {
			return true;
		}
		else
			return false
	})
}
function get_RVerification() {
	return rVerification.getAttribute('class').then(function (returnValue) {
		if (returnValue.includes('ui-state-active')) {
			return true;
		}
		else
			return false

	})
}


function get_ConvertToUnix() {
	return convertToUnix.getAttribute('class').then(function (returnValue) {
		if (returnValue.includes('ui-state-active')) {
			return true;
		}
		else
			return false

	})
}
function get_SequenceNo_len() {
	return sequenceNo.getAttribute('maxlength').then(function (returnValue) {
		console.log("-----------------" + returnValue)
		var num = Number(returnValue)
		return num
	})
}
function get_SourceName_len() {
	return sourcename.getAttribute('maxlength').then(function (returnValue) {
		console.log("-----------------" + returnValue)
		return returnValue
	})
}
function get_UserID_len() {
	return userid.getAttribute('maxlength').then(function (returnValue) {
		console.log("-----------------" + returnValue)
		return returnValue
	})
}
function get_Password_len() {
	return password.get(1).getAttribute('maxlength').then(function (returnValue) {
		console.log("-------------------" + returnValue)
		return returnValue
	})
}
function get_Path_len() {
	return path.getAttribute('maxlength').then(function (returnValue) {
		console.log("-------------------" + returnValue)
		return returnValue
	})
}

//********************************************************************
//* Description     : Helper method for navigating to the page in edit ,add,view
//* Input Params    : data- Excel sheet  data 
//* Return Values   :NILL
//******************************************************************** 
function nav_helper_edit(data) {
	p1.nav_helper_edit(data);
}

function nav_helper_add(data) {
	// browser.ignoreSynchronization = true;
	p1.nav_helper_click();
	p1.nav_helper_add(data);

	util.selectDropDown(inputProcess, data.InputProcess, 'Input Process', 'Add Transmission');
	if (data.InputProcess == 'EDS National Lockbox') {
		util.inputValidation(clientId, data.ClientId, 'Client Id', 'Add Transmission');
		util.inputValidation(sequenceNo, data.SequenceNo, 'Sequence No', 'Add Transmission');
	}
	else if (data.InputProcess == 'Generic Input') {
		util.inputValidation(lbxNum, data.LockboxNumber, 'Lockbox Number', 'Add Transmission');
	}
	util.selectDropDown(outputProcess, data.OutputProcess, 'Output Process', 'Add Transmission');
	util.selectDropDown(transmitTo, data.TransmitTo, 'Transmit To', 'Add Transmission');
}
function nav_helper_view() {
	p1.nav_helper_view();

}
function nav_sourceserver() {
	element(by.xpath("//p-panel[2]//span[text()='Next']")).click();
}
function nav1() {
	util.elementClickable(nextBtn2.get(2))
	util.elementClickable(nextBtn2.get(3))
}
function nav_sourceserver2() {
	util.elementClickable(nextBtn2.get(2))
}
function nav_sourceserver2_len() {
	util.elementClickable(nextBtn2.get())
	util.elementClickable(nextBtn2.get(1))

}

//********************************************************************
//* Description     : Enter test data based on the length and getting same test data form UI  
//* Input Params    : data- Excel sheet Data  
//* Return Values   : Test Data from UI
//********************************************************************
var verify_boundary_value = async function (test_data, data) {
	var final_result
	var result;
	switch ((data.FIELD_NAME).toUpperCase()) {
		case 'Lockbox Number'.toUpperCase():
			steps_util.info_step('Entering the test data ' + test_data + ' in ' + data.FIELD_NAME);
			util.inputValidation(lbxNum, test_data, 'Lockbox Number', 'Add Transmission');
			// await lbxNum.clear().sendKeys(test_data);
			steps_util.info_step('Test data entered in ' + data.FIELD_NAME);
			await lbxNum.getAttribute('value').then(async (text) => {
				await steps_util.info_step('The value in the text box ' + text)
				result = text;
			})
			break;
		default:
		//do nothing
	}
	return result;
}

//********************************************************************
//* Description     : Checking Field lable present on the Page or not  
//* Input Params    : field_name- Excel sheet Data
//* Return Values   : Label Name/Label not found
//********************************************************************
var verify_label_presence = function (field_name) {
	var label = element(by.xpath("//*[contains(text(),'" + field_name + "')] "));
	browser.sleep(2000)
	return label.isPresent().then(function (res) {
		steps_util.info_step('Label ' + field_name + ' Presence status = ' + res);
		if (res == true) {
			browser.sleep(2000)
			return label.getText().then(function (returnValue) {
				return returnValue;
			})
		}
		else {
			return 'Label Not Found'
		}

	})

}

module.exports = {
	navigate_transConfig: navigate_transConfig,
	navigate_transDest: navigate_transDest,
	navigate_addTransConfig: navigate_addTransConfig,
	add_transmission: add_transmission,
	edit_transmission: edit_transmission,
	get_ClientID: get_ClientID,
	get_SequenceNo: get_SequenceNo,
	get_SourceName: get_SourceName,
	get_UserID: get_UserID,
	get_Password: get_Password,
	get_Path: get_Path,
	get_RunAt: get_RunAt,
	get_RetryUntil: get_RetryUntil,
	get_InputProcess: get_InputProcess,
	get_AdditionalData: get_AdditionalData,
	get_AdditionalData_len: get_AdditionalData_len,
	get_OutputProcess: get_OutputProcess,
	get_TransmitTo: get_TransmitTo,
	get_TransmitBlank: get_TransmitBlank,
	get_RVerification: get_RVerification,
	get_ConvertToUnix: get_ConvertToUnix,
	get_SequenceNo_len: get_SequenceNo_len,
	get_SourceName_len: get_SourceName_len,
	get_UserID_len: get_UserID_len,
	get_Password_len: get_Password_len,
	get_Path_len: get_Path_len,
	add_transmission_E2E: add_transmission_E2E,
	editnavigate_transConfig: editnavigate_transConfig,
	verify_boundary_value: verify_boundary_value,
	verify_label_presence: verify_label_presence,
}



