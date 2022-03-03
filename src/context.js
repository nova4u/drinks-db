import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const getRandomLetter = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < characters.length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result[0];
  };

  const addDrinks = async () => {
    const response = await fetch(`${url}${getRandomLetter()[0]}`);
    const data = await response.json();
    const { drinks } = data;
    if (drinks) {
      const newCocktails = drinks.map((drink) => {
        const { idDrink, strAlcoholic, strDrink, strGlass, strDrinkThumb } =
          drink;
        return {
          id: idDrink,
          alc: strAlcoholic,
          drink: strDrink,
          glass: strGlass,
          thumb: strDrinkThumb,
        };
      });
      setCocktails([...cocktails, ...newCocktails]);
    } else {
      setCocktails([]);
    }
    setScrolled(false);
  };

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((drink) => {
          const { idDrink, strAlcoholic, strDrink, strGlass, strDrinkThumb } =
            drink;
          return {
            id: idDrink,
            alc: strAlcoholic,
            drink: strDrink,
            glass: strGlass,
            thumb: strDrinkThumb,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        searchTerm,
        cocktails,
        setSearchTerm,
        scrolled,
        setScrolled,
        setCocktails,
        addDrinks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
