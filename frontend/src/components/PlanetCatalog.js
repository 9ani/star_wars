import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanetCatalog = ({ searchResults }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
          const response = await axios.get("http://localhost:5000/api/planets");
          setPlanets(response.data);
          setLoading(false);
      } catch (error) {
          setError("Error fetching planets.");
          setLoading(false);
      }
  };

    fetchPlanets();
  }, []);

  const renderCards = (items, type) => (
    <div className="row">
      {items.map((item) => (
        <div className="col-md-3 mb-4" key={item.name}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              {type === "planet" && (
                <>
                  <p className="card-text">Climate: {item.climate}</p>
                  <p className="card-text">Population: {item.population}</p>
                </>
              )}
              {type === "person" && (
                <>
                  <p className="card-text">Gender: {item.gender}</p>
                  <p className="card-text">Birth Year: {item.birth_year}</p>
                </>
              )}
              {type === "starship" && (
                <>
                  <p className="card-text">Model: {item.model}</p>
                  <p className="card-text">Manufacturer: {item.manufacturer}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <div>Loading planets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Star Wars Catalog</h1>
      {searchResults.planets.length === 0 &&
      searchResults.people.length === 0 &&
      searchResults.starships.length === 0 ? (
        renderCards(planets, "planet")
      ) : (
        <>
          {renderCards(searchResults.planets, "planet")}
          {renderCards(searchResults.people, "person")}
          {renderCards(searchResults.starships, "starship")}
        </>
      )}
    </div>
  );
};

export default PlanetCatalog;
