/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/10/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var MonitorPage = require("../../pages/IDM_Monitor/Monitor_Page");
var ViewTC_DATA = util.read_from_excel('View', 'IDMMonitor_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');


describe("IDM Profile|View Client|Verifying UI Value from DataBase for IDM Monitor", function () {

	steps_util.info_step(' EXECUTION OF TEST SUITE FOR IDM Monitor ')
	beforeAll(async function (done) {
		steps_util.preStep('IDM Profile', 'View Client')
		steps_util.info_step(' Starting Test case Execution for  IDM Monitor ')
		// await db.execute_sql_query("select a.Name as Client ,b.Name as Groups from dbo.ICPClients a JOIN ICPGroups b ON a.GroupID=b.GroupID  where a.IsActive=1 and b.IsActive=1		").then(function(jdata){
		// 	dbActiveClient=jdata;
		// 	console.log(jdata)
		// 	return jdata
		// });
		done()
	});
	beforeEach(function (done) {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		steps_util.info_step(' Starting Test case Execution for  IDM Monitor ')
		done()
	});
	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for IDM Monitor ')
		done()
	});

	ViewTC_DATA.forEach(function (data, index) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'IDM_Monitor');
		browser.refresh()
		MonitorPage.nav_helper_view(data);
		//		var value=MonitorPage.get_ClientName() 
		var dbData = {}
		MonitorPage.processData.get(2).getText().then(function (returnValue) {
			db.execute_sql_query("select b.name,a.processdate,a.imagefilename,a.numberofitems,a.batchid,a.currentstage,a.nextstage,a.starttime,a.worktype,a.bankid from icpatches a JOIN ICPClients b on a.clientid=b.clientid where a.ImageFileName like '%" + returnValue + "%'").then(function (jData) {
				dbData = jData;
				console.log(jData);
			});
		});

		it("Verifying Client Name from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(0))).toBe(dbData[0].name);
		})
		xit("Verifying Process Date from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(1))).toBe(dbData[0].processdate);
		})
		it("Verifying Image File Name from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(2))).toBe(dbData[0].imagefilename);
		})
		it("Verifying No Of Item from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(3))).toBe(dbData[0].numberofitems);
		})
		it("Verifying Batch ID from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(4))).toBe(dbData[0].batchid.toString());
		})

		it("Verifying Current Stage from Database" + (index + 1), function () {
			expect(MonitorPage.get_CurrentStage()).toBe(dbData[0].currentstage.toString());
		})
		it("Verifying Next Stage from Database" + (index + 1), function () {
			expect(MonitorPage.get_NextStage()).toBe(dbData[0].nextstage.toString());
		})
		it("Verifying Start Time from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(7))).toBe(dbData[0].starttime);
		})
		it("Verifying Work Type from Database" + (index + 1), function () {
			expect(util.getTextValue(MonitorPage.processData.get(8))).toBe(dbData[0].worktype);
		})
		it("Verifying Bank Id from Database", function () {
			expect(util.getTextValue(MonitorPage.processData.get(9))).toBe(dbData[0].bankid.toString());
		})

	});
});