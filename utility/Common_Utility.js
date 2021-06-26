var basePath = __dirname;
var XLSX = require('xlsx');
var path = require('path');
var navigation = require('../pages/HomePage_Page.js');
var sql = require('MSSQL');
const { browser } = require('protractor');
var flow = browser.controlFlow();
var EC = protractor.ExpectedConditions;
var login_page = requirePage("Login_Page");
var randomize = require('randomatic')
var steps_util = requireUtilityPage('Steps_Utility');
// const Say = require('say')


class Utility {

	//********************************************************************
	//* Description     : Get maximum Length 
	//* Input Params    : Locator-Xpath of the Field                   
	//* Return Values   : Maimum Length of locator
	//********************************************************************
	bondaryValue_Max(locator) {
		return locator.getAttribute("maxlength");
	}

	//********************************************************************
	//* Description     : Get maximum Length 
	//* Input Params    : Locator-Xpath of the Field                   
	//* Return Values   : Maimum Length of locator
	//********************************************************************
	boundaryValue_min(locator, value) {
		locator.sendKeys(value);
		return locator.getText();
	}

	//********************************************************************
	//* Description     : GGet Value from Checker Screen 
	//* Input Params    : Locator-Xpath of the Field  
	//*                 : index- Column index in UI                 
	//* Return Values   : Text Value from UI
	//********************************************************************
	get_ValuefromCheckerUI(pageElement, index) {
		var Locator = element(by.xpath("//*[text()=' " + pageElement + " ']/../../following-sibling::tbody/tr/td[" + index + "]"))
		return Locator.getText().then(function (returnValue) {
			console.log("returnValue" + returnValue);
			return returnValue;
		});
	}

	//********************************************************************
	//* Description     : GGet Value from Maker Screen 
	//* Input Params    : Locator-Xpath of the Field  
	//*                 : index- Column index in UI                 
	//* Return Values   : Text Value from UI
	//********************************************************************
	get_ValuefromMakerUI(pageElement, index) {
		var Locator = element(by.xpath("//*[text()='" + pageElement + "']/../../../following-sibling::tbody/tr/td[" + index + "]"))
		return Locator.getText().then(function (returnValue) {
			console.log("returnValue" + returnValue);
			return returnValue;
		});
	}
	//********************************************************************
	//* Description     : Navigate to the Navigate Page                   
	//* Return Values   : Go to the navigation Page
	//********************************************************************
	navigateTo() {
		return navigation;
	}
	getTextFromWebelement(webelement) {
		return webelement.getText();
	}
	LoginTo() {
		return login_page;
	}

	//**********************************************************************
	//* Description     : Boundary Value Function- for getting maximum length 
	//* Input Params    : Data -  values from Excel
	//* Return Values   : return the maximum length
	//**********************************************************************
	get_Fieldlen(FieldName) {
		var pelement = element(by.xpath("//*[@formcontrolname='" + FieldName + "']"));
		return pelement.getAttribute('maxlength').then(function (returnValue) {
			steps_util.info_step(' Max length for field' + FieldName + 'is' + returnValue);
			return returnValue;
		});
	}

	//********************************************************************
	//* Description     : Read Data from execl 
	//* Input Params    : sheet name- excel Sheet Name 
	//                  : file_name- Excel file Name 
	//* Return Values   : return the sheet rows data 
	//********************************************************************
	read_from_excel(sheet_name, file_name) {
		XLSX.utils.sheet_to_json;
		var filePath = basePath + '/../resources/' + file_name + '.xlsx'
		var absoluteFilePath = path.resolve(__dirname, filePath);
		var workbook = XLSX.readFile(absoluteFilePath, { cellDates: true });
		var worksheet = workbook.Sheets[sheet_name];
		var retVal = XLSX.utils.sheet_to_json(worksheet, { header: 'a' }).filter(function (rawData) {
			return ((rawData.Suite || "").toLowerCase()).includes(SUITE.toLowerCase()) && !(((rawData.ToBeExecuted).toLowerCase()).includes('no'));
		})
		return retVal;

	};

