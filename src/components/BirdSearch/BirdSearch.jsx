import { useState } from "react";
import BirdLocationDetails from "../BirdLocationDetails/BirdLocationDetails";

import * as birdLocationService from '../../../src/services/birdLocationService';
import styles from './BirdSearch.module.css';
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
            <div className={styles.externalSearchWrapper}>
                <h1 className={styles.externalSearchTitle}>Sighting Search by Region</h1>
                <h3 className={styles.externalSearchSubtitle}>Search for external live sightings in your region</h3>
                <small>This search feature is powered by eBird API.</small>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="region">Select a region:</label>
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
            <BirdLocationDetails 
                results={results} 
                regionData={regionData}
                displayedRegion={displayedRegion}
            />
        </>
    )

}

export default BirdSearch;