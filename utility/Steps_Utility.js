	// var jutil = require_UtilityPage('Jservices');
// var basePath = __dirname;
// var jutil =require(basePath + '/Jservices.js')
var jutil=require('./../utility/Jservices.js');

var preStep = function (module, sub_module) {
    str = allure.createStep('Prerequsite Steps', (param) => {

        step1 = allure.createStep('Prerequisite 1: Navigate to IDM/CRE URL Successfully.', () => {
            logger.info('Prerequisite 1: Navigate to IDM URL Successfully.');
        });

        step2 = allure.createStep('Prerequisite 2: Login using Valid Credentials Successfully.', () => {
            logger.info('Prerequisite 2: Login using Valid Credentials Successfully.');
        });

        step3 = allure.createStep("Prerequisite 3: Navigate to " + module + " Successfully.", () => {
            logger.info("Prerequisite 3: Navigate to " + module + " Successfully.");
        });

        step4 = allure.createStep("Prerequisite 4: Navigate to " + sub_module + " Successfully.", () => {
            logger.info("Prerequisite 4: Navigate to " + sub_module + " Successfully.");
        });

        step1();
        step2();
        step3();
        step4();
    });
    str();
}

var info_step = function (message) {

    str = allure.createStep(message, (param) => {
        logger.info(message);
    });
        str();
}


var debug_step = function (message) {

    str = allure.createStep(message, (param) => {
        logger.debug(message);
    });
    str();
}

var fail_step = function (message) {
    str = allure.createStep('****Failed Test Step****', () => {
        try {
            logger.info(message);
            str1 = allure.createStep(message, () => {
                logger.error(message);
                throw new Error(message);
            });
            str1();
            throw new Error(message);
        } catch (e) {
            throw new Error(message);
        }
    });
    str();
}

var fatal_step = function (message) {

    str = allure.createStep('****Failed Test Step****', () => {
        try {
            logger.info(message);
            str1 = allure.createStep(message, () => {
                logger.error(message);
                throw new Error('Step Error');
            });
            str1();
            throw new Error('Step Error');
        } catch (e) {
            throw new Error('Step Error');
        }
    });
    str();
}



var action_step = function (action, field, ui_form) {
    var message = 'Execution Step: ' + action + ' on ' + field + '  of ' + ui_form + ' Module';
    str = allure.createStep(message, (param) => {
        logger.info(message);
    });
    str();
}

var step_navigation = function (module, subModule) {
    var msg1 = 'Navigation to ' + subModule + ' Sub Module of ' + module + ' Module completed';

    moduleStep = allure.createStep(msg1, (param) => {
        logger.info(msg1);
    });
    moduleStep();
}

var failed_test = async function (message, summary, desc) {

    var jiraID='Jira Logging disabled', message1;
    var jiraDefect = await jutil.post_check_defect(summary);
    console.log("Jira ID in util" + jiraDefect)
    info_step("Jira ID in util" + jiraDefect)
    if (jiraDefect == undefined) {
        info_step("Jira ID in util-message1")
        // jiraID = await jutil.post_service(summary, desc);
        console.log("Jira ID in util" )
        message1 = 'New Jira Defect Logged. Defect # ' + jiraID;
        info_step("Jira ID in util-message1" + message1)
    } else {
        message1 = 'No New Defect logged in Jira as there is an existing defect available in Jira. ****Defect ID: ' + jiraDefect + '****';
        info_step("Jira ID in util-message1" + message1)
        jiraID = await jiraDefect;
    }
    str = allure.createStep('****Test Case failed*****', () => {
        try {
            logger.info("Test Case failed " + message);
            str1 = allure.createStep(message, () => {
                logger.error(message);
                console.log("****message***" + message);
                throw new Error('Test Case Failed**');
            });
            str2 = allure.createStep(message1, () => {
                logger.error(message1);
                console.log("****message1***" + message1);
                throw new Error(message1);
            });
            str1();
            str2();
            throw new Error('Test Case Failed');
        } catch (e) {
            throw new Error('Test Case Failed');
        }
    });
    str();
}
module.exports = {
   preStep: preStep,
   info_step:info_step,
   debug_step: debug_step,
   fail_step:fail_step,
   fatal_step:fatal_step,
   action_step:action_step,
   step_navigation:step_navigation,
  failed_test:failed_test
   
}