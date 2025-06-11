import { FaGithub } from "react-icons/fa";
import "../App.css";

function ProjectCard({ title, description, github, live }) {
  const CardWrapper = ({ children }) =>
    live ? (
      <div
        className="modal-content project-card"
        onClick={() => window.open(live, "_blank")}
      >
        {children}
      </div>
    ) : (
      <div className="modal-content project-card no-click">{children}</div>
    );

  return (
    <CardWrapper>
      <h2 className="project-title">{title}</h2>
      <p className="project-description">{description}</p>
      {github && (
        <a
          href={github}
          className="github-link"
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          GitHub Repo
        </a>
      )}
    </CardWrapper>
  );
}

export default ProjectCard;
