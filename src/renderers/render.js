import renderSimple from './render-simple';
import renderPlain from './render-plain';

const renderTypes = {
  simple: renderSimple,
  plain: renderPlain,
};

export default renderType => renderTypes[renderType];
