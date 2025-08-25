import { Link } from "react-router";
import styles from './SightingList.module.css';

const SightingList = (props) => {
  return (
    <main className={styles.container}>
      {props.sightings.map((sighting) => (
        <Link key={sighting._id} to={`/sightings/${sighting._id}`}>
          <article>
            <header>
              <h2>{sighting.title}</h2>
              <p>
                {`${sighting.author.username} posted on
                ${new Date(sighting.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{sighting.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default SightingList;
