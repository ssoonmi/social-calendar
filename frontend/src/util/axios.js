function axios({ method, url, data, success, error }) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.onload = function () {
      const response = JSON.parse(request.response);

      if (this.status >= 200 && this.status < 300) {
        if (success) success(response);
        resolve(response);
      } else {
        if (error) error(response);
        reject({
          response: {
            data: response,
            status: this.status,
            statusText: request.statusText,
          }
        });
      }
    }; // same as: request.addEventListener("load", receiveLCSData);

    request.open(method, url);

    // var token = document.querySelector('meta[name="csrf-token"]').content;
    // request.setRequestHeader('X-CSRF-Token', token);

    if (axios.headers.Authentication) {
      request.setRequestHeader('Authentication', axios.headers.Authentication);
    }

    if (data instanceof FormData) {
      request.send(data);
    } else {
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
    }
  });
}

axios.post = function(url, data, success, error) {
  return axios({ 
    method: "POST", 
    url, 
    data,
    success,
    error
  });
};

axios.patch = function(url, data, success, error) {
  return axios({ 
    method: "PATCH", 
    url, 
    data,
    success,
    error
  });
};

axios.get = function(url, data, success, error) {
  return axios({ 
    method: "GET", 
    url, 
    data,
    success,
    error
  });
};

axios.delete = function(url, data, success, error) {
  return axios({ 
    method: "DELETE", 
    url, 
    data,
    success,
    error
  });
};

export const setAuthToken = token => {
  if (token) {
    axios.headers.Authorization = token;
  } else {
    delete axios.headers.Authorization;
  }
};

axios.headers = {};

export default axios;