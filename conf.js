var basePath = __dirname;
var path = require('path');
var AllureReporter = require('jasmine-allure-reporter');
var PropertiesReader = require('properties-reader');
var prop = PropertiesReader('config.properties');
var Log4js = require('log4js');
var steps_util = require('./utility/Steps_Utility.js');
var jutil_template = require('./utility/Template.js');
var myArray = [];
var result_json, spec_result;
var describe;

exports.config = {

	//***Chrome Driver settings***// 
	directConnect: true,
	chromeDriver: './resources/chromedriver.exe',
	// troubleshoot: true,
	// verbose: true,
	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			// args:[ '--no-sandbox','--disable-browser-side-navigation','--headless']
			args: ['--no-sandbox', '--disable-browser-side-navigation']

		},
		'shardTestFiles': true,
	},
	//***MicrosoftEdge Driver settings***// 
	//  directConnect: false,
	/*	troubleshoot: false,
	edgeDriver: './resources/msedgedriver.exe',
	localSeleniumStandaloneOpts: {
		port: 5050,
		jvmArgs: ['-Dwebdriver.edge.driver=./resources/msedgedriver.exe'],
	},
	capabilities: {
		'browserName': 'MicrosoftEdge',
		'maxInstances': 1,
		'platformName': 'windows',
		'acceptInsecureCerts': true,
		'nativeEvents': false,
	},
*/
	framework: 'jasmine',
	baseUrl: prop.get('main.SIT'),

	specs: [

		/*******CRE Profile******/
		// './specs/CRE_Profile/Break_Specs.js',
		// './specs/CRE_Profile/Maker_Checker_Specs.js',
		// './specs/CRE_Profile/Client_Specs.js',
		// './specs/CRE_Profile/CloneProfile_Specs.js',// bug issue
		// './specs/CRE_Profile/CloneProfileE2E_Specs.js',
		// './specs/CRE_Profile/Extract_Specs.js',
		// './specs/CRE_Profile/FileDefinition_Specs.js',
		// './specs/CRE_Profile/Profile_Specs.js',
		// './specs/CRE_Profile/Source_Specs.js',
		// './specs/CRE_Profile/UDF_Specs.js',
		// './specs/CRE_Profile/EnabledDisabledClientE2E_Specs.js',

		/*********IDM Monitor*****/
		// './specs/IDM_Monitor/Monitor_Specs.js',							
		// './specs/IDM_Monitor/Reprocess_Specs.js',
		// './specs/IDM_Monitor/ViewClientFiles_Specs.js',
		// './specs/IDM_Monitor/ViewProcessLog_Specs.js',

		/*********IDM Profile-Account******/
		'./specs/IDM_Profile/Maker_Checker_Specs.js',					
		 './specs/IDM_Profile/account/AccountConfig_Specs.js',
		 './specs/IDM_Profile/account/AccountInfo_Specs.js',
		 './specs/IDM_Profile/account/OutputFormat_Specs.js',//view issue
		// './specs/IDM_Profile/account/AccountE2E_Specs.js',

		/*********IDM Profile-Media******/
		'./specs/IDM_Profile/media/Media_Specs.js',
		'./specs/IDM_Profile/media/MediaHCL_Specs.js',
		'./specs/IDM_Profile/media/MediaPCDirectory_Specs.js',//view issue
		// './specs/IDM_Profile/media/MediaE2E_Specs.js', //edit issue

		/*********IDM Profile-Business Rules******/
		'./specs/IDM_Profile/businessRules/BusinessRules_Specs.js',// view issue
		// './specs/IDM_Profile/businessRules/BusinessRulesE2E_Specs.js',

		/*********IDM Profile-Client******/
		// './specs/IDM_Profile/client/DisableClientE2E_Specs.js', //p									
		// './specs/IDM_Profile/client/CloneClientE2E_Specs.js',//issue
		// './specs/IDM_Profile/client/ClientE2E_Specs.js',
		'./specs/IDM_Profile/client/ClientSetting_Specs.js',
		'./specs/IDM_Profile/client/SettingInfo_Specs.js',
		'./specs/IDM_Profile/client/SortPattern_Specs.js',
		'./specs/IDM_Profile/client/TransportConfigSource_Specs.js',
		'./specs/IDM_Profile/client/SequentialCapture_Specs.js',
		'./specs/IDM_Profile/client/WorkflowStage_Specs.js',
		'./specs/IDM_Profile/client/TransportConfigOutput_Specs.js',
		'./specs/IDM_Profile/client/OutputFormat_Specs.js',// issue
		'./specs/IDM_Profile/client/MICRVerification_Specs.js',//issue
		'./specs/IDM_Profile/client/ReportOption_Specs.js',
		'./specs/IDM_Profile/client/ExtractOption_Specs.js',
		'./specs/IDM_Profile/client/ClientRules_Specs.js',


		/*********IDM Profile-Group******/
		 './specs/IDM_Profile/group/GroupSettings_Specs.js',
		//'./specs/IDM_Profile/group/GroupE2E_Specs.js',
		'./specs/IDM_Profile/group/ApplicationReport_Specs.js',//issue with the toast mess 
		// './specs/IDM_Profile/group/EnabledDisabledGroupE2E_Specs.js',

		/*********IDM Profile-Holiday******/
		// './specs/UserManagement/userManagement_Specs.js',//edit bug// issue
		// './specs/UserManagement/userManagementE2E_Specs.js',

		// /*******Transmission*****/
		// './specs/CRE_Monitor/transmission/TransmissionConfig_Specs.js',
		// './specs/CRE_Monitor/transmission/TransmissionProfile_Specs.js',
		// './specs/CRE_Monitor/transmission/CloneTransmission_Specs.js',
		// './specs/CRE_Monitor/transmission/CRETransmissionE2E_Specs.js',//chk

		/********CRE Monitor*******/
		// './specs/CRE_Monitor/Details_Specs.js',
		// './specs/CRE_Monitor/Enabled_DisabledTrans_Specs.js',//chk
		// './specs/CRE_Monitor/EOD_Specs.js',//issue
		// './specs/CRE_Monitor/ViewCRE_Specs.js',

		/********* Login*****/
		'./specs/lastLogin_Specs.js',
		'./specs/Login_Specs.js',

	],

	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 7500000,
	},
	beforeLaunch: function () {
		Log4js.configure({
			appenders: {
				htmlLog: {
					type: 'dateFile',
					category: "htmlLog",
					enableCallStack: true,
					layout: {
						type: 'pattern',
						pattern: '{"TIME":"%d", "LEVEL":"%p", "GROUP":"%c{2}", "LOGMESSAGE": "%m"}',
					},
					filename: './logs/data/HTMLLog',
					pattern: ".log",
					//	maxLogSize: 20480,
					backups: 3,
					compress: true,
					alwaysIncludePattern: true
				},
				errorLog: {
					type: 'stdout',
					category: "errorLog",
					enableCallStack: true,
					layout: {
						//		fail:    function() { return '\033[31m'; },
						type: 'colouredLayout',
						pattern: '{"TIME":"%d", "LEVEL":"%p", "GROUP":"%c{2}", "LOGMESSAGE": "%m"}',
					},
					filename: './logs/data/ErrorLog',
					//		maxLogSize: 20480,
					backups: 3,
					pattern: ".log",
					compress: true,
					alwaysIncludePattern: true,

				}
			},
			categories: {
				default: {
					appenders: ['htmlLog'],
					level: 'info'
				},
				errorLog: {
					appenders: ['errorLog'],
					level: 'error'
				}
			}

		});
	},
	onPrepare: function () {
		browser.waitForAngularEnabled(false);
		global.CHECKER_USER = prop.get('main.checker_user');
		global.CHECKER_PASSWORD = prop.get('main.Password');
		global.MAKER_USER = prop.get('main.maker_user');
		global.MAKER_PASSWORD = prop.get('main.Password');
		global.LoginUrl = prop.get('main.Login');
		global.SUITE = prop.get('main.testSuite');
		global.logger = Log4js.getLogger('protractorLog4js');
		global.SERVER = prop.get('main.server');
		global.USER = prop.get('main.user');
		global.PASSWORD = prop.get('main.password');
		global.PORT = prop.get('main.port');
		global.DATABASE = prop.get('main.database');
		browser.manage().timeouts().implicitlyWait(10000);

		//Adding steps
		global.addSteps = function (action, value, field_name, ui_form) {
			var message = 'Execution Step: ' + action + ' ' + value + ' in ' + field_name + ' for ' + ui_form + ' Module';
			str = allure.createStep(message, (param) => {
				logger.info(message);
				//	console.log(message);
			});
			str();
		}


		browser.driver.manage().window().maximize();
		global.requirePage = function (pageName) {
			return require(basePath + '/pages/' + pageName + '.js')
		}

		global.requireUtilityPage = function (navigation) {
			return require(basePath + '/utility/' + navigation + '.js')
		}



		global.trackerToUpload = function (fileName) {
			var filePath = basePath + '/resources/TrackerSheets/' + fileName + '.xlsx'
			var absoluteFilePath = path.resolve(__dirname, filePath);
			return absoluteFilePath;
		}
		jasmine.getEnv().defaultTimeoutInterval = 60000;
		jasmine.getEnv().addReporter(new AllureReporter({
			allureReport: {
				resultsDir: 'allureResults'
			}
		}));

		var myReporter = {
			suiteStarted: function (result) {
				console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
				describe = result.description;
			},
			specStarted: async function (result) {
			},
			specDone: async function (result) {
				spec_result = result.status;
				if (result.status == 'failed') {

					result_json = {
						"Describe": describe,
						"Description": result.description,
						"Result": result.status,
						"Result Message": result.failedExpectations
					}
					myArray.length = 0;
					myArray.push(result_json);
					jutil_template.jira_log(myArray)
				}
				if (result.status == 'passed') {
					steps_util.info_step('Test case passed successfully');
				}
			},
			suiteDone: async function (result) {
			}
		};

		jasmine.getEnv().addReporter(myReporter);
		jasmine.getEnv().afterEach(function (done) {
			
			browser.takeScreenshot().then(function (png) {
				allure.createAttachment('Screenshot', function () {
					return new Buffer(png, 'base64')
				}, 'image/png')();
				done();
			})


		});
	}
}