const { browser } = require("protractor");

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
"use strict";

class AccountInfo  {
	constructor()  {

		this.group=element(by.xpath("//p-dropdown[@formcontrolname='GroupID']/div/div[3]/label")); 
		this.clientName=element(by.xpath("//p-dropdown[@formcontrolname='ClientID']/div/div[3]/label")); 
		this.accountName=element(by.xpath("//input[@formcontrolname='AcctName']"));
		this.accountNumber=element(by.xpath("//input[@formcontrolname='AcctNum']"));
		this.addressLine1=element(by.xpath("//input[@formcontrolname='Address1']"));
		this.addressLine2=element(by.xpath("//input[@formcontrolname='Address2']"));
		this.city=element(by.xpath("//input[@formcontrolname='City']"));
		this.state=element(by.xpath("//input[@formcontrolname='State']"));
		this.zip=element(by.xpath("//input[@formcontrolname='Zip']"));
		this.phone=element(by.xpath("//p-inputmask[@formcontrolname='Phone']/input"));
		this.phoneContact=element(by.xpath("//input[@formcontrolname='Contact']"));
		this.fax=element(by.xpath("//p-inputmask[@formcontrolname='Fax']/input"));
		this.faxContact=element(by.xpath("//input[@formcontrolname='Fax_Contact']"));
		this.description=element(by.xpath("//textarea[@formcontrolname='Description']"));
		this.accountNameDpn=element(by.xpath("//p-dropdown[@formcontrolname='Account']/div/div[3]/label"));
		this.nextBtn1=element(by.xpath("//p-table[1]//span[text()='Next']"));
		this.nextBtn2=element(by.xpath("//p-table[2]//span[text()='Next']"));
		this.yesBtn=element(by.xpath("//span[text()='yes']"));  
		this.submitBtn=element(by.xpath("//span[text()='Submit']"));        
		this.editBtn=element(by.xpath("//*[text()='Edit']"));
		this.password=element(by.xpath("//input[@formcontrolname='Password']"));
		this.watermarkImage=element(by.xpath("//input[@formcontrolname='WaterMarkImage']"));
		this.depositAccountNumber=element(by.xpath("//input[@formcontrolname='DepositAcctNum']"));

	}


	//**********************************************************************
	//* Description     : For Adding Account(Page 1)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after adding the record
	//**********************************************************************
	add_account(data)  {

		if((data.AccountName!='')&&(data.Category=='yes')){

			data.AccountName=data.AccountName+util.randomnumbergeneration(999);
		}
		if((data.AccountNumber!='')||(data.Category='yes')){

			data.AccountNumber=data.AccountNumber+util.randomnumbergeneration(99);
		}
		util.selectDropDown(this.group,data.Group,'Group','Account Info');
		util.selectDropDown(this.clientName,data.ClientName,'Client Name','Account Info ');
		util.inputValidation(this.accountName,data.AccountName,'Account Name','Account Info');
		util.inputValidation(this.accountNumber,data.AccountNumber,'Account Number','Account Info');
		util.inputValidation(this.addressLine1,data.AddressLine1,'Address line 1','Account Info ');
		util.inputValidation(this.addressLine2,data.AddressLine2,'Address Line 2','Account Info');
		util.inputValidation(this.city,data.City,'City','Account Info');
		util.inputValidation(this.state,data.State,'State','Account Info');
		util.inputValidation(this.zip,data.Zip,'Zip','Account Info');
		util.inputValidation(this.phone,data.Phone,'Phone','Account Info');
		util.inputValidation(this.phoneContact,data.PhoneContact,'Phone Contact','Account Info');
		util.inputValidation(this.fax,data.Fax,'Fax','Account Info');
		util.inputValidation(this.faxContact,data.FaxContact,'Fax Contact','Account Info');
		util.inputValidation(this.description,data.Description,'Description','Account Info');
		util.scrolldown(this.nextBtn1)
		util.elementClickable(this.nextBtn1);
		return util.resultMessage(data.TestResultType);
	}

	//**********************************************************************
	//* Description     : For Editing Account(Page 1)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after Editing the record
	//**********************************************************************
	edit_account(data)  {
		util.inputValidation(this.addressLine1,data.AddressLine1,'Address line 1','Account Info ');
		util.inputValidation(this.addressLine2,data.AddressLine2,'Address Line 2','Account Info');
		util.inputValidation(this.city,data.City,'City','Account Info');
		util.inputValidation(this.state,data.State,'State','Account Info');
		util.inputValidation(this.zip,data.Zip,'Zip','Account Info');
		util.inputValidation(this.phone,data.Phone,'Phone','Account Info');
		util.inputValidation(this.phoneContact,data.PhoneContact,'Phone Contact','Account Info');
		util.inputValidation(this.fax,data.Fax,'Fax','Account Info');
		util.inputValidation(this.faxContact,data.FaxContact,'Fax Contact','Account Info');
		util.inputValidation(this.description,data.Description,'Description','Account Info');
		util.scrolldown(this.nextBtn1)
		util.elementClickable(this.nextBtn1);
		return util.resultMessage(data.TestResultType);
	}

