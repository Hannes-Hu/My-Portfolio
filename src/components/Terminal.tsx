'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cvData } from '../data/cvData'

interface CommandHistory {
  command: string
  output: React.ReactNode
  timestamp: Date
}

const Terminal = () => {
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([])
  const [showPrompt, setShowPrompt] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = {
    help: () => (
      <div className="command-output">
        <div className="terminal-header">Available Commands:</div>
        <div className="command-list">
          <div><span className="command-name">help</span> - Show this help message</div>
          <div><span className="command-name">about</span> - About me</div>
          <div><span className="command-name">skills</span> - Technical skills</div>
          <div><span className="command-name">projects</span> - Featured projects</div>
          <div><span className="command-name">experience</span> - Work experience</div>
          <div><span className="command-name">education</span> - Education background</div>
          <div><span className="command-name">contact</span> - Contact information</div>
          <div><span className="command-name">clear</span> - Clear terminal</div>
          <div><span className="command-name">github</span> - Open GitHub profile</div>
          <div><span className="command-name">linkedin</span> - Open LinkedIn profile</div>
        </div>
      </div>
    ),
    
    about: () => (
      <div className="command-output">
        <div className="terminal-header">About Me</div>
        <div className="content-section">
          <div className="name-header">
            <h1 className="terminal-name">Hannes Huslage</h1>
            <div className="terminal-subtitle">Full-Stack Developer</div>
          </div>
          <div className="bio-text">
            <p>{cvData.about}</p>
          </div>
        </div>
      </div>
    ),

    skills: () => (
      <div className="command-output">
        <div className="terminal-header">Technical Skills</div>
        <div className="skills-grid">
          {Object.entries(cvData.skills).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <div className="category-title">{category.toUpperCase()}</div>
              <div className="skills-list">
                {(skills as any[]).map((skill, index) => (
                  <span key={index} className="skill-tag">{skill.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    projects: () => (
      <div className="command-output">
        <div className="terminal-header">Featured Projects</div>
        <div className="projects-list">
          {cvData.projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <span className="project-name">{project.name}</span>
                <span className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      [GITHUB]
                    </a>
                  )}
                  {project.liveDemo && project.liveDemo !== "None" && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link">
                      [LIVE]
                    </a>
                  )}
                </span>
              </div>
              <div className="project-description">{project.description}</div>
              <div className="project-tech">
                {project.technologies.map((tech: string, index: number) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    experience: () => (
      <div className="command-output">
        <div className="terminal-header">Experience</div>
        <div className="experience-list">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="exp-header">
                <span className="exp-position">{exp.position}</span>
                <span className="exp-period">{exp.period}</span>
              </div>
              <div className="exp-company">{exp.company}</div>
              <div className="exp-description">
                {exp.description.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
              <div className="exp-tech">
                {exp.technologies.map((tech: string, index: number) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    education: () => (
      <div className="command-output">
        <div className="terminal-header">Education</div>
        <div className="education-list">
          {cvData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-institution">{edu.institution}</div>
              <div className="edu-year">{edu.year}</div>
              {edu.focus && <div className="edu-focus">Focus: {edu.focus}</div>}
            </div>
          ))}
        </div>
      </div>
    ),

    contact: () => (
      <div className="command-output">
        <div className="terminal-header">Contact Information</div>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">EMAIL:</span>
            <span className="contact-value">{cvData.personal.email}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">PHONE:</span>
            <span className="contact-value">{cvData.personal.phone}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">LOCATION:</span>
            <span className="contact-value">{cvData.personal.location.split('\n')[0]}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">WEBSITE:</span>
            <span className="contact-value">{cvData.personal.website}</span>
          </div>
        </div>
      </div>
    ),

    clear: () => {
      setCommandHistory([])
      return null
    },

    github: () => {
      window.open(cvData.personal.github, '_blank')
      return <div>Opening GitHub profile...</div>
    },

    linkedin: () => {
      window.open(cvData.personal.linkedin, '_blank')
      return <div>Opening LinkedIn profile...</div>
    },
  }

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase()
    let output: React.ReactNode

    if (cmd === '') {
      output = null
    } else if (commands[cmd as keyof typeof commands]) {
      output = commands[cmd as keyof typeof commands]()
    } else {
      output = (
        <div className="command-output error">
          Command not found: {command}. Type 'help' for available commands.
        </div>
      )
    }

    if (cmd !== 'clear') {
      setCommandHistory(prev => [...prev, {
        command,
        output,
        timestamp: new Date()
      }])
    }

    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  useEffect(() => {
    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Add welcome message
    setCommandHistory([{
      command: 'welcome',
      output: (
        <div className="welcome-message">
          <div className="welcome-header">
            <h1 className="welcome-name">Hannes Huslage</h1>
            <div className="welcome-subtitle">Full-Stack Developer</div>
          </div>
          <div className="welcome-text">
            <p>Welcome to my Interactive Terminal Portfolio</p>
            <p>Type <span className="command-example">help</span> to see available commands</p>
            <p>Navigate using terminal commands like <span className="command-example">about</span>, <span className="command-example">projects</span>, <span className="command-example">skills</span></p>
          </div>
        </div>
      ),
      timestamp: new Date()
    }])
  }, [])

  return (
    <div className="terminal-container">
      <div className="terminal-header-bar">
        <div className="terminal-window-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
        <div className="terminal-title">hannes@portfolio:~</div>
      </div>
      
      <div className="terminal" ref={terminalRef}>
        <div className="terminal-content">
          {commandHistory.map((item, index) => (
            <div key={index} className="command-history">
              {item.command !== 'welcome' && (
                <div className="command-line">
                  <span className="prompt">hannes@portfolio:~$ </span>
                  <span className="command">{item.command}</span>
                </div>
              )}
              {item.output && (
                <div className="command-output-wrapper">
                  {item.output}
                </div>
              )}
            </div>
          ))}
          
          {showPrompt && (
            <div className="current-line">
              <span className="prompt">hannes@portfolio:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="command-input"
                autoFocus
                spellCheck={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Terminal