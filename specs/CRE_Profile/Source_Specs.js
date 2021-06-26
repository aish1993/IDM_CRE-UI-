/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/12/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var Source=require("../../pages/CRE_Profile/Source_Page");
var TC_DATA = util.read_from_excel('View','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbData,dbActive={};	

describe("CRE Profile|Profile for sOURCE|Verifying UI Value from DB ",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR SOURCE ')
	beforeAll(async function(done)  {
		steps_util.preStep('CRE Profile', 'Source')
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile')
		steps_util.info_step(' Starting Test case Execution for Source ')
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
		});
		TC_DATA[0].Name = await dbActive[0].pname
		await db.execute_sql_query("select * from SourceDefinitions where sname='"+TC_DATA[0].Name+"'").then(function(jdata){
			dbData=jdata;
			console.log(jdata);
		});
		done()

	});
	beforeEach( function(done)  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000;
		done()
	});
	afterEach(function(done)  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for Source ')
		done()
	});
	afterAll(function(done) {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR SOURCE ')
		done()
	})

		//***********Source***************//

		it("Verify Source ID  field- UI Vs Database table value",function()  {
			Source.nav_helper_view(TC_DATA[0])
			expect(util.getTextValue(Source.sourcefields.get(0))).toBe(dbData[0].sid.toString());	
		})
		it("Verify Name field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Source.sourcefields.get(1))).toBe(dbData[0].sname.trim());	
		})
		it("Verify Description  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Source.sourcefields.get(2))).toBe(dbData[0].sdescription.toString());	
		})
		it("Verify Database  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Source.sourcefields.get(3) )).toBe(dbData[0].sdatabase.trim());	
		})
		it("Verify NSF  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Source.sourcefields.get(4))).toBe(dbData[0].snsf.toString());	
		})
		it("Verify Stored Proc  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Source.sourcefields.get(5)) ).toBe(dbData[0].sstoredproc.trim());	
		})
		it("Verify Type  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(Source.sourcefields.get(6))).toBe(dbData[0].stype.toString());	
		})

})