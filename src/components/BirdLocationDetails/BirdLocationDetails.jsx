import styles from './BirdLocationDetails.module.css';

const BirdLocationDetails = (props) => {
    
    return (
        <section>
            <h2>Search Results For: {props.regionData.map((data) => data.value === props.displayedRegion ? data.label : data.region) }</h2>
            <div className={styles.results}>
                {props.results.map((result, index) => (
                    <div key={index} className={styles.result}>
                        <p><b>Name:</b> {result.comName}</p>
                        <p><b>Location:</b> {result.locName}</p>
                        <p><b>Date:</b> {result.obsDt}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BirdLocationDetails;