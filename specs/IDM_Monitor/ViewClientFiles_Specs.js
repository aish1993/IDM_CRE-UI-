/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 09/16/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
const { browser } = require("protractor");
var monitor=require("../../pages/IDM_Monitor/Monitor_Page");
var TC_DATA = util.read_from_excel('ClientFiles','IDMMonitor_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');

describe("IDM|View Client Files|Verifying Files name based on the Filter",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR VIEW CLIENT FILES ')
	beforeEach(function()  {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'IDM_Monitor');
		steps_util.preStep('IDM Monitor', 'View Client Files')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		steps_util.info_step(' Starting Test case Execution for  View Client Files')

	});

	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for View Client Files ')
	});
	afterAll(function() {
		steps_util.info_step('* END OF TEST SUITE EXECUTION FOR VIEW CLIENT FILES ')
	})


	TC_DATA.forEach(function(data,index)  {
		var dbData={}

		db.execute_sql_query("select * from ICBatches where ProcessDate='2020-07-15 00:00:00:0000'").then(function(jData)  {
			dbData=jData;
			console.log(jData); 
		});

		it("Verifying ViewClientFiles work"+(index+1),function()  {
			monitor.viewClientFiles(data)
		});
		xit("Verifying File Name from Database"+(index+1),function()  {
			expect(monitor.get_ClientFilename()).toBe(dbData[0].ImageFileName)
		});
	});

})