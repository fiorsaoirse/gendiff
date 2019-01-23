import { safeLoad } from 'js-yaml';

const extentions = {
  '.json': JSON.parse,
  '.yml': safeLoad,
};

export default fileExtention => extentions[fileExtention];
