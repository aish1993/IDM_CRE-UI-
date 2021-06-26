const { browser } = require("protractor");

var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');
var len;
//"use strict";
class BusinessRules {
	constructor() {
		this.rules = element(by.xpath("//p-dropdown[@formcontrolname='rules']/div/div/label"));
		this.rulesName = element(by.xpath("//input[@formcontrolname='RuleDesc']"));
		this.param = element(by.xpath("//p-dropdown[@formcontrolname='filterParam']"));
		this.viewparam = element(by.xpath("//p-dropdown[@formcontrolname='filterParam']/div/div/input"));
		this.relationalOperator = element(by.xpath("//p-dropdown[@formcontrolname='operator']"));
		this.viewrelationalOperator = element(by.xpath("//p-dropdown[@formcontrolname='operator']/div/div/input"));
		this.paramValues = element(by.xpath("//input[@formcontrolname='newValue']"));
		this.ruleSummary = element.all(by.xpath("//p-listbox[@formcontrolname='selectedRule']//div[3]//ul//li//div//div"));
		this.editBtn = element(by.buttonText("Edit"));
		this.submitRuleBtn = element(by.buttonText("Submit"));
		this.addValueBtn = element(by.buttonText("Add Value"));
		this.cancelBtn = element(by.buttonText("Cancel"));
		this.submitBtn = element(by.buttonText("Submit"));
		this.editRuleBtn = element(by.buttonText("Edit"));
		this.confirmYesBtn = element(by.xpath("//span[text()='Yes']"));
		this.deleteSummaryIcon = element(by.xpath("//i[@class='pi pi-trash']"))
		this.toastSummary = element(by.xpath("//div[@class='ui-toast-summary']"));
		this.yesBtn = element(by.xpath("//span[text()='Yes']"));
		this.noBtn = element(by.xpath("//span[text()='no']"));
		this.ruleID = element(by.xpath("//p-table/div/div/table/tbody/tr[1]/td[4]"));

	}

	/********************************************************************
	//* Description     : Add Business Rule
	//* Input Params    : element- pass the data from sheet
	//* Return Values   : --- return the Message
	/********************************************************************/
	add_setRule(data) {
		if (data.Category == 'yes') {
			data.RuleName = data.RuleName + util.randomnumbergeneration(1000);
		}
		browser.sleep(1000)
		util.inputValidation(this.rulesName, data.RuleName, 'Rules Name', 'Maintain Buisiness Rules');
		util.selectDropDown(this.param, data.FilterParam, 'FilterParam', 'Maintain Buisiness Rules');
		browser.sleep(2000)
		util.selectDropDown(this.relationalOperator, data.RelationalOperator, 'Relational Operator', 'Maintain Buisiness Rules');
		var r = util.randomnumbergeneration(99);
		if (data.ParamValue != 'no') {
			this.paramValues.sendKeys(r);
		}
		util.elementClickable(this.addValueBtn)
		browser.sleep(4000)
		if (data.ParamValue != 'no') {
			util.elementClickable(this.submitBtn)
			if (data.TestDataType != 'Inline')
				this.yesBtn.click()
		}
		return util.resultMessage(data.TestDataType);
	}
	add_setRuleE2E(data) {
		if (data.Category == 'yes') {
			data.RuleName = data.RuleName + util.randomnumbergeneration(1000);
		}
		browser.sleep(3000);
		util.inputValidation(this.rulesName, data.RuleName, 'Rules Name', 'Maintain Buisiness Rules');
		util.selectDropDown(this.param, data.FilterParam, 'FilterParam', 'Maintain Buisiness Rules');
		util.selectDropDown(this.relationalOperator, data.RelationalOperator, 'Relational Operator', 'Maintain Buisiness Rules');
		var r = util.randomnumbergeneration(99);
		if (data.ParamValue != 'no') {
			this.paramValues.sendKeys(r);
		}
		browser.sleep(1000)
		util.elementClickable(this.addValueBtn)
		browser.sleep(4000)
		if (data.ParamValue != 'no') {
			util.elementClickable(this.submitBtn)
			this.yesBtn.click()
		}
		return [util.resultMessage(data.TestDataType), data.RuleName];
	}

