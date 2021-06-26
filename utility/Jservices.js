var Request = require("request");
var fs = require("fs");
var FormData = require('form-data');
var actionData = require('form-data');
var steps_util = require('./Steps_Utility.js');
var get_service = async function () {
    var ret;
    Request.get({
        "headers": {
            "content-type": "application/json",
            "Authorization": "Basic bmVoYS5wcmFzYWRAaGNsLmNvbTpqV0txRmFEdUM4WkN0QjJESDhtWUIwMjk="
        },
        // "url": "https://db-hcl.atlassian.net/rest/agile/1.0/sprint/396/issue"
        "url": "https://db-hcl.atlassian.net/secure/RapidBoard.jspa?rapidView=94&projectKey=IEQA&view=planning.nodetail&issueLimit=100"

    }, async (error, response, body) => {
        if (error) {
            return console.log(error);
        }
        console.log("Body : ******");
        var a = await JSON.parse(body);
        console.log(a['key'])
        ret = await a['key'];
        console.log("Response Code ****:" + response.statusCode)
    });
    // await browser.sleep(4000);
    console.log('Outside' + ret);
    return ret;
}

var search_existing_defect = async function (summary) {
    var retval = '';
    var jiraID_old = '';
    var filter = "project = IEQA AND summary~'" + summary + "'";
    // var filter = "project = DTA AND summary~' Boundary Value analysis defect on Field: PRS No of Module: PRS Module>> Create PRS'";
    var steps_util = requireUtilityPage('Steps_Utility');
    steps_util.info_step('Summary in Jservices' + summary);
    // steps_util.info_step('Filter in Jservies'+filter);
    Request.post({
        "url": "https://db-hcl.atlassian.net/rest/api/2/search",
        "headers": {
            "content-type": "application/json",
            "Authorization": "Basic bmVoYS5wcmFzYWRAaGNsLmNvbTpqV0txRmFEdUM4WkN0QjJESDhtWUIwMjk=",
            // 'x-atlassian-token': 'nocheck'
        },
        "body": {
            "expand": ["names", "schema", "operations"],
            "jql": filter,
            "maxResults": 100,
            "fieldsByKeys": false,
            "fields": ["summary", "status", "assignee"],
            "startAt": "0"
        },
        "json": true,
    }, async (error, response, body) => {
        if (error) {
            console.log(await error);
        }

        // console.log(body);
        // await browser.sleep(30000);
        steps_util.info_step('Jservice 65: Body in Jservices' + await body);
        console.log(await body);
        if (typeof body !== 'undefined' && (body.total > 0)) {
            jiraID_old = await summary_extractor(summary, body);
            if (!(jiraID_old == '')) {
                retval = jiraID_old;
            } else {
                retval = undefined;
            }
        } else {
            retval = undefined;
        }
    })

    var flag = false;
    var retval_final;
    retval_final = retval;
    do {
        if (retval_final == '') {
            flag = true;
            retval_final = retval;
        } else {
            flag = false;
        }
        await browser.sleep(1000)
    } while (flag)
    steps_util.info_step('J Service 91' + retval_final);
    return retval_final;
}

var post_service = async function (summary, description) {
    var retval = '';
    Request.post({
        "headers": {
            "content-type": "application/json",
            "Authorization": "Basic bmVoYS5wcmFzYWRAaGNsLmNvbTpqV0txRmFEdUM4WkN0QjJESDhtWUIwMjk="
        },
        "url": "https://db-hcl.atlassian.net/rest/api/2/issue/",
        "body": JSON.stringify({
            "fields": {
                "project":
                {
                    "key": "IEQA"
                },
                "summary": summary,
                // },
                "assignee": {
                    // "name":"neha.prasad",
                    // "displayName": "Neha Prasad",
                    // "emailAddress": "neha.prasad@hcl.com",
                    // "accountId": "5d00bd06b4a4940bc2b3971d",
                    // "active": true,
                    // "timeZone": "Asia/Calcutta",
                    // "accountType": "atlassian"
                },
                "description": description,
                // "labels": ["EDP_Automation_Phase-3"],
                // "components": ["Automation_UI"],
                "priority": { "name": "Medium" },
                // "status": { "name": "Under Review" },
                "issuetype": { "name": "Bug" },
                "customfield_10196": "1.0"

            }
        })

    }, async (error, response, body) => {
        if (error) {
            console.log(error);
        }
        console.log(JSON.parse(body))
        var s = await JSON.parse(body);
        console.log("@@@@" + s.key)
        retval = await s.key;
    })

    var flag = false;
    var retval_final;
    retval_final = retval;
    do {
        if (retval_final == '') {
            flag = true;
            retval_final = retval;
        } else {
            flag = false;
        }
        await browser.sleep(1000)
    } while (flag)
    console.log('***********RETVALFinal' + retval_final)
    return retval_final;
}

var post_service_attach_new = async function (jiraID, file_path_incomming) {
    var file_path;
    // file_path = await fs.createReadStream('C:/Users/mundu.s/Desktop/Capture.PNG')
    // file_path = await fs.createReadStream('C:/Users/mundu.s/Desktop/e-Deposit/eDeposit_3.1/edeposituiautomation/resources/TestImage.jpg')
    file_path = await fs.createReadStream(file_path_incomming)

    var option1 = {
        'method': 'POST',
        'url': 'https://db-hcl.atlassian.net/rest/api/2/issue/' + jiraID + '/attachments',
        'headers':
        {
            'cache-control': 'no-cache',
            'x-atlassian-token': 'nocheck',
            'authorization': 'Basic bmVoYS5wcmFzYWRAaGNsLmNvbTpqV0txRmFEdUM4WkN0QjJESDhtWUIwMjk=',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        'formData':
        {
            'file':
            {
                'value': file_path,
                'options': { 'filename': 'TestImage112.jpg', 'contentType': null }
            }
        }
    };

    console.log(option1)
    Request(option1, async function (error, response, body) {
        if (error) {
            console.log('*****Error******' + await error)
            // throw new Error(error);
        }
        // // await browser.sleep(20000)
        console.log(await JSON.parse(body));
        console.log(await response.statusCode);
    });

}

var summary_extractor = async function (summary, body) {
    var total_items;
    var jiraID = '';
    total_items = body.total;
    var body_summary;
    for (var i = 0; i < total_items; i++) {
        body_summary = await body.issues[i].fields.summary;
        if (body_summary == summary) {
            jiraID = await body.issues[i].key;
        }
    }
    return jiraID
}

module.exports = {
    get_service: get_service,
    post_service: post_service,
    search_existing_defect: search_existing_defect,
    post_service_attach_new, post_service_attach_new,
}
