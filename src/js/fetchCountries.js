const BASE_URL = 'https://restcountries.eu/rest/v2';

const fetchData = (request = '/') =>
  fetch(BASE_URL + request).then(response => response.json());

const fetchByName = name =>
  fetch(`${BASE_URL}/name/${name}`).then(response => {
    if (response.status === 404) {
      throw new Error(`Error, ${name} does not exist`);
    }
    return response.json();
  });

export { fetchData, fetchByName };
