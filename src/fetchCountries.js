
export {fetchCountries}


const FILTER_ITEMS = 'fields=name,capital,population,flags,languages';
const URL = 'https://restcountries.com/v3.1'

function fetchCountries(name){

    return fetch(`${URL}/name/${name}?${FILTER_ITEMS}`
    ).then(
        (response) => {
          if (response.status === 404) {
            return Promise.reject()
          }
          return response.json();
        }
      );
}

