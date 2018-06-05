/* global document */

import ext from '../utils/ext';

function onRequest(request) {
  if (request.action === 'change-color') {
    document.body.style.background = request.data.color;
  }
}

ext.runtime.onMessage.addListener(onRequest);
