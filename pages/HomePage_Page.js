
const { browser } = require("protractor");
var dashBoardPage = require("./DashBoard_Page");
var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');


class HomePage_Page {
	constructor() {

		//******Groups********
		this.groupsMenu = element(by.xpath("//span[text()='Groups']"));
		this.viewGroupMenu = element(by.xpath("//span[text()='View Group']"));
		this.addGroupMenu = element(by.xpath("//span[text()='Add Group']"))

		//********Media Format************

		this.mediaMenu = element(by.xpath("//span[text()='Media Format']"));
		this.viewMediaMenu = element(by.xpath("//span[text()='View Media Format']/.."));
		this.addMediaMenu = element(by.xpath("//span[text()='Add Media Format']"));

		//********Business Rules**************

		this.rulesMenu = element(by.xpath("//span[text()='Business Rules']"));
		this.viewRulesMenu = element(by.xpath("//span[text()='View Business Rules']"));
		this.addRulesMenu = element(by.xpath("//span[text()='Add Business Rules']"));


		//***********Client**********************

		this.clientMenu = element(by.xpath("//span[text()='Client']"));
		this.viewClientMenu = element(by.xpath("//span[text()='View Client']"));
		this.addClientMenu = element(by.xpath("//span[text()='Add Client']"));
		this.viewAccountMenu = element(by.xpath("//span[text()='View Account']"));
		this.addAccountMenu = element(by.xpath("//span[text()='Add Account']"));

		//***********Admin Tools**********************
		this.adminTools = element(by.xpath("//span[text()='Admin Tools']"));
		this.holidayManagement = element(by.xpath("//span[text()='Holiday Management']"));
		this.checkerView = element(by.xpath("//span[text()='Checker View']"));
		this.makerView = element(by.xpath("//span[text()='Maker View']"));
		this.auditLog = element(by.xpath("//span[text()='Audit Log']"));

		//***********Transmission**********************

	};