	get_column_record_count(startingColumnIndex, EndColumnIndex, sheet_name, file_name) {
		var filePath = basePath + '/../resources/' + file_name + '.xlsx'
		var absoluteFilePath = path.resolve(__dirname, filePath);
		var workbook = XLSX.readFile(absoluteFilePath);
		var worksheet = workbook.Sheets[sheet_name];
		//return XLSX.utils.sheet_to_json(worksheet, {header: 'a'});

		var range = XLSX.utils.decode_range(worksheet['!ref']);
		range.s.c = 0; // 0 == XLSX.utils.decode_col("A")
		//range.e.c = 0; // 6 == XLSX.utils.decode_col("G")
		var new_range = XLSX.utils.encode_range(range);
		console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name], { blankRows: false, defval: '', range: new_range }));
	};

	//********************************************************************
	//* Description     : Establish connection with database and execute query  
	//* Input Params    : strQuery-database query
	//* Return Values   : return the query result
	//********************************************************************
	execute_sql_query(strQuery) {
		try {
			console.log("--- DB CONNECTION TRY BLOCK --- ")
			logger.info('-----Connecting SIT database---------');
			var connectionString = 'mssql://SIT:p@ssw0rd@10.118.58.6:7990/IDM';
			sql.connect(connectionString).then(function () {
				sql.query(strQuery).then(function (result, err) {
					if (err) {
						console.log("--- DB CONNECTION ERROR " + err instanceof sql.RequestError + " Info " + err.message)
					}
					else {
						console.log("Total Affected Rows are: " + result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
						console.log("SQL Query Executed Successfully")
					}
				})
			})
			sql.close()
		}
		catch (err) {
			console.log("--- DB CONNECTION CATCH BLOCK ERROR " + err)
			sql.close()
		}
	}

	//********************************************************************
	//* Description     : Getting value from UI  
	//* Input Params    : element- pass the locator of the element which needs to be click
	//* Return Values   : return Text from UI
	//********************************************************************
	getTextValue(element) {
		return element.getText().then(function (returnValue) {
			console.log("Text" + returnValue)
			return returnValue;
		});
	}
	getAttributeValue(element) {
		return element.getAttribute('value').then(function (returnValue) {
			console.log("Text" + returnValue)
			return returnValue;
		});
	}
	//********************************************************************
	//* Description     : Generate Random Number  
	//* Input Params    : length- pass the length of Random number 
	//* Return Values   : return the random number according to the Length 
	//********************************************************************
	randomnumbergeneration(length) {
		return Math.floor(Math.random() * length) + 1;
	};

	//********************************************************************
	//* Description     : for selecting value from Dropdown  
	//* Input Params    : webElement- Locator of the field dropdown
	//*	                : value- value which need to be select from dropdown 
	//*	                : Field Name- Name of the dropdown field
	//*	                : ui_form- module Name
	//********************************************************************
	selectDropDown(webElement, value, fieldName, ui_form) {
		if (value === undefined) {
			steps_util.info_step('Not Selecting ' + value + 'from' + fieldName + 'in' + ui_form);
			return;
		}
		else {
			var list
			browser.wait(EC.elementToBeClickable(webElement),10000).then(function () {
				browser.sleep(2000)
				webElement.click();
				list = webElement.all(by.xpath("//li[@role='option']"));
				list.count().then(function (size) {
					list.getText().then(function (text) {
						for (var i = 0; i < size; i++) {
							if (text[i] == value) {
								list.get(i).click();
								browser.sleep(2000)
								steps_util.info_step('Selecting  ' + value + ' from' + fieldName + ' in' + ui_form);
								break;
							}
						}
					});
				});
			}, function (err) {
				console.log(err)
				steps_util.fail_step(err);
			})
		}
	}

	//********************************************************************
	//* Description     : click method 
	//* Input Params    : element- pass the locator of the element which needs to be click
	//* Return Values   : click on the element
	//********************************************************************
	elementClickable(element) {
		browser.wait(EC.visibilityOf(element, 5000));
		element.isDisplayed().then(function (retVal) {
			if (retVal == true) {
				element.click();
			}
		}, function (err) {
			console.log(err);
			steps_util.fail_step(err);
		})
	}

	//********************************************************************
	//* Description     : Getting the text message from Inline or Toast popup 
	//* Input Params    : type- pass the type of the message (Toast,NoMessage,Inline,TextMessage)
	//* Return Values   : return text value 
	//********************************************************************
	resultMessage(type) {
		switch (type) {
			case 'Dialog':                                       //for Text Message 

				{
					return (element(by.xpath("//div[@role='dialog']/div/div/p[2]")).getText()).then(function (returnValue) {
					    steps_util.info_step("Dialog message " + returnValue);
						element(by.xpath("//button[@label='Ok']")).click();
						return returnValue.replace(/[^a-zA-Z ]/g, []);
					}, function (err) {
						console.log(err)
						steps_util.fail_step(err);
					});
					break;

				}
			case 'Inline':                                      // for inline  message 
				{
					browser.sleep(2000)
					var msg = element(by.xpath("//span[@class='ui-message-text']")).getText();// Test on 11/19/2019
					steps_util.info_step("Inline message " + msg);
					return msg;
					break;
				}

			case 'NoMessage':                                   // when no error were their
				{
					return 'NoMessage';
					break;
				}
			case 'TextMessage':                                  // for Hidden text (Checker screen)
				{

					browser.sleep(3000)
					var msg = element(by.xpath("//tr[1]//div/span[not(@hidden)]")).getText();
					steps_util.info_step("Text message " + msg);
					return msg;
					break;
				}
			case 'Toast':                                           // for dialog box message
				{

					var msg = element(by.xpath("//div[@class='ui-toast-summary']")).getText();
					return msg;
					break;
				}
			default:
				{
					return 'Some Problem in Script';
					break;
				}
		}
	}

	//********************************************************************
	//* Description     :  for scroll down
	//* Input Params    : pageelement - locator
	//***************************************************************** 
	scrolldown(pageelement) {
		browser.executeScript("arguments[0].scrollIntoView(true);", pageelement);
	}


	//********************************************************************
	//* Description     : selecting menu based on the data input from CRE Monitor (for that right click on the profile in cre Monitor ) 
	//* Input Params    : data- menu name 
	//*	                : ui_form :Module name
	//********************************************************************
	nav_epcMonitor(data, ui_form) {
		browser.ignoreSynchronization = true
		browser.sleep(6000);
		element(by.xpath("//table/tbody/tr[1]")).click();
		browser.driver.findElement(By.xpath("//table/tbody/tr[1]")).click();
		var test = browser.driver.findElement(By.xpath("//table/tbody/tr[1]"));
		browser.actions().mouseMove(test).perform();
		browser.actions().click(protractor.Button.RIGHT).perform();
		browser.sleep(3000);
		browser.driver.findElement(By.xpath("//span[text()='" + data + "']")).click();
		// browser.waitForAngular(true);
	}


	//********************************************************************
	//* Description     : Enter value into the field   
	//* Input Params    : element- Field Locator 
	//*                 : fieldName: Name of the field 
	//*                 : ui_form : Module Name
	//*                 : data : data which needs to be enter from xls
	//********************************************************************
	inputValidation(element, data, fieldName, ui_form) {
		steps_util.info_step('Entering ' + data + ' in ' + fieldName);
		element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a')).then(function () {
			element.sendKeys(protractor.Key.DELETE);
			if (data === null || data === undefined) {
				// addSteps('Leaving textbox blank ','',data,ui_form);
				return;
			}
			else {
				// addSteps('Entering',data,fieldName,ui_form);
				browser.wait(EC.presenceOf(element), 3000)
				browser.wait(EC.elementToBeClickable(element), 3000);
				browser.actions().mouseMove(element).perform();
				// element.clear()
				element.click();
				element.clear().sendKeys(data = data || '');
				browser.sleep(2000)
			}
			steps_util.info_step('Entered ' + data + ' in ' + fieldName);
		}, function (err) {
			steps_util.fail_step(err + fieldName);
		});

	}
	setScrollPage(element) {
		return browser.executeScript('arguments[0].scrollIntoView()',
			element.getWebElement())
	};

	//********************************************************************
	//* Description     :  Method to bypass the issue happening with clean in the Input fields, 
	//*	                   this Method should be used in all the edits for Input text. 
	//* Input Params    : element- Field Locator 
	//********************************************************************
	cleanInput(element) {
		element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
		element.sendKeys(protractor.Key.DELETE);
	}

	//********************************************************************
	//* Description     : logout from Application 
	//********************************************************************
	logout() {
		element(by.xpath("//button[2]/span[2]")).click();
		element(by.xpath("//span[@class='ui-menuitem-text'][text()='Logout']")).click();

	}

	//********************************************************************
	//* Description     : .To generate the random integer number
	//* Input Params    : length-- length for generating random number
	//* Return Value    : Return random number
	//********************************************************************
	/* randomFixedInteger = function (length) {
		return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
	}
*/
	/*
	var boundary_value_analysis = async function (max, min = 0, input_type, input_field) {

		
		// a: Lowercase alpha characters (abcdefghijklmnopqrstuvwxyz')
		// A: Uppercase alpha characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ')
		// 0: Numeric characters (0123456789')
		// !: Special characters (~!@#$%^&()_+-={}[];\',.)
		// *: All characters (all of the above combined)
		// ?: Custom characters (pass a string of custom characters to the options)
		
		var input_data = [];
		var result = [];
		switch (input_type.toUpperCase()) {
			case 'ALL':
				{
					input_data[0] = randomize('*', min + 1)
					input_data[1] = randomize('*', max - 1)
					input_data[2] = randomize('*', max)
					input_data[3] = randomize('*', max + 1)
					break;
				}
			case 'NUMERIC':
				{
					input_data[0] = randomize('0', min + 1)
					input_data[1] = randomize('0', max - 1)
					input_data[2] = randomize('0', max)
					input_data[3] = randomize('0', max + 1)
					break;
				}
			case 'CHAR':
				{
					input_data[0] = randomize('Aa', min + 1)
					input_data[1] = randomize('Aa', max - 1)
					input_data[2] = randomize('Aa', max)
					input_data[3] = randomize('Aa', max + 1)
					break;
				}
			case 'ALPHANUMERIC':
				{
					input_data[0] = randomize('Aa0', min + 1)
					input_data[1] = randomize('Aa0', max - 1)
					input_data[2] = randomize('Aa0', max)
					input_data[3] = randomize('Aa0', max + 1)
					break;
				}
			default:
				{
					//nothing
				}

		}
		for (var i = 0; i < 3; i++) {
			await steps_util.info_step('generated test data: ' + input_data[i]);

			await input_field.clear().sendKeys(input_data[i]);
			await input_field.getAttribute('value').then(async (text) => {
				await steps_util.info_step('The value in the text box ' + text)
				if (text.length == input_data[i].length) {
					result.push(true);
				} else {
					steps_util.info_step_Fail('The test step failed for test Data: ' + input_data[i]);
					result.push(false);
				}
			})
		}
		await input_field.clear().sendKeys(input_data[3]);
		await steps_util.info_step('generated test data: ' + input_data[3]);
		await input_field.getAttribute('value').then(async (text) => {
			await steps_util.info_step('The value in the text box ' + text)
			if (text.length == input_data[3].length) {
				result.push(false);
				steps_util.info_step_Fail('The test step failed for test Data: ' + input_data[3]);
			} else {
				result.push(true);
			}
		})

		steps_util.info_step('the Result is ' + result)
		return result;
	}
	*/
	//Negative Scenario for Types can be also included

	//********************************************************************
	//* Description     : To generate the random based on the data type
	//* Input Params    : len-- length for generating random number
	//*                 : data_type -(Numeric,char,alphanumeric) 
	//* Return Value    : Return random 
	//********************************************************************
	generate_BVA_data = async function (len, data_type) {

		// a: Lowercase alpha characters (abcdefghijklmnopqrstuvwxyz')
		// A: Uppercase alpha characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ')
		// 0: Numeric characters (0123456789')
		// !: Special characters (~!@#$%^&()_+-={}[];\',.)
		// *: All characters (all of the above combined)
		// ?: Custom characters (pass a string of custom characters to the options)

		var ret_value;
		steps_util.info_step('Generating test data of ' + data_type + ' type having length= ' + len);
		switch (data_type) {
			case 'ALL':
				{
					ret_value = randomize('*', len)
					break;
				}
			case 'NUMERIC':
				{
					ret_value = randomize('0', len)
					break;
				}
			case 'CHAR':
				{
					ret_value = randomize('Aa', len)
					break;
				}
			case 'ALPHANUMERIC':
				{
					ret_value = randomize('Aa0', len)
					break;
				}
			default:
				{
					//nothing
				}
		}
		await steps_util.info_step('Test Data generated: ' + ret_value)
		return ret_value;
	}
	//********************************************************************
	//* Description     : To input the value in specific locator 
	//* Input Params    : test_data -  random test data 
	//*                 : FieldName -in which input required
	//* Return Value    : Return value after entered 
	//********************************************************************
	verify_boundary_value(test_data, FieldName) {
		var inputLocator = element(by.xpath("//*[@ng-reflect-name='" + FieldName + "']"))
		console.log("test Data"+test_data)
		browser.sleep(2000)
		inputLocator.clear().sendKeys(test_data);
		return this.getAttribute(inputLocator);
	}

	//********************************************************************
	//* Description     : To get the value from UI
	//* Input Params    : pageElement-- Locator of the element
	//* Return Value    : Return Text from UI 
	//********************************************************************
	getAttribute(pageElement) {
		return pageElement.getAttribute('value').then(function (value) {
			steps_util.info_step('Get Attribute-> ' + value);
			console.log(value);
			return value;
		}, function (err) {
			console.log(err);
			steps_util.fail_step(err);
		});
	}
	/* verify_boundary_value =async function (test_data, data,FieldName) {
		var final_result
		var result;
				steps_util.info_step('Entering the test data ' + test_data + ' in ' + data.FIELD_NAME);
				var inputLocator= element(by.xpath("//input[@formcontrolname='"+data.FIELD_NAME+"']"))
				console.log("Test Data"+test_data)
				inputLocator.clear().sendKeys(test_data);
				// this.inputValidation(inputLocator,test_data,'Rule Desc','Rules')
				steps_util.info_step('Test data entered in ' + data.FIELD_NAME);
				await inputLocator.getAttribute('value').then(async (text) => {
					await steps_util.info_step('The value in the text box ' + text)
					result = text;
				})
		return result;
	}*/
	verify_label_presence(field_name) {
		var label = element(by.xpath("//*[contains(text(),'" + field_name + "')] "));
		browser.sleep(2000)
		return label.isPresent().then(function (res) {
			console.log("status" + res)
			steps_util.info_step('Label ' + field_name + ' Presence status = ' + res);
			if (res == true) {
				browser.sleep(2000)
				return label.getText().then(function (returnValue) {
					console.log("Label Name " + returnValue)
					return field_name;
				})
			}
			else {
				return 'Label Not Found'
			}

		})

	}
}


module.exports = new Utility();