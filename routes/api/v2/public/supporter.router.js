
export default (app, router, auth) => {

  router.route('/supporter')
    .get(auth, (req, res) => {
      res.send('Hello v2.0 Public API, User');
    });

}