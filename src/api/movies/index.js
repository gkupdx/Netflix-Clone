//// api/movies - API route for fetching movies data

// Import data from 'assets' folder'
import { movies } from '../../assets/movies';


// API handler on request
export default function handler(req, res) {
    res.status(200).json(movies);
}