class Accordion {

  /**
   * @constructor
   * @summary Constructor for Accordion classs
   * @param {string} ctx The context, (DOM class, or JS hook) for the accordion instance
 */
    constructor(ctx) {
      this.classes = {
       context : `${ctx}`,
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

    /**
   * @method
   * @summary Selecting passed accorion item by adding the corresponding states class
   * @param {Object} item The accordion item
   */
    selecting = (item) => {
      this.closeAll();
      item.classList.add(this.states.itemSelected);
      item.querySelector(`.${this.classes.content}`).classList.add(this.states.contentOpen);
      item.querySelector(`.${this.classes.arrow}`).classList.add(this.states.arrowRotate);
    }


    /**
   * @method
   * @summary Hide all accorion items by removing the corresponding states class
   */
    closeAll = () => {
      this.ctx.querySelector(`.${this.states.itemSelected}`).classList.remove(this.states.itemSelected);
      this.ctx.querySelector(`.${this.states.contentOpen}`).classList.remove(this.states.contentOpen);
      this.ctx.querySelector(`.${this.states.arrowRotate}`).classList.remove(this.states.arrowRotate);
    }


    /**
   * @method
   * @summary Calling the Selecting method and passing the firts accordion item
   */
    showFirst = () => {
      this.selecting(this.items[0]);
    }


    /**
   * @method
   * @summary Calling the Selecting method and passing the choosen accordion item
   */
    showSelected = (selected) => {
      this.selecting(selected);
    }


    /**
   * @method
   * @summary Going through all the accordion items all for each item setting the click event whitch call the showSelected method and pass the choosen item
   */
    setEvent = () => {
      this.items.forEach((item, i) => {
        item.addEventListener('click', () => this.showSelected(item));
      });
    }


    /**
   * @method
   * @summary Setting the properties selectors (represents the querySelectors for the DOM elements from the accordion context)
   * and items (represents the all accordion items from the accordion context);
   * Calling the showFirst and setEvent methods
   */
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
    }
}

const accordion = new Accordion('js-accordion');
accordion.init();

const accordion2 = new Accordion('js-accordion2');
accordion2.init();
