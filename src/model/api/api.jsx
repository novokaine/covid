const baseUrl = 'https://covid-api.com/api/';

export const api = {
  get(url) {
    const apiUrl = `${baseUrl}${url}`;

    const promise = fetch(apiUrl, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

    return promise.then((response) => {
      if (response.status !== 204) {
        return response.json();
      }
      return null;
    });
  },

  post(url, data) {
    const apiUrl = `${baseUrl}${url}`;

    return fetch(apiUrl, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};
