var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Utility_New');
"use strict";

class AuditLog  {
	constructor()  {

		this.calendar=element(by.xpath("//p-calendar[@placeholder='Event Times']/span/button/span[2]"));
		this.datepicker=element(by.xpath("//tr[1]/td"));
		this.errorlevel=element(by.xpath("//span[@class='ui-chkbox-icon ui-clickable pi pi-check']"));
		this.events=element(by.xpath("//div[@class='ui-chkbox-box ui-widget ui-corner-all ui-state-default']/span"));
		this.applybtn=element(by.xpath("//span[text()='Apply Changes']"));
		this.logData=element.all(by.xpath("//tr/td"));
		this.refreshbtn=element(by.xpath("//span[text()='Refresh Grid']"))
	}
                       
//	Get method

	get_Userid()  {
		return (this.logData.get(1).getText()).then(function(returnValue){
			return returnValue.toLowerCase();
		})
	}
	get_EntryDate() {
		return (this.logData.get(2).getText()).then(function(returnValue){
			return returnValue
		})
	}
	get_Description()  {
		return (this.logData.get(3).getText()).then(function(returnValue){
			return returnValue.toString().toLowerCase()
		})
	}
	get_Status()  {
		return (this.logData.get(4).getText()).then(function(returnValue){
			return returnValue
		})
	}
	get_Eventid()  {
		return (this.logData.get(5).getText()).then(function(returnValue){
			return returnValue
		})
	}
	

}

module.exports=new AuditLog();
