/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 11/02/2020
 * Updated by: 
 *******************************************/

const { ConsoleReporter } = require("jasmine");

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class EPC_Monitor  {

	constructor()  {
		this.status=element.all(by.xpath("//tr//td[1]"));
		this.profileID_View = element(by.xpath("//tr[1]/td[2]"));
		this.profileID=element.all(by.xpath("//tr/td[2]"));
		this.customer=element(by.xpath("//tr[1]/td[3]"));
		this.profile=element.all(by.xpath("//tr/td[4]"));		
		this.inFile=element.all(by.xpath("//tr/td[5]"));
		this.dateTime=element.all(by.xpath("//tr/td[6]"));
		this.lockBoxNumber=element.all(by.xpath("//tr/td[7]"));
		this.detailsbtn=element(by.xpath("//span[text()='Details']"));
		this.transProfile=element(by.xpath("//input[@formcontrolname='profilId']"));
		this.client=element(by.xpath("//input[@formcontrolname='clientId']"));
		this.epcProfile=element(by.xpath("//input[@formcontrolname='epcprofile']"));
		this.tName=element(by.xpath("//input[@formcontrolname='tName']"));
		this.runTransmission=element(by.xpath("//input[@formcontrolname='runTransmision']"));
		this.inputProces=element(by.xpath("//input[@formcontrolname='inputProces']"));
		this.retryUntil=element(by.xpath("//input[@formcontrolname='retryUntil']"));
		this.addtionData=element(by.xpath("//input[@formcontrolname='addtionData']"));
		this.outputProces=element(by.xpath("//input[@formcontrolname='outputProces']"));
		this.transBlankFile=element(by.xpath("//p-checkbox[@formcontrolname='transBlankFile']/div/div[2]"));
		this.checkbox=element.all(by.xpath("//p-checkbox/div/div[2]/span"));
		this.reqVerify=element(by.xpath("//p-checkbox[@formcontrolname='reqVerify']/div/div[2]"));
		this.convertToUnix=element(by.xpath("//p-checkbox[@formcontrolname='convertToUnix']/div/div[2]"));
		this.tarnsmitTo=element(by.xpath("//input[@formcontrolname='tarnsmitTo']"));
		this.fileName=element(by.xpath("//input[@formcontrolname='fileName']"));	
		this.refreshbtn=element(by.xpath("//span[text()='Refresh']"));
		this.close=element(by.xpath("//span[text()='Close']"));
		this.hostName=element(by.xpath("//input[@formcontrolname='hostName']"));
		this.hostUser=element(by.xpath("//input[@formcontrolname='hostUser']"));
		this.statusdpn=element(by.xpath("//p-dropdown[@appendto='body']/div"));
		this.eodbtn=element(by.xpath("//button[@label='EOD']/span"))
		this.eoddialogdata=element(by.xpath("//*[@role='dialog']/div[2]/p"));
		this.okbtn==element(by.xpath("//span[text()='Ok']"));


	}

	//**********************************************************************
	//* Description     : Getting the Value from UI(Main Grid)
	//* Return Values   : return the text 
	//**********************************************************************
	get_Status()  {
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.status.get(0)), 3000, 'element not found within specified wait time');
		return this.status.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_ProfileID()  {
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.profileID.get(0)), 3000, 'element not found within specified wait time');
		return this.profileID.get(0).getText().then(function(returnValue)  {
			console.log("******"+returnValue)
			return returnValue;
		});
	}
	get_Customer()  {		
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.customer, 3000, 'element not found within specified wait time'));
		return this.customer.getText().then(function(returnValue)  {
			console.log("******"+returnValue)
			return returnValue;
		})
	}
	get_Profile()  {
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.profile.get(0), 3000, 'element not found within specified wait time'));
		return this.profile.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_InFile()  {
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.inFile.get(0)), 3000, 'element not found within specified wait time');
		return this.inFile.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_DateTime()  {
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.dateTime.get(0)), 3000, 'element not found within specified wait time');
		return this.dateTime.get(0).getText().then(function(returnValue)  {
			// var a=returnValue.split('/');
			// var newVal=a[1]+'-'+a[0]+'-'+a[2]
			// var date=new Date(newVal);
			// date.setHours( date.getHours() + 5 );
			// date.setMinutes( date.getMinutes() + 30 );
			// var date2=date.toUTCString();
			var d = new Date((returnValue));
			var n = d.toLocaleString().split(' ')[1]
			return n;
		});
	}
	get_LockBoxNumber()  {
		browser.ignoreSynchronization = true;
		browser.wait(EC.presenceOf(this.lockBoxNumber.get(0)), 3000, 'element not found within specified wait time');
		return this.lockBoxNumber.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}

	//**********************************************************************
	//* Description     : Getting the Value from UI(Detail Button)
	//* Return Values   : return the text 
	//**********************************************************************
	get_transProfile()  {
		return this.transProfile.getAttribute('value').then(function(returnValue)  {
			console.log("***************"+returnValue)
			return returnValue;
		});
	}
	get_client()  {
		return this.client.getAttribute('value').then(function(returnValue)  {
			console.log("***********"+returnValue)
			return returnValue.replace("/[^a-zA-Z ]/g","");
		});
	}
	get_epcProfile()  {
		return this.epcProfile.getAttribute('value').then(function(returnValue)  {
			console.log("***********"+returnValue)
			return returnValue;

		});
	}
	get_tName()  {
		return this.tName.getAttribute('value').then(function(returnValue)  {
			console.log("***********"+returnValue)
			return returnValue;
		});
	}
	get_runTransmission()  {
		return this.runTransmission.getAttribute('value').then(function(returnValue)  {
			console.log("*********"+returnValue)
			return returnValue;
		});
//		browser.ignoreSynchronization = true;
//		browser.wait(EC.presenceOf(this.runTransmission), 3000, 'element not found within specified wait time');
//		return this.runTransmission.getText().then(function(returnValue)  {
//		console.log(returnValue)
//		var a=returnValue.split('/');
//		var newVal=a[1]+'-'+a[0]+'-'+a[2]
//		console.log(newVal)
//		var date=new Date(newVal);
//		console.log(date);
//		date.setHours( date.getHours() + 5 );
//		date.setMinutes( date.getMinutes() + 30 );
//		var date2=date.toUTCString();
//		console.log("hgdhjgfg"+date2)
//		return date2;
	}
	get_inputProces()  {
		return this.inputProces.getAttribute('value').then(function(returnValue)  {
			console.log("**********"+returnValue)
			return returnValue;
		});
	}
	get_retryUntil()  {
		return this.retryUntil.getAttribute('value').then(function(returnValue)  {
			console.log("*******"+returnValue)
			return returnValue;
		});
	}
	get_additionData()  {
		return this.addtionData.getAttribute('value').then(function(returnValue)  {
			console.log(returnValue)
			return returnValue.trim()
		});
	}
	get_outputProces()  {
		return this.outputProces.getAttribute('value').then(function(returnValue)  {
			console.log(returnValue)
			return returnValue;
		});
	}
	get_transBlankFile()  {
		return this.transBlankFile.getAttribute('class').then(function(returnValue)  {
			if(returnValue.includes('ui-state-active')){			
				return true;
			}
			else
				return false
		});
	}
	get_reqVerify()  {
		return this.reqVerify.getAttribute('class').then(function(returnValue)  {
			if(returnValue.includes('ui-state-active')){			
				return true;
			}
			else
				return false
		});
	}
	get_convertToUnix()  {
		return this.convertToUnix.getAttribute('class').then(function(returnValue)  {
			if(returnValue.includes('ui-state-active')){			
				return true;
			}
			else
				return false
		});
	}
	get_tarnsmitTo()  {
		return this.tarnsmitTo.getText().then(function(returnValue)  {
			console.log(returnValue)
			return returnValue;
		});
	}
	get_hostName()  {
		return this.hostName.getAttribute('value').then(function(returnValue)  {
			console.log(returnValue)
			return returnValue;
		});
	}
	get_hostUser()  {
		return this.hostUser.getAttribute('value').then(function(returnValue)  {
			console.log(returnValue)
			return returnValue;
		});
	}
	get_fileName()  {
		return this.fileName.getAttribute('value').then(function(returnValue)  {
			console.log(returnValue)
			return returnValue;
		});
	}

	nav_resettpending()  {
//		util.selectDropdown(this.statusdpn,'Pending Extraction','Status Dropdown','Reset To pending Input');
		util.nav_epcMonitor('Reset To Pending Input','Trasnmission Details');
	}

	nav_helper()  {
		util.elementClickable(this.close)
		util.elementClickable(this.refreshbtn)
	}

	//**********************************************************************
	//* Description     : EOD Processing
	//* Return Values   : return the text 
	//**********************************************************************
	nav_eod_helper(data)  {
		browser.ignoreSynchronization = true;
		util.elementClickable(this.eodbtn);
		var body= this.eoddialogdata.getText();
		//   util.elementClickable(this.okbtn)
		return body 
	}
}
module.exports = new EPC_Monitor();
