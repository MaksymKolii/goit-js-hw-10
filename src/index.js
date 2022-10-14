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
    // const markup = renderMarkupOneCountry(ev);
    // refs.countryListInfo.insertAdjacentHTML('beforeend', markup);

    renderOneCountry(ev);
  } else {
    renderCountries(ev);
  }
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function renderMarkupOneCountry(ev) {
  const {
    flags: { svg },
    name: { official },
    capital,
    population,
    languages,
  } = ev[0];

  return `
      <div class = "country-info__wrapper">
      <img  src="${svg}" alt="${official}" width="30" height="30">
      <h2 class = "country-info__title">${official}</h2>
      </div
      <p><span class='country-info-span'>Capital:</span> ${capital}</p>
      <p><span class='country-info-span'>Population:</span> ${population}</p>
      <p><span class='country-info-span'>Languages:</span>${Object.values(
        languages
      ).join(', ')}</p>`;
}

function renderOneCountry(ev) {
  const markup = ev
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => {
        return `
      <div class = "country-info__wrapper">
      <img  src="${svg}" alt="${official}" width="30" height="30">
      <h2 class = "country-info__title">${official}</h2>
      </div
      <p><span class='country-info-span'>Capital:</span> ${capital}</p>
      <p><span class='country-info-span'>Population:</span> ${population}</p>
      <p><span class='country-info-span'>Languages:</span> ${Object.values(
        languages
      ).join(', ')}</p>
`;
      }
    )
    .join('');
  refs.countryListInfo.insertAdjacentHTML('beforeend', markup);
}

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
