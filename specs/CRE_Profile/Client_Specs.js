/*********
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/12/2020
 * Reviewed by: Sanjay Mundu 
 *********/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var Client = require("../../pages/CRE_Profile/Client_Page");
var TC_DATA = util.read_from_excel('View', 'EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData = {}, dbActive = {};


describe("CRE Profile| CRE Profile for Client|Verifying Clone Functionality", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR CLIENT  ')
	beforeAll(async function (done) {
		steps_util.preStep('CRE Profile', 'Client')
		steps_util.info_step(' Starting Test case Execution for Client ')
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile')
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
		});
		TC_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("select * from clientinfo where name='" + dbActive[0].name + "'").then(function (jdata) {
			dbData = jdata;
			return jdata
		});
		done()
	});
	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Client')

	});
	afterAll(function (done) {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR CLIENT ')
		done()
	})

	it("Verify Client Name  field- UI Vs Database table value", async function () {
		Client.nav_helper_view(TC_DATA[0])
		expect(util.getTextValue(Client.clientfields.get(0))).toBe(dbData[0].clientid.toString());
	})
	it("Verify Account Number  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(1))).toBe(dbData[0].accountnumber);
	})
	it("Verify  Name  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(2))).toBe(dbData[0].name);
	})
	it("Verify Address Line1  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(3))).toBe(dbData[0].address1.trim() || '');
	})
	it("Verify Address Line 2  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(4))).toBe(dbData[0].address2.trim() || '');
	})
	it("Verify City  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(5))).toBe(dbData[0].city.trim() || '');
	})
	it("Verify State  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(6))).toBe(dbData[0].state.trim() || '');
	})
	it("Verify Zip Code  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(7))).toBe(dbData[0].zipcode.trim() || '');
	})
	it("Verify Phone  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(8))).toBe(dbData[0].phone.trim() || '');
	})
	it("Verify Trans Mode  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(9))).toBe(dbData[0].transfermode.toString().trim() || '');
	})
	it("Verify Trans Speed  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(10))).toBe(dbData[0].transmissionspeed.toString().trim() || '');
	})
	it("Verify Dialog Type  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(11))).toBe(dbData[0].dialingtype.toString().trim() || '');
	})
	it("Verify FTP Data Set  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(12))).toBe(dbData[0].ftpdataset.trim() || '');
	})
	it("Verify Send Directory field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(13))).toBe(dbData[0].senddirectory.trim() || '');
	})
	it("Verify Mainframe File field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(14))).toBe(dbData[0].mainframefile.trim() || '');
	})
	it("Verify OutSide Line  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(15))).toBe(dbData[0].outsideline.trim() || '');
	})
	it("Verify Dialing Prefix  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(16))).toBe(dbData[0].dialingprefix.trim() || '');
	})
	it("Verify Dialog Sufix  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(17))).toBe(dbData[0].dialingsuffix.trim() || '');
	})
	it("Verify Max Attempt  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(18))).toBe(dbData[0].maxattempts.toString());
	})
	it("Verify Client Contact Name  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(19))).toBe(dbData[0].clientcontactname.trim() || '');
	})
	it("Verify Client Contact Phone field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(20))).toBe(dbData[0].clientcontactphone.trim() || '');
	})
	it("Verify App Contact Name  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(21))).toBe(dbData[0].applicationcontactname.trim() || '');
	})
	it("Verify App Contact Phone  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(22))).toBe(dbData[0].applicationcontactphone.trim() || '');
	})
	it("Verify Tech Contact Name  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(23))).toBe(dbData[0].technicalcontactname.trim() || '');
	})
	it("Verify Tech Contact Phone  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(24))).toBe(dbData[0].technicalcontactphone.trim() || '');
	})
	it("Verify DC1ContactName  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(25))).toBe(dbData[0].datacenter1contactname.trim() || '');
	})
	it("Verify DC1ContactPhone  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(26))).toBe(dbData[0].datacenter1contactphone.trim() || '');
	})
	it("Verify DC2ContactName  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(27))).toBe(dbData[0].datacenter2contactname.trim() || '');
	})
	it("Verify DC2ContactPhone  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(28))).toBe(dbData[0].datacenter2contactphone.trim() || '');
	})
	it("Verify ServiceBureauName  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(29))).toBe(dbData[0].servicebureauname.trim() || '');
	})
	it("Verify ServiceBureauAddress  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(30))).toBe(dbData[0].servicebureauaddress.trim() || '');

	})
	it("Verify ServiceBureauContact field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(31))).toBe(dbData[0].servicebureaucontact.trim() || '');
	})
	it("Verify ServiceBureauPhone  field- UI Vs Database table value", function () {
		expect(util.getTextValue(Client.clientfields.get(32))).toBe(dbData[0].servicebureauphone.trim() || '');
	})

})