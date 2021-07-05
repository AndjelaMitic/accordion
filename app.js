// ``

const accordion = {};

accordion.classes = {
  context : 'js-accordion',
  item: 'js-item',
  heading : 'js-action',
  arrow: 'js-arrow',
  content: 'js-content'
},

accordion.states = {
  itemSelected: 'accordion__item--selected',
  titleSelected: 'accordion__title--selected',
  contentOpen: 'accordion__content--open'

},

accordion.selectors = {
  ctx : document.getElementsByClassName(accordion.classes.context),
  item: document.getElementsByClassName(accordion.classes.item),
  heading : document.getElementsByClassName(accordion.classes.heading),
  arrow : document.getElementsByClassName(accordion.classes.arrow),
  content : document.getElementsByClassName(accordion.classes.content)
};

// DOM selectors
const items = accordion.selectors.item;


accordion.hideAll = () => {
  console.log('Hide all.');
},

accordion.showFirst = () => {
  console.log('Show all.');
  accordion.hideAll();
},
accordion.showSelected = () => {
  console.log('Show selected.');
  accordion.hideAll();
},

accordion.init = () => {
  accordion.showFirst();
  accordion.showSelected();
  console.log('All works.');
},

accordion.init();
