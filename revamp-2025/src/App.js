import React, { useState } from "react";
import "./App.css";
import photo from "./img/elisha-photo.jpg";
import resume from "./files/Elisha_Hosey_Engineer_Data_v641_base.docx";
import { Download } from "lucide-react";
import ProjectCard from "./components/ProjectCard";

const NotebookEntry = ({ title, content, tags = [] }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="notebook-entry">
      <h4 onClick={() => setExpanded(!expanded)} className="entry-title">
        {title}
      </h4>
      {expanded && (
        <>
          <p className="entry-content">{content}</p>
          {tags.length > 0 && (
            <div className="tag-grid entry-tags">
              {tags.map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const projects = [
  {
    title: "SkillFreq",
    description: "Data-driven job analysis tool that extracts skill frequency from job postings to guide targeted learning and application strategy.",
    github: "https://github.com/elishahosey/SkillFreq",
  },
  {
    title: "Email Cleaner",
    description: "In-progress React + Django app to organize Gmail inboxes by label and category.",
    github: "https://github.com/elishahosey/email-cleaner-app"
  },
  {
    title: "Phishing Detection",
    description: "Ongoing script using Gmail API to identify and flag suspicious emails.",
    github: "https://github.com/elishahosey/adversarial-phishing-detection",
    live: "https://adversarial-phish-detection.streamlit.app/"
  }
];


export default function App() {
  const [bootDone, setBootDone] = useState(false);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [showStatic, setShowStatic] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showAboutVisual, setShowAboutVisual] = useState(false);

  const notebookData = [
    { title: "🧠 Big-O Cheat Sheet", content: "TBD" },
    { title: "🧩 Algorithms & Patterns", content: "TBD" },
    { title: "🖧 Networking Fundamentals", content: "TBD" },
    { title: "🐚 Bash + Shell Notes", content: "TBD" },
    { title: "🧪 Data Science Ideas", content: "TBD" },
    { title: "🧪 General", content: "TBD" },
  ];

  const experienceData = [
    {
      title: "Software Developer at GM - (Quantum + Ultra Platform)",
      content: "Built and maintained reusable UI components and content authoring features within a global AEM platform serving 50k+ users. Automated test workflows using Selenium and collaborated with Java backend services to improve accessibility, reliability, and consistency across front-end modules.",
      tags: ["React", "JavaScript", "AEM", "Selenium", "HTML/SCSS/CSS", "Git", "GitHub","TypeScript", "Unit Testing","Java","Maven","Node.js"]
    },
    {
      title: "Software Developer - Tyler Technologies",
      content: "Contributed as a backend-focused developer specializing in data translation, debugging ETL pipelines, and maintaining reliable data transport for enterprise-level municipal software systems. Work closely aligned with data engineering and integration efforts.",
      tags: ["SQL", "Python","SQL Server","REST API", "Bash","Linux","VB.NET","DLLs","Data Mapping","ETL","Debugging","Integration","Web Services","OpenSearch","Logging Analysis","GitKraken"]
    },
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

  React.useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setBootDone(true);
      setShowStatic(true);
    } else {
      const timeout = setTimeout(() => setBootDone(true), 3000);
      return () => clearTimeout(timeout);
    }
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
            <h2>// Elisha Hosey-Stewart</h2>
            <div className="glitch-avatar-wrapper">
              <img src={photo} alt="Elisha Hosey" className="glitch-avatar base" />
              <img src={photo} alt="" className="glitch-avatar red" />
              <img src={photo} alt="" className="glitch-avatar blue" />
            </div>
            <h3>// Experience</h3>
            {experienceData.map((exp, i) => (
              <NotebookEntry key={i} title={exp.title} content={exp.content} tags={exp.tags} />
            ))}
            <h3>// Projects</h3>
            <div className="project-list">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}

            </div>
            <h3>// Contact</h3>
            <p>
              Email: ehoseystewart@gmail.com<br />
              Phone: (361) 489-7538<br />
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/elishahosey"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                linkedin.com/in/elishahosey
              </a>
            </p>
            <a href={resume} download className="resume-button">
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
