class Accordion {

  /**
   * @constructor
   * @summary Constructor for Accordion
   * @param {string} ctx The context, (DOM class, or JS hook) for the accordion instance
 */
    constructor(ctx, servlet) {

      this.servlet = {
        url: `${servlet}`
      }

      this.classes = {
       context : `${ctx}`,
       item: 'js-item',
       content: 'js-content',
       arrow: 'js-arrow'
      }

      this.defaultStates = {
        item: 'accordion__item',
        heading: 'accordion__heading',
        title: 'accordion__title',
        content: 'accordion__content',
        arrow: 'accordion__arrow fas fa-chevron-down'
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
   * @summary Setting HMTL structure, the properties selectors (represents the querySelectors for the DOM elements from the accordion context)
   * and items (represents the all accordion items from the accordion context);
   * Calling the showFirst and setEvent methods
   */
    init = () => {
      this.getData();

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

    /**
   * @method
   * @summary Fetching the json file, calling the method renderHTMLComponent and passing the response to the renderHTMLComponent method
   */
    getData = () => {
      fetch(this.servlet.url)
      .then(response => response.json())
      .then(data => this.renderHTMLComponent(data))
      .catch(error => console.error(error));
    }

    /**
   * @method
   * @summary Going through the data and call the renderItem method for each item
   * @param {Object} data The response from the ajax call
   */
    renderHTMLComponent = (data) => {
      data.forEach((item, i) => {
        this.renderItem(item);
      });
    }

    /**
   * @method
   * @summary Calling the createElement and passing the title and the content
   * @param {Object} item The item from the Object which is passed from the ajax call
   */
    renderItem = (item) => {
      // const accordionItem = `
      // <div class='${this.defaultStates.item} ${this.classes.item}'>
      //   <div class='${this.defaultStates.heading}'>
      //     <h2 class='${this.defaultStates.title}'>${item.title}</h2>
      //     <span class='${this.defaultStates.arrow} ${this.classes.arrow}'</span>
      //   </div>
      //   <div class='${this.defaultStates.content} ${this.classes.content}'>
      //     <p>${item.content}</p>
      //   </div>
      // `;
      console.log(item.title, item.content);

      //TODO method createElement
    }
}

const accordion = new Accordion('js-accordion','http://localhost:25000/accordion');
accordion.init();

const accordion2 = new Accordion('js-accordion2','http://localhost:25000/accordion');
accordion2.init();
