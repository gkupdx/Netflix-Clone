//// api/tvshows - API route for fetching 'TV shows' data

// Import data from 'assets' folder
import { tvShows } from '../../assets/tvshows'


// API handler on request
export default function handler(req, res) {
    res.status(200).json(tvShows);
}