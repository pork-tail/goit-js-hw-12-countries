import './sass/main.scss';
import { fetchByName } from './js/fetchCountries';
import countriesElem from './handlebars/countriesList.hbs';
import countriesList from './handlebars/countryDescr.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

const containerRef = document.querySelector('.country-list');
const inputRef = document.querySelector('.search');

inputRef.addEventListener('input', debounce(inputSearch, 500));

function inputSearch(event) {
  const formRef = event.target.value;
  const inputValue = formRef.toLowerCase().trim();
  containerRef.innerHTML = '';

  if (!inputValue) {
    return;
  }

  console.log(inputValue);

  fetchByName(formRef)
    .then(user => renderCountriesCard(user))
    .catch(error => alertError(error));
}
function alertError(error) {
  alert({
    text: error,
  });
}

const renderCountriesCard = countries => {
  if (countries.length > 1 && countries.length <= 10) {
    let countriesElems = countriesElem(countries);
    containerRef.innerHTML = countriesElems;
  }

  if (countries.length === 1) {
    let countriesElems = countriesList(countries);
    containerRef.innerHTML = countriesElems;
  }

  if (countries.length > 10) {
    alert({
      text: 'Cлишком длинный список стран',
    });
  }
};
