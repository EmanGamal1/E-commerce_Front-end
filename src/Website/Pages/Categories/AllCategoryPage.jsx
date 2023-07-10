import { CategoryContainer } from "../../components/Category/CategoryContainer";
import { Pagination } from "reactstrap";
import { AllCategoriesHook } from "../../hook/Categories/AllCategoriesHook";

export const AllCategoryPage = () => {
  const [categories, loading, pagination, getPage] = AllCategoriesHook();
  const pageCount = pagination.total_pages;
  return (
    <>
      <div style={{ minHeight: "670px" }}>
        <CategoryContainer data={categories} loading={loading} />
        {pageCount > 1 ? (
          <Pagination pageCount={pageCount} onPress={getPage} />
        ) : null}
      </div>
    </>
  );
};
