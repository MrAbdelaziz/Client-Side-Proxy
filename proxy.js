// Save the original XHR and fetch functions
const originalXHR = window.XMLHttpRequest;
const originalFetch = window.fetch;

// Override the XHR constructor
window.XMLHttpRequest = function() {
  const xhr = new originalXHR();

  // Override the `open` method to intercept requests
  const originalOpen = xhr.open;
  xhr.open = function(method, url) {
    console.log('Intercepted XHR request:', method, url);
    originalOpen.apply(xhr, arguments);
  }

  // Override the `send` method to log the request payload
  const originalSend = xhr.send;
  xhr.send = function(body) {
    console.log('XHR request payload:', body);
    originalSend.apply(xhr, arguments);
  }

  // Override the `onload` method to log and clone the response
  const originalOnload = xhr.onload;
  xhr.onload = function() {
    console.log('XHR response:', JSON.parse(xhr.responseText));
    const clonedResponse = xhr.response.clone();
    originalOnload.call(xhr, clonedResponse);
  }

  return xhr;
}

// Override the fetch function to intercept requests
window.fetch = function(url, options) {
  console.log('Intercepted fetch request:', url, options);
  if (options && options.body) {
    console.log('Fetch request payload:', options.body);
    // Edit the request payload here if needed
  }
  return originalFetch.apply(window, arguments).then(response => {
    console.log('Fetch response:', response);
    const clonedResponse = response.clone();
    return clonedResponse.text().then(body => {
      console.log('Fetch response body:', body);
      return response;
    });
  });
}
