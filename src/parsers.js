import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const extentions = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.ini': decode,
};

export default fileExtention => extentions[fileExtention];
