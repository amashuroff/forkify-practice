import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id        // later use for AJAX calls
    }
    async getRecipe() {
        try {
            const rec = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = rec.data.recipe.title;
            this.author = rec.data.recipe.publisher;
            this.image = rec.data.recipe.image_url;
            this.ingredients = rec.data.recipe.ingredients;
            this.url = rec.data.recipe.source_url;
            
        } catch(error) {
            alert('Something went very wrong ;(')
            console.log(error);
        }
    }   

    calcCookingTime() {
        // Assuming we need 15 min per 3 ingredients
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients/3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const units = [...unitsShort, 'kg', 'g']
    

        const newIngredients = this.ingredients.map(el => {
            // 1. make units uniform
            let ingredient = el.toLowerCase().trim();

            unitsLong.forEach((unit, i) => {
                // check for all occurences of unitsLong names in an ingredient string and replace them with unitsShort names
                ingredient = ingredient.replace(unit, units[i]);
            })

            //2. remove (content inside parenth + parenth itself)
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //3. parse ingredients into count, unit, ingredient
            const ingArr = ingredient.split(' ');
            // find index of the element, if it is also in units array
            const unitIndex = ingArr.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // there is a unit

                // 2 cases: 1 num (4 cups) and 2 nums (4 1/2 cups)
                const arrCount = ingArr.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-', '+'));  // taking into account case (1-1/2 cups)
                } else if (arrCount.length > 1) {
                    count = eval(arrCount.join('+'))  // eval('4 + 1/2') --> 4.5
                }

                objIng = {
                    count,
                    unit: ingArr[unitIndex],
                    ingredient: ingArr.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(unitIndex[0], 10)) {
                // there is no unit, but a number
                objIng = {
                    count: parseInt(ingArr[0], 10),
                    unit: '',
                    ingredient: ingArr.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // there is no unit and no number in the 1st position
                objIng = {
                    count: '',
                    unit: '',
                    ingredient
                }
            }

            return objIng;


        });
        this.ingredients = newIngredients;
    }
    
    updateServings(type) {
        // Servings 
        const newServings = type === 'dec'? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(i => {
            // if count 1 and this.servings === 4, this.servings + 1, new count = 5/4 * count
            i.count *= (newServings / this.servings)
        })
        this.servings = newServings;
    }

}   