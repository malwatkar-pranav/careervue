const mongoose = require('mongoose');

// Import dotenv for environment variables
require('dotenv').config();

// We'll use dynamic imports for ES modules
let Job;
let User;

// Function to initialize models
async function initModels() {
  const JobModule = await import('../models/Job.js');
  const UserModule = await import('../models/User.js');
  Job = JobModule.default;
  User = UserModule.default;
}

const indianJobs = [
  {
    title: 'Software Engineer - Full Stack',
    company: 'Tata Consultancy Services',
    type: 'private',
    location: {
      city: 'Bangalore',
      state: 'Karnataka'
    },
    salary: {
      min: 400000,
      max: 800000
    },
    experience: {
      min: 1,
      max: 3
    },
    description: 'Join TCS as a Full Stack Developer working on cutting-edge projects for global clients. Currently hiring for immediate joining. You will be responsible for developing scalable web applications using modern technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '1-3 years of experience in web development',
      'Proficiency in JavaScript, React, Node.js',
      'Experience with databases (MySQL, MongoDB)',
      'Strong problem-solving skills'
    ],
    benefits: [
      'Health insurance for employee and family',
      'Provident fund and gratuity',
      'Flexible working hours',
      'Professional development opportunities',
      'Annual performance bonus'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'MySQL'],
    deadline: new Date('2024-06-15'),
    category: 'Technology',
    employmentType: 'full-time',
    isPremium: false
  },
  {
    title: 'Civil Services Officer - IAS',
    company: 'Government of India',
    type: 'government',
    location: {
      city: 'New Delhi',
      state: 'Delhi'
    },
    salary: {
      min: 560000,
      max: 1800000
    },
    experience: {
      min: 0,
      max: 0
    },
    description: 'Join the Indian Administrative Service and serve the nation. This prestigious position offers opportunities to work in various government departments and make a significant impact on public policy.',
    requirements: [
      'Bachelor\'s degree from recognized university',
      'Age between 21-32 years (relaxation for reserved categories)',
      'Indian citizenship',
      'Clear UPSC Civil Services Examination',
      'Strong leadership and communication skills'
    ],
    benefits: [
      'Government accommodation',
      'Medical facilities',
      'Pension scheme',
      'Leave travel concession',
      'Job security and prestige'
    ],
    skills: ['Leadership', 'Public Administration', 'Policy Making', 'Communication'],
    deadline: new Date('2024-04-30'),
    category: 'Government',
    employmentType: 'full-time',
    isPremium: true,
    applicationFee: 100
  },
  {
    title: 'Data Analyst Intern',
    company: 'Flipkart',
    type: 'private',
    location: {
      city: 'Bangalore',
      state: 'Karnataka'
    },
    salary: {
      min: 25000,
      max: 40000
    },
    experience: {
      min: 0,
      max: 1
    },
    description: 'Exciting internship opportunity at Flipkart to work with big data and analytics. Summer 2024 internship program now open. You will be part of the data science team analyzing customer behavior and market trends.',
    requirements: [
      'Currently pursuing or recently completed degree in Statistics, Mathematics, or Computer Science',
      'Knowledge of Python, R, or SQL',
      'Understanding of statistical concepts',
      'Experience with data visualization tools',
      'Strong analytical thinking'
    ],
    benefits: [
      'Stipend and performance bonus',
      'Mentorship from senior data scientists',
      'Flexible working hours',
      'Learning and development opportunities',
      'Potential for full-time conversion'
    ],
    skills: ['Python', 'SQL', 'Statistics', 'Data Visualization', 'Excel'],
    deadline: new Date('2024-05-30'),
    category: 'Technology',
    employmentType: 'internship',
    isPremium: false
  },
  {
    title: 'Marketing Manager',
    company: 'Hindustan Unilever Limited',
    type: 'private',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    salary: {
      min: 800000,
      max: 1500000
    },
    experience: {
      min: 3,
      max: 7
    },
    description: 'Lead marketing initiatives for HUL\'s consumer brands. Develop and execute marketing strategies to drive brand growth and consumer engagement across multiple channels.',
    requirements: [
      'MBA in Marketing from premier institute',
      '3-7 years of marketing experience in FMCG',
      'Strong understanding of consumer behavior',
      'Experience in digital marketing',
      'Excellent communication and leadership skills'
    ],
    benefits: [
      'Comprehensive health insurance',
      'Performance-linked incentives',
      'Stock options',
      'Professional development programs',
      'Work-life balance initiatives'
    ],
    skills: ['Marketing Strategy', 'Digital Marketing', 'Brand Management', 'Analytics'],
    deadline: new Date('2024-03-20'),
    category: 'Marketing',
    employmentType: 'full-time',
    isPremium: false
  },
  {
    title: 'Bank Probationary Officer',
    company: 'State Bank of India',
    type: 'government',
    location: {
      city: 'Chennai',
      state: 'Tamil Nadu'
    },
    salary: {
      min: 270000,
      max: 420000
    },
    experience: {
      min: 0,
      max: 2
    },
    description: 'Join SBI as a Probationary Officer and build a career in banking. You will be trained in various banking operations and have opportunities for career growth within the organization.',
    requirements: [
      'Bachelor\'s degree in any discipline',
      'Age between 21-30 years',
      'Clear SBI PO examination',
      'Good communication skills',
      'Basic computer knowledge'
    ],
    benefits: [
      'Job security and stability',
      'Medical benefits',
      'Pension scheme',
      'Housing loan at subsidized rates',
      'Career advancement opportunities'
    ],
    skills: ['Banking Operations', 'Customer Service', 'Financial Analysis', 'Communication'],
    deadline: new Date('2024-03-10'),
    category: 'Banking',
    employmentType: 'full-time',
    isPremium: true,
    applicationFee: 50
  },
  {
    title: 'Software Development Intern',
    company: 'Infosys',
    type: 'private',
    location: {
      city: 'Pune',
      state: 'Maharashtra'
    },
    salary: {
      min: 20000,
      max: 35000
    },
    experience: {
      min: 0,
      max: 0
    },
    description: 'Kickstart your career with Infosys internship program. Work on real projects, learn from industry experts, and get hands-on experience with latest technologies.',
    requirements: [
      'BE/BTech in Computer Science or related field',
      'Strong programming fundamentals',
      'Knowledge of Java, Python, or C++',
      'Good problem-solving skills',
      'Eagerness to learn new technologies'
    ],
    benefits: [
      'Monthly stipend',
      'Training and certification',
      'Mentorship program',
      'Networking opportunities',
      'Potential for full-time offer'
    ],
    skills: ['Java', 'Python', 'Programming', 'Problem Solving'],
    deadline: new Date('2024-02-25'),
    category: 'Technology',
    employmentType: 'internship',
    isPremium: false
  },
  {
    title: 'Financial Analyst',
    company: 'ICICI Bank',
    type: 'private',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    salary: {
      min: 500000,
      max: 900000
    },
    experience: {
      min: 2,
      max: 5
    },
    description: 'Analyze financial data, prepare reports, and support investment decisions at ICICI Bank. Work with cross-functional teams to drive business growth and profitability.',
    requirements: [
      'CA/CFA/MBA in Finance',
      '2-5 years of experience in financial analysis',
      'Strong knowledge of financial modeling',
      'Proficiency in Excel and financial software',
      'Excellent analytical and communication skills'
    ],
    benefits: [
      'Competitive salary and bonuses',
      'Health and life insurance',
      'Retirement benefits',
      'Professional development',
      'Employee banking benefits'
    ],
    skills: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Risk Assessment'],
    deadline: new Date('2024-03-25'),
    category: 'Finance',
    employmentType: 'full-time',
    isPremium: false
  },
  {
    title: 'Teaching Assistant',
    company: 'Indian Institute of Technology Delhi',
    type: 'government',
    location: {
      city: 'New Delhi',
      state: 'Delhi'
    },
    salary: {
      min: 31000,
      max: 35000
    },
    experience: {
      min: 0,
      max: 2
    },
    description: 'Support faculty in teaching and research activities at IIT Delhi. Assist in conducting classes, grading assignments, and mentoring undergraduate students.',
    requirements: [
      'MTech/PhD in relevant engineering discipline',
      'Strong academic record',
      'Good communication skills',
      'Research experience preferred',
      'Passion for teaching'
    ],
    benefits: [
      'Academic environment',
      'Research opportunities',
      'Medical facilities',
      'Library access',
      'Professional development'
    ],
    skills: ['Teaching', 'Research', 'Communication', 'Subject Expertise'],
    deadline: new Date('2024-04-15'),
    category: 'Education',
    employmentType: 'part-time',
    isPremium: false
  },
  {
    title: 'Graduate Trainee Program',
    company: 'Hindustan Unilever Limited',
    type: 'private',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    salary: {
      min: 600000,
      max: 900000
    },
    experience: {
      min: 0,
      max: 1
    },
    description: 'HUL Graduate Trainee Program 2024 - Future Leaders Program. Applications open for fresh graduates. Comprehensive training program with rotations across different business functions.',
    requirements: [
      'MBA from premier institute or Bachelor\'s degree with excellent academic record',
      'Fresh graduate or maximum 1 year experience',
      'Strong leadership potential',
      'Excellent communication skills',
      'Passion for FMCG industry'
    ],
    benefits: [
      'Comprehensive training program',
      'Mentorship from senior leaders',
      'Fast-track career progression',
      'Health and wellness benefits',
      'Performance-linked incentives'
    ],
    skills: ['Leadership', 'Communication', 'Business Analysis', 'Strategic Thinking'],
    deadline: new Date('2024-07-15'),
    category: 'Marketing',
    employmentType: 'full-time',
    isPremium: false
  },
  {
    title: 'Software Development Intern - Summer 2024',
    company: 'Microsoft India',
    type: 'private',
    location: {
      city: 'Hyderabad',
      state: 'Telangana'
    },
    salary: {
      min: 50000,
      max: 75000
    },
    experience: {
      min: 0,
      max: 0
    },
    description: 'Microsoft Summer Internship Program 2024. Work on real products used by millions of users worldwide. Mentorship from experienced engineers and exposure to cutting-edge technologies.',
    requirements: [
      'Currently pursuing Bachelor\'s or Master\'s in Computer Science',
      'Strong programming skills in C#, Java, or Python',
      'Understanding of data structures and algorithms',
      'Previous internship or project experience preferred',
      'Excellent problem-solving abilities'
    ],
    benefits: [
      'Competitive stipend',
      'Housing assistance',
      'Mentorship program',
      'Access to Microsoft technologies',
      'Networking opportunities',
      'Potential for full-time offer'
    ],
    skills: ['C#', 'Java', 'Python', 'Data Structures', 'Algorithms'],
    deadline: new Date('2024-04-30'),
    category: 'Technology',
    employmentType: 'internship',
    isPremium: false
  }
];

const seedJobs = async () => {
  try {
    // Initialize models
    await initModels();
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/careervue');
    
    // Create a default user for posting jobs
    let defaultUser = await User.findOne({ email: 'admin@careervue.com' });
    if (!defaultUser) {
      defaultUser = new User({
        name: 'Careervue Admin',
        email: 'admin@careervue.com',
        password: 'admin123',
        role: 'admin'
      });
      await defaultUser.save();
    }

    // Clear existing jobs
    await Job.deleteMany({});

    // Add postedBy field to all jobs and update deadlines to be in the future
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3); // Set deadline 3 months in the future
    
    const jobsWithUser = indianJobs.map(job => ({
      ...job,
      postedBy: defaultUser._id,
      deadline: futureDate
    }));

    // Insert jobs
    await Job.insertMany(jobsWithUser);
    
    console.log('Jobs seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedJobs()
    .then(() => console.log('Seeding completed successfully'))
    .catch(err => {
      console.error('Error seeding jobs:', err);
      process.exit(1);
    });
}

module.exports = { seedJobs, indianJobs };