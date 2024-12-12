"use client";
import withAuth from "../withAuth";

/**
 * @deprecated An UI at the beginning of the project is no longer used.
 */
const About = () => (
  <div>
    <h1 className="title is-1">This is the About Page</h1>
    <p>
      Test About Page
    </p>
  </div>
);

export default withAuth(About);