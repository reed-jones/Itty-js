# itty-js

> itty-js aims to be an easy to use, extensibile dom traversal library

Below is the current api, however being a young project certain actions
are likely to change in future revisions.

---
Installing:
```js
yarn add 'itty-js'
```

---
Importing:
```js
import { itty as i } from 'itty-js'
```

---
Usage:
```js
i('#myIdentifier').addClass('secondClass')
```

---


Action | Arguments | Example
------------ | ------------- | -------------
constructor | selector, context (optional) | `i('.myClass', document)`
n | type | `i('.myClass').n('div')` outputs: `<div class='myClass'></div>`
addClass | className | `i('.myClass').addClass('classTwo')` multiple classes can be passed as and array ['one','two'], or a space/period seperated string "one two.three"
removeClass | className | `i('.myClass').removeClass('classTwo')`
on | event, action | `i('.myClass').on('click', () => console.log('click')` or `i('.myClass').on('click', myFunction)`
off | event, action, useCapture (optional) | `i('.myClass').off('click', myFunction)`
addChild | type | `i('.myClass').addChild('span')` or `i('.myClass').addChild( $('.title').n('h1') )`
replace | html | `i('.myClass').replace('<span></span>')` or `i('.myClass').replace( $('.title').n('h1') )`
html | html | `i('.myClass').html('<span>Hello</span>')` or `i('.myClass').html('Hello, World!')`
text | text | `i('.myClass').text('Hello, World!')`
clear |  | `i('.myClass').clear()`
first |  | `i('.myListItems').first()`
last |  | `i('.myListItems').last()`
style | cssObject | `i('.myClass').style({ fontSize: '28px', background: '#eee', margin: '5px' })`

Internally most of the classes rely on the `loop` method which accepts two arrays
and itterates over all of the selected itty nodes. for example the style action mentioned above
itterates through the nodes and sets node.style[objectKey] = objectValue. 
```js
style(cssObj) {
  for (const css of Object.keys(cssObj)) {
    this.loop(['style', css], cssObj[css])
  }
  return this
}
```
