
export default (app, router, auth) => {

  router.route('/user')
    .get(auth, (req, res) => {
      res.send('Hello v2.0 Public API, User');
    });

}