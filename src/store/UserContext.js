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
  snackBar: false,
  setSnackBar: (snackBar) => {},
});

export const UserContextProvider = (props) => {
  const [ratingStored, setRatingStored] = useState(0);
  const [priceStored, setPriceStored] = useState([0, 10000]);
  const [searchKeywordStored, setSearchKeywordStored] = useState("");
  const [categoryStored, setCategoryStored] = useState("");
  const [snackBarStored, setSnackBarStored] = useState(false);

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
  const snackBarHandler = (snackBar) => {
    setSnackBarStored(snackBar);
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
      snackBar: snackBarStored,
      setSnackBar: snackBarHandler,
    }),
    [
      ratingStored,
      priceStored,
      searchKeywordStored,
      categoryStored,
      snackBarStored,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
