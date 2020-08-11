// GLOBAL APP CONTROLLER
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likesView from './view/likesView';

/** GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipe
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. get the query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. create a new search object if there is a query and add it to the state
    state.search = new Search(query);

    try {
      // 3. prepare UI for new input
      searchView.clearSearchInput();
      searchView.clearPreviousResults();
      searchView.clearBtns();
      renderLoader(elements.resultsDiv);

      // 4. Search for recipes
      await state.search.getResults();
      clearLoader();

      // 5. render results on UI
      searchView.renderResults(state.search.result);
    } catch (error) {
      clearLoader();
      searchView.clearBtns();
    }
  }
};

// search for recipes
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

// pagination
elements.resultsPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10); // get custom data

    // clear previous result and buttons
    searchView.clearPreviousResults();
    searchView.clearBtns();

    // render new page
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // prepare UI
    recipeView.clearIngredients();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) {
      searchView.highlighSelected(id);
    }

    // create the new Recipe object in the state
    state.recipe = new Recipe(id);

    try {
      // get Recipe data from the server
      await state.recipe.getRecipe();

      // calcCookingTime and calcServings
      state.recipe.calcCookingTime();
      state.recipe.calcServings();

      // parse ingredients
      state.recipe.parseIngredients();

      // render Recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      clearLoader();
    }
  }
};

// LIST CONTROLLER

const controlList = () => {
  // create a list if there is no one
  if (!state.list) state.list = new List();

  // add each ingredient to the list and render it
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);

    listView.renderItems(item);
  });
};

// LIKES CONTROLLER

const controlLikes = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // if want to like
  if (!state.likes.isLiked(currentID)) {
    // add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image,
    );

    // change btn style
    likesView.toggleLikeBtn(true);

    // add like to the UI list
    likesView.renderLike(newLike);
    searchView.reduceTitle(newLike.title);

    // if want to unlike
  } else {
    // remove like from state
    state.likes.removeLike(currentID);

    // change btn style
    likesView.toggleLikeBtn(false);

    // remove like from the UI
    likesView.removeLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// restore liked recipes on page load
window.addEventListener('load', () => {
  // create a new like object
  // read local storage
  state.likes = new Likes();
  state.likes.readStorage();

  // toggle likes btn if there are any liked items in ls
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // render likes in the likes field ul
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// handling recipe render on load and hashchange
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

// handling recipe button click
elements.recipe.addEventListener('click', (el) => {
  // if matches btn or any btn children
  if (el.target.matches('.btn-decrease, .btn-decrease *')) {
    // decrease servings size
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (el.target.matches('.btn-increase, .btn-increase *')) {
    // increase servings size
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (el.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // add data to shopping list
    controlList();
  } else if (el.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLikes();
  }
});

// handling delete and update of  shopping list items
elements.shoppingList.addEventListener('click', (el) => {
  const id = el.target.closest('.shopping__item').dataset.itemid;

  // handle the delete btn
  if (el.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from the state
    state.list.deleteItem(id);
    // delete from the UI
    listView.deleteItem(id);

    // handle the count update
  } else if (el.target.matches('.shopping__count__value')) {
    const val = parseFloat(el.target.value);
    state.list.updateCount(id, val);
  }
});
