function Footer({ gitHubLink }: { gitHubLink: string }) {
  return (
    <div className="d-flex flex-column align-items-end sticky-bottom bg-white">
      <a href={gitHubLink} title="Source code for this page">
        <button className="btn btn-lg" aria-label="github">
          <i className="bi bi-github"></i>
        </button>
      </a>
    </div>
  );
}

export { Footer };
