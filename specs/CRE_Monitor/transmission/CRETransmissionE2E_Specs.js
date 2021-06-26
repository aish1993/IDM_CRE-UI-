var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');
var login_page = requirePage("Login_Page");
var transConfig = requirePage("/CRE_Monitor/transmission/TransmissionConfig_Page");
var transProfile = requirePage("/CRE_Monitor/transmission/TransmissionProfile_Page");
var cre_Monitoring = requirePage("/CRE_Monitor/monitoring/CRE_Monitoring_Page");
var checker = requirePage("/AdminTools/Checker_Page");
var maker = requirePage("/AdminTools/Maker_Page");
var db = requireUtilityPage('DB_Util');
var TC_DATA_ADD = util.read_from_excel('Add_TransmissionConfig', 'EpcTransmission_TestData');
var TC_DATA_EDIT = util.read_from_excel('Edit_TransmissionConfig', 'EpcTransmission_TestData');
//var trans_nameUI;

xdescribe("CRE Monitoring| CRE Transmission| End to End validations for Add Transmsision", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(function (done) {
		steps_util.preStep('CRE Monitor', 'Add Transmission')
		done();
	});
	beforeEach(async function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		await db.execute_sql_query("select pname,name from Profiles a JOIN ClientInfo b ON b.clientid=a.pclientid").then(async function (jdata) {
			dbData = await jdata;
		})
		if (TC_DATA_ADD[0].Client != undefined)
			TC_DATA_ADD[0].Client = dbData[0].name
		if (TC_DATA_ADD[0].EpcProfile != undefined)
			TC_DATA_ADD[0].EpcProfile = dbData[0].pname
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	afterAll(function () {
	})
	it("Verify approval of End to End transaction for Add CRE Transmission", function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor').subMenu_Click('Transmission', 'Add New Transmission');
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		var transmission_name = transConfig.add_transmission_E2E(TC_DATA_ADD[0]);
		expect(transmission_name[1]).toBeTruthy('Unable to add new Transmission');
		expect(transmission_name[0]).toBe(TC_DATA_ADD[0].ExpectedResult);
		steps_util.info_step('New Transmission created with name ' + transmission_name[1]);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker pag');
		var result = checker.approve_record(transmission_name[1], 'Transmit Name', 'Approve');
		expect(result).toBe(true);
		done();
	});
	it("Verify Refer Back of End to End transaction for Add CRE Transmission", function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor').subMenu_Click('Transmission', 'Add New Transmission');
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		var transmission_name = transConfig.add_transmission_E2E(TC_DATA_ADD[0]);
		expect(transmission_name[1]).toBeTruthy('Unable to add new Transmission');
		expect(transmission_name[0]).toBe(TC_DATA_ADD[0].ExpectedResult);
		steps_util.info_step('New Transmission created with name ' + transmission_name[1]);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Successfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker pag');
		var result = checker.approve_record(transmission_name[1], 'Transmit Name', 'Refer Back');
		expect(result).toBe(true);
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Maker View');
		checker.navigate_checker_tabs('CRE Transmit');
		element(by.xpath("//*[normalize-space(text())='" + transmission_name[1] + "']/ancestor::tr//td[last()]//img[@alt='Delete']")).click()
		element(by.xpath("//input[@formcontrolname='Message']")).sendKeys('Delete')
		element.all(by.xpath("//span[text()='Yes']")).click();
		done();
	});
	it("Verify Maker able to submit refer Back record again for Add CRE Transmission", function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor').subMenu_Click('Transmission', 'Add New Transmission');
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		var transmission_name = transConfig.add_transmission_E2E(TC_DATA_ADD[0]);
		expect(transmission_name[1]).toBeTruthy('Unable to add new Transmission');
		expect(transmission_name[0]).toBe(TC_DATA_ADD[0].ExpectedResult);
		steps_util.info_step('New Transmission created with name ' + transmission_name[1]);
		// login_page.logout();
		steps_util.info_step('Successfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker pag');
		var result = checker.approve_record(transmission_name[1], 'Transmit Name', 'Refer Back');
		expect(result).toBeTruthy('The record as not approve successfully');
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Maker View');
		checker.navigate_checker_tabs('CRE Transmit');
		var result = maker.review_record(transmission_name[1], 'Trans');
		expect(result).toBe(TC_DATA_ADD[0].ExpectedResult);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		var result = checker.approve_record(transmission_name[1], 'Transmit Name', 'Approve');
		expect(result).toBe(true);
		done();
	});

});

