import React, { useRef } from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { useState } from "react";

const CocktailList = () => {
  const { cocktails, loading, addDrinks, scrolled, setScrolled, searchTerm } =
    useGlobalContext();
  const [height, setHeight] = useState(0);
  const sectionRef = useRef(null);

  const handleScrollToTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeight(
        sectionRef && sectionRef.current
          ? sectionRef.current.getBoundingClientRect()
          : {}
      );

      if (
        height.height - window.pageYOffset < 800 &&
        !scrolled &&
        !loading &&
        searchTerm.length <= 1
      ) {
        setScrolled(true);
        addDrinks();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef, height, scrolled, setScrolled, addDrinks]);

  if (loading) return <Loading></Loading>;

  if (cocktails.length < 1)
    return (
      <h2 className="section-title">
        No cocktails matched your search criteria
      </h2>
    );

  return (
    <section className="section">
      <div className="scroll-to-top" onClick={handleScrollToTop}>
        <svg
          height="32"
          width="32"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <h2 className="section-title">Cocktails</h2>
      <div className="cocktails-center" ref={sectionRef}>
        {cocktails.map((cocktail, index) => {
          return <Cocktail key={index} {...cocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
