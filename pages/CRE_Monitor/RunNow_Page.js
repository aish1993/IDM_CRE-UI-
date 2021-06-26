var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class RunNow  {
	constructor()  { 

		this.epcProfile=element.all(by.xpath("//span[text()='EPC Profile']"));
		this.status=element.all(by.xpath("//tr/td[1]/span[2]"));
		this.profileID=element.all(by.xpath("//tr/td[2]"));
		this.customer=element.all(by.xpath("//tr/td[3]"));
		this.profile=element.all(by.xpath("//tr/td[4]"));
		this.inFile=element.all(by.xpath("//tr/td[5]"));
		this.dateTime=element.all(by.xpath("//tr/td[6]"));
		this.lockBoxNumber=element.all(by.xpath("//tr/td[7]"));
	}
	//**********************************************************************
	//* Description     : Getting the Value from UI
	//* Return Values   : return the text 
	//**********************************************************************
	get_Status()  {
		return this.status.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}	
	get_ProfileID()  {
		return this.profileID.get(0).getText().then(function(returnValue)  {
			return returnValue*1;
		});
	}	
	get_Customer()  {
		return this.customer.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}	
	get_Profile()  {
		return this.profile.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}	
	get_InFile()  {
		return this.inFile.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}	
	get_DateTime()  {
		return this.dateTime.get(0).getText().then(function(returnValue)  {
			return returnValue.split(' ')[0];
		});
	}	
	get_LockBoxNumber()  {
		return this.lockBoxNumber.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}	

	//**********************************************************************
	//* Description     : calling the Common_Utility method for clicking on the menu(right click on the profile for the menu)  
	//**********************************************************************
	nav_helper()  {
		util.nav_epcMonitor('Run Now','EPC Monitor')
	}
}

module.exports=new RunNow();