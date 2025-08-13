# CareerVue - Full-Stack Job Portal Platform

## 🚀 Project Overview

CareerVue is a comprehensive, full-stack job portal platform that demonstrates advanced web development skills using modern technologies. This project showcases expertise in building scalable web applications with responsive design, secure authentication, and robust backend services.

## ✨ Key Features

### 🔐 **Authentication & User Management**
- Secure user registration and login system
- JWT-based authentication with bcrypt password hashing
- Protected routes and middleware implementation
- User dashboard with personalized experience

### 💼 **Job Management System**
- Comprehensive job listings with search and filtering
- Job application tracking system
- Company directory with detailed information
- Government jobs section with specialized listings

### 🎨 **CV Builder & Tools**
- Interactive CV creator with real-time preview
- PDF export functionality using jsPDF
- HTML to Canvas conversion for high-quality output
- Professional template designs

### 🏢 **Company & Government Integration**
- Company directory with detailed profiles
- Government jobs portal with specialized listings
- Responsive design for all device types
- Advanced filtering and search capabilities

## 🛠️ Technical Stack

### **Frontend Technologies**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with strict typing
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons

### **Backend Technologies**
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for secure authentication
- **bcryptjs** - Password hashing and security

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Nodemon** - Automatic server restart during development
- **Concurrently** - Run multiple commands simultaneously

## 🏗️ Architecture & Design Patterns

### **Frontend Architecture**
- Component-based architecture with reusable UI components
- Context API for global state management
- Custom hooks for business logic separation
- Responsive design with mobile-first approach
- TypeScript interfaces for type safety

### **Backend Architecture**
- RESTful API design with proper HTTP methods
- Middleware-based architecture for security and logging
- MVC pattern with separate routes, models, and controllers
- Database abstraction with Mongoose schemas
- Error handling middleware with proper HTTP status codes

### **Security Features**
- Helmet.js for security headers
- Rate limiting to prevent abuse
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Secure password storage with bcrypt

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full-featured experience with advanced layouts
- **Tablet** - Optimized touch interface and navigation
- **Mobile** - Mobile-first design with intuitive gestures
- **Cross-browser** - Compatible with modern browsers

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd careervue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start development servers**
   ```bash
   npm run start
   # Runs both frontend and backend concurrently
   ```

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run start` - Start both servers concurrently
- `npm run build` - Build production version
- `npm run lint` - Run ESLint for code quality

## 🗄️ Database Schema

### **User Model**
- Authentication credentials
- Profile information
- Application history
- Preferences and settings

### **Job Model**
- Job details and requirements
- Company information
- Location and salary data
- Application status tracking

### **Application Model**
- User-job relationships
- Application status
- Timestamps and metadata
- Communication history

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get user profile

### **Jobs**
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create new job (admin)
- `PUT /api/jobs/:id` - Update job (admin)

### **Applications**
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get user applications
- `PUT /api/applications/:id` - Update application status

## 🎯 Technical Achievements

### **Performance Optimization**
- Lazy loading of components
- Optimized bundle size with Vite
- Efficient database queries with Mongoose
- Image optimization and lazy loading

### **Code Quality**
- TypeScript for type safety
- ESLint configuration for code consistency
- Component reusability and maintainability
- Clean code architecture and patterns

### **User Experience**
- Intuitive navigation and user flow
- Responsive design across all devices
- Fast loading times and smooth interactions
- Accessibility considerations

## 🌟 Skills Demonstrated

### **Frontend Development**
- React.js with modern hooks and patterns
- TypeScript for type-safe development
- Tailwind CSS for responsive design
- State management and context API
- Component architecture and reusability

### **Backend Development**
- Node.js and Express.js server development
- RESTful API design and implementation
- Database design with MongoDB and Mongoose
- Authentication and authorization systems
- Middleware and error handling

### **DevOps & Tools**
- Git version control
- Package management with npm
- Build tools and bundlers
- Code quality tools (ESLint)
- Development workflow optimization

### **Database & Security**
- NoSQL database design
- User authentication and security
- API security and rate limiting
- Data validation and sanitization
- Environment configuration management

## 📊 Project Metrics

- **Lines of Code**: 2000+ (Frontend + Backend)
- **Components**: 15+ React components
- **API Endpoints**: 20+ RESTful endpoints
- **Database Models**: 4+ Mongoose schemas
- **Dependencies**: 30+ production packages

## 🔮 Future Enhancements

- Real-time notifications
- Advanced search and filtering
- Email integration
- Analytics dashboard
- Mobile app development
- AI-powered job matching

## 📞 Contact & Portfolio

This project demonstrates full-stack development capabilities with modern web technologies. For more information about my skills and experience, please reach out through my portfolio or professional profiles.

---

**Built with ❤️ using React, TypeScript, Node.js, and MongoDB** 