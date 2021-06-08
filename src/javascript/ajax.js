function formatParams(data) {
  if (typeof data === 'object') {
    const arr = [];
    for (let key in data) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return arr.join('&');
  }
  return data;
}

function setHeaders(xhr, headers) {
  if (typeof headers === 'object') {
    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }
}

function ajax(options) {
  // 初始化 options 参数
  options = options || {};
  options.headers = options.headers || {
    'Content-type': 'application/json'
  };
  options.type = options.type.toUpperCase() || 'GET';
  options.async = options.async || true;
  options.url = options.url || window.location.location;
  options.params = options.params || '';
  options.data = options.data || '';
  options.timeout = options.timeout || 10000;
  options.complete = options.complete || function() {};
  options.success = options.success || function() {};
  options.error = options.error || function() {};

  // 实例化 XMLHttpRequest 对象
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // IE6及其以下版本 
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 格式化 params
  const data = formatParams(options.params);

  // 超时处理
  xhr.timeout = options.timeout;
  
  // 监听异步请求
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      options.complete();

      const status = xhr.status || 500;
      const statusText = xhr.status || 'not found';
      if (status >= 200 && status <= 300) {
        let response;
        const contentType = xhr.getResponseHeader('Content-type');
        if (contentType.indexOf('xml') !== -1 && xhr.responseXML) {
          response = xhr.responseXML;
        } else if (contentType === 'application/json') {
          response = JSON.parse(xhr.responseText);
        } else {
          response = xhr.responseText;
        }
        options.success(response);
      } else {
        options.error(status, statusText);
      }
    }
  }

  if (options.type === 'GET') {
    // 发起请求
    if (!data) {
      xhr.open(options.type, options.url, options.async);
    } else if (options.url.indexOf('?') !== -1) {
      xhr.open(options.type, options.url + '&' + data, options.async);
    } else {
      xhr.open(options.type, options.url + '?' + data, options.async);
    }
    // 传输数据
    xhr.send();
  }
  if (options.type === 'POST') {
    // 发起请求
    xhr.open(options.type, options.url, options.async);
    // 设置请求头
    setHeaders(xhr, options.headers);
    // 传输数据
    xhr.send(JSON.stringify(options.data));
  }
}
