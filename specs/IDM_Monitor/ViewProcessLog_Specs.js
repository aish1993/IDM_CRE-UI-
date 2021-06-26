/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 07/02/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var monitor=require("../../pages/IDM_Monitor/Monitor_Page");
var TC_DATA = util.read_from_excel('View','IDMMonitor_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');

describe("IDM|View Process Log|Verifying UI Log from Database",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR VIEW PROCESS LOG')
	beforeAll(function(done){
		browser.waitForAngularEnabled(false);
		steps_util.preStep('IDM Monitor', 'View Process Log')
		done()
	})
	beforeEach(function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		steps_util.info_step(' Starting Test case Execution for  View Processs log')

	});

	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for View Processs log')
	});
	afterAll(function() {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR VIEW PROCESS LOG ')
	})

	login_page.login(MAKER_USER, MAKER_PASSWORD,'IDM_Monitor');

	TC_DATA.forEach(function(data,index)  {
		var dbData={}
		db.execute_sql_query("select * from ProcessLog where DateOFEntry BETWEEN '2020-10-05'  and '2020-10-06' order by DateOFEntry desc").then (function(jData)  {
			dbData=jData;
			console.log(jData); 
		});
		monitor.nav_processlog(data);
		monitor.get_LogItem()
		it("Verifying Log Item from DB"+(index+1),function()  {
			expect(monitor.get_LogItem()).toBe(dbData[0].LogItem.toString());	
		})
//		it("Verifying Group ID from DBk"+(index+1),function()  {
//		expect(monitor.get_GroupID()).toBe(dbData[0].GroupID.toString());	
//		})
//		it("Verifying Client ID from DB"+(index+1),function()  {
//		expect(monitor.get_ClientID()).toBe(dbData[0].ClientID.toString());	
//		})
//		it("Verifying Control Id from DB"+(index+1),function()  {
//		expect(monitor.get_ControlID()).toBe(dbData[0].ControlID.toString());	
//		})
//		it("Verifying CD Process from DB"+(index+1),function()  {
//		expect(monitor.get_CDProcessID()).toBe(dbData[0].CDProcessID.toString());	
//		})
//		it("Verifying Internal Client ID from DB"+(index+1),function()  {
//		expect(monitor.get_InternalClientID()).toBe(dbData[0].InternalClientID.toString());	
//		})
//		it("Verifying Event ID from DB"+(index+1),function()  {
//		expect(monitor.get_EventID()).toBe(dbData[0].EventID.toString());	
//		})
//		it("Verifying Status from DB"+(index+1),function()  {
//		expect(monitor.get_Status()).toBe(dbData[0].Status.toString());	
//		})

//		it("Verifying Error Level from DB"+(index+1),function()  {
//		expect(monitor.get_ErrorLevel()).toBe(dbData[0].ErrorLevel.toString());	
//		})

//		it("Verifying Description from DB"+(index+1),function()  {
//		expect(monitor.get_Description()).toContain(dbData[0].Description);	
//		})

//		it("Verifying UserID from DB"+(index+1),function()  {
//		expect(monitor.get_UserID()).toBe(dbData[0].UserID.toString());	
//		})

//		it("Verifying Date Of Entry from DB"+(index+1),function()  {
//		var d = new Date((dbData[0].DateOFEntry));
//		var n = d.toLocaleString();
//		expect(monitor.get_DateOfEntry()).toBe(n);	
//		})

//		it("Verifying Internal Client ID EX from DB"+(index+1),function()  {
//		expect(monitor.get_InternalClientIdEx()).toBe(dbData[0].InternalClientIdEx.toString());	
//		})




	});
})