'use client'

import React, { useState } from 'react'
import { cvData } from '../data/cvData'
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Image from 'next/image'

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  const toggleExpand = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {cvData.projects.map((project: any) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.image && project.image !== "None" ? (
                  <Image 
                    src={project.image} 
                    alt={project.name}
                    width={300}
                    height={200}
                    className="project-image"
                  />
                ) : (
                  <div className="project-placeholder">
                    {project.name.split(' ').map((word: string) => word[0]).join('')}
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <div className={`project-description ${expandedProject === project.id ? 'expanded' : ''}`}>
                  <p>{expandedProject === project.id ? project.description : truncateDescription(project.description)}</p>
                </div>
                
                {project.description.length > 120 && (
                  <button 
                    className="expand-btn"
                    onClick={() => toggleExpand(project.id)}
                  >
                    {expandedProject === project.id ? (
                      <>Show Less <FaChevronUp /></>
                    ) : (
                      <>Read More <FaChevronDown /></>
                    )}
                  </button>
                )}
                
                <div className="project-technologies">
                  {project.technologies.map((tech: string, index: number) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> Frontend
                  </a>
                  {project.github2 && (
                    <a href={project.github2} target="_blank" rel="noopener noreferrer">
                      <FaCodeBranch /> Backend
                    </a>
                  )}
                  {project.liveDemo && project.liveDemo !== "None" && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects