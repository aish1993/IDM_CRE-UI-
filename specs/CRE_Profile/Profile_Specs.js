/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/12/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var Profile=require("../../pages/CRE_Profile/Profile_Page");
var TC_DATA = util.read_from_excel('View','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData,dbActive={};

describe("CRE Profile|Profile for Profile|Verifying UI Value from DB ",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR PROFILE')
	beforeAll(async function()  {
		steps_util.preStep('CRE Profile', 'Profile')
		steps_util.info_step(' Starting Test case Execution for Profile ')
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile')
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
		});
		TC_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("select * from Profiles where PName='"+TC_DATA[0].Name+"'").then(function(BData){
			dbData=BData;
			console.log(BData);
		});

		await db.execute_sql_query("select SNSF from SourceDefinitions where SName='"+TC_DATA[0].Name+"'").then(function(jdata){
			dbData1=jdata;
			console.log(jdata);
		});
	});
	beforeEach( function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000;
	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step('Finished Test case Execution for Profile ')
	});
	afterAll(function() {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR PROFILE ')
	})

		//***********Profile***************//

		it("Verify Profile ID  field- UI Vs Database table value",function()  {
			Profile.nav_helper_view(TC_DATA[0])
			expect(util.getTextValue(Profile.profilefields.get(0))).toBe(dbData[0].pid.toString());	
		})
		it("Verify Name  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(1))).toBe(dbData[0].pname.toString());	
		})
		it("Verify Description field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(2))).toBe(dbData[0].pdescription.trim());	
		})
		it("Verify Completed field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(3)) ).toBe(dbData[0].pcompleted.toString());	
		})
		it("Verify Client ID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(4))).toBe(dbData[0].pclientid.toString());	
		})
		it("Verify PffID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(5)) ).toBe(dbData[0].pffid.toString());	
		})
		it("Verify PnfID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(6)) ).toBe(dbData[0].pnfid.toString());	
		})
		it("Verify PdfID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(7))).toBe(dbData[0].pdfid.toString());	
		})
		it("Verify Record Length  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(8))).toBe(dbData[0].precordlength.toString());	
		})
		it("Verify Delimiter  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(9))).toBe(dbData[0].pdelimiter.toString());	
		})
		it("Verify Separator  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(10))).toBe(dbData[0].pseparator.toString());	
		})
		it("Verify Decimal Places field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(11))).toBe(dbData[0].pdecimalplaces.toString());	
		})
		it("Verify Dollar Sign  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(12))).toBe(dbData[0].pdollarsign.toString());	
		})
		it("Verify Pad Character field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(13))).toBe(dbData[0].ppadcharacter.toString());	
		})
		it("Verify Type  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(14))).toBe(dbData[0].ptype.toString());	
		})
		it("Verify SourceID  field- UI Vs Database table value",function()  {
		expect(util.getTextValue(Profile.profilefields.get(15))).toBe(dbData[0].psourcedefid.toString());	
		})
		it("Verify Input File  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(16))).toBe(dbData[0].pinputfile.toString());	
		})
		it("Verify Output File  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Profile.profilefields.get(17))).toBe(dbData[0].poutputfile.toString());	
		})
		it("Verify Roll up Details field- UI Vs Database table value ",function()  {
			expect(util.getTextValue(Profile.profilefields.get(18))).toBe(dbData[0].prollupdetails.toString());	
		})
		it("Verify Post ProcessDLL field- UI Vs Database table value ",function()  {
			expect(util.getTextValue(Profile.profilefields.get(19))).toBe(dbData[0].ppostprocessdll.trim());	
		})
		it("Verify NSF  field- UI Vs Database table value",function()  {
		expect(util.getTextValue(Profile.profilefields.get(20))).toBe(dbData1[0].snsf.toString());	
		})

})