import renderSimple from './render-simple';
import renderPlain from './render-plain';
import renderJSON from './render-json';

const renderTypes = {
  simple: renderSimple,
  plain: renderPlain,
  json: renderJSON
};

export default renderType => renderTypes[renderType];