xdescribe("CRE Monitoring| CRE Transmission| End to End validations for Edit Transmsision", function () {
	var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	beforeAll(function (done) {
		steps_util.preStep('CRE Monitor', 'View Trnamsision')
		done();
	});
	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 650000;
		// browser.waitForAngularEnabled(false);


	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	afterAll(function () {

	})
	xit("Verify approval of End to End transaction for Edit CRE Transmission", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor')
		// var ID=cre_Monitoring.get_ProfileID();
		// console.log("sdgs"+ID)
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		var trans_nameUI = await transConfig.editnavigate_transConfig()
		await db.execute_sql_query("delete top(1) from TsTransmitProfile_stg  where  TransName='" + trans_nameUI + "'").then(async function (jdata) {
			console.log(jdata);
		})
		var Body = await transConfig.edit_transmission(TC_DATA_EDIT[0]);
		expect(Body).toBe(TC_DATA_EDIT[0].ExpectedResult);
		console.log("name" + trans_nameUI)
		steps_util.info_step(' Transmission updated with name ' + trans_nameUI);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker page');
		var result = checker.approve_record(trans_nameUI, 'Transmit Name', 'Approve');
		expect(result).toBe(true);
		done();
	});
	xit("Verify Refer Back of End to End transaction for Edit CRE Transmission", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor')
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		var trans_nameUI = await transConfig.editnavigate_transConfig()
		var Body = transConfig.edit_transmission(TC_DATA_EDIT[0]);
		expect(Body).toBe(TC_DATA_EDIT[0].ExpectedResult);
		steps_util.info_step(' Transmission updated with name ' + trans_nameUI);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker page');
		var result = checker.approve_record(trans_nameUI, 'Transmit Name', 'Refer Back');
		expect(result).toBe(true);
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Maker View');
		checker.navigate_checker_tabs('CRE Transmit');
		element(by.xpath("//*[normalize-space(text())='" + trans_nameUI + "']/ancestor::tr//td[last()]//img[@alt='Delete']")).click()
		element(by.xpath("//input[@formcontrolname='Message']")).sendKeys('Delete')
		element.all(by.xpath("//span[text()='Yes']")).click();
		done();
	});
	xit("Verify Maker able to submit refer Back record again for Edit CRE Transmission", async function (done) {
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Monitor')
		browser.refresh();
		steps_util.info_step('Sucessfully Logged in with Maker user credentials');
		var trans_nameUI = await transConfig.editnavigate_transConfig()
		var Body = transConfig.edit_transmission(TC_DATA_EDIT[0]);
		expect(Body).toBe(TC_DATA_EDIT[0].ExpectedResult);
		steps_util.info_step(' Transmission updated with name ' + trans_nameUI);
		steps_util.info_step('Sucessfully Logged out from Maker login');
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		steps_util.info_step('Navigate to CRE Transmit tab in CRE Checker page');
		var result = checker.approve_record(trans_nameUI, 'Transmit Name', 'Refer Back');
		expect(result).toBeTruthy('The record as not approve successfully');
		login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Maker View');
		checker.navigate_checker_tabs('CRE Transmit');
		var result = maker.review_record(trans_nameUI, 'Trans');
		expect(result).toBe(TC_DATA_ADD[0].ExpectedResult);
		login_page.login(CHECKER_USER, CHECKER_PASSWORD, 'CRE_Profile').subMenu_Click('Admin Tools', 'Checker View');
		steps_util.info_step('Sucessfully Logged in with Checker user credentials');
		steps_util.info_step('Navigate to CRE Checker Page in Admin tools Menu');
		checker.navigate_checker_tabs('CRE Transmit');
		var result = checker.approve_record(trans_nameUI, 'Transmit Name', 'Approve');
		expect(result).toBe(true);
		done();
	});

});
