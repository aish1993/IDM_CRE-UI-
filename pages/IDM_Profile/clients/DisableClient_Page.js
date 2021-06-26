/*******************************************
 * Author : Neha
 * Date : 06/02/2020
 * Updated by: 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var client=require("../../../pages/IDM_Profile/clients/ClientSetting_Page");

class DisableClient  {

	constructor()  { 
		this.group=element(by.xpath("//p-dropdown[@formcontrolname='group']/div/div[3]/label"));
		this.clientName=element(by.xpath("//p-dropdown[@formcontrolname='client']/div/div[3]/label"));
		this.disablebtn=element(by.xpath("//span[text()='Disable']"));
		this.reason=element(by.xpath("//input[@formcontrolname='Message']"));
		this.cancelbtn=element.all(by.xpath("//span[text()='Cancel']"));
		this.clientId=element.all(by.xpath("//tr//td[1]"));
		this.groupId=element.all(by.xpath("//tr//td[2]"));
		this.clientname=element.all(by.xpath("//tr//td[3]"));
		// this.remarks=element.all(by.xpath("//tr//td[4]"));
		this.createdBy=element.all(by.xpath("//tr//td[4]"));
		this.createdDate=element.all(by.xpath("//tr//td[5]"));
		this.approve=element(by.xpath("//*[normalize-space(text())='LVMH']/ancestor::tr//td[last()]//img[@alt='Approve']"));
		this.reject=element(by.xpath("//*[normalize-space(text())='LVMH']/ancestor::tr//td[last()]//img[@alt='Reject']"));
		this.popup=element.all(by.xpath("//input[@formcontrolname='Message']"));
		this.yes=element.all(by.xpath("//span[text()='Yes']"));
		this.no=element.all(by.xpath("//span[text()='No']"));

	}
	/********************************************************************
	//* Description     : Getting value from UI 
	//* Input Params    : NILL
	//* Return Values   : return the UI Value
	/********************************************************************/
	get_ClientID()  {
		return this.clientId.get(0).getText().then (function(returnValue){
			console.log("fd"+returnValue)
			steps_util.info_step('*******************Retrive ClientID from UI***********************'+returnValue)
			return returnValue
		})
	}
	get_GroupID()  {
		return this.groupId.get(0).getText().then (function(returnValue){
			steps_util.info_step('************************Retrive GroupID from UI*******************'+returnValue)
			return returnValue
		})
	}
	get_ClientName()  {
		return this.clientname.get(0).getText().then (function(returnValue){
			steps_util.info_step('Retrive ClientName from UI'+returnValue)
			return returnValue
		})
	}
	get_Remarks()  {
		return this.remarks.get(0).getText().then (function(returnValue){
			steps_util.info_step('Retrive ClientName from UI'+returnValue)
			return returnValue
		})
	}
	get_CreatedBy()  {
		return this.createdBy.get(0).getText().then (function(returnValue){
			steps_util.info_step('Retrive CreatedBy from UI'+returnValue)
			return returnValue
		})
	}
	get_CreatedDate()  {
		return this.createdDate.get(0).getText().then(function(returnValue)  {
			var d = new Date((returnValue).toString());
			var n = d.toLocaleDateString()
			console.log("yjch"+returnValue)
			return n
		});
	}

	/********************************************************************
	//* Description     : Helper methods
	//* Input Params    : NILL
	//* Return Values   : return the UI Value
	/********************************************************************/
	nav_helper(data)  {

		client.nav_helper_view(data);
	}

	nav_helper_view(data)  {
		// browser.sleep(5000)
		util.elementClickable(this.disablebtn)
		util.inputValidation(this.reason,data.Reason,'Reason','Client Settings');
		this.yes.click()
		return util.resultMessage(data.TestResultType);

	}

}

module.exports=new DisableClient();