	/********************************************************************
	//* Description     : Edit Business Rule
	//* Input Params    : element- pass the data from sheet
	//* Return Values   : --- return the Message
	/********************************************************************/
	edit_setRule(data) {
		browser.sleep(2000)
		util.selectDropDown(this.rules, data.RuleName, 'Rules', 'Maintain Buisiness Rules');
		browser.sleep(2000)
		util.elementClickable(this.editRuleBtn)
		// util.selectDropDown(this.relationalOperator,data.RelationalOperator,'Relational Operator','Maintain Buisiness Rules');
		// util.elementClickable(this.yesBtn)
		var r = util.randomnumbergeneration(99);
		this.paramValues.sendKeys(r);
		util.elementClickable(this.addValueBtn)
		util.elementClickable(this.submitRuleBtn)
		util.elementClickable(this.yesBtn)
		return util.resultMessage(data.TestDataType);
	}

	/********************************************************************
	//* Description     : method for reriving Data from UI
	//* Return Values   : --- return the value from UI
	/********************************************************************/
	get_RuleName() {
		//util.selectDropDown(this.rules,data.RuleName);Sanjay07/07
		return this.rules.getText().then(function (returnValue) {
			logger.info('Retrive Rule Name from UI' + returnValue)
			return returnValue;
		});
	}

	get_FilterParam() {
		//util.selectDropDown(this.rules,data.RuleName); Sanjay07/07
		return this.viewparam.getAttribute('aria-label').then(function (returnValue) {
			logger.info('Retrive FilterParam from UI' + returnValue)
			return returnValue;

		});
	}

	get_FilterParamValue() {
		//util.selectDropDown(this.rules,data.RuleName); //Sanjay07/07
		return this.param.getText().then(function (returnValue) {
			var returnVal = returnValue.split(22, 25); //Temporary Fix for the function returning multiple lines.
			console.log("******S" + returnVal);
			logger.info('Retrive FilterParamValue from UI' + returnVal)
			return returnVal;

		});
	}

	get_RuleID() {
		return this.ruleID.getText().then(function (returnValue) {
			logger.info('Retrive RuleID from UI' + returnValue)
			return returnValue;
		});
	}

	get_RelationalOperator() {
		//util.selectDropDown(this.rules,data.RuleName); Sanjay07/07
		return this.viewrelationalOperator.getAttribute('aria-label').then(function (returnValue) {
			console.log("************" + returnValue)
			logger.info('Retrive RelationalOperator from UI' + returnValue)
			return returnValue;
		});
	}
	get_RuleSummary() { //Sanjay 07/07
		// util.elementClickable(this.ruleSummary)
		console.log("**************")
		var retVal = [];
		return this.ruleSummary.getText().then(function (returnValue) {
			var numVal;
			// console.log(returnValue);

			returnValue.forEach(function (val, index) {
				numVal = val.match(/\d+/g);
				console.log(numVal);
				retVal[index] = numVal;
				// retVal[index] = numVal.replace(/[\[\]']+/g,'');
				// console.log(retVal[index]);
			});

			// retVal.forEach(function (val, index) {
			// 	// console.log(numVal);
			// 	retVal[index] = val ;
			// });
			return retVal;
		});
	}

	/********************************************************************
	//* Description     : for selecting rules from dropdown 
	//* Input Params    : element- pass the data from sheet
	/********************************************************************/
	helper_selectRule(data) {
		browser.sleep(3000)
		util.selectDropDown(this.rules, data.RuleName, 'Rule Name', 'Business Rules')
		browser.sleep(3000)
	}
};

module.exports = new BusinessRules();
