import { BadRequest, GeneralError } from '../../../../utils/errors.js';
import { asyncOne, asyncTwo, asyncLoop, asyncEachLoop } from '../../../../utils/async-task.js';
export default (app, router, auth) => {

  router.route('/supporter')
    .get(auth, (req, res) => {
      if (!req.query.name) {
        throw new BadRequest('Bad request');
      }
      res.send(`Hello v1.0 Public API, ${req.query.name}`);
    })

  router.route('/test-async')
    .get(async (req, res) => {
      try {
        let one = await asyncOne(req.query.ref);
        let two = await asyncTwo(req.query.ref);
        // let refVar= 111;
        // let refVar = parseInt(req.query.val);
        // await asyncLoop(req.query.ref, refVar);
        // asyncLoop(req.query.ref);
        asyncEachLoop();
        res.json({ one, two });
      } catch (error) {
        console.log(error);
        res.send(error);
        // throw new GeneralError('Internal error occured');
      }
    })



}