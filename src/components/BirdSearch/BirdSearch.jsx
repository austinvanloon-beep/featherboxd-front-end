import { useState } from "react";
import BirdLocationDetails from "../BirdLocationDetails/BirdLocationDetails";

const BirdSearch = (props) => {
    const [region, setRegion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.fetchData(region);
        setRegion('');
    }

    return (
        <>
        <h1>Bird Search</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="region">Enter a region:</label>
            <input
                id="region"
                type="value"
                value={region}
                onChange={(event) => setRegion(event.target.value)}
            />
            <button type="submit">Search</button>
        </form>
        <BirdLocationDetails results={props.results}/>
        </>
    )

}

export default BirdSearch;