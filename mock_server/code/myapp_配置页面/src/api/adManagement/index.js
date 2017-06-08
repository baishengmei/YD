import { Router } from 'express';
import { getFinanceBudget, updateSponsorBudget } from './financeBudget';
import quickSearchList from './quickSearchList';
import queryAdEntityList from './queryAdEntityList';
import regionList from './regionList';
import newAdCampaign from './newAdCampaign';

const router = new Router();

router.get('/getFinanceBudget', getFinanceBudget);
router.post('/updateSponsorBudget', updateSponsorBudget);
router.get('/quickSearchList', quickSearchList);
router.get('/queryAdEntityList', queryAdEntityList);
router.get('/regionList', regionList);
router.post('/newAdCampaign', newAdCampaign);

export default router;