	//**********************************************************************
	//* Description     : For getting Value from UI(Page 1)
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the text message after Editing the record
	//**********************************************************************
	get_AccountNumber()  { 
		return (this.accountNumber.getAttribute('value')).then(function(returnValue)  {
			console.log("My Account Number"+returnValue);
			logger.info('Retrive AccountNumber from UI'+returnValue)
			return returnValue;
		});
	}

	get_AddressLine1()  { 
		return this.addressLine1.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive AddressLine1 from UI'+returnValue)
			return returnValue;
		});
	}

	get_AddressLine2()  { 
		return this.addressLine2.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive AddressLine2 from UI'+returnValue)
			return returnValue;
		});
	}

	get_City()  { 
		return this.city.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive City from UI'+returnValue)
			return returnValue;
		});
	}

	get_State()  { 
		return this.state.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive State from UI'+returnValue)
			return returnValue;
		});
	}

	get_Zip()  { 
		return this.zip.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive Zip from UI'+returnValue)
			return returnValue;
		});
	}

	get_Phone()  { 
		return this.phone.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive Phone from UI'+returnValue)
			return returnValue;
		});
	}

	get_PhoneContact()  { 
		return this.phoneContact.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive PhoneContact from UI'+returnValue)
			return returnValue;
		});
	}

	get_Fax()  { 
		return this.fax.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive Fax from UI'+returnValue)
			return returnValue;
		});
	}

	get_FaxContact()  { 
		return this.faxContact.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive FaxContact from UI'+returnValue)
			return returnValue;
		});
	}

	get_Description()  { 
		return this.description.getAttribute('value').then(function(returnValue)  {
			logger.info('Retrive Description from UI'+returnValue)
			return returnValue;
		});
	}


	//**********************************************************************
	//* Description     : Boundary Value Function- for getting maximum length 
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the maximum length
	//**********************************************************************
	get_accountNumber_len() {
		return (this.accountNumber.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_addressLine1_len() {
		return (this.addressLine1.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_addressline2_len() {
		return (this.addressLine2.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_city_len() {
		return (this.city.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_state_len() {
		return (this.state.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_zip_len() {
		return (this.zip.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_phone_len() {
		return (this.phone.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_phoneContact_len() {
		return (this.phoneContact.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_fax_len() {
		return (this.fax.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_faxContact_len() {
		return (this.faxContact.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_description_len() {
		return (this.description.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_depositAccountNumber_len() {
		return (this.depositAccountNumber.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_password_len() {
		return (this.password.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}
	get_watermarkImage_len() {
		return (this.watermarkImage.getAttribute('maxlength')).then(function(returnValue)  {
			return returnValue;
		});
	}


	//**********************************************************************
	//* Description     : for selecting pre-requisite condition for adding the account and navigate to the next page
	//* Input Params    : Data -  values from Excel
	//**********************************************************************
	nav_helper_add(data)  {
		if((data.AccountName!='')&&(data.Category=='yes')){

			data.AccountName=data.AccountName+util.randomnumbergeneration(999);
		}
		if((data.AccountNumber!='')||(data.Category='yes')){

			data.AccountNumber=data.AccountNumber+util.randomnumbergeneration(9999999);
		}
		util.selectDropDown(this.group,data.Group,'Group','Account Info');
		util.selectDropDown(this.clientName,data.ClientName,'Client Name','Account Info ');
		util.inputValidation(this.accountName,data.AccountName,'Account Name','Account Info');
		util.inputValidation(this.accountNumber,data.AccountNumber,'Account Number','Account Info');
		util.scrolldown(this.nextBtn1)
		util.elementClickable(this.nextBtn1)
	}

	//**********************************************************************
	//* Description     :  for selecting pre-requisite condition for editing the account and navigate to the next page
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the maximum length
	//**********************************************************************
	nav_helper_edit(data)  {
		util.selectDropDown(this.group,data.Group,'Group','Account Info');
		util.selectDropDown(this.clientName,data.ClientName,'Client Name','Account Info ');
		util.selectDropDown(this.accountNameDpn,data.AccountName,'Account Number','Account Info');
		util.elementClickable(this.editBtn)
	}

	//**********************************************************************
	//* Description     : for selecting pre-requisite condition for viewing the account data and navigate to the next page
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the maximum length
	//**********************************************************************
	nav_helper_view1(data)  {
		util.selectDropDown(this.group,data.Group,'Group','Account Info');
		util.selectDropDown(this.clientName,data.ClientName,'Client Name','Account Info ');
		util.selectDropDown(this.accountNameDpn,data.AccountName,'Account Number','Account Info');
		

	}
}


module.exports=new AccountInfo();
