export function getRefs() {
  const refs = {
    input: document.querySelector('input#search-box'),
    countryListContainer: document.querySelector('.country-list'),
    countryListInfo: document.querySelector('.country-info'),
  };

  return refs;
}
