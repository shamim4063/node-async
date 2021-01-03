
import { getSumOfChalansByCourier, getOpeningOfChalanByCourier, getMergedCollectionReport } from '../../../../controller/order.controller.js';

export default (app, router) => {

    router.route('/user')
        .get((req, res) => {
            res.send('Hello v1.0 Admin API, Supporter');
        });

    router.route('/order/collection-report')
        .get(async (req, res) => {
            let form_date = new Date('2020/01/01');
            let to_date = new Date();
            to_date.setHours(23, 59, 59, 999);
            let chalanOpening = await getSumOfChalansByCourier(to_date);
            let collectionSum = await getOpeningOfChalanByCourier(form_date, to_date);
            res.send(getMergedCollectionReport(chalanOpening, collectionSum));
        })

}