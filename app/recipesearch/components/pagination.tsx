function Pagination({
  numResults,
  resultsPerPage,
  pageNumber,
  setPageNumber,
}: {
  numResults: number;
  resultsPerPage: number;
  pageNumber: number;
  setPageNumber: (_: number) => void;
}) {
  return (
    <ul className="pagination mt-2">
      <li className={`page-item ${pageNumber == 0 ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          aria-label="Previous"
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <i className="bi bi-chevron-left" />
        </a>
      </li>
      {[...new Array(Math.ceil(numResults / resultsPerPage)).keys()].map(
        (page) => (
          <li
            className={`page-item ${pageNumber == page ? "active" : ""}`}
            key={page}
          >
            <a
              className="page-link"
              href="#"
              aria-label={(page + 1).toString()}
              onClick={() => setPageNumber(page)}
            >
              {page + 1}
            </a>
          </li>
        )
      )}
      <li
        className={`page-item
        ${
          (pageNumber + 1) * resultsPerPage > numResults ? "disabled" : ""
        }`}
      >
        <a
          className="page-link"
          href="#"
          aria-label="Previous"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <i className="bi bi-chevron-right" />
        </a>
      </li>
    </ul>
  );
}

export { Pagination };