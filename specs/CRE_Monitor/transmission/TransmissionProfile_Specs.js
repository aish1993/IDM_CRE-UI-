var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');
var login_page = requirePage("Login_Page");
var transProfile = requirePage("/CRE_Monitor/transmission/TransmissionProfile_Page");
var db = requireUtilityPage('DB_Util');
var TC_DATA_ADD = util.read_from_excel('Add_TransmissionProfile', 'EpcTransmission_TestData');
var TC_DATA_EDIT = util.read_from_excel('Edit_TransmissionProfile', 'EpcTransmission_TestData');
var DATA = util.read_from_excel('TransmissionProfile', 'EpcTransmission_TestData');


describe("CRE Monitoring| View Transmission Profile| Verifying UI and Database fields", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	var dbData = {};
	var trans_nameUI = '';
	beforeAll(async function (done) {
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Monitor');
		browser.waitForAngularEnabled(false);
		transProfile.navigate_transProfile();
		browser.sleep(2000)
		trans_nameUI = await transProfile.get_TransmissionName();
		await db.execute_sql_query("select c.name , b.pname ,a.transname,a.enabled from Ts_TransmitProfile a, Profiles b, ClientInfo c where a.epcpid=B.pid and b.pclientid=C.clientid and a.TransName='" + trans_nameUI + "'").then(function (jdata) {
			dbData = jdata;
		})
		done();
	})
	beforeEach(function () {
		steps_util.preStep('CRE Module', 'View Transmission Profile')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 65000;
	});


	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		browser.sleep(3000);
		done();
	});

	it("Verify transmission name- UI Vs Database table value", async function (done) {
		var trans_nameDB = await dbData[0].transname;
		steps_util.info_step('Transmission name in UI field: ' + trans_nameUI);
		steps_util.info_step('Transmission name in Database field: ' + trans_nameDB);
		expect(trans_nameUI).toBe(trans_nameDB, 'Transmission name mismatched in UI and Database table value');
		done();
	})
	it("Verify Client name- UI Vs Database table value", async function (done) {
		var client_nameUI, client_nameDB;
		client_nameUI = await transProfile.get_Client();
		client_nameDB = await dbData[0].name;
		steps_util.info_step('Client name in UI field: ' + client_nameUI);
		steps_util.info_step('Client name in Database field: ' + client_nameDB);
		expect(client_nameUI).toBe(client_nameDB, 'Client name mismatched in UI and Database table value');
		done();
	})
	it("Verify CRE Profile- UI Vs Database table value", async function (done) {
		var cre_profileUI, cre_profileDB;
		cre_profileUI = await transProfile.get_EpcProfile();
		cre_profileDB = await dbData[0].pname;
		steps_util.info_step('CRE Profile in UI field: ' + cre_profileUI);
		steps_util.info_step('CRE Profile in Database field: ' + cre_profileDB);
		expect(cre_profileUI).toBe(cre_profileDB, 'CRE Profile mismatched in UI and Database table value');
		done();
	})
	
})

describe("CRE Monitoring| Add Transmission Profile| Add Tranmsission validations", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(function () {
		steps_util.preStep('CRE Module', 'Add Transmission Profile')
	})
	beforeEach(async function (done) {
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Monitor');
		transProfile.navigate_addTrans()
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		await db.execute_sql_query("select pname,name from Profiles a JOIN ClientInfo b ON b.clientid=a.pclientid").then(async function (jdata) {
			dbData = await jdata;
		})
		done();
	});

	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		done();
	});
	TC_DATA_ADD.forEach(function (data) {
		it("Verify Input for " + data.Field_Name + " in Add Transmission profile", async function (done) {
			var expected_result, actual_result;
			expected_result = data.ExpectedResult;
			if (data.Client != undefined)
				data.Client = dbData[0].name
			if (data.EpcProfile != undefined)
				data.EpcProfile = dbData[0].pname
			actual_result = await transProfile.add_transmission(data);
			steps_util.info_step('Expected result is  ' + expected_result);
			steps_util.info_step('Actual result is ' + actual_result);
			expect(expected_result).toBe(actual_result);
			done()
		})
	})

})
describe("CRE Monitoring| Edit Transmission Profile| Edit Tranmsission validations", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	var dbData = {};
	var trans_nameUI = '';
	beforeAll(function (done) {
		done();
	})
	beforeEach(async function (done) {
		steps_util.preStep('CRE Module', 'View  Profile')
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Monitor');
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		await db.execute_sql_query("select pname,name from Profiles a JOIN ClientInfo b ON b.clientid=a.pclientid").then(async function (jdata) {
			dbData = await jdata;
		})
		done();
	});

	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		// util.logout();
		done();
	});
	TC_DATA_EDIT.forEach(function (data) {
		it("Verify Input for " + data.Field_Name + " in Edit Transmission profile", async  function (done) {
			expected_result = data.ExpectedResult;
			if (data.Client != undefined)
				data.Client = dbData[0].name
			if (data.EpcProfile != undefined)
				data.EpcProfile = dbData[0].pname
			trans_nameUI= transProfile.editnavigate_transProfile()
			actual_result =   transProfile.navigate_editTransProfile(data);
			expect(expected_result).toBe(actual_result);
			done()
		})
	})

})


