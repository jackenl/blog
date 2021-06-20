function jsonp({ url, params, callbackName }) {
  const normalizeUrl = () => {
    const arr = [];
    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
    }
    const dataSrc = arr.join('&');
    return url + '?' + dataSrc;
  };
  return new Promise((resolve, reject) => {
    const ele = document.createElement('script');
    ele.src = normalizeUrl();
    document.body.appendChild(ele);
    window[callbackName] = (data) => {
      resolve(data);
      document.removeChild(ele);
    };
  });
}
