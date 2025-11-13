'use client'

import React from 'react'
import { cvData } from '../data/cvData'
import { FaFilePdf, FaDownload } from 'react-icons/fa'

const PDFGenerator = () => {
  const generatePDF = async () => {
    try {
      const { default: jsPDF } = await import('jspdf')
      const { default: html2canvas } = await import('html2canvas')

      // Create PDF content 
      const createPage1 = () => {
        return `
          <div id="pdf-page-1" style="width: 210mm; min-height: 297mm; padding: 10mm; background: white; color: #2d3748; font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.3; box-sizing: border-box;">
            <!-- Professional Header -->
            <header style="margin-bottom: 4mm; border-bottom: 2px solid #2563eb; padding-bottom: 2mm;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5mm;">
                <div style="flex: 1;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #1e293b; letter-spacing: -0.5px; line-height: 1.1;">
                    ${cvData.personal.name}
                  </h1>
                  <h2 style="margin: 0.5mm 0 0 0; font-size: 18px; font-weight: 500; color: #2563eb; line-height: 1.2;">
                    ${cvData.personal.title}
                  </h2>
                </div>
                <div style="text-align: right; font-size: 11px; color: #64748b; line-height: 1.2;">
                  <div style="margin-bottom: 0.5px;">${cvData.personal.email}</div>
                  <div style="margin-bottom: 0.5px;">${cvData.personal.phone}</div>
                  <div>${cvData.personal.location.replace('\n', ', ')}</div>
                </div>
              </div>
              <div style="display: flex; gap: 2mm; font-size: 11px; color: #475569; margin-top: 0.5mm;">
                ${cvData.personal.website ? `<span>🌐 ${cvData.personal.website}</span>` : ''}
                ${cvData.personal.github ? `<span>💻 ${cvData.personal.github.replace('https://', '')}</span>` : ''}
              </div>
            </header>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 4mm; align-items: start;">
              
              <!-- Left Column - Main Content -->
              <div>
                <!-- Summary -->
                <section style="margin-bottom: 3mm;">
                  <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                    <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Summary
                    </h3>
                  </div>
                  <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.4; text-align: justify;">
                    ${cvData.about}
                  </p>
                </section>

                <!-- Experience -->
                <section style="margin-bottom: 3mm;">
                  <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                    <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Experience
                    </h3>
                  </div>
                  ${cvData.experience.map(exp => `
                    <div style="margin-bottom: 2mm;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3mm;">
                        <div style="flex: 1;">
                          <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #1e293b;">${exp.position}</h4>
                          <h5 style="margin: 0.2mm 0 0 0; font-size: 12px; color: #2563eb; font-weight: 600;">${exp.company}</h5>
                        </div>
                        <span style="color: #64748b; font-size: 10px; font-weight: 500; background: #f1f5f9; padding: 1px 4px; border-radius: 8px; white-space: nowrap;">
                          ${exp.period}
                        </span>
                      </div>
                      <p style="margin: 0.5mm 0 0.5mm 0; font-size: 12px; color: #64748b; line-height: 1.3; white-space: pre-line;">
                        ${exp.description}
                      </p>
                      <div style="display: flex; flex-wrap: wrap; gap: 0.5mm;">
                        ${exp.technologies.map(tech => `
                          <span style="font-size: 9px; color: #475569; background: #f8fafc; padding: 1px 3px; border-radius: 2px; border: 0.5px solid #e2e8f0;">
                            ${tech}
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </section>
              </div>

              <!-- Right Column - Sidebar -->
              <div>
                <!-- Technical Skills -->
                <section style="margin-bottom: 3mm;">
                  <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                    <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Technical Skills
                    </h3>
                  </div>
                  ${Object.entries(cvData.skills).map(([category, skills]) => `
                    <div style="margin-bottom: 1.5mm;">
                      <h4 style="margin: 0 0 0.5mm 0; font-size: 12px; font-weight: 600; color: #374151; padding-left: 0.5mm;">
                        ${category}
                      </h4>
                      <div style="font-size: 10px; color: #475569; display: flex; flex-wrap: wrap; gap: 0.5mm;">
                        ${(skills as any[]).map(skill => `
                          <span style="background: #f8fafc; color: #374151; padding: 1px 3px; border-radius: 2px; border: 0.5px solid #e2e8f0;">
                            ${skill.name}
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </section>

                <!-- Education -->
                <section style="margin-bottom: 3mm;">
                  <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                    <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Education
                    </h3>
                  </div>
                  ${cvData.education.slice(0, 3).map(edu => `
                    <div style="margin-bottom: 1.5mm;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.2mm;">
                        <h4 style="margin: 0; font-size: 12px; font-weight: 600; color: #1e293b; flex: 1;">${edu.degree}</h4>
                        <span style="color: #64748b; font-size: 11px; font-weight: 500; white-space: nowrap;">${edu.year}</span>
                      </div>
                      <p style="margin: 0; font-size: 11px; color: #2563eb; font-weight: 500;">${edu.institution}</p>
                      ${edu.focus ? `<p style="margin: 0.2mm 0 0 0; font-size: 10px; color: #64748b; font-style: italic;">${edu.focus}</p>` : ''}
                    </div>
                  `).join('')}
                </section>
              </div>
            </div>

            <!-- Footer -->
            <footer style="margin-top: 3mm; padding-top: 0.5mm; border-top: 0.5px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 9px; color: #94a3b8;">
                Generated on ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • ${cvData.personal.website} • Page 1 of 2
              </p>
            </footer>
          </div>
        `
      }

      const createPage2 = () => {
        return `
          <div id="pdf-page-2" style="width: 210mm; min-height: 297mm; padding: 10mm; background: white; color: #2d3748; font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.3; box-sizing: border-box;">
            <!-- Page 2 Header -->
            <header style="margin-bottom: 4mm; border-bottom: 2px solid #2563eb; padding-bottom: 2mm;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #1e293b; letter-spacing: -0.5px;">
                ${cvData.personal.name}
              </h1>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5mm;">
                <h2 style="margin: 0; font-size: 16px; font-weight: 500; color: #2563eb;">Page 2 - Projects & Contact</h2>
                <div style="font-size: 11px; color: #64748b;">
                  ${cvData.personal.email} • ${cvData.personal.phone}
                </div>
              </div>
            </header>

            <div style="display: grid; grid-template-columns: 1fr; gap: 4mm;">
              
              <!-- Projects -->
              <section style="margin-bottom: 4mm;">
                <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                  <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                  <h3 style="margin-bottom: 2px; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                    Projects
                  </h3>
                </div>
                ${cvData.projects.map(project => `
                  <div style="margin-bottom: 3mm; padding: 1.5mm; background: #f8fafc; border-radius: 2px; border-left: 2px solid #2563eb;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5mm;">
                      <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #1e293b; flex: 1;">${project.name}</h4>
                      <div style="display: flex; gap: 1mm; font-size: 9px;">
                        ${project.github && project.github !== "None" ? `
                          <span style="color: #2563eb; font-weight: 500; background: #dbeafe; padding: 1px 3px; border-radius: 1px;">GitHub</span>
                        ` : ''}
                        ${project.liveDemo && project.liveDemo !== "None" ? `
                          <span style="color: #059669; font-weight: 500; background: #d1fae5; padding: 1px 3px; border-radius: 1px;">Live Demo</span>
                        ` : ''}
                      </div>
                    </div>
                    <p style="margin: 0.5mm 0 1mm 0; font-size: 12px; color: #64748b; line-height: 1.3;">
                      ${project.description}
                    </p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5mm;">
                      ${project.technologies.map(tech => `
                        <span style="font-size: 11px; color: #0369a1; background: #e0f2fe; padding: 1px 3px; border-radius: 2px; border: 0.5px solid #bae6fd;">
                          ${tech}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </section>

              <!-- Additional Education & Contact -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3mm;">
                
                <!-- Additional Education -->
                <section>
                  <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                    <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Additional Education
                    </h3>
                  </div>
                  ${cvData.education.slice(3, 6).map(edu => `
                    <div style="margin-bottom: 1.5mm;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.2mm;">
                        <h4 style="margin: 0; font-size: 12px; font-weight: 600; color: #1e293b; flex: 1;">${edu.degree}</h4>
                        <span style="color: #64748b; font-size: 11px; font-weight: 500; white-space: nowrap;">${edu.year}</span>
                      </div>
                      <p style="margin: 0; font-size: 11px; color: #2563eb; font-weight: 500;">${edu.institution}</p>
                      ${edu.focus ? `<p style="margin: 0.2mm 0 0 0; font-size: 10px; color: #64748b; font-style: italic;">${edu.focus}</p>` : ''}
                    </div>
                  `).join('')}
                </section>

                <!-- Contact Information -->
                <section>
                  <div style="display: flex; align-items: center; gap: 0.5mm; margin-bottom: 0.5mm;">
                    <div style="width: 2px; height: 16px; background: #2563eb; border-radius: 1px;"></div>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Contact Information
                    </h3>
                  </div>
                  <div style="font-size: 12px; color: #475569; line-height: 1.4;">
                    <div style="margin-bottom: 1mm;">
                      <strong style="color: #374151; display: block; margin-bottom: 0.2mm;">Email</strong>
                      ${cvData.personal.email}
                    </div>
                    <div style="margin-bottom: 1mm;">
                      <strong style="color: #374151; display: block; margin-bottom: 0.2mm;">Phone</strong>
                      ${cvData.personal.phone}
                    </div>
                    <div style="margin-bottom: 1mm;">
                      <strong style="color: #374151; display: block; margin-bottom: 0.2mm;">Location</strong>
                      ${cvData.personal.location.replace('\n', ', ')}
                    </div>
                    ${cvData.personal.website ? `
                      <div style="margin-bottom: 1mm;">
                        <strong style="color: #374151; display: block; margin-bottom: 0.2mm;">Website</strong>
                        ${cvData.personal.website}
                      </div>
                    ` : ''}
                    ${cvData.personal.github ? `
                      <div style="margin-bottom: 1mm;">
                        <strong style="color: #374151; display: block; margin-bottom: 0.2mm;">GitHub</strong>
                        ${cvData.personal.github.replace('https://', '')}
                      </div>
                    ` : ''}
                  </div>
                </section>
              </div>
            </div>

            <!-- Footer -->
            <footer style="margin-top: 4mm; padding-top: 0.5mm; border-top: 0.5px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 9px; color: #94a3b8;">
                Generated on ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • ${cvData.personal.website} • Page 2 of 2
              </p>
            </footer>
          </div>
        `
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Helper function to render a page
      const renderPage = async (htmlContent: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const container = document.createElement('div')
          container.style.position = 'fixed'
          container.style.left = '0'
          container.style.top = '0'
          container.style.width = '210mm'
          container.style.background = 'white'
          container.style.zIndex = '10000'
          container.style.overflow = 'hidden'
          container.innerHTML = htmlContent

          document.body.appendChild(container)

          // Wait for DOM to render
          setTimeout(async () => {
            try {
              const canvas = await html2canvas(container, {
                scale: 3, // High resolution for crisp text
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                removeContainer: true,
                width: container.scrollWidth,
                height: container.scrollHeight,
                windowWidth: container.scrollWidth,
                windowHeight: container.scrollHeight
              })

              const imgData = canvas.toDataURL('image/png', 1.0)
              document.body.removeChild(container)
              resolve(imgData)
            } catch (error) {
              document.body.removeChild(container)
              reject(error)
            }
          }, 100)
        })
      }

      // Render pages
      console.log('Generating PDF...')
      const imgData1 = await renderPage(createPage1())
      pdf.addImage(imgData1, 'PNG', 0, 0, 210, 297)

      pdf.addPage()
      const imgData2 = await renderPage(createPage2())
      pdf.addImage(imgData2, 'PNG', 0, 0, 210, 297)

      console.log('PDF generated successfully')
      pdf.save(`CV_${cvData.personal.name.replace(' ', '_')}.pdf`)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <button className="btn btn-secondary" onClick={generatePDF}>
      <FaDownload className="btn-icon" />
      Generate & Download CV PDF
    </button>
  )
}

export default PDFGenerator
