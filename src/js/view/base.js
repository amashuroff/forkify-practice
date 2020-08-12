// DOM ELEMENTS
export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultsList: document.querySelector('.results__list'),
  resultsDiv: document.querySelector('.results'),
  resultsPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping'),
  shoppingList: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesPanel: document.querySelector('.likes__list'),
  deleteAllItems: document.querySelector('.shopping__delete-all'),
};

export const elementStr = {
  loader: 'loader',
  likeBtnClass: 'recipe__love',
};

// loading spinner
export const renderLoader = (parentEl) => {
  const loader = `
    <div class="${elementStr.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>`;
  parentEl.insertAdjacentHTML('afterbegin', loader);
};

// removing spinner
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStr.loader}`);

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
