import React from "react";
import Navbar from "../NavBar/NavBar";
import "./AboutPage.css";
import { UserContext } from "../../contexts/UserContext";

function AboutPage() {
    const { user } = React.useContext(UserContext);
    return (
        <div className="about-page">
            <div className="about-link">
                <a href="/about">About</a>
            </div>

            <Navbar />

            <main className="about-content">
                <h1 className="about-title">About FeatherBOXD</h1>
                <p className="about-intro">
                    A simple app where bird lovers can post sightings, share tips, and
                    connect with the community.
                </p>

                <section>
                    <h2>What FeatherBOXD does</h2>
                    <ul>
                        <li>Post a bird sighting with a photo and short note.</li>
                        <li>Get help with IDs from the community.</li>
                        <li>Keep track of your own birding progress.</li>
                        <li>Learn from other people’s sightings.</li>
                        <li>Get feedback through likes and comments.</li>
                    </ul>
                </section>

                <section>
                    <h2>How it compares to Instagram</h2>
                    <ul>
                        <li>Focused only on birding (IG is for everything).</li>
                        <li>Sightings have categories and notes, not just captions.</li>
                        <li>Comments are for identification and tips.</li>
                        <li>You can view only your sightings or everyone’s.</li>
                        <li>No influencers or ads — just birds.</li>
                    </ul>
                </section>

                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>Quick posting with title, note, and photo URL.</li>
                        <li>Likes and comments.</li>
                        <li>Home = your sightings. Community = all sightings.</li>
                        <li>Accounts are secured with sign in/up.</li>
                    </ul>
                </section>

                <section>
                    <h2>Who it’s for</h2>
                    <p>New birders, photographers, and anyone who loves nature.</p>
                </section>

                <section>
                    <h2>Next steps</h2>
                    <ul>
                        <li>Search and filters.</li>
                        <li>Optional location hotspots.</li>
                        <li>Field guides and checklists.</li>
                    </ul>
                </section>

                <section className="about-cta">
                    <h2>Join us</h2>
                    <p>
                        <a href="/sign-up" className="btn">Sign Up</a>{" "}
                        <a href="/sightings" className="btn btn-outline">See Community</a>
                    </p>
                </section>
            </main>
        </div>
    );
}

export default AboutPage;


