import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '22635337-a2d7cfd18b30a4b0e9b9bd466';

export default {
    searchQuery: '',
    page: 1,
    
    fetchImg() {
        return axios.get(`/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`,)
            .then(({ data }) => {
                this.incrementPage();
                return data.hits;
            })
            .catch(error => console.log(error));
    },

    incrementPage() {
        this.page += 1;
    },

    resetPage() {
        this.page = 1;
    },

    get query() {
        return this.searchQuery;
    },

    set query(value) {
        this.searchQuery = value;
    },
};


