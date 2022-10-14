
const FILTER_ITEMS = 'fields=name,capital,population,flags,languages';
const URL = 'https://restcountries.com/v3.1';

export  class FetchAPICountries {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    return fetch(`${URL}/name/${this.name}?${FILTER_ITEMS}`).then(response => {
      // if (!response.ok) {
      //   throw new Error(response.status);
      // }
      if (response.status === 404) return Promise.resolve();
      return response.json();
    });
  }

  get country() {
    return this.name;
  }

  set country(newEl) {
    this.name = newEl;
  }
}
