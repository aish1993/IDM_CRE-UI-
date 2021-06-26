/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/12/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var basePath = __dirname;
var util = requireUtilityPage('Common_Utility');
var db = requireUtilityPage('DB_Util');
var UDF=require("../../pages/CRE_Profile/UDF_Page");
var TC_DATA = util.read_from_excel('View','EPCProfile_TestData');
var login_page = requirePage("Login_Page");
var steps_util = requireUtilityPage('Steps_Utility');
var dbActive,dbData={}

describe("CRE Profile| CRE Profile for UDF|Verifying UI and Database fields",function()  {
	var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
	steps_util.info_step(' EXECUTION OF TEST SUITE FOR UDF ')
	beforeAll(async function(done)  {
		steps_util.preStep('CRE Profile', 'UDF')
		login_page.login(MAKER_USER, MAKER_PASSWORD,'CRE_Profile')
		steps_util.info_step('*Starting Test case Execution for UDF ')
		await db.execute_sql_query("select a.pname ,b.name from Profiles a JOIN clientinfo b ON b.clientid=a.pclientid ").then(function (BData) {
			dbActive = BData;
			console.log(BData);

		});
		TC_DATA[0].Name = await dbActive[0].pname
		done()
	});
	beforeEach( function(done)  {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 70000;
		done()
	});
	afterEach(function(done)  {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
		steps_util.info_step(' Finished Test case Execution for UDF ')
		done()
	});
	afterAll(function(done) {
		steps_util.info_step(' END OF TEST SUITE EXECUTION FOR UDF ')
		done()
	})

		//***********UDF***************//

		it("Verify UDF ID  field- UI Vs Database table value ",async function()  {
			
			await db.execute_sql_query("select * from UserDefFlds where udfclientid in(select clientid from ClientInfo where  name='"+dbActive[0].name+"')").then(function(jdata){
				dbData=jdata;
				console.log(jdata);
			});
			UDF.nav_helper_view(TC_DATA[0])
			expect(util.getTextValue(UDF.udffields.get(0))).toBe(dbData[1].udfid.toString()||'');	
		})
		it("Verify Client ID  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(UDF.udffields.get(1))).toBe(dbData[1].udfclientid.toString()||'');	
		})
		it("Verify Name  field- UI Vs Database table value",function()  {
			expect(util.getTextValue(UDF.udffields.get(2))).toBe(dbData[1].udfname||'');	
		})
		it("Verify Description field- UI Vs Database table value",function()  {
			expect(util.getTextValue(UDF.udffields.get(3))).toBe(dbData[1].udfdescription||'');	
		})
		it("Verify Output field- UI Vs Database table value",function()  {
			expect(util.getTextValue(UDF.udffields.get(4))).toBe(dbData[1].udfoutput||'');	
		})

})