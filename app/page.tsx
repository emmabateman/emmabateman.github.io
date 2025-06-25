export default function Page() {
  return (
    <div className="row mt-5 gx-5 d-flex">
      <div className="col-lg-8 container text-start mt-5 p-4">
        <h1>Emma Bateman</h1>
        <br />
        <h4>Front End/Full Stack developer based in Seattle, WA</h4>
        <div className="d-flex flex-row">
          <a
            href="https://github.com/emmabateman/emmabateman.github.io"
            target="_blank"
          >
            <button className="btn btn-lg" aria-label="github">
              <i className="bi bi-github"></i>
            </button>
          </a>
          <a href="https://www.linkedin.com/in/emma-bateman/" target="_blank">
            <button className="btn btn-lg" aria-label="linkedin">
              <i className="bi bi-linkedin"></i>
            </button>
          </a>
        </div>
      </div>
      <div className="col-md-4 container text-start mt-5 p-4">
          <h3>Work samples</h3>
          <div>
            <a href="/recipesearch">
              <button className="btn">Recipe Search</button>
            </a>
          </div>
          <div>
            <a href="/flashcards">
              <button className="btn">Flashcard Study Tool</button>
            </a>
          </div>
          <div>
            <a href="/mathdoku">
              <button className="btn">Mathdoku</button>
            </a>
          </div>
        </div>
    </div>
  );
}
