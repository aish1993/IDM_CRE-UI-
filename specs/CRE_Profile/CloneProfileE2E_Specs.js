/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 01/12/2021
 * Updated by: 
 *******************************************/

var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var clone=require("../../pages/CRE_Profile/CloneProfile_Page");
var CLONE_DATA = util.read_from_excel('Clone','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var checker = requirePage("/AdminTools/Checker_Page");
var maker = requirePage("/AdminTools/Maker_Page");
var dbActive,dbData={}

describe("CRE Profile|Clone Client|Verifying END To End Cases for  clone the Profile",function()  {
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR Clone Profile ')
	beforeAll(function(done) {
		steps_util.preStep('CRE Profile', 'Client')
		steps_util.info_step(' Starting Test case Execution for Clone Profile  ')
		done()
	});
	beforeEach( async function(done)  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;
		
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid where b.isactive=1").then(function (BData) {
			dbActive = BData;
		});
		CLONE_DATA[0].Profile = await dbActive[1].pname
		done()
	});
	afterEach(function(done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Clone Profile ')
		done()
	});

	it("Verify approval of End to End transaction for Clone Profile", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile');
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		clone.nav_helper(CLONE_DATA[0]);
		var result=clone.add_Value(CLONE_DATA[0]);
		await expect(result[1]).toBeTruthy('Unable to Clone  Profile');
		await expect(result[0]).toBe(CLONE_DATA[0].ExpectedResult);
		steps_util.info_step(' Profile created with name ' + result[1]);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+result[1]+"'order by createdtime  desc").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(1);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		steps_util.info_step('Navigate to Clients tab in CRE Checker page');
		var body=checker.approve_record(result[1], 'Profile Name','Approve');
		await expect(body).toBeTruthy('The record as not approve successfully');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+result[1]+"'order by createdtime desc").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(2);
		done();
	});
	xit("Verify Refer Back of End to End transaction for Clone Profile", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile');
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		clone.nav_helper(CLONE_DATA[0]);
		var result=clone.add_Value(CLONE_DATA[0]);
		await expect(result[1]).toBeTruthy('Unable to Clone  Profile');
		await expect(result[0]).toBe(CLONE_DATA[0].ExpectedResult);
		steps_util.info_step(' Profile created with name ' + result[1]);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+result[1]+"'order by createdtime desc").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(1);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		steps_util.info_step('Navigate to Clients tab in CRE Checker pag');
		var body=checker.approve_record(result[1], 'Profile Name','Refer Back');
		await expect(body).toBeTruthy('The record as not Refer Back successfully');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+result[1]+"'order by createdtime ").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(4);
		done();
	});
	xit("Verify Maker able to submit refer Back record again for Clone Profile", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile');
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		clone.nav_helper(CLONE_DATA[0]);
		var result=clone.add_Value(CLONE_DATA[0]);
		await expect(result[1]).toBeTruthy('Unable to Clone  Profile');
		await expect(result[0]).toBe(CLONE_DATA[0].ExpectedResult);
		steps_util.info_step(' Profile created with name ' + result[1]);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+result[1]+"'order by createdtime desc").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(1);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		steps_util.info_step('Navigate to Clients tab in CRE Checker pag');
		var action=checker.approve_record(result[1], 'Profile Name','Refer Back');
		await expect(action).toBeTruthy('The record as not Refer Back successfully');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+result[1]+"'order by createdtime ").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(4);
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Maker View');
		checker.navigate_checker_tabs('CRE Profile');
		var body=maker.review_record(result[1], 'Clone Profile','Client Name');
		await expect(body[0]).toBe(CLONE_DATA[0].ExpectedResult);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Profile').subMenu_Click('Admin Tools','Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Profile');
		var result=checker.approve_record(body[1], 'Profile Name','Approve');
		await expect(result).toBeTruthy('The record as not approve successfully');
		await db.execute_sql_query("select status from ClientInfo_stg where Name='"+body[1]+"'order by createdtime desc").then(function (BData) {
			dbData = BData;
			console.log(BData)
		});
		await expect(dbData[0].status).toBe(2);
		done();
	});


});

