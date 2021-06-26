var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');

"use strict";

class CloneTransmission  {
	constructor()  {

		this.client =element(by.xpath("//p-dropdown[@formcontrolname='client']/div/div[3]/label")); 
		this.epcProfile=element(by.xpath("//p-dropdown[@formcontrolname='epcProfile']/div/div[3]/label"));
		this.transName=element(by.xpath("//input[@formcontrolname='tName']"));
		this.sourceTrans=element(by.xpath("//p-dropdown[@formcontrolname='transmitProfile']/div/div[3]/label")); 
		this.enabledchkbox=element(by.xpath("//p-checkbox[@formcontrolname='profileEnabled']/div/div[2]/span"));
		this.sun=element(by.xpath("//p-checkbox[@formcontrolname='sun']/div/div[2]"));
		this.mon=element(by.xpath("//p-checkbox[@formcontrolname='mon']/div/div[2]"));
		this.tue=element(by.xpath("//p-checkbox[@formcontrolname='tue']/div/div[2]"));
		this.wed=element(by.xpath("//p-checkbox[@formcontrolname='wed']/div/div[2]"));
		this.thu=element(by.xpath("//p-checkbox[@formcontrolname='thu']/div/div[2]"));
		this.fri=element(by.xpath("//p-checkbox[@formcontrolname='fri']/div/div[2]"));
		this.sat=element(by.xpath("//p-checkbox[@formcontrolname='sat']/div/div[2]"));	
		this.transmitBlank=element(by.xpath("//p-checkbox[@formcontrolname='transmitBlank']/div/div[2]"));
		this.rVerification=element(by.xpath("//p-checkbox[@formcontrolname='rVerification']/div/div[2]"));
		this.convertToUnix=element(by.xpath("//p-checkbox[@formcontrolname='convertToUnix']/div/div[2]"));
		this.checkbox=element.all(by.xpath("//input[@type='checkbox']"));
		this.runAt =element(by.xpath("//p-calendar[@formcontrolname='runAt']/span/input")); 
		this.retryUntil =element(by.xpath("//p-calendar[@formcontrolname='retryUntil']/span/input"));
		this.clientid=element(by.xpath("//input[@placeholder='Enter Client Id']"));
		this.sequenceNumber=element(by.xpath("//p-dropdown[@formcontrolname='seqNum']/div/div[3]/label"));
		this.siteId=element(by.xpath("//p-dropdown[@formcontrolname='siteId']/div/div[3]/label"));
		this.lockboxno=element(by.xpath("//input[@placeholder='Enter Lockbox Number']"));
		this.addTolistbtn=element(by.xpath("//div[3]/div[2]/p-button/button"));
		this.outputFile=element(by.xpath("//input[@formcontrolname='fileName']"));
		this.submitBtn=element(by.xpath("//span[text()='Submit']"));
		this.cloneBtn=element(by.xpath("//span[text()='Clone Transmission']")); 
		this.transmission=element(by.xpath("//span[text()='Transmission']"));
		this.yes=element.all(by.xpath("//span[text()='Yes']"));
	}

	//**********************************************************************
	//* Description     : For  Clone Transmission
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message 
	//**********************************************************************
	clone_transmission(data)  {
if(data.TransName!=undefined)
		data.TransName=data.TransName+util.randomnumbergeneration(99)
		util.inputValidation(this.transName,data.TransName,' Trans Name','Clone Transmission');
		util.selectDropDown(this.sourceTrans,data.sourceTrans,'Source Trans','Clone Transmission');
		util.elementClickable(this.enabledchkbox)
		if(data.TransmitBlankFile=='Yes')  {
			util.elementClickable(this.transmitBlank)
		}
		if(data.RequiresVerification=='Yes')  {
			util.elementClickable(this.rVerification) 
		}
		if(data.ConvertToUnix=='Yes')  {
			util.elementClickable(this.convertToUnix) 
		}
		if(data.Sun=='Yes')  {
			util.elementClickable(this.sun) 
		}
		if(data.Mon=='Yes')  {
			util.elementClickable(this.mon)
		}
		if(data.Tue=='Yes')  {
			util.elementClickable(this.tue)
		}
		if(data.Wed=='Yes')  {
			util.elementClickable(this.wed) 
		}
		if(data.Thu=='Yes')  {
			util.elementClickable(this.thu)
		}
		if(data.Fri=='Yes')  {
			util.elementClickable(this.fri)
		}
		if(data.Sat=='Yes')  {
			util.elementClickable(this.sat)
		}
		util.inputValidation(this.clientid,data.Clientid,'Client ID','Clone Transmission');
		util.selectDropDown(this.sequenceNumber,data.SequenceNo,'Sequence No','Clone Transmission');
		util.inputValidation(this.runAt,data.RunAt,'Run At','Clone Transmission');
		util.inputValidation(this.retryUntil,data.RetryUntil,'Retry Untril','Clone Transmission');
		util.selectDropDown(this.siteId,data.SiteId,'Site ID','Clone Transmission');
		util.inputValidation(this.lockboxno,data.LockboxNo,'LockBox','Clone Transmission');
		if(data.ExpectedResult!="Minimum one File to be selected")
			util.elementClickable(this.addTolistbtn)
			util.inputValidation(this.outputFile,data.outputFile,'Output File','Clone Transmission');
			if(data.TestResultType!='Toast')
		util.elementClickable(this.submitBtn)
		if(data.TestResultType!='Inline')
		util.elementClickable(this.yes.get(0))
		return util.resultMessage(data.TestResultType);

	}
	//**********************************************************************
	//* Description     : Helper method for navigating to the Clone Transmission 
	//**********************************************************************
	nav_helper_click()  {
		browser.ignoreSynchronization = true;
		browser.sleep(3000)
		util.elementClickable(this.transmission)
		util.elementClickable(this.cloneBtn)
	}
}
module.exports= new CloneTransmission();