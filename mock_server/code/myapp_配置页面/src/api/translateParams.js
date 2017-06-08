import {
  AdEntityStatusMapListForFE as StatusForFE,
  DeliveryObjectsMapListForFE as ObjectForFE,
  NewAdCampaignItemMapListForFE as AdCampaginItemForFE,
} from '../constants/MenuTypes';
import {
  AdEntityStatusMapListForBE as StatusForBE,
  DeliveryObjectsMapListForBE as ObjectForBE,
  NewAdCampaignItemMapListForBE as AdCampaginItemForBE,
} from '../constants/ParamTypesForBE';

export const getStatusForBE = (status) => {
  const key = Object.keys(StatusForFE).find(k => StatusForFE[k] === status);
  if (!key) throw Error(`不存在的广告状态: ${status}`);
  return StatusForBE[key];
};

export const getStatusForFE = (status) => {
  const key = Object.keys(StatusForBE).find(k => StatusForBE[k] === status);
  return key && StatusForFE[key];
};

export const getObjectForBE = (object) => {
  const key = Object.keys(ObjectForFE).find(k => ObjectForFE[k] === object);
  if (!key) throw Error(`不存在的广告状态: ${object}`);
  return ObjectForBE[key];
};

export const getObjectForFE = (object) => {
  const key = Object.keys(ObjectForBE).find(k => ObjectForBE[k] === object);
  return key && ObjectForFE[key];
};

export const getAdCampaginItemForBE = (item) => {
  const key = Object.keys(AdCampaginItemForFE).find(k => AdCampaginItemForFE[k] === item);
  if (!key) throw Error(`不存在的广告状态: ${item}`);
  return AdCampaginItemForBE[key];
};

export const getAdCampaginItemForFE = (item) => {
  const key = Object.keys(AdCampaginItemForBE).find(k => AdCampaginItemForBE[k] === item);
  if (!key) throw Error(`不存在的广告状态: ${item}`);
  return AdCampaginItemForFE[key];
};