describe('CRE Monitoring| Transmission Profile| Boundary Value Analysis  ', function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(function (done) {
		steps_util.preStep('CRE Module', 'Add Transmission Profile')
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Monitor');
		transProfile.navigate_addTrans()

		done();
	})
	beforeEach(function (done) {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 6500000;
		done();
	});

	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		done();
	});
	afterAll(function () {
	})
	DATA.filter(function (rawData) {
		return ((rawData.BVA || "").toLowerCase()).includes('yes');
	}).forEach(function (data) {
		it('Verify Boundary Value Analysis(with lowest value) for Field:-' + data.FIELD_NAME, async function (done) {
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			var test_data = await util.generate_BVA_data((data.MIN || '1'), data.INPUT_TYPE);
			var result = await transProfile.verify_boundary_value(test_data, data)
			expect(result).toBe(test_data, '**Boundary value Analysis test failed**');
			done();
		})
		it('Verify Boundary Value Analysis(with lowest-1 value) for Field:-' + data.FIELD_NAME, async function (done) {
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			var test_data = await util.generate_BVA_data((data.MAX - 1), data.INPUT_TYPE);
			var result = await transProfile.verify_boundary_value(test_data, data)
			expect(result.length).toBeGreaterThanOrEqual(test_data.length, '**Boundary value Analysis test failed**');
			done();
		})
		it('Verify Boundary Value Analysis(with highest value) for Field:-' + data.FIELD_NAME, async function (done) {
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			var test_data = await util.generate_BVA_data((data.MAX), data.INPUT_TYPE);
			var result = await transProfile.verify_boundary_value(test_data, data)
			expect(result.length).toBe(test_data.length, '**Boundary value Analysis test failed**');
			done();
		})
		it('Verify Boundary Value Analysis(with highest+1 value) for Field:-' + data.FIELD_NAME, async function (done) {
			toggle = 'Yes';
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			var test_data = await util.generate_BVA_data((data.MAX + 1), data.INPUT_TYPE);
			var result = await transProfile.verify_boundary_value(test_data, data)
			expect(result.length).toBeLessThan(test_data.length, '**Boundary value Analysis test failed**');
			done();
		})
	});
});
describe('CRE Monitoring| Transmission Profile| Page Labels verification', function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(function (done) {
		steps_util.preStep('CRE Module', 'Add Transmission Profile')
		login_page.login(CHECKER_USER, CHECKER_PASSWORD,'CRE_Monitor');
		transProfile.navigate_addTrans()
		done();
	})
	beforeEach(function (done) {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		done();
	});

	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		// util.logout();
		done();
	});
	afterAll(function () {
	})
	DATA.filter(function (rawData) {
		return ((rawData.LABEL ||"").toLowerCase()).includes('yes');
	}).forEach(function (data) {
		it('Verify presence of Label :-' + data.FIELD_NAME,  function (done) {
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			expect(transProfile.verify_label_presence(data.FIELD_NAME)).toBe(true,data.FIELD_NAME+' Label not found');
			done();
		})

	});
});