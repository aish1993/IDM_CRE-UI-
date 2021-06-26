/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 01/12/2021
 * Updated by: 
 *******************************************/

var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var clone=require("../../pages/CRE_Profile/CloneProfile_Page");
var CLONE_DATA = util.read_from_excel('View','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var checker = requirePage("/AdminTools/Checker_Page");
var maker = requirePage("/AdminTools/Maker_Page");
var dbData,dbActive={}

describe("CRE Profile|Enabled and Disabled|Verifying END To End Cases for  Enabled and Disabled the Client",function()  {
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR Clone Profile ')
	beforeAll(async function(done) {
		steps_util.preStep('CRE Profile', 'Client')
		steps_util.info_step(' Starting Test case Execution for Enabled and Disabled the Client ')
		done();
	});
	beforeEach(  async function(done)  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile');
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
		});
		CLONE_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("delete  from ClientInfo_stg where name='"+CLONE_DATA[0].Name+"'").then(function (BData) {
			dbActive = BData;
		});
		done()
	});
	afterEach(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Enabled and Disabled the Client ')
	});

	xit("Verify approval of End to End transaction for Enabled and Disabled the Clients", async function (done) {
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		await db.execute_sql_query("select name,isactive from ClientInfo where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		CLONE_DATA[0].ClientEnabled=await dbData[0].isactive
		result= clone.nav_enable_disable(CLONE_DATA[0])
		await expect(result[0]).toBe(CLONE_DATA[0].ExpectedResult);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		steps_util.info_step('Navigate to Clients tab in CRE Checker pag');
		var body=checker.approve_record(CLONE_DATA[0].Name, 'Profile Name','Approve');
		await expect(body).toBeTruthy('The record as not approve successfully');
		await db.execute_sql_query("select status,isactive from ClientInfo_stg where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		await expect(dbData[0].status).toBe(2);
		await expect(result[1]).toBe(dbData[0].isactive);
		done();
	});

	xit("Verify Refer Back of End to End transaction for Enabled and Disabled Profile", async function (done) {
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		await db.execute_sql_query("select name,isactive from ClientInfo where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		CLONE_DATA[0].ClientEnabled=await dbData[0].isactive
		result= clone.nav_enable_disable(CLONE_DATA[0])
		await expect(result[0]).toBe(CLONE_DATA[0].ExpectedResult);
		steps_util.info_step(' Profile created with name ' + result);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		steps_util.info_step('Navigate to Clients tab in CRE Checker pag');
		var body=checker.approve_record(CLONE_DATA[0].Name, 'Profile Name','Refer Back');
		await expect(body).toBeTruthy('The record as not Refer Back successfully');
		await db.execute_sql_query("select status, name,isactive from ClientInfo_stg where name='"+CLONE_DATA[0].Name+"' order by createdtime ").then(function(BData){
			dbData=BData;
		});
		await expect(dbData[0].status).toBe(4);
		// await expect(!result[1]).toBe(dbData[0].isactive);
		login_page.login(MAKER_USER,MAKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Maker View');
		maker.deleteRecord(CLONE_DATA[0].Name,'CRE Profile')
		await expect(util.resultMessage('Dialog')).toBe('Record Deleted Successfully');
		await db.execute_sql_query("select status, name,isactive from ClientInfo_stg where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		await expect(dbData[0].status).toBe(5);
		done();
	});
	
	xit("Verify Maker able to submit refer Back record again for Enabled and Disabled Profile", async function (done) {
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		await db.execute_sql_query("select name,isactive from ClientInfo where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		CLONE_DATA[0].ClientEnabled=await dbData[0].isactive
		result= clone.nav_enable_disable(CLONE_DATA[0])
		await expect(result[0]).toBe(CLONE_DATA[0].ExpectedResult);
		steps_util.info_step(' Profile created with name ' + result);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		steps_util.info_step('Navigate to Clients tab in CRE Checker pag');
		var result=checker.approve_record(CLONE_DATA[0].Name, 'Profile Name','Refer Back');
		await expect(result).toBeTruthy('The record as not Refer Back successfully');
		await db.execute_sql_query("select status, name,isactive from ClientInfo_stg where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		await expect(dbData[0].status).toBe(4);
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Maker View');
		checker.navigate_checker_tabs('CRE Profile');
		var body=maker.review_record(CLONE_DATA[0].Name, 'Enable/Disable Profile','Client Name');
		await expect(body).toBe(CLONE_DATA[0].ExpectedResult);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		var body=checker.approve_record(CLONE_DATA[0].Name, 'Profile Name','Approve');
		await expect(body).toBeTruthy('The record as not approve successfully');
		await db.execute_sql_query("select status, name,isactive from ClientInfo_stg where name='"+CLONE_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
		});
		await expect(dbData[0].status).toBe(2);
		await expect(result[1]).toBe(dbData[0].isactive);
		done();
	});

});

