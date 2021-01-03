import { BadRequest, NotFound } from '../../../../utils/errors.js';
import { asyncOne } from '../../../../utils/async-task.js';

export default (app, router, auth) => {

  router.route('/user')
    .get(auth, async (req, res, next) => {
      try {
        if (!req.query.name)
          throw new BadRequest('Bad request');
        if (!req.user)
          throw new NotFound('User Not Found');
        let getResult = await asyncOne(req.query.ref);
        res.status(200).json(getResult);
      } catch (error) {
        next(error);
      }
    });

}