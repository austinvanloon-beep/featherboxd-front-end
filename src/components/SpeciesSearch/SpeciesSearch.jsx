import { useState, useEffect } from "react";

import * as birdLocationService from '../../../src/services/birdLocationService';
import styles from './SpeciesSearch.module.css';
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
            <div className={styles.speciesSearchWrapper}>
                <h1 className={styles.speciesSearchTitle}>Species Search by Area</h1>
                <h3 className={styles.speciesSearchSubtitle}>Want to know what birds to look for in your area? Search here!</h3>
                <small>This search feature is powered by eBird API.</small>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="region">Select an area:</label>
                    <select className={styles.input} onChange={(event => setRegion(event.target.value))}>
                        {regionData.map((region) => (
                            <option key={region._id} value={region.value}>{region.label}</option>
                        ))}
                    </select>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={`${styles.button} ${styles.primaryBtn}`}>Search</button>
                    </div>
                </form>
            </div>
            <SpeciesDetails 
                species={species}
                regionData={regionData}
                displayedRegion={displayedRegion} 
            />
        </>
    )

}

export default SpeciesSearch;