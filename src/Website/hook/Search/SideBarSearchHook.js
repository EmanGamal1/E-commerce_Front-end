import { useEffect, useState } from "react";
import { AllCategoriesHook } from "../Categories/AllCategoriesHook";

const SidebarSearchHook = () => {
  const [categories, loading] = AllCategoriesHook();

  //to get category
  let category = [];
  try {
    if (categories) category = categories;
  } catch (e) {}
  //to get category
  var queryCat = "";
  const [catChecked, setCatChecked] = useState([]);
  //when user press any category
  const clickCategory = (e) => {
    let value = e.target.value;
    if (value === "0") {
      setCatChecked([]);
    } else {
      if (e.target.checked === true) {
        setCatChecked([...catChecked, value]);
      } else if (e.target.checked === false) {
        const newArry = catChecked.filter((e) => e !== value);
        setCatChecked(newArry);
      }
    }
  };
  useEffect(() => {
    queryCat = catChecked.map((val) => "category[in][]=" + val).join("&");
    localStorage.setItem("catCecked", queryCat);
    setTimeout(() => {
      // getProduct();
    }, 1000);
  }, [catChecked]);

  const [From, setPriceFrom] = useState(0);
  const [To, setToFrom] = useState(0);

  const priceFrom = (e) => {
    localStorage.setItem("priceFrom", e.target.value);

    setPriceFrom(e.target.value);
  };
  const priceTo = (e) => {
    localStorage.setItem("priceTo", e.target.value);
    setToFrom(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      // getProduct();
    }, 1000);
  }, [From, To]);

  return [category, clickCategory, priceFrom, priceTo];
};

export default SidebarSearchHook;
