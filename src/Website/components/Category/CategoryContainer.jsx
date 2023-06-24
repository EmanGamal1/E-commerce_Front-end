import { Container, Row, Spinner } from "reactstrap";
import { CategoryCard } from "../../Pages/Categories/CategoryCard";

export const CategoryContainer = ({ data, loading }) => {
  return (
    <>
      <Container>
        <div className="admin-content-text mt-2 ">كل التصنيفات</div>
        <Row className="my-2 d-flex justify-content-between text-center">
          {loading === false ? (
            data ? (
              data.map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
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
            <Spinner
              className={"h1 p-5 m-4"}
              animation="border"
              variant="primary"
            />
          )}
        </Row>
      </Container>
    </>
  );
};
