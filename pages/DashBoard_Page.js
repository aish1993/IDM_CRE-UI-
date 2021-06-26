var EC = protractor.ExpectedConditions;
var util = requireUtilityPage('Common_Utility');


var HomePage = require('../pages/HomePage_Page.js');
var idmProfile = element(by.xpath("//a[text()='IDM Profile']"));
var idmMonitor = element(by.xpath("//a[text()='IDM Monitor']"));
var creProfile = element(by.xpath("//a[text()='CRE Profile']"));
var creMonitor = element(by.xpath("//a[text()='CRE Monitor']"));
var userManagement=element(by.xpath("//a[text()='User Management']"))

var navigate_idmProfile = async function() {
	var util = requireUtilityPage('Common_Utility');
	browser.sleep(2000)
	browser.wait(EC.visibilityOf(idmProfile),2000)
	 idmProfile.click()
	browser.sleep(3000)
}

var navigate_idmMonitor =async function() {
	var util = requireUtilityPage('Common_Utility');
	browser.sleep(2000)
	browser.wait(EC.visibilityOf(idmMonitor),2000)
	 idmMonitor.click()
	browser.sleep(2000)

}

var navigate_creProfile = async function() {
	var util = requireUtilityPage('Common_Utility');
	browser.sleep(2000)
	browser.wait(EC.visibilityOf(creProfile),2000)
	await creProfile.click()
	browser.sleep(2000)

}

async function navigate_creMonitor() {
	var util = requireUtilityPage('Common_Utility');
	browser.sleep(2000)
	browser.wait(EC.visibilityOf(creMonitor),2000)
	await creMonitor.click()
	// util.elementClickable(this.creMonitor);
	browser.sleep(4000)


}
async function navigate_userManagement(){
	var util = requireUtilityPage('Common_Utility');
	browser.sleep(2000)
	 browser.wait(EC.visibilityOf(userManagement),2000)
     await userManagement.click();
    browser.sleep(2000)

}
module.exports = {
		navigate_idmProfile: navigate_idmProfile,
		navigate_idmMonitor: navigate_idmMonitor,
		navigate_creProfile: navigate_creProfile,
		navigate_creMonitor: navigate_creMonitor,
		navigate_userManagement:navigate_userManagement,
}
