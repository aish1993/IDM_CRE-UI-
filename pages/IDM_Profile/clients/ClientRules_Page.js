/*******************************************
 * Author : Neha(neha.prasad@hcl.com)
 * Date : 01/25/2020
 * Reviewed by: Sanjay Mundu 
 *******************************************/

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var p3=require("../../../pages/IDM_Profile/clients/SortPattern_Page");
var p1=require("../../../pages/IDM_Profile/businessRules/BusinessRules_Page");

"use strict";

class ClientRulesSettings  {
	constructor()  {
		this.availableRules=element(by.xpath("//p-picklist[@sourceheader='Available Rules']/div/div[2]/ul/li[2]"));
		this.assignedRules=element(by.xpath("//p-picklist[@sourceheader='Available Rules']/div/div[4]/ul/li[2]"));
		this.singleArrow=element(by.xpath("//button[@icon='pi pi-angle-right']/span[1]"));
//		this.logicaloperatorAnd=element(by.xpath("//span[contains(text(),'AND')]"));
//		this.logicaloperatorOr=element(by.xpath("//p-selectbutton[@formcontrolname='FilterLogicalOperator']/div/div[2]/span"));
		this.logicaloperator=element.all(by.xpath("//p-selectbutton[@formcontrolname='FilterLogicalOperator']/div/div"));
		this.nextBtn=element(by.xpath("//p-table[4]//span[text()='Next']"));
		this.availableRulesdata=element.all(by.xpath("//tr[1]/td/p-picklist/div/div[2]/ul/li[2]/text()"))
		this.editBtn=element(by.xpath("//p-table[4]//button[text()='Edit']"));

	}

	/********************************************************************
	//* Description     : Edit Client for Page Client Rules
	//* Input Params    : element- pass the data from sheet
	//* Return Values   : --- return the Message
	/********************************************************************/
	editClient(data)  {
		this.nav_helper_edit(data)
		//  this.availableRulesdata.get(0).click();

		// 	 this.availableRulesdata.getText().then(function(Value)  {
		// 		if(Value==data.RulesName)
		// 			this.availableRulesdata.get(returnValue).click();
		// 	})
		// })

		// this.singleArrow.click();
		util.elementClickable(this.logicaloperator.get(1))
		util.elementClickable(this.nextBtn)
		return util.resultMessage(data.TestResultType);
	}
	/********************************************************************
	//* Description     : Add Client for Page Client Rules
	//* Input Params    : element- pass the data from sheet
	//* Return Values   : --- return the Message
	/********************************************************************/
	addClient(data)  {
		this.nav_helper_add(data)
		//  this.availableRulesdata.get(0).click();

		// 	 this.availableRulesdata.getText().then(function(Value)  {
		// 		if(Value==data.RulesName)
		// 			this.availableRulesdata.get(returnValue).click();
		// 	})
		// })

		// this.singleArrow.click();
		util.elementClickable(this.logicaloperator.get(1))
		util.elementClickable(this.nextBtn)
		if(data.TestResultType=='Inline')
		return util.resultMessage(data.TestResultType);
	}


	/********************************************************************
	//* Description     : Getting value from UI 
	//* Input Params    : NILL
	//* Return Values   : return the UI Value
	/********************************************************************/	
	get_LogicalOperator()  { 
		return this.logicaloperator.get(0).getAttribute('class').then(function(returnValue)  {
			if (returnValue.includes('ui-state-active')) {
				console.log("Logical Operator"+returnValue);
				return 1
			}
			else 
				return 0
		});
	}

	get_AssignedRules()  {  
		return (this.assignedRules.getText()).then( function(returnValue)  {
			browser.sleep(3000)
			console.log("Assigned"+returnValue);
			return  returnValue;
		});
	}

	/********************************************************************
	//* Description     : Helper method for View and Edit/Add
	//* Input Params    : data-Excel sheet data
	//* Return Values   : NILL
	/********************************************************************/
	
	nav_helper_view(data)  {
		p3.nav_helper_view(data);
		util.elementClickable(p3.nextBtn)
	}
	nav_helper_edit(data)  {
		p3.nav_helper_edit(data);
		util.elementClickable(p3.nextBtn)

	}
	nav_helper_add(data)  {
		p3.nav_helper_add(data);
		util.elementClickable(p3.nextBtn)

	}

}

module.exports= new ClientRulesSettings();