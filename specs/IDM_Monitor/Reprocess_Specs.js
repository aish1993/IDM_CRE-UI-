/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 11/26/2020

 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var monitor=require("../../pages/IDM_Monitor/Monitor_Page");
var TC_DATA = util.read_from_excel('ReProcess','IDMMonitor_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');


describe("IDM|IDM Monitor |Verifying Reprocss Functionality ",function()  {
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR REPROCESS ')
	beforeEach(function() {
		steps_util.preStep('IDM Monitor', 'Reprocess')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000000;
		steps_util.info_step(' Starting Test case Execution for  Reprocess')

	});

	afterEach(function() {
		steps_util.info_step(' Finished Test case Execution for Reprocess ')

	});


	TC_DATA.forEach( function(data,index)  {
//		browser.ignoreSynchronization = true;
		login_page.login(MAKER_USER, MAKER_PASSWORD,'IDM_Monitor');
		browser.sleep(3000)
		monitor.nav_helper_view(data);
//		browser.sleep(3000)
		var value=monitor.get_ImageFileName();			 
		var dbData={}
		browser.ignoreSynchronization = false;

		element.all(by.xpath("//tr[1]/td")).get(2).getText().then(function(returnValue)  {
			db.execute_sql_query("select * from ProcessRequestQueue where FileName like'%"+returnValue+"%'").then ( function(jData)  {
				dbData=jData;
				console.log("dfhgfhfgj"+this.value)
				console.log(jData); 
			});
		})
		it("Verifying message for ReProcess"+(index+1) , function(){  
//			expect( monitor.reprocess(data)).toBe(data.ExpectedResult);
		});
		it("Verifying Status from DB"+(index+1) , function(){  
			if(data.ReprocessWithSameFile=='yes')
				expect(dbData[0].Status).toBe(1);
			else
				expect(dbData[0].Status).toBe(5);
		});
		it("Verifying Error Text Append with the File Name from Database"+(index+1) , function(){  
			if(data.ReprocessWithSameFile=='no')
				expect(dbData[0].FileName).toContains('Error');
			else 
				expect(dbData[0].FileName).toBe(this.value);
		});
	});
})