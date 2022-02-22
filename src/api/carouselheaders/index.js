//// api/carouselheaders - API route for fetching carousel header titles

// Import the data from 'assets' folder
import { carouselHeaders } from '../../assets/carouselheaders'


// API handler on request
export default function handler(req, res) {
    res.status(200).json(carouselHeaders);
}
