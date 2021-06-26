/*******************************************
 * Author : neha.prasad@hcl.com
 * Date : 02/11/2021
 * Updated by: 
 *******************************************/

const { browser } = require("protractor");
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var checker = requirePage("/AdminTools/Checker_Page");
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData, dbData2, dbData3, dbData1 = {};
var HomePage = requirePage('HomePage_Page');
var TC_DATA = util.read_from_excel('MakerChecker', 'EPCProfile_TestData');
var result
var noRecordFound = element(by.xpath("//tbody[text()=' No Records to Display ']"))


describe("CRE |CRE Profile|Verifying UI field with DB for Maker and Checker Screen ", function () {
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR EPC PROFILE ')
	var originalTimeout
	beforeAll(function () {
		steps_util.preStep('CRE Profile', 'Admin Tools')
	})
	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;
		steps_util.info_step(' Starting Test case Execution for EPC Profile')
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for EPC Profile')
	});
	afterAll(function () {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR EPC PROFILE')
	})
	login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile')
	browser.sleep(3000)
	HomePage.subMenu_Click('Admin Tools', 'Checker View');
	var value = element(by.xpath("//tr[1]/td[1]"));
	it("Verifying Each and every field with DataBase for CRE Profile(Checker)", async function () {
		noRecordFound.isPresent().then(async function (res) {
			if (res) {
				steps_util.info_step("No Records to Display for Client")
			}
			else {
				browser.sleep(3000)
				await value.getText().then(async function (returnValue) {
					console.log("***********" + returnValue)
					return await db.execute_sql_query("select p.pid, p.pname, p.createdby, p.createdtime, c.accountnumber, c.name, s.sdescription ,p.action from Profiles_Stg p INNER JOIN Clientinfo_stg c ON  p.pclientid =c.clientid  INNER JOIN SourceDefinitions_Stg s ON  p.psourcedefid = s.sid and c.name ='" + returnValue + "' and p.status = 1").then(function (jdata) {
						dbData = jdata;
						console.log(jdata)
						return jdata
					});
				})
				await expect(util.get_ValuefromCheckerUI('Client Name', 1)).toBe(dbData[0].name);
				await expect(util.get_ValuefromCheckerUI('Account Number', 2)).toBe(dbData[0].accountnumber);
				await expect(util.get_ValuefromCheckerUI('Profile Name', 3)).toBe(dbData[0].pname);
				await expect(util.get_ValuefromCheckerUI('Description', 4)).toBe(dbData[0].sdescription);
				await expect(util.get_ValuefromCheckerUI('Maker', 5)).toBe(dbData[0].createdby);
				// expect(util.get_ValuefromUI('Date and Time',6)).toBe(dbData[0].createdtime);
				if (dbData[0].action == 'U')
					dbData[0].action = 'Update'
				else if (dbData[0].action == 'R')
					dbData[0].action = 'Disable'
				else
					dbData[0].action = 'Create'
				await expect(util.get_ValuefromCheckerUI('Request Type', 7)).toBe(dbData[0].action);
				await expect(util.get_ValuefromCheckerUI('Maker', 5)).not.toContain(MAKER_USER);
			}
		})
	})
	it("Verifying Each and every field with DataBase for CRE Transmit(Checker)", async function () {
		await checker.navigate_checker_tabs('CRE Transmit');
		browser.sleep(3000)
		noRecordFound.isPresent().then(async function (res) {
			if (res) {
				steps_util.info_step("No Records to Display for Client")
			}
			else {
				var value = element(by.xpath("//tr[1]/td[1]"));
				await value.getText().then(async function (returnValue) {
					return db.execute_sql_query("select c.name,a.profileid  ,b.pname ,a.transname ,a.createdby,a.createdtime,a.action from TSTransmitProfile_Stg a, Profiles b, ClientInfo c where a.epcpid=B.pid and b.pclientid=C.clientid and a.profileid ='" + returnValue + "' and a.status=1").then(function (jData) {
						dbData1 = jData;
						console.log(jData)
						// return dbData2;
					});
				});
				await expect(util.get_ValuefromCheckerUI('Profile Id', 1)).toBe(dbData1[0].profileid.toString());
				await expect(util.get_ValuefromCheckerUI('Client Name', 3)).toBe(dbData1[0].name);
				await expect(util.get_ValuefromCheckerUI('Transmit Name', 2)).toBe(dbData1[0].transname);
				await expect(util.get_ValuefromCheckerUI('Profile Name', 4)).toBe(dbData1[0].pname);
				await expect(util.get_ValuefromCheckerUI('Maker', 5)).toBe(dbData1[0].createdby);
				// expect(util.get_ValuefromUI('Date and Time',6)).toBe(dbData[0].createdtime);
				if (dbData1[0].action == 'U')
					dbData1[0].action = 'Update'
				else if (dbData1[0].action == 'R')
					dbData1[0].action = 'Disable'
				else
					dbData1[0].action = 'Create'
				await expect(util.get_ValuefromCheckerUI('Request Type', 7)).toBe(dbData1[0].action);
				await expect(util.get_ValuefromCheckerUI('Maker', 5)).not.toContain(MAKER_USER);
			}
		})
	})
	it("Verifying Each and every field with DataBase for CRE Profile(Maker)", async function () {
		HomePage.subMenu_Click('Admin Tools', 'Maker View');
		browser.sleep(2000)
		noRecordFound.isPresent().then(async function (res) {
			if (res) {
				steps_util.info_step("No Records to Display for Client")
			}
			else {
				var value1 = element(by.xpath("//tr[1]/td[2]"));
				await value1.getText().then(async function (returnValue) {
					console.log(returnValue)
					return await db.execute_sql_query("select p.pid, p.pname, p.approvedby, p.createdtime, p.approvedremark, c.accountnumber, p.status,c.name, s.sdescription ,p.action from Profiles_Stg p INNER JOIN Clientinfo_stg c ON  p.pclientid =c.clientid  INNER JOIN SourceDefinitions_Stg s ON  p.psourcedefid = s.sid and c.name ='" + returnValue + "' order by p.createdtime desc").then(function (jdata) {
						dbData3 = jdata;
						console.log(jdata)
						return jdata
					});
				});
				await expect(util.get_ValuefromMakerUI('Client Name', 2)).toBe(dbData3[0].name);
				await expect(util.get_ValuefromMakerUI('Account Number', 3)).toBe(dbData3[0].accountnumber);
				await expect(util.get_ValuefromMakerUI('Profile Name', 4)).toBe(dbData3[0].pname);
				await expect(util.get_ValuefromMakerUI('Description', 5)).toBe(dbData3[0].sdescription);
				await expect(util.get_ValuefromMakerUI('Checker', 6)).toBe(dbData3[0].approvedby);
				// expect(util.get_ValuefromUI('Date and Time',6)).toBe(dbData[0].CreatedTime);
				await expect(util.get_ValuefromMakerUI('Remarks', 7)).toBe(dbData3[0].approvedremark);
				if (dbData3[0].status == 2)
					dbData3[0].status = 'Approved'
				else
					dbData3[0].status = 'Referred Back'
				await expect(util.get_ValuefromMakerUI('Remarks', 1)).toBe(dbData3[0].status);
			}
		})
	})
	it("Verifying Each and every field with DataBase for CRE Transmit(Maker)", async function () {
		await checker.navigate_checker_tabs('CRE Transmit');
		browser.sleep(3000)
		noRecordFound.isPresent().then(async function (res) {
			if (res) {
				steps_util.info_step("No Records to Display for Client")
			}
			else {
				var value = element(by.xpath("//tr[1]/td[2]"));
				await value.getText().then(async function (returnValue) {
					return db.execute_sql_query("select a.status,c.name,a.profileid  ,b.pname ,a.transname ,a.approvedremark,a.approvedby,a.action from TSTransmitProfile_Stg a, Profiles b, ClientInfo c where a.epcpid=B.pid and b.pclientid=C.clientid and a.profileid ='" + returnValue + "'").then(function (jData) {
						dbData2 = jData;
						console.log(jData)
						return dbData2;
					});
				});
				await expect(util.get_ValuefromMakerUI('Profile Id', 2)).toBe(dbData2[0].profileid.toString());
				await expect(util.get_ValuefromMakerUI('Client Name', 4)).toBe(dbData2[0].name);
				await expect(util.get_ValuefromMakerUI('Transmit Name', 3)).toBe(dbData2[0].transname);
				await expect(util.get_ValuefromMakerUI('Profile Name', 5)).toBe(dbData2[0].pname);
				await expect(util.get_ValuefromMakerUI('Checker', 6)).toBe(dbData2[0].approvedby);
				// expect(util.get_ValuefromUI('Date and Time',6)).toBe(dbData[0].createdtime);
				if (dbData2[0].status == 2)
					dbData2[0].status = 'Approved'
				else
					dbData2[0].status = 'Referred Back'
				await expect(util.get_ValuefromMakerUI('Remarks', 7)).toBe(dbData2[0].approvedremark);
				await expect(util.get_ValuefromMakerUI('Remarks', 1)).toBe(dbData2[0].status);
			}
		})
	})

	TC_DATA.forEach(function (data, index) {
		it("Verifying Inline message when invalid/Space Text Entered in Action Pop-Up for " + data.ModuleName, async function () {
					login_page.login(MAKER_USER, MAKER_PASSWORD, 'CRE_Profile')
					HomePage.subMenu_Click('Admin Tools', 'Checker View');
					checker.navigate_checker_tabs(data.ModuleName);
					var action_btn = element.all(by.xpath("//*[normalize-space(text())]/ancestor::tr//td[last()]//img[@alt='" + data.Action + "']"));
					browser.sleep(2000)
					noRecordFound.isPresent().then(async function (res) {
						if (res) {
							steps_util.info_step("No Records to Display for Client")
						}
						else {
					util.elementClickable(action_btn.get(0))
					element.all(by.xpath("//span[text()='Yes']")).get(0).click()
					expect( util.resultMessage(data.TestResultType)).toBe(data.ExpectedResult);
					//  browser.refresh()
				}
			})
		})
	})

});
