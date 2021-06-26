/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 02/18/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');

"use strict";
class Profile  {
	constructor()  {

		this.profile=element(by.xpath("//p-dropdown/div/div[4]/span")); 
		this.profiledata=element(by.xpath("//span[text()='Profile']"));
		this.profilefields=element.all(by.xpath("//tbody[@ng-reflect-columns='pid,pName,pDescription,pComple']/tr/td"));
	}

	//********************************************************************
	//* Description     : Getting Value from UI from Profile Tab 
	//* return Value      : return Text 
	//********************************************************************
	get_ProfileID()  {     
		return this.profilefields.get(0).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_Name()  {     
		return this.profilefields.get(1).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_Description()  {     
		return this.profilefields.get(2).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_Completed()  {     
		return this.profilefields.get(3).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_ClientID()  {     
		return this.profilefields.get(4).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_PffID()  {     
		return this.profilefields.get(5).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_PnfID()  {     
		return this.profilefields.get(6).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_PdfID()  {     
		return this.profilefields.get(7).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_RecordLength()  {     
		return this.profilefields.get(8).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_Delimiter()  {     
		return this.profilefields.get(9).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_Separator()  {     
		return this.profilefields.get(10).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_DecimalPlaces()  {     
		return this.profilefields.get(11).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_DollarSign()  {     
		return this.profilefields.get(12).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_PadCharacter()  {     
		return this.profilefields.get(13).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_Type()  {     
		return this.profilefields.get(14).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_SourceID()  {     
		return this.profilefields.get(15).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_InputFile()  {     
		return this.profilefields.get(16).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_OutputFile()  {     
		return this.profilefields.get(17).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_RollupDetails()  {     
		return this.profilefields.get(18).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_PostProcessDLL()  {     
		return this.profilefields.get(19).getText().then(function(returnValue)  {
			return returnValue;
		});
	}
	get_NSF()  {     
		return this.profilefields.get(20).getText().then(function(returnValue)  {
			return returnValue;
		});
	}

	//********************************************************************
	//* Description     : selecting Profile from Dropdown and click on Profile  Tab
	//* Argument Values   : data-xl Sheet data
	//********************************************************************
	nav_helper_view(data)  {
		browser.sleep(2000)
		util.selectDropDown(this.profile,data.Name,'Profile','EPC Profile');
		util.elementClickable(this.profiledata);

	}
}





module.exports= new Profile();