
export default (app, router) => {

    router.route('/user')
        .get((req, res) => {
            res.send('Hello v1.0 Admin API, Supporter');
        });

}