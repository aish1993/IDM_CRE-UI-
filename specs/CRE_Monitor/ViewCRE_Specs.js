/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 11/02/2020
 * Updated by: 
 *******************************************/

var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
const { browser } = require("protractor");
var viewEpc = require("../../pages/CRE_Monitor/CRE_Page.js");
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData, dbData1 ,dbData2= {};

describe("CRE Monitor|Main Page|Verifying Ui value from DB", function () {
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR VIEW EPC MONITOR ')
	beforeAll(async function () {
		steps_util.preStep('CRE Monitor', 'Grid Data')
		steps_util.info_step(' Starting Test case Execution for View EPC Monitor  ')
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor');
		browser.sleep(2000)
		util.getTextValue(viewEpc.profileID_View).then(async function (returnValue) {
			console.log("*******************" + returnValue)
			await db.execute_sql_query("select a.profileid ,c.pname,d.name,b.runtime,b.infile,b.retryuntiltime,a.addtldata,e.statusname from TS_TransmitProfile a JOIN TS_Queue b ON a.profileid=b.profileid JOIN Profiles c ON a.epcpid=c.pid JOIN ClientInfo d ON c.pclientid=d.clientid JOIN TS_TransmitStatus e ON b.status = e.statusid where a.profileid =" + returnValue + "").then(function (jdata) {
				dbData = jdata;
				return jdata;
			});
			db.execute_sql_query("select lockboxid from TS_FileHandler a JOIN TS_TransmitProfile b ON a.ProfileID=b.ProfileID JOIN Profiles c ON b.EPCPID=c.PID where b.ProfileID=" + returnValue + "").then(function (jdata) {
				dbData1 = jdata;
				console.log(jdata)
				return jdata;
			})
			
		})
	});
	beforeEach(function (done) {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		done()
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for View EPC Monitor')
	});
	afterAll(function () {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR VIEW EPC MONITOR ')
	})

	it("Verifying Status from Database ", function () {
		
		expect(viewEpc.get_Status()).toBe(dbData[0].statusname, ' Mismatch');
	});

	it("Verifying ProfileID from Database ", function () {
		expect(viewEpc.get_ProfileID()).toBe(dbData[0].profileid.toString(), ' Mismatch');
	});

	it("Verifying Customer from Database ", function () {
		expect(viewEpc.get_Customer()).toBe(dbData[0].name, ' Mismatch');
	});

	it("Verifying Profile from Database ", function () {
		expect(viewEpc.get_Profile()).toBe(dbData[0].pname, ' Mismatch');
	});

	it("Verifying InFile from Database ", function () {
		expect(viewEpc.get_InFile()).toBe(dbData[0].infile, ' Mismatch');
	});

	it("Verifying Date Time from Database ", function () {
		var d = new Date((dbData[0].runtime));
		var n = d.toLocaleString().split(' ')[1];
		expect(viewEpc.get_DateTime()).toBe(n, ' Mismatch');
	});

	it("Verifying LockBox Number from Database ", function () {
		expect(viewEpc.get_LockBoxNumber()).toBe(dbData1[0].lockboxid.toString() || null, ' Mismatch');
	});
	//Reset to pending Input
	xit("Verifying  Reset To pending Input from Database", async function () {
		var value = element(by.xpath("//tr[1]/td[2]"));
		var statusdpn = element(by.xpath("//p-dropdown[@appendto='body']/div"));
		browser.sleep(2000)
		util.selectDropDown(statusdpn,'Pending Extraction','Status Dropdown','Reset To pending Input');
		browser.sleep(3000)
		value.getText().then(async function (returnValue) {
			util.nav_epcMonitor('Reset To Pending Input', 'Trasnmission Details');
			browser.sleep(3000)
			console.log("--------------" + returnValue)
			await db.execute_sql_query("select a.profileid ,c.pname,d.name,b.runtime,b.infile,b.retryuntiltime,a.addtldata,b.status,e.statusname from TS_TransmitProfile a JOIN TS_Queue b ON a.profileid=b.profileid JOIN Profiles c ON a.epcpid=c.pid JOIN ClientInfo d ON c.pclientid=d.clientid JOIN TS_TransmitStatus e ON b.status = e.statusid where a.profileid =" + returnValue + "").then(function (jdata) {
				dbData = jdata;
				console.log(jdata);
				return dbData;
			});
			expect(viewEpc.get_Status()).toBe(dbData[0].statusname, ' Mismatch');

		});
	});


});
