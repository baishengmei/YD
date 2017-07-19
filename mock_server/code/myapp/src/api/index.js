import { Router } from 'express';
import home from './home';
import adManagement from './adManagement';
import { notFoundRes } from './helper';

const router = new Router();

router.use('/home', home);
router.use('/adManagement', adManagement);
router.use('*', (req, res) => {
  res.status(notFoundRes.status).send(notFoundRes.content);
});

export default router;
