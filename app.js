// ``
class Accordion {

    constructor(param) {
      this.classes = {
       context : `${param}`,
       item: 'js-item',
       content: 'js-content',
       arrow: 'js-arrow'

      }
      this.states = {
       itemSelected: 'accordion__item--selected',
       contentOpen: 'accordion__content--open',
       arrowRotate: 'accordion__arrow--rotate'
      }
      this.ctx = document.querySelector(`.${this.classes.context}`);
    }

    selecting = (item) => {
      this.closeAll();
      item.classList.add(this.states.itemSelected);
      item.querySelector(`.${this.classes.content}`).classList.add(this.states.contentOpen);
      item.querySelector(`.${this.classes.arrow}`).classList.add(this.states.arrowRotate);
    }

    closeAll = () => {
      this.ctx.querySelector(`.${this.states.itemSelected}`).classList.remove(this.states.itemSelected);
      this.ctx.querySelector(`.${this.states.contentOpen}`).classList.remove(this.states.contentOpen);
      this.ctx.querySelector(`.${this.states.arrowRotate}`).classList.remove(this.states.arrowRotate);
    }

    showFirst = () => {
      this.selecting(this.items[0]);
    }

    showSelected = (selected) => {
      this.selecting(selected);
    }

    setEvent = () => {
      const obj = this;
      this.items.forEach((item, i) => {
        item.addEventListener('click', function() {
          obj.showSelected(item);
        });
      });
    }

    init = () => {
      this.selectors = {
        item: this.ctx.querySelectorAll(`.${this.classes.item}`),
        content : this.ctx.querySelectorAll(`.${this.classes.content}`),
        arrow : this.ctx.querySelectorAll(`.${this.classes.arrow}`)
      }
      // DOM selectors
      this.items = this.selectors.item;

      this.showFirst();
      this.setEvent();
      console.log(this);
    }
}

const accordion = new Accordion('js-accordion');
accordion.init();

const accordion2 = new Accordion('js-accordion2');
accordion2.init();
