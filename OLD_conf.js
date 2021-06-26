var basePath = __dirname;
var path = require('path');
var AllureReporter = require('jasmine-allure-reporter');


exports.config = {

		directConnect: true,
		capabilities: {
			'browserName': 'chrome'
		},
		allScriptsTimeout: 30000,

		framework: 'jasmine',
		baseUrl: "http://10.249.121.11:71/#/login",
		/*baseUrl: "http://10.112.83.64:71/#/login",*/

		specs: ['./specs/test.js'
			],

			suites:
			{
				sanity: 'DashBoard_Specs.js',
				regression: 'homePageSpec.js',
				tracker_DCORR: 'dcorr.js',
				tracker_UCC:'ucc.js'
			},
			
			jasmineNodeOpts: {
				defaultTimeoutInterval: 30000
			},
			//SELENIUM_PROMISE_MANAGER: false,


			onPrepare: function() {
				browser.driver.manage().window().maximize();
				//browser.driver.manage().timeouts().setScriptTimeout(30, TimeUnit.SECONDS);

				global.requirePage = function(pageName) {
					return require(basePath + '/pages/' + pageName + '.js')
				}
				global.require_UtilityPage = function(navigation) {
					return require(basePath + '/Common_Utility/' + navigation + '.js')
				}

				global.trackerToUpload = function(fileName) {
					var filePath = basePath + '/resources/TrackerSheets/' + fileName + '.xlsx'
					var absoluteFilePath = path.resolve(__dirname, filePath);
					return absoluteFilePath;
				}

				//Setup for Jasmine Allure Reporter
				jasmine.getEnv().addReporter(new AllureReporter());	
				jasmine.getEnv().afterEach(function(done){
					browser.takeScreenshot().then(function (png) {
						allure.createAttachment('Screenshot', function () {
							return new Buffer(png, 'base64')
						}, 'image/png')();
						done();
					})
				});
			}
}

