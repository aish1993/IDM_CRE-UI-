/*******************************************
 * Author : neha(neha@hcl.com)
 * Date : 12/01/2021
 * Updated by: 
 *******************************************/

var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var enabledDisabledPage=require("../../pages/CRE_Monitor/Enable_DisabledTrans_Page.js");
var TC_DATA = util.read_from_excel('EnabledDisabled','epcTransmission_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var End2EndTC_DATA = util.read_from_excel('Checker','EpcTransmission_TestData');
var checker=require("../../pages/AdminTools/Checker_Page");
var maker=require("../../pages/AdminTools/Maker_Page");



describe("CRE Monitor|Enabled and Disabled |Verifying functionality of Enabled and Disabled",function()  {

	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	logger.info(' EXECUTION OF TEST SUITE FOR Enabled and Disabled Transmission  ')
	beforeAll(async function()  {
		steps_util.preStep('CRE Monitor', 'Enabled and Disabled Transmission')
		logger.info(' Starting Test case Execution for  Enabled and Disabled Transmission  ')
		await  db.execute_sql_query("delete  from TsTransmitProfile_stg where transname='"+TC_DATA[0].TransName+"'").then(async function(jdata)  {
			dbData=jdata
			return dbData
		})
	});
	beforeEach(function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;

	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		logger.info(' Finished Test case Execution for Enabled and Disabled Transmission')
	});
	afterAll(function() {
		logger.info(' END OF TEST SUITE EXECUTION FOR Enabled and Disabled Transmission')
	})

	xit("Verify approval of End to End transaction for Enabled and Disabled CRE Transmission", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Monitor').subMenu_Click('Transmission','Enable/Disable Transmission')
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in ith Maker user credentials');
		val=await enabledDisabledPage.enableddisabled(TC_DATA[0]).then(function(returnValue){
			console.log("************"+returnValue)
			return returnValue;
		});		
		expect(val).toBe(TC_DATA[0].ExpectedResult);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in ith Checker user credentials');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker pag');
		var result=checker.approve_record(TC_DATA[0].TransName,'Trans Name','Approve')
		steps_util.info_step('final result' + result);
		expect(result).toBeTruthy('The record as not approve sucessfully');
		done();
	});
	xit("Verify Refer Back of End to End transaction for Enabled and Disabled CRE Transmission", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Monitor').subMenu_Click('Transmission','Enable/Disable Transmission')
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in ith Maker user credentials');
		val=await enabledDisabledPage.enableddisabled(TC_DATA[0]).then(function(returnValue){
			console.log("************"+returnValue)
			return returnValue;
		});		
		expect(val).toBe(TC_DATA[0].ExpectedResult);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in ith Checker user credentials');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker pag');
		var result=checker.approve_record(TC_DATA[0].TransName,'Trans Name','Refer Back')
		steps_util.info_step('final result' + result);
		expect(result).toBeTruthy('The record as not Refer Back sucessfully');
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Maker View');
		checker.navigate_checker_tabs('CRE Transmit');
		element(by.xpath("//*[normalize-space(text())='"+TC_DATA[0].TransName+"']/ancestor::tr//td[last()]//img[@alt='Delete']")).click()
		element(by.xpath("//input[@formcontrolname='Message']")).sendKeys('Delete')
		element.all(by.xpath("//span[text()='Yes']")).click();
		done()
	});
	xit("Verify Maker able to submit refer Back record again for Enabled and Disabled CRE Transmission", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Monitor').subMenu_Click('Transmission','Enable/Disable Transmission')
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in ith Maker user credentials');
		val=await enabledDisabledPage.enableddisabled(TC_DATA[0]).then(function(returnValue){
			console.log("************"+returnValue)
			return returnValue;
		});		
		expect(val).toBe(TC_DATA[0].ExpectedResult);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in ith Checker user credentials');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker pag');
		var result=checker.approve_record(TC_DATA[0].TransName,'Trans Name','Refer Back')
		steps_util.info_step('final result' + result);
		expect(result).toBeTruthy('The record as not Refer Back sucessfully');
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Maker View');
		checker.navigate_checker_tabs('CRE Transmit');
		var result=maker.review_record(TC_DATA[0].TransName,'Enabled N Disabled');
		expect(result).toBe('Record successfully sent for approval');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		var result=checker.approve_record(TC_DATA[0].TransName, 'Transmit Name','Approve');
		expect(result).toBeTruthy('The record as not approve successfully');
		done();	});
});






