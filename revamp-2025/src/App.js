import React, { useState } from "react";
import "./App.css";
import photo from "./img/elisha-photo.jpg";
import { Download } from "lucide-react";

const NotebookEntry = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="notebook-entry">
      <h4 onClick={() => setExpanded(!expanded)} className="entry-title">
        {title}
      </h4>
      {expanded && <p className="entry-content">{content}</p>}
    </div>
  );
};

const ProjectCard = ({ title, desc }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="project-card" onClick={() => setShowModal(true)}>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <p>// More details coming soon...</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  const [bootDone, setBootDone] = useState(false);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [showStatic, setShowStatic] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showAboutVisual, setShowAboutVisual] = useState(false);

  const notebookData = [
    { title: "🧠 Big-O Cheat Sheet", content: "O(1), O(n), O(log n), O(n^2)... Common complexities and examples." },
    { title: "🧩 Algorithms & Patterns", content: "Sliding window, two pointers, divide & conquer, recursion basics." },
    { title: "🖧 Networking Fundamentals", content: "OSI model, HTTP vs TCP, common ports, DNS flow." },
    { title: "🐚 Bash + Shell Notes", content: "grep, awk, sed, chmod, piping, scripting patterns." },
    { title: "🧪 Data Science Ideas", content: "Pandas recipes, scikit-learn workflows, feature engineering notes." }
  ];

  const experienceData = [
    {
      title: "Software Developer at GM - Ultra Platform",
      content: "Built reusable UI components, automated test cases with Selenium, and supported a custom AEM CMS used globally by 50k+ users."
    },
    {
      title: "Software Engineer at GM - Quantum Team",
      content: "Developed content authoring features, collaborated on Java backend services, and improved accessibility on key front-end modules."
    },
    {
      title: "React & Django Developer - Email Cleaner Tool",
      content: "Designed a Gmail-integrated tool for cleaning up promotional emails using OAuth and label filtering."
    },
    {
      title: "Freelance Web Projects",
      content: "Delivered full-stack solutions for personal clients, focusing on responsive design and performance."
    },
    {
      title: "Graduate Student - M.S. in Data Science",
      content: "Maintaining a 4.0 GPA while focusing on machine learning, statistics, and advanced Python workflows."
    }
  ];

  const techTags = [
    "React", "Django", "JavaScript", "Python", "Java", "Gmail API", "OAuth 2.0",
    "Selenium", "AEM", "Git", "GitHub", "VS Code", "Bash", "SQL", "Tailwind CSS"
  ];

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmed = command.trim().toLowerCase();
    const next = [...output];
    next.push(`> ${trimmed}`);

    switch (trimmed) {
      case "help":
        next.push("  [about]  Learn about me");
        next.push("  [projects]  View selected work");
        next.push("  [contact]  Get in touch");
        next.push("  [notebook]  View personal CS notes");
        next.push("  [exit]  Return to boot screen");
        next.push("  [credits]  View site authorship");
        next.push("  [poweroff]  Shutdown interface");
        break;
      case "about":
        next.push("Elisha is a developer who vibes with code and sci-fi.");
        next.push("(use 'about!' to skip to visual version)");
        break;
      case "about!":
        setShowAboutVisual(true);
        return;
      case "projects":
        next.push("Displaying core projects... (use 'skip' for visuals)");
        break;
      case "contact":
        next.push("Ping Elisha at ehoseystewart@gmail.com");
        break;
      case "notebook":
        next.push("Opening digital notebook...");
        setShowNotebook(true);
        return;
      case "credits":
        next.push("Created by Elisha Hosey with vibes, vision, and React ⚡");
        break;
      case "poweroff":
        next.push("Shutting down Elisha_Node.exe...");
        setTimeout(() => {
          setBootDone(false);
          setOutput([]);
          setCommand("");
        }, 1500);
        return;
      case "skip":
        setShowStatic(true);
        return;
      case "exit":
        setBootDone(false);
        setOutput([]);
        setCommand("");
        return;
      default:
        next.push("Command not recognized. Type 'help' for options.");
    }

    setOutput(next);
    setCommand("");
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => setBootDone(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      <div className="hero">
        {!bootDone && !showStatic && !showNotebook && !showAboutVisual ? (
          <div className="boot-sequence">
            <pre className="terminal-text">
              {`> Initializing Elisha_Node.exe\n> Status: Connected to CORE\n> Type 'help' to begin...`}
            </pre>
            <button className="skip-button" onClick={() => setShowStatic(true)}>
              // skip to standard portfolio
            </button>
          </div>
        ) : showStatic || showAboutVisual ? (
          <div className="static-view">
            <h2>// Elisha Hosey</h2>
            <div className="glitch-avatar-wrapper">
  <img src={photo} alt="Elisha Hosey" className="glitch-avatar base" />
  <img src={photo} alt="" className="glitch-avatar red" />
  <img src={photo} alt="" className="glitch-avatar blue" />
</div>
            <h3>// Experience</h3>
            {experienceData.map((exp, i) => (
              <NotebookEntry key={i} title={exp.title} content={exp.content} />
            ))}
            <h3>// Technologies</h3>
            <div className="tag-grid">
              {techTags.map((tag, i) => (
                <span key={i} className="tech-tag">{tag}</span>
              ))}
            </div>
            <h3>// Projects</h3>
            <div className="project-list">
              <ProjectCard title="Project Alpha" desc="Full-stack app using React + Django." />
              <ProjectCard title="Project Beta" desc="Email cleanup tool leveraging Gmail API." />
              <ProjectCard title="Project Gamma" desc="Algorithmic puzzle dojo with real-time scoring." />
            </div>
            <h3>// Contact</h3>
            <p>Email: ehoseystewart@gmail.com</p>
            <a href="/Elisha_Hosey_Resume.pdf" download className="resume-button">
              <Download size={16} style={{ marginRight: "6px" }} /> Download Resume
            </a>
            <button onClick={() => {
              setShowStatic(false);
              setShowAboutVisual(false);
            }}>
              // return to terminal
            </button>
          </div>
        ) : showNotebook ? (
          <div className="static-view">
            <h2>// Elisha’s Notebook</h2>
            {notebookData.map((entry, index) => (
              <NotebookEntry key={index} title={entry.title} content={entry.content} />
            ))}
            <button onClick={() => setShowNotebook(false)}>← return to terminal</button>
          </div>
        ) : (
          <div className="terminal-menu">
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
            <form onSubmit={handleCommand}>
              <span>&gt; </span>
              <input
                autoFocus
                className="terminal-input"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
