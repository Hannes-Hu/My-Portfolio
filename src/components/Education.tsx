'use client'

import React from 'react'
import { cvData } from '../data/cvData'
import { FaGraduationCap } from 'react-icons/fa'

const Education = () => {
  return (
    <section id="education" className="education-timeline-section">
      <div className="container">
        <h2><FaGraduationCap className="section-icon" /> Education</h2>
        <div className="experience-timeline">
          {cvData.education.map((edu: any, index: number) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{edu.degree}</h3>
                <h4>{edu.institution} • {edu.year}</h4>
                <div className="education-description">
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

