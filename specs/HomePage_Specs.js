var homePage=require("../pages/HomePage_Page");

describe("Test Suite #1", function()  {

	it("Test Case #1 Opening View Group", function()  {
		homePage.groupMenuClick();
		homePage.addGroupMenuClick()
//		homePage.viewGroupMenuClick();		
		browser.sleep(3000)

	});	
});