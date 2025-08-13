import React, { useState } from 'react';
import { Download, User, Briefcase, GraduationCap, Award, Phone, Mail, Home, Plus, Trash2, Eye, FileText, MapPin, Linkedin, Globe, Target, Star, Languages, Heart, Users, BookOpen, Calendar, GraduationCap as Training, Users as Members, UserCheck } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface ProfessionalSummary {
  id: string;
  summary: string;
}

interface KeySkill {
  id: string;
  skill: string;
  proficiency: string;
}

interface ProfessionalExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  grade: string;
  startDate: string;
  endDate: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
}

interface Project {
  id: string;
  name: string;
  technologies: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface Language {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

interface Hobby {
  id: string;
  hobby: string;
}

interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  doi: string;
}

interface Conference {
  id: string;
  name: string;
  location: string;
  date: string;
  presentation: string;
}

interface TrainingProgram {
  id: string;
  name: string;
  provider: string;
  date: string;
  duration: string;
}

interface ProfessionalMembership {
  id: string;
  organization: string;
  membershipType: string;
  memberSince: string;
}

interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export const CVCreator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  });

  const [professionalSummary, setProfessionalSummary] = useState<ProfessionalSummary>({
    id: '1',
    summary: ''
  });

  const [keySkills, setKeySkills] = useState<KeySkill[]>([]);
  const [professionalExperience, setProfessionalExperience] = useState<ProfessionalExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [volunteerExperience, setVolunteerExperience] = useState<VolunteerExperience[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [professionalMemberships, setProfessionalMemberships] = useState<ProfessionalMembership[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      technologies: '',
      description: '',
      startDate: '',
      endDate: ''
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  // Key Skills functions
  const addKeySkill = () => {
    const newSkill: KeySkill = {
      id: Date.now().toString(),
      skill: '',
      proficiency: ''
    };
    setKeySkills([...keySkills, newSkill]);
  };

  const updateKeySkill = (id: string, field: keyof KeySkill, value: string) => {
    setKeySkills(keySkills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeKeySkill = (id: string) => {
    setKeySkills(keySkills.filter(skill => skill.id !== id));
  };

  // Professional Experience functions
  const addProfessionalExperience = () => {
    const newExp: ProfessionalExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    setProfessionalExperience([...professionalExperience, newExp]);
  };

  const updateProfessionalExperience = (id: string, field: keyof ProfessionalExperience, value: any) => {
    setProfessionalExperience(professionalExperience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeProfessionalExperience = (id: string) => {
    setProfessionalExperience(professionalExperience.filter(exp => exp.id !== id));
  };

  // Certification functions
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: ''
    };
    setCertifications([...certifications, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  // Achievement functions
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: ''
    };
    setAchievements([...achievements, newAchievement]);
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setAchievements(achievements.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  // Language functions
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: '',
      proficiency: 'Intermediate'
    };
    setLanguages([...languages, newLanguage]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  // Hobby functions
  const addHobby = () => {
    const newHobby: Hobby = {
      id: Date.now().toString(),
      hobby: ''
    };
    setHobbies([...hobbies, newHobby]);
  };

  const updateHobby = (id: string, field: keyof Hobby, value: string) => {
    setHobbies(hobbies.map(hobby => 
      hobby.id === id ? { ...hobby, [field]: value } : hobby
    ));
  };

  const removeHobby = (id: string) => {
    setHobbies(hobbies.filter(hobby => hobby.id !== id));
  };

  // Volunteer Experience functions
  const addVolunteerExperience = () => {
    const newVolunteer: VolunteerExperience = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setVolunteerExperience([...volunteerExperience, newVolunteer]);
  };

  const updateVolunteerExperience = (id: string, field: keyof VolunteerExperience, value: string) => {
    setVolunteerExperience(volunteerExperience.map(vol => 
      vol.id === id ? { ...vol, [field]: value } : vol
    ));
  };

  const removeVolunteerExperience = (id: string) => {
    setVolunteerExperience(volunteerExperience.filter(vol => vol.id !== id));
  };

  // Publication functions
  const addPublication = () => {
    const newPub: Publication = {
      id: Date.now().toString(),
      title: '',
      authors: '',
      journal: '',
      date: '',
      doi: ''
    };
    setPublications([...publications, newPub]);
  };

  const updatePublication = (id: string, field: keyof Publication, value: string) => {
    setPublications(publications.map(pub => 
      pub.id === id ? { ...pub, [field]: value } : pub
    ));
  };

  const removePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  // Conference functions
  const addConference = () => {
    const newConf: Conference = {
      id: Date.now().toString(),
      name: '',
      location: '',
      date: '',
      presentation: ''
    };
    setConferences([...conferences, newConf]);
  };

  const updateConference = (id: string, field: keyof Conference, value: string) => {
    setConferences(conferences.map(conf => 
      conf.id === id ? { ...conf, [field]: value } : conf
    ));
  };

  const removeConference = (id: string) => {
    setConferences(conferences.filter(conf => conf.id !== conf.id));
  };

  // Training Program functions
  const addTrainingProgram = () => {
    const newTraining: TrainingProgram = {
      id: Date.now().toString(),
      name: '',
      provider: '',
      date: '',
      duration: ''
    };
    setTrainingPrograms([...trainingPrograms, newTraining]);
  };

  const updateTrainingProgram = (id: string, field: keyof TrainingProgram, value: string) => {
    setTrainingPrograms(trainingPrograms.map(training => 
      training.id === id ? { ...training, [field]: value } : training
    ));
  };

  const removeTrainingProgram = (id: string) => {
    setTrainingPrograms(trainingPrograms.filter(training => training.id !== id));
  };

  // Professional Membership functions
  const addProfessionalMembership = () => {
    const newMembership: ProfessionalMembership = {
      id: Date.now().toString(),
      organization: '',
      membershipType: '',
      memberSince: ''
    };
    setProfessionalMemberships([...professionalMemberships, newMembership]);
  };

  const updateProfessionalMembership = (id: string, field: keyof ProfessionalMembership, value: string) => {
    setProfessionalMemberships(professionalMemberships.map(membership => 
      membership.id === id ? { ...membership, [field]: value } : membership
    ));
  };

  const removeProfessionalMembership = (id: string) => {
    setProfessionalMemberships(professionalMemberships.filter(membership => membership.id !== id));
  };

  // Reference functions
  const addReference = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: ''
    };
    setReferences([...references, newRef]);
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setReferences(references.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    ));
  };

  const removeReference = (id: string) => {
    setReferences(references.filter(ref => ref.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      grade: '',
      startDate: '',
      endDate: ''
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const downloadCV = () => {
    const cvElement = document.getElementById('cv-preview');
    if (!cvElement) return;

    html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: cvElement.scrollWidth,
      height: cvElement.scrollHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${personalInfo.fullName || 'CV'}.pdf`);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      // Fallback to HTML download
      const htmlContent = generateCVHTML();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${personalInfo.fullName || 'CV'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const generateCVHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName || 'CV'}</title>
    <style>
        body { 
            font-family: 'Roboto', Arial, sans-serif; 
            line-height: 1.3; 
            margin: 0; 
            padding: 0; 
            color: #000; 
            background: white;
            font-size: 10px;
        }
        .cv-container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 24px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .header { 
            text-align: center; 
            margin-bottom: 24px; 
            padding-top: 24px;
        }
        .name { 
            font-size: 1.5rem; 
            font-weight: bold; 
            color: #000; 
            margin-bottom: 8px; 
            font-family: 'Roboto', Arial, sans-serif;
        }
        .title { 
            font-size: 1.125rem; 
            color: #000; 
            margin-bottom: 16px; 
            text-transform: uppercase;
            font-weight: 500;
        }
        .contact-info { 
            display: flex; 
            justify-content: center; 
            gap: 16px; 
            flex-wrap: wrap; 
            margin-bottom: 16px;
            font-size: 10px;
        }
        .contact-item { 
            display: flex; 
            align-items: center; 
            gap: 4px; 
            color: #000;
            font-weight: 500;
        }
        .contact-icon {
            width: 12px;
            height: 12px;
            color: #2563eb;
        }
        .header-divider {
            border-top: 1px solid #000;
            margin-top: 16px;
        }
        .section { 
            margin-bottom: 16px; 
            padding: 0 24px;
        }
        .section-title { 
            font-size: 10px; 
            font-weight: bold; 
            color: #2563eb; 
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .section-divider {
            border-bottom: 1px solid #000;
            padding-bottom: 4px;
            margin-bottom: 8px;
        }
        .experience-item, .education-item, .project-item, .volunteer-item { 
            margin-bottom: 8px; 
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .experience-content, .education-content, .project-content, .volunteer-content {
            flex: 1;
            padding-right: 12px;
        }
        .position-name, .institution-name, .project-name, .role-name { 
            font-weight: bold; 
            font-size: 10px; 
            color: #000;
        }
        .company-name, .degree-info, .project-tech, .organization-name { 
            color: #000; 
            font-size: 10px;
        }
        .job-description, .project-description, .volunteer-description {
            color: #000;
            font-size: 10px;
            margin-top: 4px;
            margin-left: 12px;
        }
        .experience-date, .education-date, .project-date, .volunteer-date { 
            color: #000; 
            font-size: 10px; 
            text-align: right;
            font-weight: 500;
            min-width: 70px;
        }
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap-x: 16px;
            gap-y: 4px;
        }
        .skills-item {
            font-size: 10px;
        }
        .skills-label {
            font-weight: bold;
            color: #000;
        }
        .skills-value {
            color: #000;
            margin-left: 4px;
        }
        .certifications-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap-x: 16px;
            gap-y: 8px;
        }
        .certification-item {
            font-size: 10px;
        }
        .certification-name {
            font-weight: bold;
            color: #000;
        }
        .certification-details {
            color: #000;
        }
        .achievements-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap-x: 16px;
            gap-y: 8px;
        }
        .achievement-item {
            font-size: 10px;
        }
        .achievement-title {
            font-weight: bold;
            color: #000;
        }
        .achievement-description {
            color: #000;
        }
        .achievement-date {
            color: #6b7280;
            font-size: 10px;
        }
        .languages-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap-x: 16px;
            gap-y: 4px;
        }
        .language-item {
            font-size: 10px;
        }
        .language-label {
            font-weight: bold;
            color: #000;
        }
        .language-value {
            color: #000;
            margin-left: 4px;
        }
        .hobbies-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap-x: 16px;
            gap-y: 4px;
        }
        .hobby-item {
            font-size: 10px;
            color: #000;
        }
        .publications-list, .conferences-list, .training-list, .memberships-list, .references-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .publication-item, .conference-item, .training-item, .membership-item, .reference-item {
            font-size: 10px;
        }
        .item-title {
            font-weight: bold;
            color: #000;
        }
        .item-details {
            color: #000;
        }
        .summary-text {
            line-height: 1.5;
            font-size: 10px;
            color: #000;
        }
        @media print { 
            body { margin: 0; padding: 0; } 
            .cv-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <div class="name">${personalInfo.fullName || 'Your Name'}</div>
            <div class="title">${personalInfo.title || 'Your Title'}</div>
            <div class="contact-info">
                ${personalInfo.email ? `<div class="contact-item">📧 ${personalInfo.email}</div>` : ''}
                ${personalInfo.phone ? `<div class="contact-item">📞 ${personalInfo.phone}</div>` : ''}
                ${personalInfo.location ? `<div class="contact-item">📍 ${personalInfo.location}</div>` : ''}
                ${personalInfo.linkedin ? `<div class="contact-item">🔗 ${personalInfo.linkedin}</div>` : ''}
                ${personalInfo.website ? `<div class="contact-item">🌐 ${personalInfo.website}</div>` : ''}
            </div>
            <div class="header-divider"></div>
        </div>

        ${professionalSummary.summary && professionalSummary.summary.trim() !== '' ? `
        <div class="section">
            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <div class="section-divider"></div>
            <div class="summary-text">${professionalSummary.summary}</div>
        </div>
        ` : ''}

        ${keySkills.length > 0 && keySkills.some(skill => skill.skill && skill.skill.trim() !== '') ? `
        <div class="section">
            <div class="section-title">SKILLS</div>
            <div class="section-divider"></div>
            <div class="skills-grid">
                ${keySkills
                  .filter(skill => skill.skill && skill.skill.trim() !== '')
                  .map(skill => `
                <div class="skills-item">
                    <span class="skills-label">${skill.skill}:</span>
                    <span class="skills-value">${skill.proficiency}</span>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${professionalExperience.length > 0 && professionalExperience.some(exp => exp.position && exp.position.trim() !== '') ? `
        <div class="section">
            <div class="section-title">PROFESSIONAL EXPERIENCE</div>
            <div class="section-divider"></div>
            ${professionalExperience
              .filter(exp => exp.position && exp.position.trim() !== '')
              .map(exp => `
            <div class="experience-item">
                <div class="experience-content">
                    <div class="position-name">${exp.position}</div>
                    <div class="company-name">${exp.company}</div>
                    ${exp.description && exp.description.trim() !== '' ? `<div class="job-description">• ${exp.description}</div>` : ''}
                </div>
                <div class="experience-date">${exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : ''}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${education.length > 0 && education.some(edu => edu.institution && edu.institution.trim() !== '') ? `
        <div class="section">
            <div class="section-title">EDUCATION</div>
            <div class="section-divider"></div>
            ${education
              .filter(edu => edu.institution && edu.institution.trim() !== '')
              .map(edu => `
            <div class="education-item">
                <div class="education-content">
                    <div class="institution-name">${edu.institution}</div>
                    <div class="degree-info">${edu.degree}</div>
                </div>
                <div class="education-date">${edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${certifications.length > 0 && certifications.some(cert => cert.name && cert.name.trim() !== '') ? `
        <div class="section">
            <div class="section-title">CERTIFICATIONS</div>
            <div class="section-divider"></div>
            <div class="certifications-grid">
                ${certifications
                  .filter(cert => cert.name && cert.name.trim() !== '')
                  .map(cert => `
                <div class="certification-item">
                    <div class="certification-name">${cert.name}</div>
                    <div class="certification-details">
                        ${cert.issuer && cert.date ? `${cert.issuer} | ${cert.date}` : cert.issuer || cert.date}
                    </div>
                    ${cert.expiryDate && cert.expiryDate.trim() !== '' ? `<div class="certification-details">Expires: ${cert.expiryDate}</div>` : ''}
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${projects.length > 0 && projects.some(project => project.name && project.name.trim() !== '') ? `
        <div class="section">
            <div class="section-title">PROJECTS</div>
            <div class="section-divider"></div>
            ${projects
              .filter(project => project.name && project.name.trim() !== '')
              .map(project => `
            <div class="project-item">
                <div class="project-content">
                    <div class="project-name">
                        ${project.name} ${project.technologies && project.technologies.trim() !== '' ? `|| ${project.technologies}` : ''}
                    </div>
                    ${project.description && project.description.trim() !== '' ? `<div class="project-description">• ${project.description}</div>` : ''}
                </div>
                <div class="project-date">${project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : ''}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${achievements.length > 0 && achievements.some(achievement => achievement.title && achievement.title.trim() !== '') ? `
        <div class="section">
            <div class="section-title">ACHIEVEMENTS</div>
            <div class="section-divider"></div>
            <div class="achievements-grid">
                ${achievements
                  .filter(achievement => achievement.title && achievement.title.trim() !== '')
                  .map(achievement => `
                <div class="achievement-item">
                    <div class="achievement-title">${achievement.title}</div>
                    ${achievement.description && achievement.description.trim() !== '' ? `<div class="achievement-description">${achievement.description}</div>` : ''}
                    ${achievement.date && achievement.date.trim() !== '' ? `<div class="achievement-date">${achievement.date}</div>` : ''}
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${languages.length > 0 && languages.some(lang => lang.language && lang.language.trim() !== '') ? `
        <div class="section">
            <div class="section-title">LANGUAGES</div>
            <div class="section-divider"></div>
            <div class="languages-grid">
                ${languages
                  .filter(lang => lang.language && lang.language.trim() !== '')
                  .map(lang => `
                <div class="language-item">
                    <span class="language-label">${lang.language}:</span>
                    <span class="language-value">${lang.proficiency}</span>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${hobbies.length > 0 && hobbies.some(hobby => hobby.hobby && hobby.hobby.trim() !== '') ? `
        <div class="section">
            <div class="section-title">HOBBIES & INTERESTS</div>
            <div class="section-divider"></div>
            <div class="hobbies-grid">
                ${hobbies
                  .filter(hobby => hobby.hobby && hobby.hobby.trim() !== '')
                  .map(hobby => `
                <div class="hobby-item">• ${hobby.hobby}</div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${volunteerExperience.length > 0 && volunteerExperience.some(vol => vol.role && vol.role.trim() !== '') ? `
        <div class="section">
            <div class="section-title">VOLUNTEER EXPERIENCE</div>
            <div class="section-divider"></div>
            ${volunteerExperience
              .filter(vol => vol.role && vol.role.trim() !== '')
              .map(vol => `
            <div class="volunteer-item">
                <div class="volunteer-content">
                    <div class="role-name">${vol.role}</div>
                    <div class="organization-name">${vol.organization}</div>
                    ${vol.description && vol.description.trim() !== '' ? `<div class="volunteer-description">• ${vol.description}</div>` : ''}
                </div>
                <div class="volunteer-date">${vol.startDate && vol.endDate ? `${vol.startDate} - ${vol.endDate}` : ''}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${publications.length > 0 && publications.some(pub => pub.title && pub.title.trim() !== '') ? `
        <div class="section">
            <div class="section-title">PUBLICATIONS</div>
            <div class="section-divider"></div>
            <div class="publications-list">
                ${publications
                  .filter(pub => pub.title && pub.title.trim() !== '')
                  .map(pub => `
                <div class="publication-item">
                    <div class="item-title">${pub.title}</div>
                    <div class="item-details">
                        ${pub.authors && pub.journal && pub.date ? `${pub.authors} | ${pub.journal} | ${pub.date}` : 
                         pub.authors && pub.journal ? `${pub.authors} | ${pub.journal}` :
                         pub.authors || pub.journal || pub.date}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${conferences.length > 0 && conferences.some(conf => conf.name && conf.name.trim() !== '') ? `
        <div class="section">
            <div class="section-title">CONFERENCES</div>
            <div class="section-divider"></div>
            <div class="conferences-list">
                ${conferences
                  .filter(conf => conf.name && conf.name.trim() !== '')
                  .map(conf => `
                <div class="conference-item">
                    <div class="item-title">${conf.name}</div>
                    <div class="item-details">
                        ${conf.location && conf.date ? `${conf.location} | ${conf.date}` : conf.location || conf.date}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${trainingPrograms.length > 0 && trainingPrograms.some(training => training.name && training.name.trim() !== '') ? `
        <div class="section">
            <div class="section-title">TRAINING PROGRAMS</div>
            <div class="section-divider"></div>
            <div class="training-list">
                ${trainingPrograms
                  .filter(training => training.name && training.name.trim() !== '')
                  .map(training => `
                <div class="training-item">
                    <div class="item-title">${training.name}</div>
                    <div class="item-details">
                        ${training.provider && training.date && training.duration ? 
                         `${training.provider} | ${training.date} | ${training.duration}` :
                         training.provider && training.date ? `${training.provider} | ${training.date}` :
                         training.provider || training.date || training.duration}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${professionalMemberships.length > 0 && professionalMemberships.some(membership => membership.organization && membership.organization.trim() !== '') ? `
        <div class="section">
            <div class="section-title">PROFESSIONAL MEMBERSHIPS</div>
            <div class="section-divider"></div>
            <div class="memberships-list">
                ${professionalMemberships
                  .filter(membership => membership.organization && membership.organization.trim() !== '')
                  .map(membership => `
                <div class="membership-item">
                    <div class="item-title">${membership.organization}</div>
                    <div class="item-details">
                        ${membership.membershipType && membership.memberSince ? 
                         `${membership.membershipType} | ${membership.memberSince}` :
                         membership.membershipType || membership.memberSince}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${references.length > 0 && references.some(ref => ref.name && ref.name.trim() !== '') ? `
        <div class="section">
            <div class="section-title">REFERENCES</div>
            <div class="section-divider"></div>
            <div class="references-list">
                ${references
                  .filter(ref => ref.name && ref.name.trim() !== '')
                  .map(ref => `
                <div class="reference-item">
                    <div class="item-title">${ref.name}</div>
                    <div class="item-details">
                        ${ref.position && ref.company ? `${ref.position} at ${ref.company}` : ref.position || ref.company}
                    </div>
                    <div class="item-details">
                        ${ref.email && ref.phone ? `${ref.email} | ${ref.phone}` : ref.email || ref.phone}
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>
    `;
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Professional Summary', icon: Target },
    { id: 'keySkills', name: 'Key Skills', icon: Star },
    { id: 'experience', name: 'Professional Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'projects', name: 'Projects', icon: BookOpen },
    { id: 'achievements', name: 'Achievements', icon: Star },
    { id: 'languages', name: 'Languages', icon: Languages },
    { id: 'hobbies', name: 'Hobbies', icon: Heart },
    { id: 'volunteer', name: 'Volunteer Experience', icon: Users },
    { id: 'publications', name: 'Publications', icon: BookOpen },
    { id: 'conferences', name: 'Conferences', icon: Calendar },
    { id: 'training', name: 'Training Programs', icon: Training },
    { id: 'memberships', name: 'Professional Memberships', icon: Members },
    { id: 'references', name: 'References', icon: UserCheck }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional CV Creator</h1>
          <p className="text-gray-600">Create a clean, professional one-page CV template</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CV Sections</h3>
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>Show Preview</span>
                </button>
                
                <button
                  onClick={downloadCV}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={!personalInfo.fullName}
                >
                  <Download className="h-4 w-4 inline mr-2" />
                  Download CV as PDF
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                      <input
                        type="text"
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., FULL STACK DEVELOPER"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your.email@gmail.com"
                        pattern="[a-z0-9._%+-]+@gmail\.com"
                        title="Email must end with gmail.com"
                      />
                      {personalInfo.email && !personalInfo.email.endsWith('@gmail.com') && (
                        <p className="text-red-500 text-xs mt-1">Email must end with @gmail.com</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9+\-\s]/g, '');
                          setPersonalInfo({...personalInfo, phone: value});
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 9876543210"
                        pattern="[0-9+\-\s]+"
                        title="Phone number can only contain numbers, +, -, and spaces"
                      />
                      {personalInfo.phone && !/^[0-9+\-\s]+$/.test(personalInfo.phone) && (
                        <p className="text-red-500 text-xs mt-1">Phone can only contain numbers, +, -, and spaces</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Pune, India"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="text"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="linkedin.com/in/username"
                        pattern="linkedin\.com/in/[a-zA-Z0-9\-_]+"
                        title="LinkedIn URL must be in format: linkedin.com/in/username"
                      />
                      {personalInfo.linkedin && !personalInfo.linkedin.match(/^linkedin\.com\/in\/[a-zA-Z0-9\-_]+$/) && (
                        <p className="text-red-500 text-xs mt-1">LinkedIn must be in format: linkedin.com/in/username</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website/Handle</label>
                      <input
                        type="text"
                        value={personalInfo.website}
                        onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="yourwebsite.com or username"
                        pattern="[a-zA-Z0-9\-_.]+"
                        title="Website can contain letters, numbers, hyphens, dots, and underscores"
                      />
                      {personalInfo.website && !/^[a-zA-Z0-9\-_.]+$/.test(personalInfo.website) && (
                        <p className="text-red-500 text-xs mt-1">Website can only contain letters, numbers, hyphens, dots, and underscores</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Professional Summary Tab */}
              {activeTab === 'summary' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Summary / Career Objective</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                    <textarea
                      rows={6}
                      value={professionalSummary.summary}
                      onChange={(e) => setProfessionalSummary({...professionalSummary, summary: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career goals..."
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      This should be a concise paragraph (3-4 sentences) that summarizes your professional background and career objectives.
                    </p>
                  </div>
                </div>
              )}

              {/* Key Skills Tab */}
              {activeTab === 'keySkills' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Key Skills / Technical Proficiencies</h2>
                    <button
                      onClick={addKeySkill}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Skill</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {keySkills.map(skill => (
                      <div key={skill.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-gray-900">Skill Entry</h3>
                          <button
                            onClick={() => removeKeySkill(skill.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                            <input
                              type="text"
                              value={skill.skill}
                              onChange={(e) => updateKeySkill(skill.id, 'skill', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., JavaScript, Python, Project Management"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level</label>
                            <input
                              type="text"
                              value={skill.proficiency}
                              onChange={(e) => updateKeySkill(skill.id, 'proficiency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Expert, Advanced, Intermediate"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {keySkills.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No skills added yet. Click "Add Skill" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Professional Experience Tab */}
              {activeTab === 'experience' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Professional Experience</h2>
                    <button
                      onClick={addProfessionalExperience}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {professionalExperience.map(exp => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Experience Entry</h3>
                          <button
                            onClick={() => removeProfessionalExperience(exp.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateProfessionalExperience(exp.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Company name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateProfessionalExperience(exp.id, 'position', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Job title"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Validate year is between 1900 and 2024
                                if (value) {
                                  const year = parseInt(value.split('-')[0]);
                                  if (year >= 1900 && year <= 2024) {
                                    updateProfessionalExperience(exp.id, 'startDate', value);
                                  }
                                } else {
                                  updateProfessionalExperience(exp.id, 'startDate', value);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="1900-01"
                              max="2024-12"
                            />
                            {exp.startDate && (() => {
                              const year = parseInt(exp.startDate.split('-')[0]);
                              return year < 1900 || year > 2024;
                            })() && (
                              <p className="text-red-500 text-xs mt-1">Year must be between 1900 and 2024</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Validate year is between 1900 and 2024
                                if (value) {
                                  const year = parseInt(value.split('-')[0]);
                                  if (year >= 1900 && year <= 2024) {
                                    updateProfessionalExperience(exp.id, 'endDate', value);
                                  }
                                } else {
                                  updateProfessionalExperience(exp.id, 'endDate', value);
                                }
                              }}
                              disabled={exp.current}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                              min="1900-01"
                              max="2024-12"
                            />
                            {exp.endDate && (() => {
                              const year = parseInt(exp.endDate.split('-')[0]);
                              return year < 1900 || year > 2024;
                            })() && (
                              <p className="text-red-500 text-xs mt-1">Year must be between 1900 and 2024</p>
                            )}
                            <div className="mt-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={exp.current}
                                  onChange={(e) => updateProfessionalExperience(exp.id, 'current', e.target.checked)}
                                  className="mr-2"
                                />
                                <span className="text-sm text-gray-600">Currently working here</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                          <textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateProfessionalExperience(exp.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {professionalExperience.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No work experience added yet. Click "Add Experience" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                    <button
                      onClick={addEducation}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Education</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {education.map(edu => (
                      <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Education Entry</h3>
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="School/College/University name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Degree & Grade</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Master of Computer Applications - 7.43"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Validate year is between 1900 and 2024
                                if (value) {
                                  const year = parseInt(value.split('-')[0]);
                                  if (year >= 1900 && year <= 2024) {
                                    updateEducation(edu.id, 'startDate', value);
                                  }
                                } else {
                                  updateEducation(edu.id, 'startDate', value);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="1900-01"
                              max="2024-12"
                            />
                            {edu.startDate && (() => {
                              const year = parseInt(edu.startDate.split('-')[0]);
                              return year < 1900 || year > 2024;
                            })() && (
                              <p className="text-red-500 text-xs mt-1">Year must be between 1900 and 2024</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Validate year is between 1900 and 2024
                                if (value) {
                                  const year = parseInt(value.split('-')[0]);
                                  if (year >= 1900 && year <= 2024) {
                                    updateEducation(edu.id, 'endDate', value);
                                  }
                                } else {
                                  updateEducation(edu.id, 'endDate', value);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="1900-01"
                              max="2024-12"
                            />
                            {edu.endDate && (() => {
                              const year = parseInt(edu.endDate.split('-')[0]);
                              return year < 1900 || year > 2024;
                            })() && (
                              <p className="text-red-500 text-xs mt-1">Year must be between 1900 and 2024</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {education.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No education added yet. Click "Add Education" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Add other tabs here - I'll continue in the next edit */}
              
              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
                    <button
                      onClick={addCertification}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Certification</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {certifications.map(cert => (
                      <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Certification Entry</h3>
                          <button
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., AWS Certified Solutions Architect"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Amazon Web Services"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Earned</label>
                            <input
                              type="month"
                              value={cert.date}
                              onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                            <input
                              type="month"
                              value={cert.expiryDate}
                              onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Leave empty if no expiry"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {certifications.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No certifications added yet. Click "Add Certification" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                    <button
                      onClick={addProject}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {projects.map(project => (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Project Entry</h3>
                          <button
                            onClick={() => removeProject(project.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Project name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                            <input
                              type="text"
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., MongoDB, Express.js, React, Node.js"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="month"
                              value={project.startDate}
                              onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={project.endDate}
                              onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Project Description (Optional)</label>
                          <textarea
                            rows={2}
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Brief description of the project..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {projects.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No projects added yet. Click "Add Project" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Achievements / Awards</h2>
                    <button
                      onClick={addAchievement}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Achievement</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {achievements.map(achievement => (
                      <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Achievement Entry</h3>
                          <button
                            onClick={() => removeAchievement(achievement.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Title</label>
                            <input
                              type="text"
                              value={achievement.title}
                              onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Employee of the Year, Best Project Award"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Received</label>
                            <input
                              type="month"
                              value={achievement.date}
                              onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            rows={3}
                            value={achievement.description}
                            onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe the achievement, criteria, and significance..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {achievements.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No achievements added yet. Click "Add Achievement" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Languages Tab */}
              {activeTab === 'languages' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
                    <button
                      onClick={addLanguage}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Language</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {languages.map(language => (
                      <div key={language.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-gray-900">Language Entry</h3>
                          <button
                            onClick={() => removeLanguage(language.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <input
                              type="text"
                              value={language.language}
                              onChange={(e) => updateLanguage(language.id, 'language', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., English, Spanish, French"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level</label>
                            <select
                              value={language.proficiency}
                              onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Basic">Basic</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Native">Native</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {languages.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Languages className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No languages added yet. Click "Add Language" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hobbies Tab */}
              {activeTab === 'hobbies' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Hobbies / Interests</h2>
                    <button
                      onClick={addHobby}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Hobby</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {hobbies.map(hobby => (
                      <div key={hobby.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-gray-900">Hobby Entry</h3>
                          <button
                            onClick={() => removeHobby(hobby.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hobby / Interest</label>
                          <input
                            type="text"
                            value={hobby.hobby}
                            onChange={(e) => updateHobby(hobby.id, 'hobby', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Reading, Photography, Travel, Cooking"
                          />
                        </div>
                      </div>
                    ))}
                    
                    {hobbies.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No hobbies added yet. Click "Add Hobby" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Volunteer Experience Tab */}
              {activeTab === 'volunteer' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Volunteer Experience</h2>
                    <button
                      onClick={addVolunteerExperience}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Volunteer Experience</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {volunteerExperience.map(vol => (
                      <div key={vol.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Volunteer Entry</h3>
                          <button
                            onClick={() => removeVolunteerExperience(vol.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                            <input
                              type="text"
                              value={vol.organization}
                              onChange={(e) => updateVolunteerExperience(vol.id, 'organization', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Organization name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <input
                              type="text"
                              value={vol.role}
                              onChange={(e) => updateVolunteerExperience(vol.id, 'role', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Your role or position"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                            <input
                              type="month"
                              value={vol.startDate}
                              onChange={(e) => updateVolunteerExperience(vol.id, 'startDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={vol.endDate}
                              onChange={(e) => updateVolunteerExperience(vol.id, 'endDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            rows={3}
                            value={vol.description}
                            onChange={(e) => updateVolunteerExperience(vol.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your volunteer work and contributions..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {volunteerExperience.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No volunteer experience added yet. Click "Add Volunteer Experience" to get started.</p>
                      </div>
                      )}
                  </div>
                </div>
              )}

              {/* Publications Tab */}
              {activeTab === 'publications' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Publications / Research Papers</h2>
                    <button
                      onClick={addPublication}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Publication</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {publications.map(pub => (
                      <div key={pub.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Publication Entry</h3>
                          <button
                            onClick={() => removePublication(pub.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Publication Title</label>
                            <input
                              type="text"
                              value={pub.title}
                              onChange={(e) => updatePublication(pub.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Title of the publication"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Authors</label>
                            <input
                              type="text"
                              value={pub.authors}
                              onChange={(e) => updatePublication(pub.id, 'authors', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Author names (include yourself)"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Journal/Conference</label>
                            <input
                              type="text"
                              value={pub.journal}
                              onChange={(e) => updatePublication(pub.id, 'journal', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Journal or conference name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date</label>
                            <input
                              type="month"
                              value={pub.date}
                              onChange={(e) => updatePublication(pub.id, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">DOI (Optional)</label>
                            <input
                              type="text"
                              value={pub.doi}
                              onChange={(e) => updatePublication(pub.id, 'doi', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Digital Object Identifier"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {publications.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No publications added yet. Click "Add Publication" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Conferences Tab */}
              {activeTab === 'conferences' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Conferences / Workshops Attended</h2>
                    <button
                      onClick={addConference}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Conference</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {conferences.map(conf => (
                      <div key={conf.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Conference Entry</h3>
                          <button
                            onClick={() => removeConference(conf.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Conference Name</label>
                            <input
                              type="text"
                              value={conf.name}
                              onChange={(e) => updateConference(conf.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Conference or workshop name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                              type="text"
                              value={conf.location}
                              onChange={(e) => updateConference(conf.id, 'location', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="City, Country"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                              type="month"
                              value={conf.date}
                              onChange={(e) => updateConference(conf.id, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Presentation (Optional)</label>
                            <input
                              type="text"
                              value={conf.presentation}
                              onChange={(e) => updateConference(conf.id, 'presentation', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Title of your presentation if any"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {conferences.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No conferences added yet. Click "Add Conference" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Training Programs Tab */}
              {activeTab === 'training' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Training Programs</h2>
                    <button
                      onClick={addTrainingProgram}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Training Program</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {trainingPrograms.map(training => (
                      <div key={training.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Training Entry</h3>
                          <button
                            onClick={() => removeTrainingProgram(training.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Training Name</label>
                            <input
                              type="text"
                              value={training.name}
                              onChange={(e) => updateTrainingProgram(training.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Training program name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                            <input
                              type="text"
                              value={training.provider}
                              onChange={(e) => updateTrainingProgram(training.id, 'provider', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Training provider or organization"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                              type="month"
                              value={training.date}
                              onChange={(e) => updateTrainingProgram(training.id, 'date', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                            <input
                              type="text"
                              value={training.duration}
                              onChange={(e) => updateTrainingProgram(training.id, 'duration', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., 2 weeks, 40 hours"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {trainingPrograms.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No training programs added yet. Click "Add Training Program" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Professional Memberships Tab */}
              {activeTab === 'memberships' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Professional Memberships</h2>
                    <button
                      onClick={addProfessionalMembership}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Membership</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {professionalMemberships.map(membership => (
                      <div key={membership.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Membership Entry</h3>
                          <button
                            onClick={() => removeProfessionalMembership(membership.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                            <input
                              type="text"
                              value={membership.organization}
                              onChange={(e) => updateProfessionalMembership(membership.id, 'organization', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., IEEE, ACM, PMI"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
                            <input
                              type="text"
                              value={membership.membershipType}
                              onChange={(e) => updateProfessionalMembership(membership.id, 'membershipType', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Student Member, Professional Member"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                            <input
                              type="month"
                              value={membership.memberSince}
                              onChange={(e) => updateProfessionalMembership(membership.id, 'memberSince', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {professionalMemberships.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No memberships added yet. Click "Add Membership" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* References Tab */}
              {activeTab === 'references' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">References</h2>
                    <button
                      onClick={addReference}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Reference</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {references.map(ref => (
                      <div key={ref.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Reference Entry</h3>
                          <button
                            onClick={() => removeReference(ref.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                              type="text"
                              value={ref.name}
                              onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Reference person's name"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                            <input
                              type="text"
                              value={ref.position}
                              onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Job title or position"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                            <input
                              type="text"
                              value={ref.company}
                              onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Company or organization"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                              type="email"
                              value={ref.email}
                              onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Email address"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input
                              type="tel"
                              value={ref.phone}
                              onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {references.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No references added yet. Click "Add Reference" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">CV Preview</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={downloadCV}
                  className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="p-6 overflow-y-auto h-full">
              <div id="cv-preview" className="bg-white mx-auto max-w-2xl shadow-lg" style={{ fontFamily: 'Roboto, Arial, sans-serif', lineHeight: '1.3', fontSize: '10px' }}>
                {/* Header Preview */}
                <div className="text-center mb-6 pt-6">
                  <h4 className="font-bold text-2xl text-black mb-2">{personalInfo.fullName || 'Your Name'}</h4>
                  <div className="text-black text-lg uppercase font-medium mb-4">{personalInfo.title || 'Your Title'}</div>
                  <div className="flex justify-center gap-4 text-black text-xs flex-wrap">
                    {personalInfo.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.linkedin && (
                      <div className="flex items-center gap-1">
                        <Linkedin className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{personalInfo.linkedin}</span>
                      </div>
                    )}
                    {personalInfo.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3 text-blue-600" />
                        <span className="font-medium">{personalInfo.website}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-black mt-4"></div>
                </div>

                {/* Professional Summary Preview */}
                {professionalSummary.summary && professionalSummary.summary.trim() !== '' && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">PROFESSIONAL SUMMARY</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <p className="text-black text-xs leading-relaxed">{professionalSummary.summary}</p>
                  </div>
                )}

                {/* Key Skills Preview */}
                {keySkills.length > 0 && keySkills.some(skill => skill.skill && skill.skill.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">SKILLS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {keySkills
                        .filter(skill => skill.skill && skill.skill.trim() !== '')
                        .map(skill => (
                          <div key={skill.id} className="text-xs">
                            <span className="font-bold text-black">{skill.skill}:</span>
                            <span className="text-black ml-1">{skill.proficiency}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Professional Experience Preview */}
                {professionalExperience.length > 0 && professionalExperience.some(exp => exp.position && exp.position.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">PROFESSIONAL EXPERIENCE</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    {professionalExperience
                      .filter(exp => exp.position && exp.position.trim() !== '')
                      .map(exp => (
                        <div key={exp.id} className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-3">
                            <div className="font-bold text-black text-xs">{exp.position}</div>
                            <div className="text-black text-xs">{exp.company}</div>
                            {exp.description && exp.description.trim() !== '' && (
                              <div className="text-black text-xs ml-3 mt-1">• {exp.description}</div>
                            )}
                          </div>
                          <div className="text-black text-right text-xs font-medium min-w-[70px]">
                            {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` : ''}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Education Preview */}
                {education.length > 0 && education.some(edu => edu.institution && edu.institution.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">EDUCATION</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    {education
                      .filter(edu => edu.institution && edu.institution.trim() !== '')
                      .map(edu => (
                        <div key={edu.id} className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-3">
                            <div className="font-bold text-black text-xs">{edu.institution}</div>
                            <div className="text-black text-xs">{edu.degree}</div>
                          </div>
                          <div className="text-black text-right text-xs font-medium min-w-[70px]">
                            {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Certifications Preview */}
                {certifications.length > 0 && certifications.some(cert => cert.name && cert.name.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">CERTIFICATIONS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {certifications
                        .filter(cert => cert.name && cert.name.trim() !== '')
                        .map(cert => (
                          <div key={cert.id} className="text-xs">
                            <div className="font-bold text-black">{cert.name}</div>
                            <div className="text-black">
                              {cert.issuer && cert.date ? `${cert.issuer} | ${cert.date}` : cert.issuer || cert.date}
                            </div>
                            {cert.expiryDate && cert.expiryDate.trim() !== '' && (
                              <div className="text-black text-xs">Expires: {cert.expiryDate}</div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Projects Preview */}
                {projects.length > 0 && projects.some(project => project.name && project.name.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">PROJECTS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    {projects
                      .filter(project => project.name && project.name.trim() !== '')
                      .map(project => (
                        <div key={project.id} className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-3">
                            <div className="font-bold text-black text-xs">
                              {project.name} {project.technologies && project.technologies.trim() !== '' ? `|| ${project.technologies}` : ''}
                            </div>
                            {project.description && project.description.trim() !== '' && (
                              <div className="text-black text-xs ml-3 mt-1">• {project.description}</div>
                            )}
                          </div>
                          <div className="text-black text-right text-xs font-medium min-w-[70px]">
                            {project.startDate && project.endDate ? `${project.startDate} - ${project.endDate}` : ''}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Achievements Preview */}
                {achievements.length > 0 && achievements.some(achievement => achievement.title && achievement.title.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">ACHIEVEMENTS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {achievements
                        .filter(achievement => achievement.title && achievement.title.trim() !== '')
                        .map(achievement => (
                          <div key={achievement.id} className="text-xs">
                            <div className="font-bold text-black">{achievement.title}</div>
                            {achievement.description && achievement.description.trim() !== '' && (
                              <div className="text-black">{achievement.description}</div>
                            )}
                            {achievement.date && achievement.date.trim() !== '' && (
                              <div className="text-black text-gray-600 text-xs">{achievement.date}</div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Languages Preview */}
                {languages.length > 0 && languages.some(lang => lang.language && lang.language.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">LANGUAGES</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                      {languages
                        .filter(lang => lang.language && lang.language.trim() !== '')
                        .map(lang => (
                          <div key={lang.id} className="text-xs">
                            <span className="font-bold text-black">{lang.language}:</span>
                            <span className="text-black ml-1">{lang.proficiency}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Hobbies Preview */}
                {hobbies.length > 0 && hobbies.some(hobby => hobby.hobby && hobby.hobby.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">HOBBIES & INTERESTS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                      {hobbies
                        .filter(hobby => hobby.hobby && hobby.hobby.trim() !== '')
                        .map(hobby => (
                          <div key={hobby.id} className="text-xs">
                            <span className="text-black">• {hobby.hobby}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Volunteer Experience Preview */}
                {volunteerExperience.length > 0 && volunteerExperience.some(vol => vol.role && vol.role.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">VOLUNTEER EXPERIENCE</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    {volunteerExperience
                      .filter(vol => vol.role && vol.role.trim() !== '')
                      .map(vol => (
                        <div key={vol.id} className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-3">
                            <div className="font-bold text-black text-xs">{vol.role}</div>
                            <div className="text-black text-xs">{vol.organization}</div>
                            {vol.description && vol.description.trim() !== '' && (
                              <div className="text-black text-xs ml-3 mt-1">• {vol.description}</div>
                            )}
                          </div>
                          <div className="text-black text-right text-xs font-medium min-w-[70px]">
                            {vol.startDate && vol.endDate ? `${vol.startDate} - ${vol.endDate}` : ''}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Publications Preview */}
                {publications.length > 0 && publications.some(pub => pub.title && pub.title.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">PUBLICATIONS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="space-y-2">
                      {publications
                        .filter(pub => pub.title && pub.title.trim() !== '')
                        .map(pub => (
                          <div key={pub.id} className="text-xs">
                            <div className="font-bold text-black">{pub.title}</div>
                            <div className="text-black">
                              {pub.authors && pub.journal && pub.date ? `${pub.authors} | ${pub.journal} | ${pub.date}` : 
                               pub.authors && pub.journal ? `${pub.authors} | ${pub.journal}` :
                               pub.authors || pub.journal || pub.date}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Conferences Preview */}
                {conferences.length > 0 && conferences.some(conf => conf.name && conf.name.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">CONFERENCES</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="space-y-2">
                      {conferences
                        .filter(conf => conf.name && conf.name.trim() !== '')
                        .map(conf => (
                          <div key={conf.id} className="text-xs">
                            <div className="font-bold text-black">{conf.name}</div>
                            <div className="text-black">
                              {conf.location && conf.date ? `${conf.location} | ${conf.date}` : conf.location || conf.date}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Training Programs Preview */}
                {trainingPrograms.length > 0 && trainingPrograms.some(training => training.name && training.name.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">TRAINING PROGRAMS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="space-y-2">
                      {trainingPrograms
                        .filter(training => training.name && training.name.trim() !== '')
                        .map(training => (
                          <div key={training.id} className="text-xs">
                            <div className="font-bold text-black">{training.name}</div>
                            <div className="text-black">
                              {training.provider && training.date && training.duration ? 
                               `${training.provider} | ${training.date} | ${training.duration}` :
                               training.provider && training.date ? `${training.provider} | ${training.date}` :
                               training.provider || training.date || training.duration}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Professional Memberships Preview */}
                {professionalMemberships.length > 0 && professionalMemberships.some(membership => membership.organization && membership.organization.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">PROFESSIONAL MEMBERSHIPS</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="space-y-2">
                      {professionalMemberships
                        .filter(membership => membership.organization && membership.organization.trim() !== '')
                        .map(membership => (
                          <div key={membership.id} className="text-xs">
                            <div className="font-bold text-black">{membership.organization}</div>
                            <div className="text-black">
                              {membership.membershipType && membership.memberSince ? 
                               `${membership.membershipType} | ${membership.memberSince}` :
                               membership.membershipType || membership.memberSince}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* References Preview */}
                {references.length > 0 && references.some(ref => ref.name && ref.name.trim() !== '') && (
                  <div className="mb-4 px-6">
                    <h5 className="font-bold text-blue-600 text-xs uppercase mb-1">REFERENCES</h5>
                    <div className="border-b border-black pb-1 mb-2"></div>
                    <div className="space-y-2">
                      {references
                        .filter(ref => ref.name && ref.name.trim() !== '')
                        .map(ref => (
                          <div key={ref.id} className="text-xs">
                            <div className="font-bold text-black">{ref.name}</div>
                            <div className="text-black">
                              {ref.position && ref.company ? `${ref.position} at ${ref.company}` : ref.position || ref.company}
                            </div>
                            <div className="text-black">
                              {ref.email && ref.phone ? `${ref.email} | ${ref.phone}` : ref.email || ref.phone}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};