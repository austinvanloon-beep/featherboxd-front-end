const API_KEY = import.meta.env.VITE_MAPS_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

// Returns coordinate value of user-inputted location for use in Maps API
const convertLocation = async (location) => {
    try {
        const keyQuery = `&key=${API_KEY}`
        const res = await fetch(BASE_URL + location + keyQuery);

        const data = await res.json();

        if (data.results.length > 0) {
            return data.results[0].geometry.location;
        } else {
            throw new Error("No data found for this location.")
        }
    } catch (error) {
        console.log(error);
    }
};

export { convertLocation }