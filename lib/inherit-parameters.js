// Generated by CoffeeScript 1.12.4
var inheritParameters;

inheritParameters = function(actualParameters, inheritingParameters) {
  var name, params;
  for (name in inheritingParameters) {
    params = inheritingParameters[name];
    if (actualParameters[name] === void 0) {
      actualParameters[name] = params;
    }
  }
  return actualParameters;
};

module.exports = inheritParameters;