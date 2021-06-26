var homePageNavigation = require('../pages/HomePage_Page.js');
var EC = protractor.ExpectedConditions;
var util = require_UtilityPage('Common_Utility');
class Navigation
{


	constructor()  {
		
		this.idmProfile= element(by.xpath("//a[text()='IDM Profile']"));
		this.epcMonitor= element(by.xpath("//a[text()='CRE Monitor']"));
		this.epcProfile= element(by.xpath("//a[text()='CRE Profile']"));
		this.idmMonitor= element(by.xpath("//a[text()='IDM Monitor']"));

		// Group menu locators
		this.groupsMenu=element(by.xpath("//span[text()='Groups']"));
		this.viewGroupMenu=element(by.xpath("//span[text()='View Group']"));
		this.addGroupMenu=element(by.xpath("//span[text()='Add Group']"));

		// login
		this.userid=element(by.xpath("//input[@	formcontrolname='firstname']"));
		this.submit=element(by.xpath("//span[text()='Submit']"));
		this.password=element(by.xpath("//input[@formcontrolname='password']"));
		this.crossicon=element(by.xpath("//span[@class='last-login']/i"));
	}
	
	
	//********************************************************************
    //* Description     : Login and click on idm Profile 
    //* Return Values   : return to HomePage 
    //********************************************************************
	homePage()  {
		browser.get(LoginUrl,2000);
		this.userid.clear();
		this.userid.sendKeys(CHECKER_USER);
		this.password.sendKeys(PASSWORD);
		this.submit.click();
//		browser.sleep(4000)
		this.idmProfile.click();
		browser.ignoreSynchronization = true;
		browser.sleep(4000)
		this.crossicon.click()
		return homePageNavigation;
	}
	
	//********************************************************************
    //* Description     : Login and click on CRE Monitor 
    //* Return Values   : return to HomePage 
    //********************************************************************
	homePage_EPCm()  {
		browser.get(LoginUrl,3000);
		this.userid.clear();
		this.userid.sendKeys(CHECKER_USER);
		this.password.sendKeys(PASSWORD);
		this.submit.click();
//		browser.sleep(4000)
		this.epcMonitor.click();
		browser.ignoreSynchronization = true;
		this.crossicon.click();
		return homePageNavigation;
	}
	
	//********************************************************************
    //* Description     : Login and click on CRE Profile 
    //* Return Values   : return to HomePage 
    //********************************************************************
	homePage_epcProfile()    {
		browser.get(LoginUrl,2000);
		this.userid.clear();
		this.userid.sendKeys(CHECKER_USER);
		this.password.sendKeys(PASSWORD);
		this.submit.click();
//		browser.sleep(4000)
		this.epcProfile.click();
		browser.ignoreSynchronization = true;
		this.crossicon.click();
		return homePageNavigation;
	}
	
	//********************************************************************
    //* Description     : Login and click on IDM Monitor 
    //* Return Values   : return to HomePage 
    //********************************************************************
	homePage_idmMonitor()    {

		browser.get(LoginUrl,2000);
		this.userid.clear();
		this.userid.sendKeys(CHECKER_USER);
		this.password.sendKeys(PASSWORD);
		this.submit.click();
//		browser.sleep(4000)
		this.idmMonitor.click();
//		browser.sleep(3000)
//		browser.ignoreSynchronization = true;
		this.crossicon.click();
		browser.ignoreSynchronization = true;
		return homePageNavigation;
	}
	
	//********************************************************************
    //* Description     : Login as Maker and click on IDM Profile ,CRE Profile,CRE Monitor,IDM Monitor
	//*Input Value      : module : Module Name (IDM Profile ,CRE Profile,CRE Monitor,IDM Monitor)
    //* Return Values   : return to HomePage 
    //********************************************************************
	homePageMaker(module)  {
		browser.get(LoginUrl,2000);
		this.userid.clear();
		this.userid.sendKeys(MAKER_USER);
		this.password.sendKeys(PASSWORD);
		this.submit.click();
//		browser.sleep(4000)
		if(module == "idmProfile"){
			this.idmProfile.click();
			this.crossicon.click();
			browser.ignoreSynchronization = true;
			return homePageNavigation;}
		else if (module == "epcMonitor"){
			this.epcMonitor.click();
			this.crossicon.click();
			return homePageNavigation;
		}
		else if (module == "epcProfile"){
			this.epcProfile.click();
			this.crossicon.click();
			browser.ignoreSynchronization = true;
			return homePageNavigation;
		}
		else if (module == "idmMonitor"){
			this.idmMonitor.click();
			this.crossicon.click();
			browser.ignoreSynchronization = true;
			return homePageNavigation;
		}

	}

};

module.exports=new Navigation();