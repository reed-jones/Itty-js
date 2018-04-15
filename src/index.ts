// export const mo = (selector: string | HTMLElement = '', context = document) => {
// the main Itty class
export class Itty {
  // our node array
  nodes: HTMLElement[]
  selector: string
  context: Document

  constructor(selector: string | HTMLElement = '', context = document) {
    this.context = context
    if (typeof selector === 'string') {
      this.selector = selector
      // convert our NodeListOf<Element>
      // to a proper HTMLElement[]
      this.nodes = Array.prototype.slice.call(
        context.querySelectorAll(selector),
      )

      // } else if (Array.isArray(selector)) {
      // this.nodes = [document]

      // check if or selector is actually some sort
      // of HTMLElement
    } else if (/\[object HTML.*Element\]/g.exec(`${selector}`)) {
      this.nodes = [selector]
      this.selector = ''
    } else {
      this.nodes = []
      this.selector = ''
    }
  }

  /**
   * Create new Element. if selector is given and
   * either an ID or a Class, then apply it to the new element
   * @param {String} type html element type, e.g. div, span, ul, li
   */
  n = (type: string): Itty => {
    let el: HTMLElement = document.createElement(type || 'div')
    let m = new Itty(el)
    if (typeof this.selector === 'string') {
      switch (this.selector[0]) {
        case '#':
          m.nodes[0].id = this.selector.substr(1)
          break
        case '.':
          m.addClass(this.selector.substr(1))
          break
      }
    }
    return m
  }

  /**
   * Adds class{es} to each of the selected nodes
   * classes can be specified using the following formats:
   * "classOne"
   * "classOne classTwo"
   * ["classOne", "classTwo"]
   *
   * @param {String|Array} className
   */
  addClass(className: string | string[]): Itty {
    if (typeof className === 'string') {
      // split string on spaces and '.'
      // to get our classlist array
      className = className.split(/\s|\./)
    }
    return this.loop(['classList', 'add'], className)
  }

  /**
   * Removes class{es} from each of the selected nodes
   *
   * @param {String|Array} className
   */
  removeClass(className: string | string[]): Itty {
    if (typeof className === 'string') {
      className = className.split(' ')
    }

    return this.loop(['classList', 'remove'], className)
  }

  /**
   * adds event listeners to each of the selected nodes
   *
   * @param {String} event event to trigger callback
   * @param {Function} action callback function when event is triggered
   */
  on(event: string, action: Function): Itty {
    return this.loop(['addEventListener'], [event, action])
  }

  /**
   * removes event listeners from each of the selected nodes
   *
   * @param {String} event event to trigger callback
   * @param {Function} action callback function when event is triggered
   */
  off(event: string, action: Function, useCapture: boolean = false): Itty {
    return this.loop(['removeEventListener'], [event, action, useCapture])
  }

  /**
   * Adds children to given nodes
   *
   * @param {String|Array} type desired type, or node array
   */
  addChild(type: string | Itty): Itty {
    if (typeof type === 'string') {
      return this.loop(['appendChild'], [this.context.createElement(type)])
    } else if (type instanceof Itty) {
      return this.loop(['appendChild'], [...type.nodes])
    }
    return this
  }

  /**
   * replaces given node with another html element,
   * literal html string, or Itty instance
   *
   * @param {String|Itty} html replaces node with html
   */
  replace(html: string | Itty): Itty {
    if (typeof html === 'string') {
      return this.loop(['outerHTML'], [html])
    } else if (html instanceof Itty) {
      return this.loop(['outerHTML'], [html.nodes[0].outerHTML])
    }
    return this
  }

  /**
   * Set innerHTML of a given Itty instances noes
   *
   * @param {String} html
   */
  html(html: string): Itty {
    return this.loop(['innerHTML'], [html])
  }

  /**
   * Appends html to the end of a given Ittys nodes
   *
   * @param html html to be appended to a given element
   */
  append(html: string): Itty {
    return this.loop(['innerHTML'], [this.nodes[0].innerHTML + html])
  }

  /**
   * Clears the html inside of given Itty instances
   */
  clear(): Itty {
    return this.loop(['innerHTML'], [''])
  }

  /**
   * Returns the first element of the Itty
   */
  first(): HTMLElement {
    return this.nodes[0]
  }

  /**
   * returns the last element of the Itty
   */
  last(): HTMLElement {
    return this.nodes[this.nodes.length - 1]
  }

  /**
   * sets the inner text of a given Itty
   *
   * @param text text to be set
   */
  text(text: string): Itty {
    return this.loop(['innerText'], [text])
  }

  /**
   * Sets styles of a Itty instance
   * styles must be in the js object format
   * e.g. { fontSize: '26px' }
   *
   * @param cssObj css style object
   */
  style(cssObj: any): Itty {
    for (const css of Object.keys(cssObj)) {
      this.loop(['style', css], cssObj[css])
    }
    return this
  }

  /**
   * Itterates through actions to dynamically create objects
   * and apply functions to each of the nodes in this instance
   * e.g. if actions are ['classList', 'remove'] and args are
   *      ['title'] then it will loop through and for each
   *      element in this.nodes it will apply
   *      element.classList.remove('title')
   *
   * @param {Array} actions
   * @param {Array} args
   */
  loop(actions: string[], args: any[]): Itty {
    // apply function to all the nodes
    for (let el of this.nodes) {
      const end = actions.length - 1
      // generate needed object structure
      for (let i = 0; i < end; ++i) {
        el = (<any>el)[actions[i]]
      }

      switch (typeof (<any>el)[actions[end]]) {
        case 'function':
          ;(<any>el)[actions[end]](...args)
          break
        case 'string':
          ;(<any>el)[actions[end]] = args
          break
      }
    }

    // return this to remain chainable
    return this
  }
}

// Setup our new constructor
// return new Itty()
// }
// export default Itty
