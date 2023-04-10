import { createContext, useMemo, useState } from "react";

export const UserContext = createContext({
  rating: 0,
  setRating: (rating) => {},
  price: [0, 1000],
  setPrice: (price) => {},
  searchKeyword: "",
  setSearchKeyword: (key) => {},
  category: "All",
  setCategory: (category) => {},
});

export const UserContextProvider = (props) => {
  const [ratingStored, setRatingStored] = useState(0);
  const [priceStored, setPriceStored] = useState([0, 10000]);
  const [searchKeywordStored, setSearchKeywordStored] = useState("");
  const [categoryStored, setCategoryStored] = useState("");

  const setRatingHandler = (rating) => {
    setRatingStored(rating);
  };
  const priceHandler = (price) => {
    setPriceStored(price);
  };
  const searchKeywordHandler = (key) => {
    setSearchKeywordStored(key);
  };
  const categoryHandler = (category) => {
    setCategoryStored(category);
  };

  const contextValue = useMemo(
    () => ({
      rating: ratingStored,
      setRating: setRatingHandler,
      price: priceStored,
      setPrice: priceHandler,
      searchKeyword: searchKeywordStored,
      setSearchKeyword: searchKeywordHandler,
      category: categoryStored,
      setCategory: categoryHandler,
    }),
    [ratingStored, priceStored, searchKeywordStored, categoryStored]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
