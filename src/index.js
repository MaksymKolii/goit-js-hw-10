import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

// console.log(fetchCountries('Peru'));

let searchCountry = '';

const refs = {
  input: document.querySelector('input#search-box'),
  countryListContainer: document.querySelector('.country-list'),
  countryListInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();
  cleanCountries();
  searchCountry = e.target.value.trim();

  if (searchCountry === '') return;
  fetchCountries(searchCountry).then(ev => {
    console.log(ev.length);

   
    if (ev.length>10){
        
        Notify.info('Too many matches found. Please enter a more specific name.')
        return;
    }
    if (ev.length === 1) {
        renderOneCountry(ev);
      }

    else{renderCountries(ev)}
   

  })
  .catch(() =>{
    Notify.failure('Oops, there is no country with that name')
  })
}

function renderOneCountry(ev) {
  const markup = ev
    .map(({ flags, name, capital, population, languages }) => {
      return `
      <img  src="${flags.svg}" alt="${name.official}" width="30" height="30">
      <h2 class = "official">${name.official}</h2>
      <div class = "discription">
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population}</p>
      <p><span>Languages:</span> ${Object.values(languages).join(', ')}</p>
      </div
`;
    })
    .join('');
    const languagesList = languages.map(language => language.name).join(', ');

  refs.countryListInfo.insertAdjacentHTML('beforeend', markup);
}

 function renderCountries(ev) {
    const markup = ev
    .map(({ flags, name, }) => {
      return `

      <li>
      <img  src="${flags.svg}" alt="${name.official}" width="30" height="30">
      <h2 class="country-list__title">${name.official}</h2>
      </li>

`;
    })
    .join('');
  refs.countryListInfo.insertAdjacentHTML('beforeend', markup);
}


function cleanCountries() {
  refs.countryListContainer.innerHTML = '';
  refs.countryListInfo.innerHTML = '';
}
