/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
// SEARCH VIEW
import { elements } from './base';

// ADD and RENDER RESULTS + PAGE BUTTONS

// highlight selected results
export const highlighSelected = (id) => {
  // clear all previous selected
  document.querySelectorAll('.results__link').forEach((el) => el.classList.remove('results__link--active'));

  // highlight
  document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

// get value from the search input
export const getInput = () => elements.searchInput.value;

// render each el of the recipes array
const renderRecipe = (recipe) => {
  const markup = `
        <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${reduceTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
  elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

// implementing pagination - create buttons
const createBtn = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
    </button>
`;

// implementing pagination
const renderButton = (page, recPerPage, numOfRecipes) => {
  const numOfPages = Math.ceil(numOfRecipes / recPerPage);
  let button;

  if (page === 1 && numOfPages > 1) {
    // display only 'next page' btn
    button = createBtn(page, 'next');
  } else if (page === numOfPages && numOfPages > 1) {
    // display only 'previous page' btn
    button = createBtn(page, 'prev');
  } else if (page < numOfPages) {
    // display multiple btns
    button = `
        ${createBtn(page, 'next')}
        ${createBtn(page, 'prev')}
        `;
  }
  elements.resultsPages.insertAdjacentHTML('afterbegin', button);
};

// render results from the API call
export const renderResults = (recipes, page = 1, recPerPage = 10) => {
  // slice recipes array to display recPerPage num of recipes per page
  const start = (page - 1) * recPerPage;
  const end = page * recPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // implement pagination - render buttons
  renderButton(page, recPerPage, recipes.length);
};

// CLEAR RESULTS

// clear search input
export const clearSearchInput = () => elements.searchForm.reset();

// clear previous results
export const clearPreviousResults = () => elements.searchResultsList.innerHTML = '';

export const clearBtns = () => elements.resultsPages.innerHTML = '';

// reduce title length
export const reduceTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      return acc + curr.length;
    }, 0);

    return `${newTitle.join(' ')} ...`;
  }
  return title;
};
