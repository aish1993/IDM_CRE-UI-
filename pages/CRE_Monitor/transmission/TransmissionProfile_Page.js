/*Romap*/

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');
var cre_Monitoring = requirePage("/CRE_Monitor/monitoring/CRE_Monitoring_Page");

"use strict";
var transmissionName = element(by.xpath("//input[@formcontrolname='tName']"));
var viewtransname=element(by.xpath("//p-dropdown[@formcontrolname='profileID']/div/div[3]/label"))
var client_view = element(by.xpath("//p-dropdown[@formcontrolname='client']/div/div[3]"));
var epcProfile_view = element(by.xpath("//p-dropdown[@formcontrolname='epcProfile']/div/div[3]"));
var client = element(by.xpath("//p-dropdown[@formcontrolname='client']/div/div[4]/span"));
var epcProfile = element(by.xpath("//p-dropdown[@formcontrolname='epcProfile']/div/div[4]/span"));
var backBtn1 = element(by.xpath("//p-panel[1]//span[text()='Back']"));
var nextBtn1 = element(by.xpath("//button[@label='Next']"));
var editBtn = element(by.xpath("//button[@label='Edit']"));
var viewProfilebtn = element(by.xpath("//span[text()='View Profile']"));
var addNewBtn = element(by.xpath("//span[text()='Add New Transmission']"));
var transmsisionBtn = element(by.xpath("//span[text()='Transmission']"));
var submitBtn = element(by.xpath("//span[text()='Submit']"));
var creMonitor = element(by.xpath("//a[text()='CRE Monitor']"));

var trans_name;

function navigate_transProfile() {
	cre_Monitoring.navigate_viewProfile();
}
async function navigate_transConfig() {
	cre_Monitoring.navigate_viewProfile();
	browser.sleep(3000)
	trans_name = await get_TransmissionName();
	console.log("trans Name" + trans_name)
	browser.sleep(2000)
	util.elementClickable(nextBtn1)
	return trans_name;
}
async function editnavigate_transConfig() {
	cre_Monitoring.navigate_viewProfile();
	browser.sleep(2000)
	trans_name = await get_TransmissionName();
	console.log("trans Name" + trans_name)
	util.elementClickable(editBtn)
	util.elementClickable(nextBtn1)
	return trans_name;
}
async function editnavigate_transProfile() {
	cre_Monitoring.navigate_viewProfile();
	trans_name = await get_TransmissionName();
	// browser.sleep(2000)
	util.elementClickable(editBtn)
	return trans_name;
}

navigate_addTrans = async function () {
	cre_Monitoring.navigate_cre_menu('Transmission', 'Add New Transmission');
}

//********************************************************************
//* Description     : Adding Transmission for Trans Config
//* Input Params    : data- Excel sheet data
//* Return Values   :  Toast Message 
//********************************************************************
async function navigate_addTransConfig(data) {
	navigate_addTrans();
	if (data.TransmissionName != undefined) {
		data.TransmissionName = data.TransmissionName + util.randomnumbergeneration(999);
	}
	transmissionName.sendKeys(data.TransmissionName || '')
	util.selectDropDown(client, data.Client, 'Client', 'Add Transmission');
	browser.sleep(3000);
	util.selectDropDown(epcProfile, data.EpcProfile, 'EPC Profile', 'Add Transmission');

	nextBtn1.click()
	return data.TransmissionName

}
//********************************************************************
//* Description     : Update Transmission for Trans Config
//* Input Params    : data- Excel sheet data
//* Return Values   :  Toast Message 
//********************************************************************
function navigate_editTransProfile(data) {

	util.selectDropDown(client, data.Client, 'Client', 'Edit Transmission');
	browser.sleep(3000);
	util.selectDropDown(epcProfile, data.EpcProfile, 'EPC Profile', 'Edit Transmission');
	browser.sleep(3000);

	nextBtn1.click()
	return util.resultMessage(data.TestResultType);

}

