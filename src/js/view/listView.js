import { elements } from './base';

export const renderItems = (item) => {
  const markup = `
    <li class="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count__value" min="0">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li> `;
  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};

export const deleteAllItems = () => {
  elements.shoppingList.innerHTML = '';
};

export const renderDeleteAllBtn = (type) => {
  // eslint-disable-next-line no-unused-expressions
  type === 'render' ? elements.deleteAllItems.style.display = 'block' : elements.deleteAllItems.style.display = 'none';
};
