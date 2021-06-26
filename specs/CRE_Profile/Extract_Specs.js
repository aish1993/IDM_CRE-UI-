/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/19/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var Extract=require("../../pages/CRE_Profile/Extract_Page");
var TC_DATA = util.read_from_excel('View','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData,dbActive={}


describe("CRE Profile|Profile for Extract|Verifying UI Value from DB",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR  EXTRACT')
	beforeAll(async function()  {
		steps_util.preStep('CRE Profile', 'Extract')
		steps_util.info_step(' Starting Test case Execution for Extract')
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile')
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
		});
		TC_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("select * from ExtractFields where EFProfileID in (select PID from Profiles where PName='"+dbActive[0].pname+"')").then(function(jdata){
			dbData=jdata;
			return jdata
		});
	});
	beforeEach( function()  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 700000;
	});
	afterEach(function()  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Extract')
	});
	afterAll(function() {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR EXTRACT')
	})


		//***********Extract*************//

		it("Verify EFID  field- UI Vs Database table value",async function()  {
			Extract.nav_helper_view(TC_DATA[0])
			await expect(util.getTextValue(Extract.extractfields.get(0))).toBe(dbData[0].efid.toString());	
		})
		it("Verify Profile ID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(1))).toBe(dbData[0].efprofileid.toString());	
		})
		it("Verify Field Type  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(2))).toBe(dbData[0].effieldtype.toString());	
		})
		it("Verify FieldSource  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(3))).toBe(dbData[0].effieldsource.toString());	
		})
		it("Verify  EFName  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(4))).toBe(dbData[0].efname);	
		})
		it("Verify Description  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(5)) ).toBe(dbData[0].efdescription.toString());	
		})
		it("Verify Table  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(6)) ).toBe(dbData[0].eftable.trim());	
		})
		it("Verify Position  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(7))).toBe(dbData[0].efposition.toString());	
		})
		it("Verify Format Override  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(8))).toBe(dbData[0].efformatoverride.toString());	
		})
		it("Verify Data Type  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(9))).toBe(dbData[0].efdatatype);	
		})
		it("Verify Field Length  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(10))).toBe(dbData[0].effieldlength.toString());	
		})
		it("Verify Client Name  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(11))).toBe(dbData[0].efoutputlength.toString());	
		})
		it("Verify Remove Chars  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(12))).toBe(dbData[0].efremovechars.trim());	
		})
		it("Verify DFID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(13))).toBe(dbData[0].efdfid.toString());	
		})
		it("Verify NFID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(14))).toBe(dbData[0].efnfid.toString());	
		})
		it("Verify PadLength  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(15))).toBe(dbData[0].efpadlength.toString());	
		})
		it("Verify PadCharacter  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(16))).toBe(dbData[0].efpadcharacter.toString());	
		})
		it("Verify Decimal Places  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(17))).toBe(dbData[0].efdecimalplaces.toString());	
		})
		it("Verify Dollar Sign  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(18))).toBe(dbData[0].efdollarsign.toString());	
		})
		it("Verify MidStart  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(19))).toBe(dbData[0].efmidstart.toString());	
		})
		it("Verify MidLength  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(20))).toBe(dbData[0].efmidlength.toString());	
		})
		it("Verify SourceDateFormat  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(21))).toBe(dbData[0].efsourcedatefmt.toString());	
		})
		it("Verify DateDefault  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Extract.extractfields.get(22))).toBe(dbData[0].efdatedefault.toString());	
		})

})