	//********************************************************************
	//* Description     :  Method for clicking SubMenu Options
	//* Input Params    : menuItem -pass Menu Name
	//*                 : subMenuItem-SubMenu Name
	//********************************************************************
	async subMenu_Click(menuItem, subMenuItem) {
		var util = requireUtilityPage('Common_Utility');

		switch (menuItem) {

			case 'Groups':
				var viewGroupMenu = element(by.xpath("//span[text()='View Group']"));
				var addGroupMenu = element(by.xpath("//span[text()='Add Group']"))
				var groupsMenu = element(by.xpath("//span[text()='Groups']"));
				browser.wait(EC.visibilityOf(groupsMenu), 2000)
				// browser.wait(EC.elementToBeClickable(this.clientMenu),5000)
				browser.actions().mouseMove(groupsMenu).perform().then(function () {
					groupsMenu.click().then(function () {
						if (subMenuItem == 'Add Group') {
							logger.info('Navigating to Add Group ')
							browser.wait(EC.visibilityOf(addGroupMenu), 1000);
							util.elementClickable(addGroupMenu)
						}

						else if (subMenuItem == 'View Group') {
							logger.info('Navigating to View Group ')
							browser.wait(EC.visibilityOf(viewGroupMenu), 1000)
							util.elementClickable(viewGroupMenu)
						}
					}, 2000)

				}, 2000);
				break;

			case 'Client':

				var viewClientMenu = element(by.xpath("//span[text()='View Client']"));
				var addClientMenu = element(by.xpath("//span[text()='Add Client']"));
				var viewAccountMenu = element(by.xpath("//span[text()='View Account']"));
				var addAccountMenu = element(by.xpath("//span[text()='Add Account']"));
				// browser.wait(EC.visibilityOf(this.clientMenu),2000)
				// browser.wait(EC.elementToBeClickable(this.clientMenu),5000)
				browser.actions().mouseMove(this.clientMenu).perform().then(async function () {
					var clientMenu = element(by.xpath("//span[text()='Client']"));
					await clientMenu.click().then(function () {
						if (subMenuItem == 'Add Account') {
							logger.info('Navigating to Add Account ')
							// browser.wait(EC.visibilityOf(addAccountMenu),1000)
							addAccountMenu.click()
						}

						else if (subMenuItem == 'View Account') {
							logger.info('Navigating to View Account ')
							browser.wait(EC.visibilityOf(viewAccountMenu), 1000)
							viewAccountMenu.click()
						}
						else if (subMenuItem == 'View Client') {
							logger.info('Navigating to View Client ')
							browser.wait(EC.presenceOf(viewClientMenu), 1000)
							viewClientMenu.click()

						}
						else if (subMenuItem == 'Add Client') {
							logger.info('Navigating to Add Client ')
							browser.wait(EC.presenceOf(addClientMenu), 1000)
							addClientMenu.click()

						}

					}, 2000)
				}, 2000)
				break;

			case 'Media Format':
				var viewMediaMenu = element(by.xpath("//span[text()='View Media Format']/.."));
				var addMediaMenu = element(by.xpath("//span[text()='Add Media Format']"));
				
				browser.wait(EC.visibilityOf(this.mediaMenu), 2000)
				browser.wait(EC.elementToBeClickable(this.mediaMenu), 5000);
				browser.actions().mouseMove(this.mediaMenu).perform().then(async function () {
					var mediaMenu = element(by.xpath("//span[text()='Media Format']"));
					mediaMenu.click().then(function () {
						if (subMenuItem == 'Add Media Format') {
							logger.info('Navigating to Add Media Format ')
							browser.wait(EC.presenceOf(addMediaMenu), 1000)
							addMediaMenu.click()
						}

						else if (subMenuItem == 'View Media Format') {
							logger.info('Navigating to View Media Format ')
							browser.wait(EC.presenceOf(viewMediaMenu), 1000)
							viewMediaMenu.click()
						}
					}, 2000)
				}, 2000);

				break;

			case 'Business Rules':

				var rulesMenu = element(by.xpath("//span[text()='Business Rules']"));
				var viewRulesMenu = element(by.xpath("//span[text()='View Business Rules']"));
				var addRulesMenu = element(by.xpath("//span[text()='Add Business Rules']"));

				browser.actions().mouseMove(rulesMenu).perform().then(async function () {
					var rulesMenu = element(by.xpath("//span[text()='Business Rules']"));
					rulesMenu.click().then(function () {

						if (subMenuItem == 'Add Business Rules') {
							logger.info('Navigating to Add Business Rules ')
							browser.wait(EC.visibilityOf(addRulesMenu), 5000)
							addRulesMenu.click()
							browser.sleep(2000)
						}

						else if (subMenuItem == 'View Business Rules') {
							logger.info('Navigating to View Business Rules ')
							browser.wait(EC.presenceOf(viewRulesMenu), 5000)
							viewRulesMenu.click()
						}
					}, 2000)
				}, 2000)

				break;
			case 'Admin Tools':
				var holidayManagement = element(by.xpath("//span[text()='Holiday Management']"));
				var checkerView = element(by.xpath("//span[text()='Checker View']"));
				var makerView = element(by.xpath("//span[text()='Maker View']"));
				var auditLog = element(by.xpath("//span[text()='Audit Log']"));

				browser.wait(EC.elementToBeClickable(this.adminTools), 5000);
				browser.actions().mouseMove(this.adminTools).perform().then(async function () {
					var adminTools = element(by.xpath("//span[text()='Admin Tools']"));
					adminTools.click().then(function () {

						if (subMenuItem == 'Holiday Management') {
							logger.info('Navigating to Holiday Management ')
							browser.wait(EC.presenceOf(holidayManagement), 5000)
							holidayManagement.click();
						}
						else if (subMenuItem == 'Checker View') {
							logger.info('Navigating to Checker View ')
							browser.wait(EC.presenceOf(checkerView), 5000)
							checkerView.click();
						}
						else if (subMenuItem == 'Maker View') {
							logger.info('Navigating to Maker View ')
							browser.wait(EC.presenceOf(makerView), 5000)
							makerView.click();
						}
						else if (subMenuItem == 'Audit Log') {
							logger.info('Navigating to Audit Log ')
							browser.wait(EC.presenceOf(auditLog), 5000)
							auditLog.click();
						}

					}, 2000)
				}, 2000)

				break;
			case 'Transmission':
				var cloneMenu = browser.driver.findElement(by.xpath("//span[text()='Clone Transmission'][@class='ui-menuitem-text']"))
				var addNewMenu = browser.driver.findElement(by.xpath("//span[text()='Add New Transmission'][@class='ui-menuitem-text']"))
				var enabledisableTransMenu = browser.driver.findElement(by.xpath("//span[text()='Enable/Disable Transmission'][@class='ui-menuitem-text']"))
				var transmissionMenu = browser.driver.findElement(by.xpath("//span[text()='Transmission'][@class='ui-menuitem-text']"))
				var viewTransMenu = element(by.xpath("//span[text()='View Transmission']"));
				browser.actions().mouseMove(transmissionMenu).perform().then( function () {
					 transmissionMenu.click().then(function () {
						if (subMenuItem == 'Clone Transmission') {
							// browser.wait(EC.presenceOf(cloneMenu),2000)
							cloneMenu.click()
						}

						else if (subMenuItem == 'Add New Transmission') {
							// browser.wait(EC.presenceOf(addNewMenu),2000)
							addNewMenu.click()
						}
						else if (subMenuItem == 'View Transmission') {
							// browser.wait(EC.presenceOf(viewTransMenu), 2000)
							viewTransMenu.click()
						}
						else if (subMenuItem == 'Enable/Disable Transmission') {
							// browser.wait(EC.presenceOf(enabledisableTransMenu),2000)
							enabledisableTransMenu.click();
						}
					}, 2000)
				}, 2000);

				break;
			default:
				logger.error('An error occured while clicking the Menu Items');
				break;

		}


	}
};
module.exports = new HomePage_Page();