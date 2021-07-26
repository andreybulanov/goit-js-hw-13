import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '22635337-a2d7cfd18b30a4b0e9b9bd466';

export default function fetchImg() {
    return axios.get(`/?image_type=photo&orientation=horizontal&q=car&page=1&per_page=12&key=${API_KEY}`);
}