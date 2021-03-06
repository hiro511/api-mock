// Generated by CoffeeScript 1.12.4
var expandUriTemplateWithParameters, ut;

ut = require('uri-template');

expandUriTemplateWithParameters = function(uriTemplate, parameters) {
  var ambigous, e, expression, i, j, k, l, len, len1, len2, len3, len4, m, param, parameter, parsed, ref, ref1, ref2, result, text, toExpand, uriParameter, uriParameters;
  result = {
    errors: [],
    warnings: [],
    uri: null
  };
  try {
    parsed = ut.parse(uriTemplate);
  } catch (error) {
    e = error;
    text = 'Failed to parse URI template';
    result['errors'].push(text);
    return result;
  }
  uriParameters = [];
  ref = parsed['expressions'];
  for (i = 0, len = ref.length; i < len; i++) {
    expression = ref[i];
    ref1 = expression['params'];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      param = ref1[j];
      uriParameters.push(param['name']);
    }
  }
  ref2 = Object.keys(parameters);
  for (k = 0, len2 = ref2.length; k < len2; k++) {
    parameter = ref2[k];
    if (uriParameters.indexOf(parameter) === -1) {
      text = "URI template doesn\'t contain expression for parameter" + " '" + parameter + "'";
      result['warnings'].push(text);
    }
  }
  if (parsed['expressions'].length === 0) {
    result['uri'] = uriTemplate;
  } else {
    ambigous = false;
    for (l = 0, len3 = uriParameters.length; l < len3; l++) {
      uriParameter = uriParameters[l];
      if (Object.keys(parameters).indexOf(uriParameter) === -1) {
        ambigous = true;
        text = "Ambigous URI template. " + "Parameter not defined:" + "'" + uriParameter + "'";
        result['warnings'].push(text);
      }
    }
    if (ambigous === false) {
      toExpand = {};
      for (m = 0, len4 = uriParameters.length; m < len4; m++) {
        uriParameter = uriParameters[m];
        param = parameters[uriParameter];
        if (param['required'] === true) {
          if (param['example'] === void 0) {
            ambigous = true;
            text = "Ambigous URI template. " + "No example value for parameter:" + "'" + uriParameter + "'";
            result['warnings'].push(text);
          } else {
            toExpand[uriParameter] = param['example'];
          }
        } else {
          if (param['example'] !== void 0) {
            toExpand[uriParameter] = param['example'];
          } else if (param['default'] !== void 0) {
            toExpand[uriParameter] = param['default'];
          }
        }
      }
    }
    if (ambigous === false) {
      result['uri'] = parsed.expand(toExpand);
    }
  }
  return result;
};

module.exports = expandUriTemplateWithParameters;
