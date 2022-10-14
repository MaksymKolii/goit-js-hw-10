import './css/styles.css';
import { FetchAPICountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './references';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();
const fetchAPICountries = new FetchAPICountries();

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  e.preventDefault();
  cleanCountries();
  fetchAPICountries.country = e.target.value.trim();

  if (fetchAPICountries.country === '') return;
  fetchAPICountries.fetchCountries().then(renderForAll).catch(onError);
}

function renderForAll(ev) {
  if (ev.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (ev.length === 1) {
    //  renderOneCountry(ev);
    // refs.countryListInfo.insertAdjacentHTML('beforeend', renderOneCountry(ev));
     renderOneCard(ev);
  } else {
    renderCountries(ev);
   
  }
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function renderOneCountry(ev) {
  const {
    flags: { svg },
    name,
    capital,
    population,
    languages,
  } = ev[0];
  return `
      <div class = "country-info__wrapper">
      <img  src="${svg}" alt="${name}" width="30" height="30">
      <h2 class = "country-info__title">${name}</h2>
      </div
      <p><span class='country-info-span'>Capital:</span> ${capital}</p>
      <p><span class='country-info-span'>Population:</span> ${population}</p>
      <p><span class='country-info-span'>Languages:</span> ${Object.values(
        languages
      ).join(', ')}</p>`;
}

function renderOneCard(array) {
  const {
    flags: { svg },
    name,
    capital,
    population,
    languages,
  } = array[0];
  const languagesList = languages.map(language => language.name).join(', ');
  const markup = `<div class="country__wrap">
  <img alt="${name} flag" width=30 src="${svg}"/>
  <h2 class="country__name">${name}</h2>
  </div><ul class="country__list">
    <li><span class="country__property">Capital:</span> ${capital}
    </li><li><span class="country__property">Population:</span> ${population}</li>
    <li><span class="country__property">Languages:</span> ${languagesList}</li></ul>`;
    refs.countryListInfo.insertAdjacentHTML('beforeend', markup);
}

// function renderOneCountry(ev) {
//   const markup = ev
//     .map(({ flags, name, capital, population, languages }) => {
//       return `
//       <div class = "country-info__wrapper">
//       <img  src="${flags.svg}" alt="${name.official}" width="30" height="30">
//       <h2 class = "country-info__title">${name.official}</h2>
//       </div
//       <p><span class='country-info-span'>Capital:</span> ${capital}</p>
//       <p><span class='country-info-span'>Population:</span> ${population}</p>
//       <p><span class='country-info-span'>Languages:</span> ${Object.values(languages).join(', ')}</p>

// `;
//     })
//     .join('');

//     console.log(markup);

//   refs.countryListInfo.insertAdjacentHTML('beforeend', markup);
// }

function renderCountries(ev) {
  const markup = ev
    .map(({ flags, name }) => {
      return `

      <li class='country-list__item'>
      <img  src="${flags.svg}" alt="${name.official}" width="30" height="30">
      <h2 class="country-list__title">${name.official}</h2>
      </li>

`;
    })
    .join('');
  refs.countryListContainer.insertAdjacentHTML('beforeend', markup);
}

function cleanCountries() {
  refs.countryListContainer.innerHTML = '';
  refs.countryListInfo.innerHTML = '';
}
