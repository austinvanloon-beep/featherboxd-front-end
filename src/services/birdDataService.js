const API_KEY = import.meta.env.VITE_API_KEY;
const NUTHATCH_API_KEY = import.meta.env.NUTHATCH_API_KEY;

const showFacts = async (prompt) => {
    try {
        const res = await fetch('https://api.jsongpt.com/json?prompt=' + prompt, {
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

const showInfo = async (bird) => {
    try {
        const query = `?name=${bird}&pageSize=100`;
        const res = await fetch('https://nuthatch.lastelm.software/v2/birds' + query, {
            headers: { 'API-Key': '0db08164-1e13-47bf-b340-f1a6fd272905' }
        });
        if (!res.ok) {
            throw new Error("Failed to fetch data.");
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { showFacts, showInfo }