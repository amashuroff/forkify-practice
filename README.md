## forkify app.

See: https://amashuroff.github.io/forkify-practice/dist/index.html
___

###  Updates / Homework:

* Implemented a function to delete all items from the shopping list
* Improved error handling
* Save list of ingredients in local storage
___

### Functionality and the flow:
* On search connects to the API and fetches the data (recipes)
* Adds formatted recipes to the results panel (implemented pagination)
* On click adds recipe to the main window (change in servings changes the overall quantity of ingredients)
* Adding to the shopping list creates a new list of ingredients (where each ingredient quantity can be manually changed)
* Liking the recipe adds it to the local storage (displays liked recipes on hover, see appeared heart in the top-left corner of search panel)
___

###  What i have learned:

* How to implement MVC app architecture

### MVC arhitecture:
![alt text](https://github.com/amashuroff/forkify-practice/blob/master/architecture.png "MVC architecture")

* How to set up Webpack:
  - use bundling + HtmlWebpackPlugin
  - use devServer
  - connect babel module
___

### Technologies:
* Javascript
* Webpack
* Babel
