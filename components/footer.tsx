function Footer({
  gitHubLink,
  addtlContent,
}: {
  gitHubLink: string;
  addtlContent: React.ReactElement;
}) {
  return (
    <div className="sticky-bottom bg-white d-flex flex-row">
      <div className="d-flex flex-column align-items-start justify-content-center">
        {addtlContent}
      </div>
      <div className="d-flex flex-column flex-grow-1 align-items-end">
        <a href={gitHubLink} title="Source code for this page">
          <button className="btn btn-lg" aria-label="github">
            <i className="bi bi-github"></i>
          </button>
        </a>
      </div>
    </div>
  );
}

export { Footer };
