function NavItem({ link, title }: { link: string; title: string }) {
  return (
    <li className="nav-item me-4">
      <a className="nav-link" href={link}>
        {title}
      </a>
    </li>
  );
}

function Navbar() {
  return (
    <div className="navbar navbar-expand-md bg-dark p-2 mb-4" data-bs-theme="dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse bg-dark" id="navbarContent">
          <ul className="navbar-nav">
            <NavItem link="/" title="home" />
            <NavItem link="/recipesearch" title="recipe search" />
            <NavItem link="/flashcards" title="flashcard study" />
            <NavItem link="/mathdoku" title="mathdoku" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export { Navbar };
