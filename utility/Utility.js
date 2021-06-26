var basePath = __dirname;
var XLSX = require('xlsx');
var path = require('path');
var navigation = require('./Navigation.js');
var sql = require('MSSQL');
var flow = browser.controlFlow();
var EC = protractor.ExpectedConditions;

class Common_Utility  {
	bondaryValue_Max(locator)  {
		return locator.getAttribute("maxlength");
	}

	boundaryValue_min(locator,value)  {
		locator.sendKeys(value);
		return locator.getText();3
	}

	navigateTo()  {
		return navigation;
	}

	read_from_excel(sheet_name, file_name)  {
		XLSX.utils.sheet_to_json;
		var filePath = basePath + '/../resources/' + file_name + '.xlsx'
		var absoluteFilePath =  path.resolve(__dirname, filePath);
		var workbook =  XLSX.readFile(absoluteFilePath,{ cellDates: true });  
		var worksheet =  workbook.Sheets[sheet_name];
		return  XLSX.utils.sheet_to_json(worksheet, {header: 'a'});

		/*var range = XLSX.utils.decode_range(worksheet['!ref']);
		range.s.c = 0; // 0 == XLSX.utils.decode_col("A")
		//range.e.c = 0; // 6 == XLSX.utils.decode_col("G")
		var new_range = XLSX.utils.encode_range(range);
		console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name], {blankRows: false, defval: '', range: new_range}));*/
	};

	get_column_record_count(startingColumnIndex, EndColumnIndex, sheet_name, file_name)  {
		var filePath = basePath + '/../resources/' + file_name + '.xlsx'
		var absoluteFilePath =  path.resolve(__dirname, filePath);
		var workbook =  XLSX.readFile(absoluteFilePath);
		var worksheet =  workbook.Sheets[sheet_name];
		//return XLSX.utils.sheet_to_json(worksheet, {header: 'a'});

		var range =  XLSX.utils.decode_range(worksheet['!ref']);
		range.s.c = 0; // 0 == XLSX.utils.decode_col("A")
		//range.e.c = 0; // 6 == XLSX.utils.decode_col("G")
		var new_range =   XLSX.utils.encode_range(range);
		console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name], {blankRows: false, defval: '', range: new_range}));
	};

	execute_sql_query(strQuery)  {
		try  {
			console.log("--- DB CONNECTION TRY BLOCK --- ")
//			var connectionString = 'mssql://sa:p@ssw0rd@10.249.121.11/edeposit';
			var connectionString = 'mssql://SIT:p@ssw0rd@10.118.58.6:7990/IDM';
			sql.connect(connectionString).then(function(){	
				sql.query(strQuery).then(function(result, err){
					if(err){
						console.log("--- DB CONNECTION ERROR "+err instanceof sql.RequestError+" Info "+err.message)
					}
					else{
						console.log("Total Affected Rows are: "+result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
						console.log("SQL Query Executed Successfully")
					}
				})
			})
			sql.close()
		}
		catch(err){
			console.log("--- DB CONNECTION CATCH BLOCK ERROR "+err)
			sql.close()
		}
		//sql.close(); // Code doesn't work with SQL CLOSE() - Need to check
	}


	/*
	 * 	 Select Drop down function
	 */
	select_one_from_Textarea(element,value)  { // Currently Not in Use
		console.log(element.get(2).getText());

		/*
	for (var i=0;i<element.length();i++){
			if(elements.get(i).getAttribute("value")==value){
				elements.get(i).click();
			}
		}
		 */
	}

	randomnumbergeneration(length)  {
		return Math.floor(Math.random() * length) + 1;
	};

	selectDropDown(webElement,value)  {
		if(value===undefined) {
			return;
		}
		else{
			var list;
//			browser.wait(EC.elementToBeClickable(webElement),5000);
			browser.sleep(500);
			webElement.click();
			browser.sleep(500)
			list=webElement.all(by.xpath("//li[@role='option']"));
			list.count().then(function (size)  {
				list.getText().then(function(text)  {
					for(var i=0;i<size;i++)  {	
						if(text[i]==value)  {
							list.get(i).click();
							break;
						}
					}
				});
			});
		}
	}

	resultMessage(type)  {
		switch(type)  {
		case 'Toast':

		{	
//			browser.ignoreSynchronization = true;
//			browser.wait(EC.visibilityOf(element(by.xpath("//div[@class='ui-toast-summary']")),1000,toast));
//			this.toastSummary=element(by.xpath("//div[@class='ui-toast-summary']"));
////			console.log(this.toastSummary.getText());
//			browser.ignoreSynchronization = false;
//			return this.toastSummary.getText();

			browser.ignoreSynchronization = true;
			var toastSummary=element(by.xpath("//div[@class='ui-toast-summary']"));

//			browser.wait(EC.visibilityOf(element(by.xpath("//div[@class='ui-toast-summary']")),1000));
		//	this.toastSummary=element(by.xpath("//div[@class='ui-toast-summary']"));
			//console.log(this.toastSummary.getText());
//			console.log(this.toastSummary.getText());
			browser.wait(ExpectedConditions.visibilityOf(toastSummary), 5000);

			return (element(by.xpath("//div[@class='ui-toast-summary']")).getText()).then(function(returnValue)  {
				console.log(returnValue);
				browser.ignoreSynchronization = false;
				return returnValue;
			});
			break;




		}
		case 'Inline':
		{
			browser.wait(EC.presenceOf(element(by.xpath("//span[@class='ui-message-text']")),1000));
			var msg=element(by.xpath("//span[@class='ui-message-text']")).getText();// Test on 11/19/2019
			//var msg=element(by.xpath("//span[@class='ui-message-text']")).getAttribute('outerHTML');
			return msg;
			break;				
		}

		case 'NoMessage':
		{
			return 'NoMessage';
			break;				
		}
		case 'TextMessage':
		{
			browser.wait(EC.presenceOf(element(by.xpath("//tr[1]//div/span[not(@hidden)]")),1000));
			var msg=element(by.xpath("//tr[1]//div/span[not(@hidden)]")).getText();
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

	inputValidation(element,data)  {
		element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
		element.sendKeys(protractor.Key.DELETE);	
		if(data===null||data===undefined)
		{
			return;
		}
		else
		{
			element.sendKeys( data=data||'');
		}
	}

	/*
	 * Method to bypass the issue happening with clean in the Input fields, 
	 * this Method should be used in all the edits for Input text.
	 */
	cleanInput(element)  {
		element.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
		element.sendKeys(protractor.Key.DELETE);
	}
}



module.exports = new Common_Utility();