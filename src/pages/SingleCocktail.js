import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    async function fetchDrink() {
      setLoading(true);
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setLoading(false);
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchDrink();
  }, [id]);

  if (loading) return <Loading />;
  if (!cocktail)
    return <h2 className="section title">No cocktail to display</h2>;

  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name}></img>
        <div className="drink-info">
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr" }}>
            <span className="drink-data">Name</span>
            <p>{name}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr" }}>
            <span className="drink-data">Category</span>
            <p>{category}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr" }}>
            <span className="drink-data">Info</span>
            <p>{info}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr" }}>
            <span className="drink-data">Glass </span>
            <p>{glass}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr" }}>
            <span className="drink-data">Instruction </span>
            <p>{instructions}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "0.3fr 1fr" }}>
            <span className="drink-data">Ingredients </span>
            <span>
              {ingredients.map((item, index) => {
                return item ? (
                  <p className="ingredients" key={index}>
                    {" "}
                    {item}
                  </p>
                ) : null;
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
