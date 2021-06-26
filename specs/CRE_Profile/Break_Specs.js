/*******************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/19/2020
 * Reviewed by: Sanjay Mundu 
 *******************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var Break = require("../../pages/CRE_Profile/Break_Page");
var TC_DATA = util.read_from_excel('View', 'EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData, dbActive = {}

describe("CRE Profile| CRE Profile for Break|Verifying UI and Database fields", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR BREAK  ')
	beforeAll(async function (done) {
		steps_util.preStep('CRE Profile', 'Break')
		steps_util.info_step(' Starting Test case Execution for  Break')
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile')
		await db.execute_sql_query("select pname from Profiles order by createdtime desc ").then(function (BData) {
			dbActive = BData;
		});
		TC_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("select * from Breaks where sourceid in (Select psourcedefid from Profiles where pname='" + dbActive[0].pname + "')").then(function (BData) {
			dbData = BData;
			console.log(BData);
			return BData
		});
		done()
	});
	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000000;

	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Break ')
	});
	afterAll(function (done) {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR BREAK ')
		done()
	})

	//***********Break*************//

	it("Verify Break ID field- UI Vs Database table value", async function () {
		Break.nav_helper_view(TC_DATA[0])
		expect(util.getTextValue(Break.breakfields.get(0))).toBe(dbData[0].breakid.toString());
	})
	it("Verify Source ID field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(1))).toBe(dbData[0].sourceid.toString());
	})
	it("Verify File Header Row field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(2))).toBe(dbData[0].fileheaderrows.toString());
	})
	it("Verify File Header ID field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(3))).toBe(dbData[0].fileheaderid.trim());
	})
	it("Verify File Header ID Pos  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(4))).toBe(dbData[0].fileheaderidpos.toString());
	})
	it("Verify File Header ID Len  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(5))).toBe(dbData[0].fileheaderidlen.toString());
	})
	it("Verify Filter Trailer Rows field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(6))).toBe(dbData[0].filetrailerrows.toString());
	})
	it("Verify File Trailer ID  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(7))).toBe(dbData[0].filetrailerid.trim());
	})
	it("Verify File Trailer ID Pos field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(8))).toBe(dbData[0].filetraileridpos.toString());
	})
	it("Verify File Trailer ID Len field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(9))).toBe(dbData[0].filetraileridlen.toString());
	})
	it("Verify Break  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(10))).toBe(dbData[0].break1.toString());
	})
	it("Verify B1 Header Row field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(11))).toBe(dbData[0].break1headerrows.toString());
	})
	it("Verify B1 Header ID  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(12))).toBe(dbData[0].break1headerid.trim());
	})
	it("Verify B1 Header ID Pos  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(13))).toBe(dbData[0].break1headeridpos.toString());
	})
	it("Verify B1 Header ID Len field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(14))).toBe(dbData[0].break1headeridlen.toString());
	})
	it("Verify B1 Header Fields  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(15))).toBe(dbData[0].break1headerfields);
	})
	it("Verify B1 Trailer Rows  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(16))).toBe(dbData[0].break1trailerrows.toString());
	})
	it("Verify B1 Trailer ID  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(17))).toBe(dbData[0].break1trailerid.trim());
	})
	it("Verify B1 Trailer ID Pos  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(18))).toBe(dbData[0].break1traileridpos.toString());
	})
	it("B1TrailerIDLen", function () {
		expect(util.getTextValue(Break.breakfields.get(19))).toBe(dbData[0].break1traileridlen.toString());
	})
	it("Verify B1 Trailer Fields field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(20))).toBe(dbData[0].break1trailerfields.trim());
	})
	it("Verify Break2  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(21))).toBe(dbData[0].break2.toString());
	})
	it("Verify B2HeaderRows  field- UI Vs Database table value ", function () {
		expect(util.getTextValue(Break.breakfields.get(22))).toBe(dbData[0].break2headerrows.toString());
	})
	it("Verify B2HeaderID field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(23))).toBe(dbData[0].break2headerid.trim());
	})
	it("Verify B2HeaderIDRows  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(24))).toBe(dbData[0].break2headeridpos.toString());
	})
	it("Verify B2HeaderIDLen  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(25))).toBe(dbData[0].break2headeridlen.toString());
	})
	it("Verify B2HeaderFields  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(26))).toBe(dbData[0].break2headerfields.trim());
	})
	it("Verify B2TrailerRows  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(27))).toBe(dbData[0].break2trailerrows.toString());
	})
	it("Verify B2TrailerID  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(28))).toBe(dbData[0].break2trailerid.trim());
	})
	it("Verify B2TraileridpOS  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(29))).toBe(dbData[0].break2traileridpos.toString());
	})
	it("Verify B2TraileridrOWS  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Break.breakfields.get(30))).toBe(dbData[0].break2traileridlen.toString());
	})



	// });
})