import { useState } from "react";
import BirdLocationDetails from "../BirdLocationDetails/BirdLocationDetails";

import * as birdLocationService from '../../../src/services/birdLocationService';
import { regionData } from "../../data/regionData";

const BirdSearch = () => {
    const [region, setRegion] = useState('US-AL');
    const [displayedRegion, setDisplayedRegion] = useState('');

    const [results, setResults] = useState([]);

    const fetchData = async (region) => {
        const data = await birdLocationService.show(region, '/data/obs/', '/recent/notable');

        setResults(data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(region);
        setDisplayedRegion(region);
    }

    return (
        <>
            <h1>Sighting Search by Region</h1>
            <h3>Search for external live sightings in your region, powered by Ebird API</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="region">Select a region:</label>
                <select onChange={(event => setRegion(event.target.value))}>
                    {regionData.map((region) => (
                        <option key={region._id} value={region.value}>{region.label}</option>
                    ))}
                </select>
                <button type="submit">Search</button>
            </form>
            <BirdLocationDetails 
                results={results} 
                regionData={regionData}
                displayedRegion={displayedRegion}
            />
        </>
    )

}

export default BirdSearch;