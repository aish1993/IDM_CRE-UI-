var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');
var login_page = requirePage("Login_Page");
var transConfig = requirePage("/CRE_Monitor/transmission/TransmissionConfig_Page");
var transProfile = requirePage("/CRE_Monitor/transmission/TransmissionProfile_Page");
var db = requireUtilityPage('DB_Util');
var TC_DATA_ADD = util.read_from_excel('Add_TransmissionConfig', 'EpcTransmission_TestData');
var TC_DATA_EDIT = util.read_from_excel('Edit_TransmissionConfig', 'EpcTransmission_TestData');
var DATA = util.read_from_excel('TransmissionConfig', 'EpcTransmission_TestData');
var dbData;

describe("CRE | Transmission Config | Verifying UI and Database fields ", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	var dbData, dbData1, dbData2, dbData3 = {};
	var trans_nameUI = '';
	beforeAll(async function (done) {
		// browser.waitForAngularEnabled(true);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Monitor');
		trans_nameUI = await transConfig.navigate_transConfig();
		await db.execute_sql_query("select retryuntiltime, addtldata ,timetorun ,reqverify,converttounix,desttype,transblankfile from Ts_TransmitProfile  where  TransName='" + trans_nameUI + "'").then(async function (jdata) {
			dbData = await jdata;
			console.log(jdata);
		})
		await db.execute_sql_query("select * from Ts_ExtractObject where extobjid=(select inputobjid from Ts_TransmitProfile where TransName='" + trans_nameUI + "')").then(function (jdata) {
			dbData1 = jdata;
			console.log(jdata);
		})
		await db.execute_sql_query("select * from Ts_ExtractObject where extobjid=(select outputobjid  from Ts_TransmitProfile where TransName='" + trans_nameUI + "')").then(function (jdata) {
			dbData2 = jdata;
			console.log(jdata);
		})
		await db.execute_sql_query("select * from Ts_TransmitProfile a JOIN Ts_FileHandlerSource b  ON  a.profileid=b.profileid  JOIN Ts_FileHandler c on c.profileid=a.profileid where a.transname='" + trans_nameUI + "'").then(function (jdata) {
			dbData3 = jdata;
			console.log(jdata);
		})
		done();
	})
	beforeEach(function (done) {
		// browser.waitForAngularEnabled(true);
		steps_util.preStep('CRE Module', 'View Transmission Profile')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		done();
	});

	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	afterAll(function () {
	})
	it("Verify Run At field- UI Vs Database table value", function (done) {
		//Defect logged for Date and time format-- this test case will be failed
		var d = new Date((dbData[0].timetorun));
		var n = d.toTimeString().split(':');
		var RunAt = n[0] + ":" + n[1]
		expect(transConfig.get_RunAt()).toBe(RunAt, ' Run At field mismatched in UI and Database table value');
		done();
	})
	it("Verify Retry Until field- UI Vs Database table value", function (done) {
		var d = new Date((dbData[0].retryuntiltime));
		var n = d.toTimeString().split(':');
		var RetryUntil = n[0] + ":" + n[1]
		expect(transConfig.get_RetryUntil()).toBe(RetryUntil, ' Retry Until field mismatched in UI and Database table value');
		done();
	})
	it("Verify Input Process- UI Vs Database table value", function (done) {
		expect(transConfig.get_InputProcess()).toBe(dbData1[0].descriptivename, ' Input Process mismatched in UI and Database table value');
		done();
	})
	// it("Verify Run On- UI Vs Database table value", async function () {
	// 	expect(get_Runon()).toBe(dbData3[0].daystorun, ' Run On mismatched in UI and Database table value');
	// })

	it("Verify Additional Data- UI Vs Database table value", function (done) {
		expect(transConfig.get_AdditionalData()).toBe(dbData[0].addtldata, ' Additional Data mismatched in UI and Database table value');
		done();
	})
	it("Verify Output Process- UI Vs Database table value", function (done) {
		expect(transConfig.get_OutputProcess()).toBe(dbData2[0].descriptivename, ' Output Process mismatched in UI and Database table value');
		done();
	})
	it("Verify Transsmit To- UI Vs Database table value", function (done) {
		expect(transConfig.get_TransmitTo()).toBe(dbData[0].desttype, 'Transsmit To mismatched in UI and Database table value');
		done();
	})
	it("Verify Transmit Blank- UI Vs Database table value", function (done) {
		expect(transConfig.get_TransmitBlank()).toBe(dbData[0].transblankfile, 'Transmit Blank mismatched in UI and Database table value');
		done();
	})
	it("Verify RVerification- UI Vs Database table value", function (done) {
		expect(transConfig.get_RVerification()).toBe(dbData[0].reqverify, 'RVerification mismatched in UI and Database table value');
		done();
	})
	it("Verify Connvert to Unix- UI Vs Database table value", function (done) {
		expect(transConfig.get_ConvertToUnix()).toBe(dbData[0].converttounix, 'Connvert to Unix mismatched in UI and Database table value');
		done();
	})


})

