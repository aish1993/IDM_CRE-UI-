/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 11/01/2020
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
const { browser } = require("protractor");
var cloneTransmission = require("../../../pages/CRE_Monitor/transmission/CloneTransmission_Page");
var TC_DATA = util.read_from_excel('Clone', 'EpcTransmission_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData={}

describe("CRE Monitor|Clone Transmission|Veryfying functionality of Clone Transmission", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR CLONE TRANSMISSION  ')
	beforeEach(function () {
		steps_util.preStep('CRE Monitor', 'Clone Transmission')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		steps_util.info_step(' Starting Test case Execution for  Clone Transmsision')
	});

	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Clone Transmsision')
	});
	afterAll(function () {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR CLONE TRANSMISSION ')
	})

	TC_DATA.forEach(function (data, index) {
		it("Verifying Inline and Toast Message" + (index + 1), async function (done) {
			await db.execute_sql_query("select transname from TS_TransmitProfile").then( function (jdata) {
				 dbData=jdata
			})
			data.sourceTrans=await dbData[0].transname;
			login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor').subMenu_Click('Transmission', 'Clone Transmission')
			expect(cloneTransmission.clone_transmission(data)).toBe(data.ExpectedResult)
			done();
		})
	})
})
