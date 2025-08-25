const API_KEY = '8blrbs0j67mn';
const BASE_URL = 'https://api.ebird.org/v2/data/obs/';
const END_POINT = '/recent/notable'

const show = async (region) => {
    try {
        const res = await fetch(BASE_URL + region + END_POINT, {
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