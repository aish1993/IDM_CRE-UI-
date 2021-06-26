/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 3/03/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var clone = require("../../pages/CRE_Profile/CloneProfile_Page");
var client = require("../../pages/CRE_Profile/Client_Page");
var TC_DATA = util.read_from_excel('Clone', 'EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var EditTC_DATA = util.read_from_excel('UpdateProfile', 'EPCProfile_TestData');
var dbActive = {}

describe("CRE Profile| Clone Profile|Verifying UI and Database fields", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR CLONE ')
	beforeAll(function () {
		steps_util.preStep('CRE Profile', 'Clone Profile')
		steps_util.info_step(' Starting Test case Execution for Clone')
	});
	beforeEach(async function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid where b.isactive=1").then(function (BData) {
			dbActive = BData;
		});
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Clone')
	});
	afterAll(function () {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR CLONE ')
	})


	TC_DATA.forEach(function (data, index) {
		it("Verify Negative and Positive test cases for clone functionality " + (index + 1), async function (done) {
			TC_DATA[index].Profile = await dbActive[0].pname
			login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile')
			clone.nav_helper(data);
			var result = clone.add_Value(data)
			await expect(result[0]).toBe(data.ExpectedResult);
			done()
		});



	});
})

describe("CRE Profile| Update Profile|Verifying functionality for Update Profile", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR CLONE ')
	beforeAll(function () {
		steps_util.preStep('CRE Profile', 'Update Profile')
		steps_util.info_step(' Starting Test case Execution for Update Profile')

	});
	beforeEach(async function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile')

	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Update Profile')
	});
	afterAll(function () {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR Update Profile ')
	})


	EditTC_DATA.forEach(function (data, index) {
		it("Verify Negative and Positive test cases for Update Profile functionality " + (index + 1), async function () {
			await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
				dbActive = BData;
				console.log(BData)
			});
			EditTC_DATA[index].Name = await dbActive[0].pname
			if (EditTC_DATA.ExpectedResult = 'Record successfully sent for approval') {
				await db.execute_sql_query("delete from clientinfo_stg where name='" + EditTC_DATA[0].Name + "'").then(function (BData) {
					dbActive = BData;
				});
			}
			expect(client.editProfile(data)).toBe(data.ExpectedResult);
		});



	});
})