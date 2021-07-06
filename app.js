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
  contentOpen: 'accordion__content--open'

},

accordion.selectors = {
  ctx : document.getElementsByClassName(accordion.classes.context),
  item: document.getElementsByClassName(accordion.classes.item),
  arrow : document.getElementsByClassName(accordion.classes.arrow),
  content : document.getElementsByClassName(accordion.classes.content)
};

// DOM selectors
const items = Array.from(accordion.selectors.item);

accordion.hideAll = () => {
  items.forEach((item, i) => {
    if (item.classList.contains(accordion.states.itemSelected)) {
        item.classList.remove(accordion.states.itemSelected);
    }
  });
},

accordion.showFirst = () => {
  accordion.hideAll();
  items[0].classList.add(accordion.states.itemSelected);
},

accordion.setEvent = () => {
  items.forEach((item, i) => {
    item.addEventListener('click', function() {
      accordion.showSelected(this);
    });
  });
}

accordion.showSelected = (selected) => {
  accordion.hideAll();
  selected.classList.add(accordion.states.itemSelected);
  console.log(selected);
},

accordion.init = () => {
  accordion.showFirst();
  accordion.setEvent();
},

accordion.init();
