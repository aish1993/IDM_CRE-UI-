var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class Monitor {
	constructor() {
		this.groupName = element(by.xpath("//p-dropdown[@placeholder='Select a Group']/div/div[3]/label"));
		this.clientName = element(by.xpath("//p-dropdown[@placeholder='Select a Client']/div/div[3]/label"));
		this.refreshbtn = element(by.xpath("//span[text()='Refresh']"));
		this.reProcess = element(by.xpath("//span[text()='Reprocess']"));
		this.processData = element.all(by.xpath("//tr[1]/td"));
		this.filter = element(by.xpath("//span[text()='Filter']"));
		this.processDate = element.all(by.xpath("//div[@class='ng-trigger ng-trigger-overlayAnimation ng-tns-c6-175 ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-shadow ng-star-inserted']/div/div[2]/table/tbody/tr/td"));
		this.currentStage = element(by.xpath("//p-dropdown[@formcontrolname='curentStage']/div/div[3]/label"));
		this.ok = element(by.xpath("//span[text()='Ok']"));
		this.day = element.all(by.xpath("//table[@class='ui-datepicker-calendar']/tbody/tr/td"));
		this.calender = element(by.xpath("//input[@ng-reflect-ng-class='ui-inputtext ui-widget ui-stat']"));
		this.viewprocesslogbtn = element(by.xpath("//span[text()='View Process Log']"));
		this.logdata = element.all(by.xpath("//p-table[@class='tb-scrol ng-star-inserted']/div/div/table/tbody/tr/td"));
		this.arrrowbtn = element(by.xpath("//p-calendar/span/div/div/div[1]/a[1]/span"));
		this.viewclientfilesbtn=element(by.xpath("//span[text()='View Process Log ']"));

		this.clientgroupdpn = element.all(by.xpath("//span[@class='ui-dropdown-trigger-icon ui-clickable pi pi-chevron-down']"));
		this.viewprocessdate = element(by.xpath("//span[@class='ui-button-icon-left ui-clickable pi pi-calendar']"));
		this.radiobtn = element.all(by.xpath("//p-radiobutton"));
		this.viewFiles = element(by.xpath("//span[text()='View Files']"));
		this.viewclientdata = element.all(by.xpath("//tr//td[1]"));
		this.batchId = element(by.xpath("//input[@formcontrolname='batchId']"));
		this.noItems = element(by.xpath("//input[@formcontrolname='noItems']"));
		this.re_procesdate = element(by.xpath("//input[@formcontrolname='procesdate']"));
		this.samesetOfFileRadioBtn = element(by.xpath("//p-radiobutton[@formcontrolname='sameFile']/div/div[2]/span"));
		this.newsetOfFileRadioBtn = element(by.xpath("//p-radiobutton[@formcontrolname='newSetF']/div/div[2]/span"));
		this.ReasonForAction = element(by.xpath("//*[@formcontrolname='reasonForA']"));
		this.viewclientfilesGridData = element.all(by.xpath("//td"));
		this.presentDate = element(by.xpath("//*[contains(@class,'ui-datepicker-today ng-star-inserted')]"));

	}

	//********************************************************************
	//* Description     : Retriving UI Data from Main Page(IDM Monitor) 
	//* Return Values   : return text value from UI
	//********************************************************************	

	get_Group() {
		return this.processData.get(0).getText().then(function (value) {
			console.log("******" + value)
			if (value == 'C')
				return '7'
			else
				return '6'
		});
	}

	get_CurrentStage() {
		return this.processData.get(6).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			if (returnValue == 'Completed')
				return '10'
			else if (returnValue == 'Extracting')
				return '60'
			else if (returnValue == 'Extract')
				return '7'
			else if (returnValue == 'PPIC Reconciliation')
				return '19'
			else if (returnValue == 'PPIC Data Load')
				return '17'

		});
	}

	get_NextStage() {
		return this.processData.get(7).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			if (returnValue == 'Completed')
				return '10'
			else if (returnValue == 'Extracting')
				return '60'
			else if (returnValue == 'Extract')
				return '7'
			else if (returnValue == 'PPIC Reconciliation')
				return '19'
			else if (returnValue == 'PPIC Data Load')
				return '17'
		});
	}
	get_StartTime() {
		return this.processData.get(8).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}
	get_WorkType() {
		return this.processData.get(9).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}
	get_BankID() {
		return this.processData.get(10).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}
	get_SLAExpected() {
		return this.processData.get(11).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}
	get_SLAStatus() {
		return this.processData.get(12).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}

	//********************************************************************
	//* Description     : Retriving UI Data from View Process Log(IDM Monitor) 
	//* Return Values   : return text value from UI
	//********************************************************************
	get_LogItem() {
		return this.logdata.get(0).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}
	get_GroupID() {
		return this.logdata.get(1).getText().then(function (returnValue) {
			console.log("******" + returnValue)
			return returnValue;
		});
	}
	get_ClientID() {
		return this.logdata.get(2).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_ControlID() {
		return this.logdata.get(3).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_CDProcessID() {
		return this.logdata.get(4).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_InternalClientID() {
		return this.logdata.get(5).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_EventID() {
		return this.logdata.get(6).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_Status() {
		return this.logdata.get(7).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_Description() {
		return this.logdata.get(8).getText().then(function (returnValue) {
			return returnValue;
		});
	}

	get_ErrorLevel() {
		return this.logdata.get(9).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_UserID() {
		return this.logdata.get(10).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_DateOfEntry() {
		return this.logdata.get(11).getText().then(function (returnValue) {
			return returnValue
		});
	}
	get_InternalClientIdEx() {
		return this.logdata.get(12).getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_batchId() {
		return this.batchId.getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_noItems() {
		return this.noItems.getText().then(function (returnValue) {
			return returnValue;
		});
	}
	get_re_procesdate() {
		return this.re_procesdate.getText().then(function (returnValue) {
			return returnValue;
		});
	}

	get_ClientFilename() {
		return this.viewclientfilesGridData.get(0).getText().then(function (returnValue) {
			return returnValue;
		});
	}

	//********************************************************************
	//* Description     : filter the record based on the Date(Main IDM Monitor Page)
	//* Argument Values   : data -- xl sheet data
	//********************************************************************

	nav_helper_view(data) {
		// browser.ignoreSynchronization=true
		util.elementClickable(this.filter);
		util.elementClickable(this.calender);
		// var date=this.calender_nav(data);
		// util.elementClickable(this.calender);
		this.presentDate.click()
		// util.elementClickable(this.day.get(date+5));
		util.elementClickable(this.ok);
		//		this.ok.click();
		browser.sleep(3000)

	}
	//********************************************************************
	//* Description     : filter the record based on the Date(Process Log Page)
	//* Argument Values   : data-xl Sheet data
	//********************************************************************	
	nav_processlog(data) {
		element(by.xpath("//span[text()='View Process Log ']")).click()
		util.selectDropDown(this.groupName, data.GroupName, 'Group Name', 'View Process log');
		util.selectDropDown(this.clientName, data.ClientName, 'Client Name', 'View Process Log');
		util.elementClickable(this.calender);
		var date = this.calender_nav(data);
		util.elementClickable(this.day.get(date + 4));
		util.elementClickable(this.day.get(date + 5));
		browser.sleep(4000)
		util.elementClickable(this.viewprocesslogbtn);

	}

	//********************************************************************
	//* Description     : filter the record based on the Date(View Client Log Page)
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	viewClientFiles(data) {
		browser.refresh()
		util.elementClickable(this.viewclientfilesbtn);

		// this.viewclientfilesbtn.click();
		util.selectDropDown(this.clientgroupdpn.get(0), data.Group, 'Group', 'View Client Files');
		util.selectDropDown(this.clientgroupdpn.get(1), data.Client, 'Client', 'View Client Files');
		util.elementClickable(this.viewprocessdate);
		var date = this.calender_nav(data)
		util.elementClickable(this.day.get(date + 4));
		util.elementClickable(this.day.get(date + 5));
		browser.sleep(4000)
		if (data.Radio == 'Inbound')
			util.elementClickable(this.radiobtn.get(0));
		else if (data.Radio == 'Archive folder')
			util.elementClickable(this.radiobtn.get(1));
		else if (data.Radio == 'Archive folder for Index files')
			util.elementClickable(this.radiobtn.get(2));
		else if (data.Radio == 'Destination')
			util.elementClickable(this.radiobtn.get(3));
		else if (data.Radio == 'Archive folder for extract files')
			util.elementClickable(this.radiobtn.get(4));
		util.elementClickable(this.viewFiles);
		browser.sleep(3000)
		var value = this.viewclientdata.get(0).getText().then(function (returnValue) {
			console.log(returnValue)
		});
		console.log("Count" + value);
		return value
	}

	//********************************************************************
	//* Description     :  Reprocess the files
	//* Argument Values   : data-xl Sheet data
	//********************************************************************	
	reprocess(data) {
		var select = element(by.xpath("//table/tbody/tr[1]"));
		browser.ignoreSynchronization = true;
		//		browser.actions().mouseMove(select).perform();
		util.elementClickable(element(by.xpath("//table/tbody/tr[1]")));
		util.elementClickable(this.reProcess);
		if (data.ReprocessWithSameFile = 'yes')
			util.elementClickable(this.samesetOfFileRadioBtn);
		else
			util.elementClickable(this.newsetOfFileRadioBtn);
		util.inputValidation(this.ReasonForAction, data.Reason);
		util.elementClickable(this.ok);
		return util.resultMessage(data.TestResultType)


	}

	//********************************************************************
	//* Description     : Helper method for selecting Date onn Calender
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	calender_nav(data) {
		util.elementClickable(this.calender);
		var excelDate = data.ProcessDate;
		var date = excelDate.getDate();
		var month = excelDate.getMonth();
		var year = excelDate.getFullYear();
		var date1 = new Date((month + 1) + "/" + "01/" + year);
		console.log("Date" + date1)
		var formatDate = (month + 1) + "/" + (date - 1) + "/" + year;
		var date2 = new Date(formatDate);
		console.log('********date2********' + date2);
		console.log('********date1********' + date1);
		// To calculate the time difference of two dates 
		var Difference_In_Time = date2.getTime() - date1.getTime();

		// To calculate the no. of days between two dates 
		var dayDif = Difference_In_Time / (1000 * 3600 * 24);
		console.log('*****Difference in date****' + dayDif);
		var newDate = new Date();
		var newmonth = newDate.getMonth();
		var diff = newmonth - month
		console.log("diff of months", diff);
		do {
			util.elementClickable(this.arrrowbtn);
			--diff;
		} while (diff != 0)
		return dayDif;

	}
}


module.exports = new Monitor();