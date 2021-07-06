// ``
class Accordion {
    constructor(param) {
      this.classes = {
       context : `${param}`,
       item: 'js-item',
       arrow: 'js-arrow',
       content: 'js-content'
     }

     this.states = {
       itemSelected: 'accordion__item--selected',
       contentOpen: 'accordion__content--open',
       arrowUp: 'fa-chevron-up',
       arrowDown: 'fa-chevron-down'
     }

     this.ctx = document.querySelector(`.${this.classes.context}`);

     this.selectors = {
       item: this.ctx.querySelectorAll(`.${this.classes.item}`),
       arrow : this.ctx.querySelectorAll(`.${this.classes.arrow}`),
       content : this.ctx.querySelectorAll(`.${this.classes.content}`)
     }

     // DOM selectors
     this.items = this.selectors.item;
    }


    deselecting = (item) => {
      item.classList.remove(this.states.itemSelected);
      item.querySelector(`.${this.classes.content}`).classList.remove(this.states.contentOpen);
      item.querySelector(`.${this.classes.arrow}`).classList.remove(this.states.arrowUp);
      item.querySelector(`.${this.classes.arrow}`).classList.add(this.states.arrowDown);
    }

    selecting = (item) => {
      this.closeAll();
      item.classList.add(this.states.itemSelected);
      item.querySelector(`.${this.classes.content}`).classList.add(this.states.contentOpen);
      item.querySelector(`.${this.classes.arrow}`).classList.remove(this.states.arrowDown);
      item.querySelector(`.${this.classes.arrow}`).classList.add(this.states.arrowUp);
    }

    closeAll = () => {
        this.items.forEach((item, i) => {
        if (item.classList.contains(this.states.itemSelected) || item.querySelector(`.${this.classes.content}`).classList.contains(this.states.contentOpen)) {
          this.deselecting(item);
        }
      });
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
      this.showFirst();
      this.setEvent();
    }
}

const accordion = new Accordion('js-accordion');
accordion.init();

const accordion2 = new Accordion('js-accordion2');
accordion2.init();
