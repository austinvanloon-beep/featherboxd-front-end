import styles from './SpeciesDetails.module.css';

const SpeciesDetails = (props) => {
    
    return (
        <section>
            <h2>Search Results For: {props.regionData.map((data) => data.value === props.displayedRegion ? data.label : '') }</h2>
            <div className={styles.species}>
                {props.species.map((spec, index) => (
                    <div key={index} className={styles.spec}>
                        <p>{spec.PRIMARY_COM_NAME}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SpeciesDetails;