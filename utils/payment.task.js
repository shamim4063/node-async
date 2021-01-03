import request from 'request';

const generateMarchentKey = (data) => {
    return new Promise((resolve, reject) => {
        var authKey = 'Basic ' + Buffer.from(data.integration_key + ':' + data.integration_password).toString('base64');
        var req_body = JSON.stringify({ "vendorName": data.vendor_name });
        request({
            headers: {
                'Authorization': authKey,
                'Content-Type': 'application/json'
            },
            uri: process.env.NODE_ENV == "production" ? 'https://pi-live.sagepay.com/api/v1/merchant-session-keys' : 'https://pi-test.sagepay.com/api/v1/merchant-session-keys',
            body: req_body,
            method: 'POST'
        }, function (err, rest, body) {
            if (!err) {
                var res_body = JSON.parse(rest.body);
                if (res_body.merchantSessionKey) {
                    resolve(res_body);
                } else {
                    reject({ success: false, error_obj: { code: res_body.code, message: "Merchant account issue - contact Smart Lotto" }, errors: [{ clientMessage: "Merchant account issue - contact Smart Lotto" }] });
                }
            } else {
                reject({ success: false, error_obj: { code: 500, message: "Internal server error." }, errors: [{ clientMessage: "Internal Server Error" }] });
            }
        });
    })
};

const getCardIdentifier = (marchent_key, cardDetails) => {
    return new Promise((resolve, reject) => {
        var authKey = `Bearer ${marchent_key}`;
        var req_body = JSON.stringify({ cardDetails: cardDetails });
        request({
            headers: {
                'Authorization': authKey,
                'Content-Type': 'application/json'
            },
            uri: process.env.NODE_ENV == "production" ? 'https://pi-live.sagepay.com/api/v1/card-identifiers' : 'https://pi-test.sagepay.com/api/v1/card-identifiers',
            body: req_body,
            method: 'POST'
        }, function (err, rest, body) {
            if (!err) {
                var res_body = JSON.parse(rest.body);
                if (res_body.expiry) {
                    resolve(res_body);
                } else {
                    let error_obj = new Object();
                    if (res_body.errors && res_body.errors.length) {
                        error_obj = {
                            code: res_body.errors[0].code,
                            message: res_body.errors[0].clientMessage,
                        }
                    } else {
                        error_obj = {
                            code: 500,
                            message: "Unexpected error occured.",
                        }
                    }
                    reject({ success: false, error_obj: error_obj, errors: res_body.errors ? res_body.errors : [{ clientMessage: res_body.description ? res_body.description : "Unexpecetd error occured." }] });
                }
            } else {
                reject({ success: false, errors: ["Internal Server Error"] });
            }
        });
    })
};

const performTransaction = (key_obj, data) => {
    return new Promise((resolve, reject) => {
        var authKey = 'Basic ' + Buffer.from(key_obj.integration_key + ':' + key_obj.integration_password).toString('base64');
        var req_body = JSON.stringify(data);
        request({
            headers: {
                'Authorization': authKey,
                'Content-Type': 'application/json'
            },
            uri: process.env.NODE_ENV == "production" ? 'https://pi-live.sagepay.com/api/v1/transactions' : 'https://pi-test.sagepay.com/api/v1/transactions',
            body: req_body,
            method: 'POST'
        }, function (err, rest, body) { // body never used
            if (!err) {
                var res_body = JSON.parse(rest.body);
                if (res_body.statusCode) {
                    resolve(res_body);
                } else {
                    let error_obj = new Object();
                    if (res_body.errors && res_body.errors.length) {
                        error_obj = {
                            code: res_body.errors[0].code,
                            message: `${res_body.errors[0].description}(${res_body.errors[0].property}).Please update your profile.`
                        }
                    } else {
                        error_obj = {
                            code: 500,
                            message: "Unexpected error occured."
                        }
                    }
                    let errors = res_body.errors ? res_body.errors : [{ clientMessage: res_body.description ? res_body.description : "Unexpecetd error occured." }];
                    reject({ success: false, errors: errors, error_obj: error_obj });
                }
            } else {
                reject({ success: false, errors: ["Internal Server Error"] })
            }
        });
    })
};

const threeDSecureChallenge = (key_obj, data, transactionId) => {
    return new Promise((resolve, reject) => {
        var authKey = 'Basic ' + Buffer.from(key_obj.integration_key + ':' + key_obj.integration_password).toString('base64');
        var req_body = JSON.stringify(data);
        request({
            headers: {
                'Authorization': authKey,
                'Content-Type': 'application/json'
            },
            uri: process.env.NODE_ENV == "production" ? `https://pi-live.sagepay.com/api/v1/transactions/${transactionId}/3d-secure` : `https://pi-test.sagepay.com/api/v1/transactions/${transactionId}/3d-secure`,
            body: req_body,
            method: 'POST'
        }, function (err, rest, body) {
            if (!err) {
                var res_body = JSON.parse(rest.body);
                if (res_body.status == "Authenticated") {
                    resolve({ success: true })
                } else {
                    let errors = res_body;
                    let error_obj = { status: 500, message: "Transaction Authorisation Attempt Failed with your Acquiring Bank" }
                    reject({ success: false, statusCode: 6004, statusDetail: "3D secure authentication failed.", threeDSecureAuthFailed: true, errors: errors, error_obj: error_obj });
                }
            } else {
                reject({ success: false, statusCode: 6005, statusDetail: "Something went wrong, Please contact with smartlotto.", threeDSecureAuthFailed: true, errors: ["Internal Server Error"] })
            }
        });
    })
};

const getTransactionDetail = (key_obj, transactionId) => {
    return new Promise((resolve, reject) => {
        var authKey = 'Basic ' + Buffer.from(key_obj.integration_key + ':' + key_obj.integration_password).toString('base64');
        request({
            headers: {
                'Authorization': authKey,
                'Content-Type': 'application/json'
            },
            uri: process.env.NODE_ENV == "production" ? `https://pi-live.sagepay.com/api/v1/transactions/${transactionId}` : `https://pi-test.sagepay.com/api/v1/transactions/${transactionId}`,
            method: 'GET'
        }, function (err, rest, body) {
            if (!err) {
                var res_body = JSON.parse(rest.body);
                resolve(res_body);
            } else {
                reject({ success: false, threeDSecureAuthFailed: true, errors: err })
            }
        });
    })
};

export {
    generateMarchentKey, getCardIdentifier, performTransaction, threeDSecureChallenge, getTransactionDetail
}