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
  
  // Override the `onload` method to log responses
  const originalOnload = xhr.onload;
  xhr.onload = function() {
    console.log('XHR response:', JSON.parse(xhr.responseText));
    originalOnload.apply(xhr, arguments);
  }
  
  return xhr;
}

// Override the fetch function to intercept requests
window.fetch = function(url, options) {
  console.log('Intercepted fetch request:', url, options);
  return originalFetch.apply(window, arguments).then(response => {

    console.log('Fetch response:', response);
    return response;

  });
}
