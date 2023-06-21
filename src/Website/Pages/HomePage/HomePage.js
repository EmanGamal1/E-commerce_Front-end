import Silder from "../../components/Home/Silder";
import { HomeCategories } from "../../components/Home/HomeCategories";
import { MostSoldProducts } from "../../components/Home/MostSoldProducts";
import { Features } from "../../components/Home/Features";
import { NewArrivedProducts } from "../../components/Home/NewArrivedProducts";

const Home = () => {
  return (
    <div id="home">
      <Silder />
      <Features />
      <HomeCategories />
      <MostSoldProducts
        title="الاكثر مبيعا"
        btntitle="المزيد"
        pathText="/products"
      />
      <NewArrivedProducts
        title="وصل حديثا"
        btntitle="المزيد"
        pathText="/products"
      />
    </div>
  );
};

export default Home;
