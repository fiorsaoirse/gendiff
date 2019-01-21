import { safeLoad } from 'js-yaml';

const extentions = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
};

export default fileExtention => extentions[fileExtention];
