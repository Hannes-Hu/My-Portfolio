'use client'

import React from 'react'
import { cvData } from '../data/cvData'
import { FaCode, FaLaptopCode, FaServer, FaDatabase, FaLightbulb, FaShieldAlt, FaCloud } from 'react-icons/fa'
import Image from 'next/image'

// Skill logos mapping - add your actual logo paths
const skillLogos: Record<string, string> = {
  'TypeScript': '/logos/typescript.svg',
  'JavaScript': '/logos/javascript.svg',
  'Java': '/logos/java.svg',
  'HTML5': '/logos/html5.svg',
  'CSS3': '/logos/css3.svg',
  'PHP': '/logos/php.svg',
  'Lua': '/logos/lua.svg',
  'Angular 17+': '/logos/angular.svg',
  'React': '/logos/react.svg',
  'RxJS': '/logos/rxjs.svg',
  'Bootstrap': '/logos/bootstrap.svg',
  'Tailwind CSS': '/logos/tailwind.svg',
  'Node.js': '/logos/nodejs.svg',
  'Express.js': '/logos/express.svg',
  'Spring Boot': '/logos/spring.svg',
  'RESTful APIs': '/logos/api.svg',
  'PHP Backend': '/logos/php.svg',
  'MongoDB': '/logos/mongodb.svg',
  'Mongoose ODM': '/logos/mongoose.svg',
  'Database Design': '/logos/database.svg',
  'NgRx': '/logos/ngrx.svg',
  'Redux/Context API': '/logos/redux.svg',
  'Docker': '/logos/docker.svg',
  'Git/GitHub': '/logos/github.svg',
  'PM2': '/logos/pm2.svg',
  'Netlify': '/logos/netlify.svg',
  'JWT Authentication': '/logos/jwt.svg',
  'Microservices Architecture': '/logos/microservices.svg',
  'API Security': '/logos/security.svg',
  'Clean Code Principles': '/logos/cleancode.svg'
}

const Skills = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages': return <FaCode />;
      case 'Frontend Technologies': return <FaLaptopCode />;
      case 'Backend Technologies': return <FaServer />;
      case 'Databases': return <FaDatabase />;
      case 'State Management': return <FaLightbulb />;
      case 'DevOps & Deployment': return <FaCloud />;
      case 'Architecture & Security': return <FaShieldAlt />;
      default: return <FaLightbulb />;
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2><FaLightbulb className="section-icon" /> Technical Skills</h2>
        <div className="skills-grid">
          {Object.entries(cvData.skills).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <div className="category-header">
                <div className="category-icon">
                  {getIcon(category)}
                </div>
                <h3>{category}</h3>
              </div>
              <div className="skills-logos-grid">
                {(skills as any[]).map((skill, index) => (
                  <div key={index} className="skill-logo-item">
                    <div className="skill-logo">
                      {skillLogos[skill.name] ? (
                        <Image 
                          src={skillLogos[skill.name]} 
                          alt={skill.name}
                          width={40}
                          height={40}
                          className="skill-logo-img"
                        />
                      ) : (
                        <div className="skill-logo-fallback">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="skill-logo-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills