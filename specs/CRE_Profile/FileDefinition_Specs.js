/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/18/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var FileDefinition=require("../../pages/CRE_Profile/FileDefinition_Page");
var TC_DATA = util.read_from_excel('View','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbActive,dbData={}

describe("CRE Profile|Profile for FileDefinition|Verifying UI Value from DB",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR FILE DEFINITION ')
	beforeAll(async function()  {
		steps_util.preStep('CRE Profile', 'File Definition')
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile')
		steps_util.info_step(' Starting Test case Execution for File Definition ')
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
		});
		TC_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("select * from FileDefinitions where FDSourceID in (select SID from SourceDefinitions where SName='"+dbActive[0].pname+"')").then(function(jdata){
			dbData=jdata;
		});
	});
	beforeEach( function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000;
	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for File Definition ')
	});
	afterAll(function() {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR FILE DEFINITION ')
	})
		//***********File Definition***************//

		it("Verify Filed Def ID  field- UI Vs Database table value",function()  {
			FileDefinition.nav_helper_view(TC_DATA[0])
			expect(util.getTextValue(FileDefinition.filefields.get(0))).toBe(dbData[0].fdid.toString());	
		})
		it("Verify Source ID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(1))).toBe(dbData[0].fdsourceid.toString());	
		})
		it("Verify File Name field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(2))).toBe(dbData[0].fdfieldname);	
		})
		it("Verify Field Description field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(3))).toBe(dbData[0].fdfielddescription);	
		})
		it("Verify Data Type  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(4))).toBe(dbData[0].fddatatype);	
		})
		it("Verify Length  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(5)) ).toBe(dbData[0].fdlength.toString());	
		})
		it("Verify Table Name field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(6)) ).toBe(dbData[0].fdtablename.trim());	
		})
		it("Verify Label  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(7))).toBe(dbData[0].fdlevel.toString());	
		})
		it("Verify Form Name  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(8))).toBe(dbData[0].fdformname.trim());	
		})
		it("Verify Date Format  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(FileDefinition.filefields.get(9))).toBe(dbData[0].fddateformat.toString());	
		})
		

})