var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var PropertiesReader = require('properties-reader');
var prop = PropertiesReader('config.properties');
var eod=require("../../pages/CRE_Monitor/CRE_Page.js");
var TC_DATA = util.read_from_excel('EOD','EPCMonitor_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');

describe("Test suite:-End to Day:",function(){
	beforeAll(function() {
		steps_util.preStep('CRE Monitor', 'EOD')
		steps_util.info_step(' Starting Test case Execution for End to Day')
	});
	beforeEach(function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000000;
	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step('Finished Test case Execution for End to Day ')
	});
	afterAll(function() {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR END OF DAY ')
	})

	TC_DATA.forEach( function(data,index) {
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Monitor').subMenu_Click('Groups','View Group');
		it("verifying the EOD functionality"+(index+1),  function()  {
			dbData={}
			db.execute_sql_query("select count(*)  from ts_queue where status!=2").then(function(jdata){
				dbData=jdata;
				console.log(dbData);
			})
			if(dbData[0].count!=0) {
				expect(eod.nav_eod_helper(data)).toContain(data.ExpectedResult)
			}
		})

	})
})