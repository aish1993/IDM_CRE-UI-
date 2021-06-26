/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * updated by: neha.prasad
 *******************************************/

var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var runNow = require("../../pages/runNow/RunNow_Page");

describe("Test suite:- Run Now:",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeEach(function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000;

	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	afterAll(function() {
	})
	util.navigateTo().homePage_EPCm();
	var dbData={};

	element(by.xpath("//tr/td[2]")).getText().then(  async function(returnValue){
		await db.execute_sql_query("select e.StatusName,a.ProfileID,d.Name,c.PName,b.InFile,b.RunTime,b.RetryUntilTime from TSTransmitProfile a JOIN TSQueue b ON a.ProfileID=b.ProfileID JOIN Profiles c ON a.EPCPID=c.PID JOIN ClientInfo d ON c.PClientID=d.ClientID JOIN TSTransmitStatus e ON b.Status = e.StatusID where a.ProfileID='"+returnValue+"'").then(function(jdata)  {
			dbData=jdata;
			var profile=dbData[0].ProfileID;
			console.log(dbData);
		});
	})
	browser.ignoreSynchronization = true;
	runNow.nav_helper();

	var value=element(by.xpath("//input[@ placeholder='Global Search: Type anything to search in the data set']"))
	util.inputValidation(this.value,this.profile,'Search bar','Run Now');
	it("Test cases # Status",  function()  {	
		console.log("---------------t1---------------");
		expect(runNow.get_Status()).toBe(dbData[0].StatusName,'Status Mismatch');				
	}) 
	it("Test cases # ProfileID", function()  {						
		expect(runNow.get_ProfileID()).toBe(dbData[0].ProfileID,'ProfileID Mismatch');				
	})
	it("Test cases # Customer", function()  {						
		expect(runNow.get_Customer()).toBe(dbData[0].Name,'Customer Mismatch');				
	})
	it("Test cases # Profile", function()  {						
		expect(runNow.get_Profile()).toBe(dbData[0].PName,'Profile Mismatch');				
	})
	it("Test cases # InFile", function()  {						
		expect(runNow.get_InFile()).toBe(dbData[0].InFile,'InFile Mismatch');				
	})
	it("Test cases # Date", function()  {	
		var d = new Date(dbData[0].RunTime)
		var n = d.toLocaleString().split(',')[0];
		expect(runNow.get_DateTime()).toContain(n,'Date Mismatch');				
	})
	it("Test cases # Time", function()  {	
		var d = new Date(dbData[0].RunTime)
		var n = d.toLocaleString().split(',')[1];
		expect(runNow.get_DateTime()).toBe(n,'Time Mismatch');				
	})
});