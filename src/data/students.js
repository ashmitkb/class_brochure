// Placeholder data — replace once the Google Form + resume collection is
// done. Keep this exact shape so the UI doesn't need to change.
// `photo` should eventually point to a passport-size headshot (portrait,
// roughly 3.5:4.5 ratio) — the grid and drawer are both built around that.

import { img } from "framer-motion/client"

export const classInfo = {
  name: '4th Year BCA',
  program: 'Bachelor of Computer Applications',
  batch: '2023 – 2027',
  department: 'Department of Computer Science',
  campus: 'Christ (Deemed to be University), Yeshwanthpur Campus, Bengaluru',
}

export const students = [
  {
    id: 'stu-001',
    name: 'ALLAMPALLY ABHINAV ',
    photo: "src/data/IMG_7854 - ALLAMPALLY ABHINAV 2343004.jpeg",
    tagline: 'Software engineer',
    bio: 'Software Engineer experienced in  system design, scalability, and high-performance architectures. Experienced in delivering end-to-end products from architecture to deployment with a focus on clean, efficient solutions. Proven ability to simplify complex problems and build fast, reliable systems, with growing expertise in AI-driven and distributed systems. ',
    priorEducation: 'PUC, Bishop Cotton Boys School, Bengaluru',
    technicalSkills: [ 'Python', 'TypeScript', 'JavaScript', 'Java', 'React', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'Docker', 'Git', 'AWS' ],
    professionalSkills: ['Leadership', 'Problem Solving', 'Communication', 'Cross-functional Collaboration', 'Critical Thinking'],
    projects: [
      { title: 'AURA OS | C++, TypeScript, AI   ', desc: 'Developing a Windows-native AI desktop environment with modular architecture, intelligent automation, and adaptive workflows powered by AI orchestration. ', link: '' },
      {title: 'Cortex | TypeScript, AI, Distributed Systems  ', desc: 'Built cognitive infrastructure enabling persistent AI agents through identity continuity, distilled memory, and failure recovery across multi-agent workflows. ', link: '' },
      {title: 'Hands2Words | PyTorch, MediaPipe, OpenCV    ', desc: 'Developed an AI-powered Indian Sign Language translator using computer vision and deep learning to convert real-time hand gestures into text.  ', link: '' },
      {title: 'OmniVerse Market API | FastAPI, Python  ', desc: 'Built a scalable FastAPI backend to aggregate, normalize, and expose prediction market data through standardized REST APIs. ', link: '' },
      {title: 'Capacity Compass | React, TypeScript, FastAPI    ', desc: 'Designed an AI-powered workload forecasting platform that predicts capacity risks and recommends resource allocation through interactive dashboards.  ', link: '' }
      
    ],
    certifications: [`• Ethical Hacking - L&T EduTech \n
  • Python, Kotlin Programming - Infosys Springboard
  • Introduction to Algorithms - edX
  • Python, AI/ML, Advanced Databases - Udemy
  • AWS Academy, Foundations - AWS
  • Cloud Skills Boost, Git Foundations, Data Analytics - Google`],
    email: 'allampally.abhinav@bcah.christuniversity.in ',
    linkedin: 'www.linkedin.com/in/allampallyabhinav',
  },
  {
    id: 'stu-002',
    name: 'Diya Ramanathan',
    photo: 'https://i.pravatar.cc/300?img=32',
    tagline: 'Cybersecurity enthusiast',
    bio: 'Interested in ethical hacking and network security. Spends free time on TryHackMe rooms.',
    priorEducation: 'PUC, Sacred Heart Girls School, Chennai',
    technicalSkills: ['Python', 'Wireshark', 'Linux', 'SQL'],
    professionalSkills: ['Analytical Thinking', 'Attention to Detail'],
    projects: [
      { title: 'Basic Intrusion Detection Script', desc: 'Python script monitoring suspicious login attempts on a local test server.', link: '' },
    ],
    certifications: ['CompTIA Security+ (in progress)'],
    email: 'diya.r@example.com',
    linkedin: '',
  },
  {
    id: 'stu-003',
    name: 'Kabir Anand',
    photo: 'https://i.pravatar.cc/300?img=51',
    tagline: 'Machine Learning hobbyist',
    bio: 'Likes building things that ship, not just notebooks. Currently working on a small computer vision side project.',
    priorEducation: 'PUC, Christ Junior College, Bengaluru',
    technicalSkills: ['Python', 'Pandas', 'Scikit-learn', 'SQL'],
    professionalSkills: ['Ownership', 'Curiosity'],
    projects: [
      { title: 'Plant Disease Classifier', desc: 'CNN model classifying leaf images to detect common crop diseases.', link: '' },
    ],
    certifications: [],
    email: 'kabir.anand@example.com',
    linkedin: '',
  },
  {
    id: 'stu-004',
    name: 'Meera Iyer',
    photo: 'https://i.pravatar.cc/300?img=45',
    tagline: 'Cloud & DevOps',
    bio: 'Started with networking basics, now exploring AWS and containerization. Wants to work in cloud infrastructure.',
    priorEducation: 'PUC, National Public School, Bengaluru',
    technicalSkills: ['AWS', 'Docker', 'Linux', 'Python'],
    professionalSkills: ['Communication', 'Team Collaboration'],
    projects: [
      { title: 'Dockerized Blog App', desc: 'A simple blog app containerized and deployed on AWS EC2.', link: '' },
    ],
    certifications: ['AWS Cloud Practitioner (in progress)'],
    email: 'meera.iyer@example.com',
    linkedin: '',
  },
  {
    id: 'stu-005',
    name: 'Rohan Verma',
    photo: 'https://i.pravatar.cc/300?img=14',
    tagline: 'Data enthusiast',
    bio: 'Enjoys working with spreadsheets and dashboards. Interested in the analyst side of tech rather than pure development.',
    priorEducation: 'PUC, Delhi Public School, Bengaluru',
    technicalSkills: ['SQL', 'Excel', 'Python', 'Tableau'],
    professionalSkills: ['Analytical Thinking', 'Communication'],
    projects: [
      { title: 'Placement Trends Dashboard', desc: 'Tableau dashboard visualizing 3 years of department placement data.', link: '' },
    ],
    certifications: [],
    email: 'rohan.verma@example.com',
    linkedin: '',
  },
  {
    id: 'stu-006',
    name: 'Sneha Pillai',
    photo: 'https://i.pravatar.cc/300?img=47',
    tagline: 'App developer',
    bio: 'Building a habit-tracking app as a side project. Interested in mobile development and clean UI design.',
    priorEducation: 'PUC, Frank Anthony Public School, Bengaluru',
    technicalSkills: ['Flutter', 'Dart', 'Firebase', 'Figma'],
    professionalSkills: ['Creativity', 'Documentation'],
    projects: [
      { title: 'Habit Tracker App', desc: 'Flutter + Firebase app with streaks, reminders, and simple analytics.', link: '' },
    ],
    certifications: [],
    email: 'sneha.pillai@example.com',
    linkedin: '',
  },
]
