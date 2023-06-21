import { HomeCategoriesHook } from "../../hook/Categories/HomeCategoriesHook";
import { Container, Row, Spinner } from "reactstrap";
import { CategoryCard } from "../../Pages/Categories/CategoryCard";
import { SubTiltle } from "../Uitily/SubTiltle";
import { useEffect } from "react";

export const HomeCategories = () => {
  const [categories, loading] = HomeCategoriesHook();
  useEffect(() => {
    if (categories.length > 0) {
      console.log("useeffect", categories, loading);
    }
  }, [categories]);

  return (
    <>
      <Container>
        <SubTiltle title="الاقسام" btntitle="المزيد" pathText="/categories" />
        <Row className="my-2 d-flex justify-content-between">
          {loading === false ? (
            categories ? (
              categories.slice(0, 5).map((item) => {
                return (
                  <CategoryCard
                    key={item._id}
                    slug={item.slug}
                    title={item.name_ar}
                    img={item.image}
                  />
                );
              })
            ) : (
              <h4>لا يوجد تصنيفات</h4>
            )
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Row>
      </Container>
    </>
  );
};
