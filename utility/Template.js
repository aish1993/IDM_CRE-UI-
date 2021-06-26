var fs = require('fs');
var jira_log_defect = require('./Jservices.js');
var steps_util = require('./Steps_Utility.js');

var jira_summary = function (functionality, field, module, subModule) {
    var summary = functionality + ' defect on Field: ' + field + ' of Module: ' + module + '>> ' + subModule;
    return summary;
}
var jira_description = function (functionality, field, module, subModule) {
    var description = ` *Description:* ` + functionality + ` is not working 
    
         *Module:* `+ module + `
         *SubModule:* `+ subModule + `
         *Field Name:* `+ field + `
        *Expected Result:* `+ field + ` should pass ` + functionality + `
        *Actual Result:* `+ field + ` is _failed_  ` + functionality + `
    
    *NOTE:* For more details please refer to the Allure report generated during Test execution`
    steps_util.info_step(description);
    return description;
}

var jira_log = async function (rawData) {
    // return new Promise(async(resolve, reject) => {
    var test = JSON.stringify(rawData);
    // steps_util.info_step("**************Template32****************" + test)
    // steps_util.info_step("**************Template33****************" + rawData)
    // await steps_util.info_step("**************Template34****************" + rawData.length)
    // steps_util.info_step("**************Template37****************" + i)
    var describe = rawData[rawData.length - 1]["Describe"];
    var spec_description = rawData[rawData.length - 1]["Description"];
    var describe_arr;
    describe_arr = describe.split('|');
    var module
    var subModule;
    var functionality;
    var summary
    var jira_summary
    var jira_description;
    summary = spec_description.replace(/Verify/gi, 'UI Failed');
    module = describe_arr[0];
    subModule = describe_arr[1];
    functionality = describe_arr[2];

    jira_summary = summary + ' of Module:' + module + ' subModule:' + subModule;
    jira_description = ` *Description:* ` + functionality + ` is not working 
    
    *Module:* `+ module + `
    *SubModule:* `+ subModule + `
   
    *Actual Result:* `+ jira_summary + `
    *NOTE:* For more details please refer to the Allure report generated during Test execution`

    var jira_defect = '';
    jira_defect = await jira_log_defect.search_existing_defect(jira_summary);
// console.log("**********************************Template 56*********"+ jira_defect)
    // await steps_util.info_step("*****************Template 84*******************" + jira_defect);
    if (jira_defect == undefined) {
        // console.log("**********************************Template 59*********"+ jira_defect)
        await steps_util.info_step('New Jira Defect needs to be logged for this defect');
        // var defect_num = jira_log_defect.post_service(jira_summary, jira_description);
        // console.log("**********************************Template 59*********"+ defect_num)
        // await steps_util.info_step("Template 93" + defect_num);
    } else {
        // console.log("**********************************Template 64********"+ jira_defect)
        await steps_util.info_step('Template 95 Jira ticket# ' + jira_defect + ' already logged for this Defect');
    }
    // jira_log_defect.post_service(jira_summary, jira_description);
    // }
    // steps_util.info_step(jira_summary);
    // steps_util.info_step(jira_description);

    //     resolve('Template resolve 80');
    // })
}
module.exports = {
    jira_log: jira_log,
    jira_summary: jira_summary,
    jira_description: jira_description,
}

