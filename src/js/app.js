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
       container: 'container',
       item: 'js-item',
       content: 'js-content',
       arrow: 'js-arrow'
      }

      this.defaultStates = {
        item: 'accordion__item',
        heading: 'accordion__heading',
        title: 'accordion__title',
        content: 'accordion__content',
        arrow: 'accordion__arrow'
      }

      this.states = {
       itemSelected: 'accordion__item--selected',
       contentOpen: 'accordion__content--open',
       arrowRotate: 'accordion__arrow--rotate'
      }

      this.ctx = document.querySelector(`.${this.classes.context}`);
      this.container = document.querySelector(`.${this.classes.context} .${this.classes.container}`);
    }


    /**
    * @method
    * @summary Initializes the HTML structure by calling the getData method
    */
     init = () => {
       this.getData();
     }


    /**
    * @method
    * @summary Fetching the json file, calling the method renderHTMLComponent and passing the response to the renderHTMLComponent method
    */
     getData = () => {
       fetch(this.servlet.url)
       .then(response => response.json())
       .then(data => {
         console.log(data);
         this.renderHTMLComponent(data)
       })
       .then(() => this.start())
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

        const accordionItem = this.createElement('div',[this.defaultStates.item, this.classes.item]);
        this.container.append(accordionItem);

        const accordionHeading = this.createElement('div',[this.defaultStates.heading]);
        const content = this.createElement('div',[this.defaultStates.content, this.classes.content]);
        accordionItem.append(accordionHeading,content);

        const title = this.createElement('h2',[this.defaultStates.title], item.title);
        const arrow = this.createElement('span',[this.defaultStates.arrow, this.classes.arrow]);
        accordionHeading.append(title,arrow);

        const contentText = this.createElement('p',[], item.content);
        content.append(contentText);

      }


     /**
     * @method
     * @summary Create an HMTL element by passed value, setting classes for the created element and setting value if exists
     * @param {string} el The HTML tag (examples: div,h1,p, span...)
     * @param {Object} classes The array od class names for the created element
     * @param {string} value The value for the created element
     * @returns {Object} element The created element
     */
      createElement = (el, classes, value ) => {

        const element = document.createElement(el);

        classes.forEach((item, i) => {
          element.classList.add(item);
        });

        if (value) element.innerHTML = value;
        return element;

      }


      /**
      * @method
      * @summary Starting the app. Setting the properties selectors ( selectors represent the querySelectors for the DOM elements from the accordion context)
      * and items (items represents the all accordion items from the accordion context);
      * Calling the showFirst and setEvent methods
      */
      start = () => {
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
     * @summary Calling the Selecting method and passing the firts accordion item
     */
      showFirst = () => {
        this.selecting(this.items[0]);
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
        if (this.ctx.querySelector(`.${this.states.itemSelected}`)) {
          this.ctx.querySelector(`.${this.states.itemSelected}`).classList.remove(this.states.itemSelected);
          this.ctx.querySelector(`.${this.states.contentOpen}`).classList.remove(this.states.contentOpen);
          this.ctx.querySelector(`.${this.states.arrowRotate}`).classList.remove(this.states.arrowRotate);
        }

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
     * @summary Calling the Selecting method and passing the choosen accordion item
     */
      showSelected = (selected) => {
        this.selecting(selected);
      }

}

const accordion = new Accordion('js-accordion','http://localhost:25000/accordion');
accordion.init();

const accordion2 = new Accordion('js-accordion2','http://localhost:25000/accordion');
accordion2.init();