describe("CRE Monitoring| Add Transmission Config| Add Transmission validations", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeEach(async function (done) {
		steps_util.preStep('CRE Module', 'Add Transmission Profile')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		await db.execute_sql_query("select pname,name from Profiles a JOIN ClientInfo b ON b.clientid=a.pclientid").then(async function (jdata) {
			dbData = await jdata;
		})
		done();
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	afterAll(function () {
	})
	TC_DATA_ADD.forEach(function (data, index) {
		it("Verify Input for " + data.Field_Name + " in Add Transmission config", function (done) {
			login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Monitor');
			if (data.Client != undefined)
				data.Client = dbData[0].name
			if (data.EpcProfile != undefined)
				data.EpcProfile = dbData[0].pname
			expect(transConfig.add_transmission(data)).toBe(data.ExpectedResult);
			done();
		});
	});
});

describe("CRE Monitoring| Edit Transmission Config| Edit Tranmsission validations", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeEach(function (done) {
		steps_util.preStep('CRE Module', 'View Profile');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Monitor');
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000;
		done();
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	afterAll(function () {
	})
	TC_DATA_EDIT.forEach(function (data, index) {
		it("Verify Input for " + data.Field_Name + " in Edit Transmission config", async function (done) {
			// 	transProfile.navigate_transProfile();
			//    trans_nameUI = await transProfile.get_TransmissionName();
			trans_nameUI = await transConfig.editnavigate_transConfig();
			await db.execute_sql_query("delete  from tstransmitprofile_stg  where  TransName='" + trans_nameUI + "'").then(async function (jdata) {
				console.log(jdata);
			})
			expect(transConfig.edit_transmission(data)).toBe(data.ExpectedResult);
			done();
		});
	});
});

describe('CRE Monitoring| Transmission Config| Boundary Value Analysis  ', function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(async function (done) {
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Monitor');
		await db.execute_sql_query("select pname,name from Profiles a JOIN ClientInfo b ON b.clientid=a.pclientid").then(async function (jdata) {
			dbData = jdata;
		})

		done();
	})
	beforeEach(function (done) {
		steps_util.preStep('CRE Module', 'Add Transmission Profile')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000;;
		TC_DATA_ADD[0].Client = dbData[0].name
		TC_DATA_ADD[0].EpcProfile = dbData[0].pname
		transConfig.navigate_addTransConfig(TC_DATA_ADD[0]);
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
			var result = await transConfig.verify_boundary_value(test_data, data)
			expect(result).toBe(test_data, '**Boundary value Analysis test failed**');
			done();
		})
		it('Verify Boundary Value Analysis(with highest value) for Field:-' + data.FIELD_NAME, async function (done) {
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			var test_data = await util.generate_BVA_data((data.MAX), data.INPUT_TYPE);
			var result = await transConfig.verify_boundary_value(test_data, data)
			expect(result).toBe(test_data, '**Boundary value Analysis test failed**');
			done();
		})
		it('Verify Boundary Value Analysis(with highest+1 value) for Field:-' + data.FIELD_NAME, async function (done) {
			toggle = 'Yes';
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			var test_data = await util.generate_BVA_data((data.MAX + 1), data.INPUT_TYPE);
			var result = await transConfig.verify_boundary_value(test_data, data)
			expect(result).toBeLessThan(test_data, '**Boundary value Analysis test failed**');
			done();
		})
	});
});

describe('CRE Monitoring| Transmission Config| Page Labels verification  ', function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(async function (done) {
		await db.execute_sql_query("select pname,name from Profiles a JOIN ClientInfo b ON b.clientid=a.pclientid").then(async function (jdata) {
			dbData = jdata;
		})
		TC_DATA_ADD[0].Client = await dbData[0].name
		TC_DATA_ADD[0].EpcProfile =await dbData[0].pname	
		 login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Monitor');

		transConfig.navigate_addTransConfig(TC_DATA_ADD[0]);
		done();
	})
	beforeEach(function (done) {
		steps_util.preStep('CRE Module', 'Add Transmission Profile')
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 5 * 60 * 1000;
		done();
	});

	afterEach(function (done) {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		done();
	});
	afterAll(function () {
	})

	DATA.filter(function (rawData) {
		return ((rawData.LABEL || "").toLowerCase()).includes('yes');
	}).forEach(function (data) {

		it('Verify presence of Label :-' + data.FIELD_NAME, async function (done) {
			steps_util.info_step('Starting Test case execution for ' + data.FIELD_NAME);
			expect(transConfig.verify_label_presence(data.FIELD_NAME)).toBe(data.FIELD_NAME, data.FIELD_NAME + ' Label not found');
			done();
		})

	});
});
