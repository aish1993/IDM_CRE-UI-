var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var steps_util = requireUtilityPage('Steps_Utility');
var checker = requirePage("/AdminTools/Checker_Page");
var cre_Monitoring = requirePage("/CRE_Monitor/monitoring/CRE_Monitoring_Page");
var transConfig = requirePage("/CRE_Monitor/transmission/TransmissionConfig_Page");
var TC_DATA_ADD = util.read_from_excel('Add_TransmissionConfig', 'EpcTransmission_TestData');
var enabledDisabledPage=require("../../pages/CRE_Monitor/Enable_DisabledTrans_Page.js");
var CloneTC_DATA = util.read_from_excel('Clone','Client_TestData');
var clone=require("../../pages/CRE_Profile/CloneProfile_Page");
var CLONE_DATA = util.read_from_excel('Clone','EPCProfile_TestData');
var transConfig = requirePage("/CRE_Monitor/transmission/TransmissionConfig_Page");
var clone=require("../../pages/CRE_Profile/CloneProfile_Page");
"use strict";
var transmissionName = element(by.xpath("//input[@formcontrolname='tName']"));
var AccountPage3=requirePage("/IDM_Profile/account/OutputFormat_Page");
var AccountTC_DATA = util.read_from_excel('AddOutputFormat','Accounts_TestData');
var BusinessRulesPage=requirePage("/IDM_Profile/businessRules/BusinessRules_Page");
var BusinessRulesTC_DATA = util.read_from_excel('Add_Rule','BusinessRules_TestData');
var GroupPage=requirePage("/IDM_Profile/group/GroupSettings_Page");
var GroupTC_DATA = util.read_from_excel('AddGroupSettings','Group_TestData');
var MediaHCLPage=requirePage("/IDM_Profile/media/MediaHCL_Page");
var MediaPage=requirePage("/IDM_Profile/media/Media_Page");
var MediaTC_DATA = util.read_from_excel('AddMedia_HCL','Media_TestData');
var UserManagementPage=requirePage("/UserManagement/userManagement_Page")
var AddTC_DATA = util.read_from_excel('CreateUser','UserManagement_TestData');
var GroupPage = requirePage("/IDM_Profile/group/GroupSettings_Page");
var yes=element(by.xpath("//span[text()='Yes']"))
var ClientPage1=requirePage("/IDM_Profile/clients/ClientSetting_Page");
var reasonbtn=element(by.xpath("//input[@formcontrolname='Message']"));
var yes = element(by.xpath("//span[text()='Yes']"));



//********************************************************************
//* Description     : for re-submitting the record based on the module name 
//* Input Params    : element_name- Name for which action item required eg: Client Name
//*                 : module_name - for which moudle re-submittion required
//* Return Values   :  Toast Message /Name
//********************************************************************
function review_record(element_name, module_name) {
	var review_btn = element(by.xpath("//*[normalize-space(text())='" + element_name + "']/ancestor::tr//td[last()]//img[@alt='Review']"));
	browser.sleep(2000)
	util.elementClickable(review_btn)
	browser.sleep(2000)
	steps_util.info_step('Click on the Review Button for re-submitting the record ')
	switch(module_name) {

	case 'Trans': util.elementClickable(element(by.xpath("//span[text()='2']")));
	              util.scrolldown(transConfig.submitbtn.get(0));
	              util.elementClickable(transConfig.submitbtn.get(0))
	              util.elementClickable(transConfig.submitbtn.get(2))
	              browser.sleep(3000)
	              return util.resultMessage('Dialog')

	case 'Enabled N Disabled':util.inputValidation(reasonbtn,'Enabled/Disabled Trans','Enabled/Disabled Trans','CRE Monitor')
                              util.elementClickable(yes)
	                          return util.resultMessage('Dialog')

	case 'Client' :  var lastpagenavigator=element(by.xpath("//div/ul/li[12]/a/span[1]"))
	                       util.elementClickable(lastpagenavigator)
	                       util.elementClickable(ClientPage1.submitbtn.get(0))
	                       util.elementClickable(ClientPage1.submitbtn.get(1))
						   util.elementClickable(yes)
						   return util.resultMessage('Dialog')

	case 'Clone Profile':   var data=clone.add_Value(CLONE_DATA[0]);
	                        return data;

	case 'Enable/Disable Profile':   util.elementClickable(clone.submit)
	                                 return util.resultMessage('Dialog')

	case 'Account'      :   var lastpagenavigator=element(by.xpath("//span[text()='3']"))
	                        util.elementClickable( lastpagenavigator)
	                        util.elementClickable( AccountPage3.submitBtn)
	                        util.elementClickable( AccountPage3.yesBtn)
	                        return util.resultMessage(AccountTC_DATA[0].TestResultType); 

	case 'Business Rules' : 
	                       util.elementClickable(BusinessRulesPage.submitBtn) 
                           yes.click();
	                       return util.resultMessage(BusinessRulesTC_DATA[0].TestDataType); 

	case 'Group'           : 
	                         if(GroupPage.grpSubmitButton.isPresent()) {
	                        
	                         util.elementClickable(GroupPage.grpSubmitButton)
							 util.elementClickable(yes)
							 }
							  else
							 {
								util.elementClickable(GroupPage.grpNextButton)
								util.scrolldown(GroupPage.grpSubmitButton)
								browser.sleep(2000)
								util.elementClickable(GroupPage.grpSubmitButton)
								util.elementClickable(yes)
							 }
	                         return util.resultMessage(GroupTC_DATA[0].TestResultType);

	case 'Media'           :  util.elementClickable(MediaPage.nextBtn);
		                      util.elementClickable(MediaHCLPage.submit.get(0))
		                      util.elementClickable(MediaHCLPage.submit.get(1))
                               yes.click()
			                  return util.resultMessage('Dialog');
	case 'UserManagement'  :    
	                           util.elementClickable(element(by.xpath("//span[text()='Submit']")))
                               yes.click()
							   return util.resultMessage('Dialog');
	} 

}

/********************************************************************
//* Description     : for deleting the record from maker screen based on the module name 
//* Input Params    : data- Name for which delete action   required eg: Client Name
//*                 : module_name - for which moudle re-submittion required
//* Return Values   :  nill
//********************************************************************/
function deleteRecord(data,module_name){
	checker.navigate_checker_tabs(module_name);
	element(by.xpath("//*[normalize-space(text())='"+data+"']/ancestor::tr//td[last()]//img[@alt='Delete']")).click()
	element(by.xpath("//input[@formcontrolname='Message']")).sendKeys('Delete')
	element.all(by.xpath("//span[text()='Yes']")).click();
	browser.sleep(1000)
}
module.exports = {

		review_record:review_record,
		deleteRecord:deleteRecord

}
