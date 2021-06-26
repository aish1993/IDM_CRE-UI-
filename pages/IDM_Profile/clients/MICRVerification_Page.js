/*******************************************
 * Author : Twinkle(twinkle@hcl.com)
 * Date : 04/02/2020
 * Updated by: 
 *******************************************/
var util = requireUtilityPage('Common_Utility');
var p8=require("../../../pages/IDM_Profile/clients/TransportConfigOutput_Page");

class MICRVerification{

	constructor(){ 

		//Header
		this.micrVerification =element(by.xpath("//th[contains(text(),'MICR Verification')]"));

		//1. MICR Field(checkbox)  
		this.chkamount =element(by.xpath("//p-checkbox[@formcontrolname='AM']/div"));
		this.chkpc =element(by.xpath("//p-checkbox[@label='PC']/div"));
		this.chkaccountNumber=element(by.xpath("//p-checkbox[@formcontrolname='AN']/div"));
		this.chkroutingTransit=element(by.xpath("//p-checkbox[@formcontrolname='RT']/div"));
		this.chkaux_onus=element(by.xpath("//p-checkbox[@formcontrolname='AX']/div"));

		//2.Field Start(dropdown)
		this.amountStart=element(by.xpath("//p-dropdown[@formcontrolname='AMStart']/div/div/span"));
		this.pcStart=element(by.xpath("//p-dropdown[@formcontrolname='PCStart']/div/div/span"));
		this.accountNumberStart=element(by.xpath("//p-dropdown[@formcontrolname='ANStart']/div/div/span"));
		this.routingTransitStart=element(by.xpath("//p-dropdown[@formcontrolname='RTStart']/div/div/span"));
		this.aux_onusStart=element(by.xpath("//p-dropdown[@formcontrolname='AXStart']/div/div/span"));

		//3.Field End(dropdown)
		this.amountEnd=element(by.xpath("//p-dropdown[@formcontrolname='AMEnd']/div/div/span"));
		this.pcEnd=element(by.xpath("//p-dropdown[@formcontrolname='PCEnd']/div/div/span"));
		this.accountNumberEnd=element(by.xpath("//p-dropdown[@formcontrolname='ANEnd']/div/div/span"));
		this.routingTransitEnd=element(by.xpath("//p-dropdown[@formcontrolname='RTEnd']/div/div/span"));
		this.aux_onusEnd=element(by.xpath("//p-dropdown[@formcontrolname='AXEnd']/div/div/span"));

		//4.Threshold(dropdown)
		this.amountThreshold=element(by.xpath("//p-dropdown[@formcontrolname='AMThreshold']/div/div/span"));
		this.pcThreshold=element(by.xpath("//p-dropdown[@formcontrolname='PCThreshold']/div/div/span"));
		this.accountNumberThreshold=element(by.xpath("//p-dropdown[@formcontrolname='ANThreshold']/div/div/span"));
		this.routingTransitThreshold=element(by.xpath("//p-dropdown[@formcontrolname='RTThreshold']/div/div/span"));
		this.aux_onusThreshold=element(by.xpath("//p-dropdown[@formcontrolname='AXThreshold']/div/div/span"));

		//5.Best Read MICR/OCR Substitution(checkbox)
		this.chkamountRead=element(by.xpath("//p-checkbox[@formcontrolname='AMSubstitute']/div/div[2]"));
		this.chkpcRead=element(by.xpath("//p-checkbox[@formcontrolname='PCSubstitute']/div/div[2]"));
		this.chkaccountNumberRead=element(by.xpath("//p-checkbox[@formcontrolname='ANSubstitute']/div/div[2]"));
		this.chkroutingTransitRead=element(by.xpath("//p-checkbox[@formcontrolname='RTSubstitute']/div/div[2]"));
		this.chkaux_onusRead=element(by.xpath("//p-checkbox[@formcontrolname='AXSubstitute']/div/div[2]"));

		//6.Sort Pockets
		this.micrVerifedPocket=element(by.xpath("//input[@formcontrolname='MICRVerPocket']"));
		this.micrReviewPocket=element(by.xpath("//input[@formcontrolname='MICRRevPocket']"));

		//7.Sort Pockets(checkbox)
		this.chkshowCodeLines=element(by.xpath("//p-checkbox[@formcontrolname='ShowCodeLines']/div/div[2]"));
		this.chkshowImages=element(by.xpath("//p-checkbox[@formcontrolname='ShowImages']/div/div[2]"));

		//8.Buttons
		this.backBtn=element(by.xpath("//p-table[9]//span[text()='Back']"));
		this.nextBtn=element(by.xpath("//p-table[9]//span[text()='Next']"));	
		this.editBtn=element(by.xpath("//p-table[9]//button[text()='Edit']"));

	}

