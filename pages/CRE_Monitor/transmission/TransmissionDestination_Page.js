var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Utility_New');

var p2=require("../../../pages/CRE_Monitor/transmsision/TransmissionConfig_Page");
"use strict";

class AddTransmission3  {
	constructor()  {

		this.blockSize =element(by.xpath("//p-spinner[@formcontrolname='blockSize']/span/input")); 
		this.hostName =element(by.xpath("//input[@formcontrolname='hostName']")); 
		this.hostUser=element(by.xpath("//input[@formcontrolname='hostUser']"));
		this.fileName=element(by.xpath("//input[@formcontrolname='fileName']"));
		this.password=element(by.xpath("//input[@formcontrolname='password']"));
		this.confirmPassword=element(by.xpath("//input[@formcontrolname='confirmPassword']"));
		this.recordSize=element(by.xpath("//p-spinner[@formcontrolname='recordSize']/span/input"));
		this.retry=element(by.xpath("//p-spinner[@formcontrolname='retry']/span/input"));
		this.ntUserID=element(by.xpath("//input[@formcontrolname='ntUserID']"));
		this.networkID=element(by.xpath("//input[@formcontrolname='networkID']"));
		this.userID=element(by.xpath("//input[@formcontrolname='userID']"));
		this.dbMailbox=element(by.xpath("//input[@formcontrolname='dbMailbox']"));

		this.ascii=element(by.xpath("//p-radiobutton[@label='ASCII']/div/div[2]/span"));
		this.ebcdic=element(by.xpath("//p-radiobutton[@label='EBCDIC']/div/div[2]/span"));
		this.binary=element(by.xpath("//p-radiobutton[@label='BINARY']/div/div[2]/span"));
		this.binary2=element(by.xpath("//p-radiobutton[@label='Binary']/div/div[2]/span"));

		this.variable=element(by.xpath("//p-radiobutton[@label='Variable']/div/div[2]/span"));
		this.fixed=element(by.xpath("//p-radiobutton[@label='Fixed']/div/div[2]/span"));

		this.appendToFile=element(by.xpath("//p-checkbox[@formcontrolname='appendToFile']"));

		this.submitBtn=element(by.xpath("//span[text()='Submit']"));
		this.nextBtn2=element.all(by.xpath("//span[text()='Next']"));
	}

	/** Add Transmission **/
	add_transmission1(data)  {

		util.inputValidation(this.blockSize,data.BlockSize,'Block Size','Add Transmission');
		util.inputValidation(this.hostName,data.HostName,'Host Name','Add Transmission');
		util.inputValidation(this.hostUser,data.HostUser,'Host User','Add Transmission');
		util.inputValidation(this.fileName,data.FileName,'Filename','Add Transmission');
		util.inputValidation(this.password,data.Password,'Password','Add Transmission');
		util.inputValidation(this.confirmPassword,data.ConfirmPassword,'Verify Password','Add Transmission');
		util.inputValidation(this.recordSize,data.RecordSize,'Record Size','Add Transmission');
		util.inputValidation(this.retry,data.Retry,'Retry','Add Transmission');

		if(data.ASCII=='Yes')  {
			this.ascii.click(); 
		}
		if(data.EBCDIC=='Yes')  {
			this.ebcdic.click(); 
		}
		if(data.BINARY=='Yes')  {
			this.binary.click(); 
		}
		if(data.Variable=='Yes')  {
			this.variable.click(); 
		}
		if(data.Fixed=='Yes')  {
			this.fixed.click(); 
		}
		this.submitBtn.click();	
		return util.resultMessage(data.TestResultType);
	}

	add_transmission2(data)  {

		util.inputValidation(this.hostName,data.HostName,'Host Name','Add Transmission');
		util.inputValidation(this.hostUser,data.HostUser,'Host User','Add Transmission');
		util.inputValidation(this.fileName,data.FileName,'Filename','Add Transmission');
		util.inputValidation(this.password,data.Password,'Password','Add Transmission');
		util.inputValidation(this.confirmPassword,data.ConfirmPassword,'Verify Password','Add Transmission');

		if(data.ASCII=='Yes')  {
			this.ascii.click(); 
		}
		if(data.BINARY=='Yes')  {
			this.binary2.click(); 
		}
		if(data.AppendToFile=='Yes')  {
			this.appendToFile.click(); 
		}
		this.submitBtn.click();	
		return util.resultMessage(data.TestResultType);
	}

	add_transmission3(data)  {

		util.inputValidation(this.fileName,data.FileName,'Filename','Add Transmission');
		util.inputValidation(this.ntUserID,data.NTUserID,'NT User ID','Add Transmission');
		util.inputValidation(this.password,data.Password,'Password','Add Transmission');
		util.inputValidation(this.confirmPassword,data.ConfirmPassword,'Verify Password','Add Transmission');

		this.submitBtn.click();	
		return util.resultMessage(data.TestResultType);
	}

	add_transmission4(data)  {

		util.inputValidation(this.hostName,data.HostName,'Host Name','Add Transmission');
		util.inputValidation(this.hostUser,data.HostUser,'Host User','Add Transmission');
		util.inputValidation(this.fileName,data.FileName,'Filename','Add Transmission');
		util.inputValidation(this.password,data.Password,'Password','Add Transmission');
		util.inputValidation(this.confirmPassword,data.ConfirmPassword,'Verify Password','Add Transmission');

		if(data.ASCII=='Yes')  {
			this.ascii.click(); 
		}
		if(data.BINARY=='Yes')  {
			this.binary2.click(); 
		}
		if(data.AppendToFile=='Yes')  {
			this.appendToFile.click(); 
		}
		this.submitBtn.click();	
		return util.resultMessage(data.TestResultType);
	}

	add_transmission5(data)  {

		util.inputValidation(this.networkID,data.NetworkID,'Network ID','Add Transmission');
		util.inputValidation(this.userID,data.UserID,'User ID','Add Transmission');
		util.inputValidation(this.fileName,data.FileName,'Filename','Add Transmission');
		util.inputValidation(this.password,data.Password,'Password','Add Transmission');
		util.inputValidation(this.confirmPassword,data.ConfirmPassword,'Verify Password','Add Transmission');
		util.inputValidation(this.dbMailbox,data.DbMailbox,'Mailbox/Receive Class','Add Transmission');

		this.submitBtn.click();	
		return util.resultMessage(data.TestResultType);
	}

	nav_helper_edit(data)  {
		p1.nav_helper_view();
		p1.nav_helper_edit(data);

	}

	nav_helper_add(data)  {
		browser.ignoreSynchronization = true;
		p2.nav_helper_add(data); 
		this.nextBtn2.get(1).click();
	}


}

module.exports= new AddTransmission3();