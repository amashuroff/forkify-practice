// SEARCH MODEL
// using Http request library
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;

    }
    async getResults() {
        try {
            // fetch data from the server
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
        
    }
}