//********************************************************************
//* Description     : Adding Transmission for Trans Config
//* Input Params    : data- Excel sheet data
//* Return Values   :  Toast Message /Name
//********************************************************************
function navigate_addTransConfigE2E(data) {
	// navigate_addTrans();
	// add_transmission(data);
	var jData = util.randomnumbergeneration(999)
	if (data.TransmissionName != undefined) {
		data.TransmissionName = data.TransmissionName + jData;
	}
	browser.sleep(2000);
	util.inputValidation(transmissionName, data.TransmissionName, 'ClientId ', 'Add Transmission');
	browser.sleep(2000);
	util.selectDropDown(client, data.Client, 'Client', 'Add Transmission');
	browser.sleep(2000);
	util.selectDropDown(epcProfile, data.EpcProfile, 'EPC Profile', 'Add Transmission');
	browser.sleep(2000);

	util.elementClickable(nextBtn1)
	return data.TransmissionName

}
navigate_editTrans = function () {
	//navigation usingCRE_monitoring
}


function add_transmission(data) {
	var jData = util.randomnumbergeneration(999)
	if (!(data.TransmissionName == undefined)) {
		data.TransmissionName = data.TransmissionName + jData;
		console.log(data.TransmissionName);
	}

	util.inputValidation(transmissionName,data.TransmissionName,'TransmissionName','Add Transmission')
	util.selectDropDown(client, data.Client, 'Client', 'Add Transmission');
	util.selectDropDown(epcProfile, data.EpcProfile, 'CRE Profile', 'Add Transmission');

	util.elementClickable(nextBtn1)
	return util.resultMessage(data.TestResultType);
}

function add_transmissionE2E(data) {

	var jData = util.randomnumbergeneration(999)
	if (!(data.TransmissionName == undefined)) {
		data.TransmissionName = data.TransmissionName + jData;
		console.log(data.TransmissionName);
	}
	browser.sleep(3000)
	transmissionName.sendKeys(data.TransmissionName || '')
	util.selectDropDown(client, data.Client, 'Client', 'Add Transmission');
	util.selectDropDown(epcProfile, data.EpcProfile, 'CRE Profile', 'Add Transmission');

	util.elementClickable(nextBtn1)
	return data.TransmissionName;
}

//********************************************************************
//* Description     : Getting Transmission screen field Value from UI
//* Input Params    : data- Excel sheet data
//* Return Values   :  Toast Message 
//********************************************************************
function get_TransmissionName() {
	// browser.wait(EC.presenceOf(transmissionName), 15000, 'element not found within specified wait time');
	return viewtransname.getText().then(function (returnValue) {
		console.log('**********test***********' + returnValue)
		return returnValue
	})

}
function get_Client() {
	browser.wait(EC.presenceOf(client, 3000, 'element not found within specified wait time'));
	return client_view.getText().then(function (returnValue) {
		return returnValue
	})
}
function get_EpcProfile() {
	browser.wait(EC.presenceOf(epcProfile), 3000, 'element not found within specified wait time');
	return epcProfile_view.getText().then(function (returnValue) {
		return returnValue;
	})
}

function get_Enabled() {
	return enabled.getAttribute('class').then(function (returnValue) {
		if (returnValue.includes('pi-check')) {
			return true;
		}
		else
			return false
	})
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
		case 'Transmission Name'.toUpperCase():
			steps_util.info_step('Entering the test data ' + test_data + ' in ' + data.FIELD_NAME);
			await transmissionName.sendKeys(test_data);
			steps_util.info_step('Test data entered in ' + data.FIELD_NAME);
			await transmissionName.getAttribute('value').then(async (text) => {
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
	return label.isPresent().then(function (res) {
		steps_util.info_step('Label ' + field_name + ' Presence status = ' + res);
		return res;
	})

}

module.exports = {
	verify_boundary_value: verify_boundary_value,
	navigate_addTrans: navigate_addTrans,
	navigate_transConfig: navigate_transConfig,
	navigate_transProfile: navigate_transProfile,
	navigate_addTransConfigE2E: navigate_addTransConfigE2E,
	add_transmissionE2E: add_transmissionE2E,
	verify_label_presence: verify_label_presence,
	editnavigate_transConfig: editnavigate_transConfig,
	add_transmission: add_transmission,
	navigate_addTransConfig: navigate_addTransConfig,
	get_TransmissionName: get_TransmissionName,
	get_Client: get_Client,
	get_EpcProfile: get_EpcProfile,
	get_Enabled: get_Enabled,
	navigate_editTransProfile: navigate_editTransProfile,
	editnavigate_transProfile: editnavigate_transProfile
}
