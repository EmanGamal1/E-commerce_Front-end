export const SearchCountResult = ({ title, onClick }) => {
  return (
    <>
      <div className="d-flex justify-content-between pt-3 px-2">
        <div className="sub-tile">{title}</div>
        <div className="search-count-text d-flex "></div>
      </div>
    </>
  );
};
