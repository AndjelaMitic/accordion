// ``

const accordion = {};

accordion.classes = {
  context : 'js-accordion',
  item: 'js-item',
  arrow: 'js-arrow',
  content: 'js-content'
},

accordion.states = {
  itemSelected: 'accordion__item--selected',
  contentOpen: 'accordion__content--open',
  arrowUp: 'fa-chevron-up',
  arrowDown: 'fa-chevron-down'

},

accordion.selectors = {
  ctx : document.querySelector(`.${accordion.classes.context}`),
  item: document.querySelectorAll(`.${accordion.classes.item}`),
  arrow : document.querySelectorAll(`.${accordion.classes.arrow}`),
  content : document.querySelectorAll(`.${accordion.classes.content}`)
};

// DOM selectors
const items = accordion.selectors.item;

accordion.deselecting = (item) => {
  item.classList.remove(accordion.states.itemSelected);
  item.querySelector(`.${accordion.classes.content}`).classList.remove(accordion.states.contentOpen);
  item.querySelector(`.${accordion.classes.arrow}`).classList.remove(accordion.states.arrowUp);
  item.querySelector(`.${accordion.classes.arrow}`).classList.add(accordion.states.arrowDown);
},

accordion.selecting = (item) => {
  accordion.closeAll();
  item.classList.add(accordion.states.itemSelected);
  item.querySelector(`.${accordion.classes.content}`).classList.add(accordion.states.contentOpen);
  item.querySelector(`.${accordion.classes.arrow}`).classList.remove(accordion.states.arrowDown);
  item.querySelector(`.${accordion.classes.arrow}`).classList.add(accordion.states.arrowUp);
},

accordion.closeAll = () => {
    items.forEach((item, i) => {
    if (item.classList.contains(accordion.states.itemSelected) || item.querySelector(`.${accordion.classes.content}`).classList.contains(accordion.states.contentOpen)) {
      accordion.deselecting(item);
    }
  });
},

accordion.showFirst = () => {
  accordion.selecting(items[0]);
},

accordion.showSelected = (selected) => {
  accordion.selecting(selected);
},

accordion.setEvent = () => {
  items.forEach((item, i) => {
    item.addEventListener('click', function() {
      accordion.showSelected(this);
    });
  });
},

accordion.init = () => {
  accordion.showFirst();
  accordion.setEvent();
};

accordion.init();
