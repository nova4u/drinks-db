import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ id, alc, drink, glass, thumb }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={thumb} alt={drink} />
      </div>
      <div className="cocktail-footer">
        <h3>{drink}</h3>
        <h4>{glass}</h4>
        <p>{alc}</p>
        <Link
          to={`/cocktail/${id}-${drink}`}
          className="btn btn-primary btn-details"
        >
          Learn More
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
