var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Audit_Logs  {
	constructor()  {

		this.adminTools=element(by.xpath("//span[@class='ui-menuitem-text' and  text()='Admin Tools']"));
		this.auditLogs=element(by.xpath("//span[@class='ui-menuitem-text' and  text()='Audit Log']"));
		this.dateRange=element(by.xpath("//input[@ng-reflect-ng-class='ui-inputtext ui-widget ui-stat']"));
		this.errorLevel=element(by.xpath("//p-multiselect[1]/div/div[2]/span"));
		this.eventSelected=element(by.xpath("//p-multiselect[2]/div/div[2]/span"));
		this.applyChanges=element(by.xpath("//p-button[@ng-reflect-label='Apply Changes']"));
		this.refreshGrid=element(by.xpath("//p-button[@ng-reflect-label='Refresh Grid']"));
		this.downloadAsPDF=element(by.xpath("//p-button[@ng-reflect-label='Download as PDF']"));
		this.allUserselected=element(by.xpath("//p-checkbox[label='All user events']"));
		this.auditSuccessfulevents=element(by.xpath("//p-checkbox[label='Audit successful events']"));
		this.auditFailureEvents=element(by.xpath("//p-checkbox[label='Audit failure events']"));
		this.selectMultiCheckboxErrorLevel=element(by.xpath("//p-multiselect[1]/div/div[4]/div[1]/div[1]/div[2]"));
		this.selectMultiCheckboxEventSetting=element(by.xpath("//p-multiselect[2]/div/div[4]/div[1]/div[1]/div[2]"));
		this.calender=element(by.xpath("//input[@ng-reflect-ng-class='ui-inputtext ui-widget ui-stat']"));
		this.viewprocesslogbtn=element(by.xpath("//span[text()='View Process Log']"));
		this.logdata=element.all(by.xpath("//p-table[@class='tb-scrol ng-star-inserted']/div/div/table/tbody/tr/td"));
		this.arrrowbtn=element(by.xpath("//p-calendar/span/div/div/div[1]/a[@class='ui-datepicker-prev ui-corner-all ng-tns-c14-55 ng-star-inserted']/span"));
		this.loglevel=element(by.xpath("//table/tbody/tr[1]/td[1]/span[2]"));
		this.logUserID=element(by.xpath("//table/tbody/tr[1]/td[2]/span[2]"));
		this.logEntryDate=element(by.xpath("//table/tbody/tr[1]/td[3]/span[2]"));
		this.logDescription=element(by.xpath("//table/tbody/tr[1]/td[4]/span[2]"));
		this.logStatus=element(by.xpath("//table/tbody/tr[1]/td[5]/span[2]"));
		this.logEventID=element(by.xpath("//table/tbody/tr[1]/td[6]/span[2]"));
		this.closeddlb=element(by.xpath("//div[2]/div[4]"));
	}

	calender_nav(data)  {
		this.dateRange.click();
		var excelDate=data.ProcessDate;
		console.log('date is'+excelDate);
		var date = excelDate.getDate();
		date=date+1;
		var month = excelDate.getMonth(); 
		var year = excelDate.getFullYear();
		browser.sleep(1000);
		var currentDate= new Date();
		var curMonth=currentDate.getMonth();
		var curYear=currentDate.getFullYear();
		if (curMonth>month){
			var diff=curMonth-month
			while(diff!=0){
				--diff;
				util.elementClickable(this.arrrowbtn);	
			}
		} else { 
			if((curMonth<month) && (curYear>year)){
				var mondiff=((curMonth+12)-(month))
				while(mondiff!=0){
					--mondiff;
					util.elementClickable(this.arrrowbtn);	
				}
				
			}
			
		}
		util.elementClickable(element(by.xpath("//p-calendar/span/div/div/div[2]/table/tbody//a[text()='"+date+"']")));
		util.elementClickable(element(by.xpath("//p-calendar/span/div/div/div[2]/table/tbody//a[text()='"+date+"']")));
	}
	
	selectErrorLevels(data){
		util.elementClickable(this.errorLevel);
		browser.sleep(1000);
		var errorleveloption=data.ErrorLevel;
		browser.sleep(1000);
		if (data.ErrorLevel!="Null") {
			if (this.getActiveStatus(this.selectMultiCheckboxErrorLevel)==true) {
				console.log("Account inactive")
				util.elementClickable(this.selectMultiCheckboxErrorLevel);
				browser.sleep(1000);
				util.elementClickable(element(by.xpath("//ul//li[@aria-label='"+errorleveloption+"']")));
			} else {
				util.elementClickable(this.selectMultiCheckboxErrorLevel);
				browser.sleep(1000);
				util.elementClickable(this.selectMultiCheckboxErrorLevel);
				browser.sleep(1000);
				util.elementClickable(element(by.xpath("//ul//li[@aria-label='"+errorleveloption+"']")));
			}
		}
		browser.sleep(1000);
	}
	
	selectEventSettings(data){
		util.elementClickable(this.eventSelected);
		browser.sleep(1000);
		var eventsettingoption=data.EventSettings;
		browser.sleep(1000);
		if (data.EventSettings!="Null") {
			if (this.getActiveStatus(this.selectMultiCheckboxEventSetting)==true) {
				console.log("status inactive")
				util.elementClickable(this.selectMultiCheckboxEventSetting);
				browser.sleep(1000);
				util.elementClickable(element(by.xpath("//p-multiselect[2]/div/div[4]/div[2]/ul//li[@aria-label='"+eventsettingoption+"']")));
				
			} else {
				util.elementClickable(this.selectMultiCheckboxEventSetting);
				browser.sleep(1000);
				util.elementClickable(this.selectMultiCheckboxEventSetting);
				browser.sleep(1000);
				util.elementClickable(element(by.xpath("//p-multiselect[2]/div/div[4]/div[2]/ul//li[@aria-label='"+eventsettingoption+"']")));
			}
		}
		browser.sleep(1000);
	}
	
	clickApplyChanges(){
		util.elementClickable(this.applyChanges);
	}

	clickRefreshGrid(){
		util.elementClickable(this.refreshGrid);
	}
	
	clickDownloadAsPDF(){
		util.elementClickable(this.downloadAsPDF);
	}

	clickallUserselected(){
		util.elementClickable(this.allUserselected);
	}
	clickauditSuccessfulevents(){
		util.elementClickable(this.auditSuccessfulevents);
	}

	clickauditFailureEvents(){
		util.elementClickable(this.auditFailureEvents);
	}
	
	getLogData(loglabel){
		switch(loglabel){
			case 'Level':
				return util.getTextFromWebelement(this.loglevel);
			case 'UserID':
				return util.getTextFromWebelement(this.logUserID);
			case 'EntryDate':
				return util.getTextFromWebelement(this.logEntryDate);
			case 'Description':
				return util.getTextFromWebelement(this.logDescription);
			case 'Status':
				return util.getTextFromWebelement(this.logStatus);
			case 'EventID':
				return util.getTextFromWebelement(this.logEventID);
			default:
				logger.error('An error occured while getting the menu Items');
			break;
		}
	}
	
	getActiveStatus(webelement){
		browser.ignoreSynchronization = true;
        return webelement.getAttribute('class').then(function(returnValue) {   
            if(returnValue.includes('ui-state-active')){  
            	console.log("true")
                return true;
            }
            else
            	console.log("false")
                return false
            })
	}
}

module.exports=new Audit_Logs();
