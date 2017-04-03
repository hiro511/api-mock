// Generated by CoffeeScript 1.12.4
var exampleToHttpPayloadPair, inheritHeaders;

inheritHeaders = require('./inherit-headers');

exampleToHttpPayloadPair = function(example, inheritingHeaders) {
  var i, len, ref, request, response, responses, result, selectedRequest, selectedResponse, text;
  if (inheritingHeaders == null) {
    inheritingHeaders = {};
  }
  result = {
    warnings: [],
    errors: [],
    pair: {}
  };
  request = {};
  responses = {};
  if (example['requests'].length > 1) {
    text = "Multiple requests, using first.";
    result['warnings'].push(text);
  }
  if (example['responses'].length === 0) {
    text = "No response available. Can't create HTTP transaction.";
    result['warnings'].push(text);
  } else {
    selectedRequest = example['requests'][0];
    if (example['requests'].length === 0) {
      selectedRequest = {
        body: "",
        headers: {}
      };
    }
    request['body'] = selectedRequest['body'];
    request['headers'] = inheritHeaders(selectedRequest['headers'], inheritingHeaders);
    ref = example['responses'];
    for (i = 0, len = ref.length; i < len; i++) {
      selectedResponse = ref[i];
      response = {};
      response['body'] = selectedResponse['body'];
      response['headers'] = inheritHeaders(selectedResponse['headers'], inheritingHeaders);
      response['status'] = selectedResponse['name'];
      if (selectedResponse['schema'] !== "") {
        response['schema'] = selectedResponse['schema'];
      }
      responses[response['status']] = response;
    }
    result['pair']['request'] = request;
    result['pair']['responses'] = responses;
  }
  return result;
};

module.exports = exampleToHttpPayloadPair;