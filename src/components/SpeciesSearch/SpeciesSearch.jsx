import { useState, useEffect } from "react";

import * as birdLocationService from '../../../src/services/birdLocationService';
import { regionData } from "../../data/regionData";
import speciesData from '../../../e-bird-taxonomy.json';
import SpeciesDetails from "../SpeciesDetails/SpeciesDetails";

const SpeciesSearch = () => {
    const [results, setResults] = useState([]);
    const [species, setSpecies] = useState([]);
    const [region, setRegion] = useState('US-AL');
    const [displayedRegion, setDisplayedRegion] = useState('');

    const fetchData = async (region) => {
        const data = await birdLocationService.show(region, '/product/spplist/', '');

        setResults(data);
    }

    useEffect(() => {
        setSpecies(speciesData.filter((species) => results.includes(species.SPECIES_CODE)));
    }, [results])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData(region);
        setDisplayedRegion(region);
    }

    return (
        <>
            <h1>Species Search by Region</h1>
            <h3>Want to know what birds to look for in your region? Search here!</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="region">Select a region:</label>
                <select onChange={(event => setRegion(event.target.value))}>
                    {regionData.map((region) => (
                        <option key={region._id} value={region.value}>{region.label}</option>
                    ))}
                </select>
                <button type="submit">Search</button>
            </form>
            <SpeciesDetails 
                species={species}
                regionData={regionData}
                displayedRegion={displayedRegion} 
            />
        </>
    )

}

export default SpeciesSearch;