	/********************************************************************
	//* Description     : Edit Client for MICR Verification
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	editClient(data)  {
		this.nav_helper_edit(data);
		if(data.MICRField=='Amount')  {
			util.elementClickable(this.chkamount)
			util.selectDropDown(this.amountStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.amountEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.amountThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkamountRead);

		}
		else if(data.MICRField=='PC')  {
			util.elementClickable(this.chkpc);
			util.selectDropDown(this.pcStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.pcEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.pcThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkpcRead);

		}
		else if(data.MICRField=='AccountNumber')  {
			util.elementClickable(this.chkaccountNumber);
			util.selectDropDown(this.accountNumberStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.accountNumberEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.accountNumberThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkaccountNumberRead);

		}
		else if(data.MICRField=='Routing Transit')  {
			util.elementClickable(this.chkroutingTransit);
			util.selectDropDown(this.routingTransitStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.routingTransitEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.routingTransitThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkroutingTransitRead);
		}
		else if(data.MICRField=='AUX_ONUS')  {
			util.elementClickable(this.chkaux_onus);
			util.selectDropDown(this.aux_onusStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.aux_onusEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.aux_onusThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkaux_onusRead);
		}
		browser.sleep(2000)
		util.inputValidation(this.micrVerifedPocket,data.micrVerifedPocket,'Micr Verifed Pocket','Edit Client');
		util.inputValidation(this.micrReviewPocket,data.micrReviewPocket,'Micr Review Pocket','Edit Client');
		util.elementClickable(this.nextBtn)
		return util.resultMessage(data.TestResultType);

	}

	/********************************************************************
	//* Description     : Add Client method for MICR Verification
	//* Input Params    : data-Excel sheet data
	//* Return Values   : return the message
	/********************************************************************/
	addClient(data)  {
		this.nav_helper_add(data);
		if(data.MICRField=='Amount')  {
			util.elementClickable(this.chkamount)
			util.selectDropDown(this.amountStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.amountEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.amountThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkamountRead);

		}
		else if(data.MICRField=='PC')  {
			util.elementClickable(this.chkpc);
			util.selectDropDown(this.pcStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.pcEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.pcThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkpcRead);

		}
		else if(data.MICRField=='AccountNumber')  {
			util.elementClickable(this.chkaccountNumber);
			util.selectDropDown(this.accountNumberStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.accountNumberEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.accountNumberThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkaccountNumberRead);

		}
		else if(data.MICRField=='Routing Transit')  {
			util.elementClickable(this.chkroutingTransit);
			util.selectDropDown(this.routingTransitStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.routingTransitEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.routingTransitThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkroutingTransitRead);
		}
		else if(data.MICRField=='AUX_ONUS')  {
			util.elementClickable(this.chkaux_onus);
			util.selectDropDown(this.aux_onusStart,data.FieldStart,'Amount Field start','Edit Client');
			util.selectDropDown(this.aux_onusEnd,data.FieldEnd,'Amount Field end','Edit Client');
			util.selectDropDown(this.aux_onusThreshold,data.Threshold,'Amount Threshold','Edit Client');
			util.elementClickable(this.chkaux_onusRead);
		}
		browser.sleep(2000)
		util.inputValidation(this.micrVerifedPocket,data.micrVerifedPocket,'Micr Verifed Pocket','Edit Client');
		util.inputValidation(this.micrReviewPocket,data.micrReviewPocket,'Micr Review Pocket','Edit Client');
		util.elementClickable(this.nextBtn)
		if(data.TestResultType=='Inline')
		return util.resultMessage(data.TestResultType);

	}


	/********************************************************************
	//* Description     : Helper method for View and Edit/Add
	//* Input Params    : data-Excel sheet data
	//* Return Values   : NILL
	/********************************************************************/
	nav_helper_view(data)  {
		p8.nav_helper_view(data);
		util.elementClickable(p8.nextBtn)
	}
	nav_helper_edit(data)  {
		p8.nav_helper_edit(data);
		util.elementClickable(p8.nextBtn)
	}
	nav_helper_add(data)  {
		p8.nav_helper_add(data);
		util.elementClickable(p8.nextBtn)
	}

}
module.exports=new MICRVerification();