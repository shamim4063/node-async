import { BadRequest, GeneralError } from '../../../../utils/errors.js';
import {
    generateMarchentKey,
    getCardIdentifier,
    performTransaction,
    threeDSecureChallenge,
    getTransactionDetail
} from '../../../../utils/payment.task.js';

export default (app, router, auth) => {

    router.route('/payment/credit-wallet')
        .post(auth, async (req, res) => {
            try {
                let marchentResult = await generateMarchentKey(req.body.marchent);
                let cardIdentifierResult = await getCardIdentifier(marchentResult.merchantSessionKey, req.body.cardInfo);

                let transactionData = req.body.transactionData;
                transactionData.paymentMethod.card.merchantSessionKey = marchentResult.merchantSessionKey;
                transactionData.paymentMethod.card.cardIdentifier = cardIdentifierResult.cardIdentifier;

                let transactionResult = await performTransaction(req.body.marchent, transactionData);


                if (transactionResult.status == "Ok" && transactionResult.statusCode == "0000") {
                    //Wallet Update Codes
                    res.json({ success: true, statusCode: transactionResult.statusCode, message: "Payment was successfull." });
                } else if (transactionResult.status == "3DAuth" && transactionResult.statusCode == "2007") {
                    res.redirect('pages/fall_back_auto_submit_form', {
                        acsUrl: transactionResult.acsUrl,
                        PaReq: transactionResult.paReq,
                        TermUrl: `${process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : process.env.APP_DOMAIN}/api/v1/public/payment-3d-secure/term-url`,
                        MD: transactionResult.transactionId
                    });
                } else if (transactionResult.statusCode == '4042') {
                    res.send({ success: false, statusCode: 4042, message: "A duplicate payment is not allowed, check balance", detail: transactionResult });
                } else {
                    res.send({ success: false, statusCode: transactionResult.statusCode, message: "Transaction failed. Please try again later.", detail: transactionResult });
                }
            } catch (error) {
                console.log(error);
                res.send("Internal Error occured");
            }
        })

    router.route('/payment-3d-secure/term-url')
        .post(async (req, res) => {
            try {
                if (req.body.PaRes) {
                    let marchent_obj = {
                        "integration_key": "lW1duApD9fxImfrCleKUeEc64C727OeP8XQr9vqJeZlyG1ChyF",
                        "integration_password": "aIBz8Pds28RUF4Tf7jEleGHIkMHaAT8RRT0xaFwluNFMgQoQTrsktT9XhXscvmCqU",
                        "vendor_name": "smartlottotest1"
                    };
                    let body = { paRes: req.body.PaRes };
                    let transactionId = req.body.MD;
                    let challengeResult = await threeDSecureChallenge(marchent_obj, body, transactionId);
                    let transactionDetail = await getTransactionDetail(marchent_obj, transactionId);
                } else {
                    res.render('pages/payment_response', {
                        info: JSON.stringify({
                            success: false,
                            statusCode: 6003,
                            statusDetail: "Unable to process your transaction, Please contact with smartlotto."
                        })
                    });
                }
            } catch (error) {
                console.log(error);
                res.send("Internal Error occured");
            }
        })
}