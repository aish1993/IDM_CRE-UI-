/*******************************************
 * Author : Neha Prasad(neha.prasad@hcl.com)
 * Date : 03/13/2020
 * Updated by: 
 *******************************************/

var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
const { browser } = require("protractor");
var viewEpc=require("../../pages/CRE_Monitor/CRE_Page.js");
var TC_DATA = util.read_from_excel('EPC_Monitor','EPCMonitor_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData,dbData1,dbData2




describe("CRE Monitor|Details Button|Verifying Ui value from DB",function()  {

	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR DETAIL BUTTON  ')
	beforeAll(function()  {
		steps_util.preStep('CRE Monitor', 'Detail Data')
		steps_util.info_step(' Starting Test case Execution for  Detail Button  ')

	});
	beforeEach(function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000000;

	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Detail Button ')
	});
	afterAll(function() {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR DETAIL BUTTON')
	})

	login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Monitor')
	util.nav_epcMonitor('Details','Transmission Details');
	element(by.xpath("//input[@formcontrolname='tName']")).getAttribute('value').then(  async function(returnValue){
		console.log("----------------"+returnValue)
		  await  db.execute_sql_query("select * from Ts_TransmitProfile a, Profiles b, ClientInfo c where a.epcpid=B.pid and b.pclientid=C.clientid and a.transname='"+returnValue+"'").then(async function(jdata)  {
			dbData=jdata
			return dbData
		})
		
		await db.execute_sql_query("select * from TS_ExtractObject where extobjid in (select inputobjid from TS_TransmitProfile where transname  ='"+returnValue+"')").then(function(jdata){
			dbData1=jdata;
			return dbData1;
		});
		await db.execute_sql_query("select * from TS_ExtractObject where extobjid in (select outputobjid from TS_TransmitProfile where transname ='"+returnValue+"')").then(function(jdata){
			dbData2=jdata;
			return dbData2;
		});

	})
	//***********Details Button***************//

	it("Verifying Trans Profile from Database", async function(){  
		await expect(viewEpc.get_transProfile()).toBe(dbData[0].profileid.toString(),' Mismatch');	

	});
	it("Verifying Client Name from Database", function(){  
		expect(viewEpc.get_client()).toBe(dbData[0].name,' Mismatch');
	});
	it("Verifying Trans Name from Database", function(){  
		expect(viewEpc.get_tName()).toBe(dbData[0].transname,' Mismatch');
	});
	it("Verifying RunAt from Database", function(){  
		var time = new Date((dbData[0].timetorun));
		var RunAt = time.toLocaleTimeString().split(' ');
		expect(viewEpc.get_runTransmission()).toBe(RunAt[0],' Mismatch');
	});
	it("Verifying Input Process from Database", function(){  
		expect(viewEpc.get_inputProces()).toBe(''||dbData1[0].descriptivename,' Mismatch');
	});
	it("Verifying Retry Until from Database", function(){  
		var time = new Date((dbData[0].timetorun));
		var RetryUntil = time.toLocaleTimeString().split(' ');
		expect(viewEpc.get_retryUntil()).toBe(RetryUntil[0],' Mismatch');
	});
	it("Verifying Addition Data from Database", function(){  
		expect(viewEpc.get_additionData()).toBe(dbData[0].addtldata.replace(/;/g, " ").trim(),' Mismatch');
	});
	it("Verifying Output Process from Database", function(){  
		expect(viewEpc.get_outputProces()).toBe(''||dbData2[0].descriptivename,' Mismatch');
	});
	it("Verifying Req Verify from Database", function(){  
		expect(viewEpc.	get_reqVerify() ).toBe(dbData[0].reqverify,' Mismatch');
	});
	it("Verifying Convert To Unix from Database", function(){  
		expect(viewEpc.get_convertToUnix()).toBe(dbData[0].converttounix,' Mismatch');
	});
	it("Verifying File Name from Database", function(){  
		expect(viewEpc.get_fileName()).toBe(dbData[0].destpath,' Mismatch');	
	});
	it("Verifying Trans Blank File from Database", function(){  
		expect(viewEpc.get_transBlankFile()).toBe(dbData[0].transblankfile,' Mismatch');	
	});
	it("Verifying Host Name from Database", function(){  
		expect(viewEpc.get_hostName()).toBe(dbData[0].hostname,' Mismatch');	
	});
	it("Verifying Host User from Database", function(){  
		expect(viewEpc.get_hostUser()).toBe(dbData[0].hostuser,' Mismatch');	
	});

});