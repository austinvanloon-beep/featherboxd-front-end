const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.ebird.org/v2';

const show = async (region, endPoint, observations) => {
    try {
        const res = await fetch(BASE_URL + endPoint + region + observations, {
            headers: { "X-eBirdApiToken": API_KEY }
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data.');
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { show }