const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static('C:\Users\samob\OneDrive\Desktop\SurveyorsDen\Surveyors\frontend'));

// Simple in-memory data storage (replace with a database in production)
let projects = [
  {
    id: 1,
    title: "Commercial Development",
    description: "Boundary survey for a large commercial development in Nairobi's business district.",
    image: "images/project1.jpg",
    client: "ABC Developers Ltd",
    date: "January 2023",
    services: "Land Surveying, Boundary Determination"
  },
  {
    id: 2,
    title: "Residential Complex",
    description: "Topographic survey for a luxury residential complex in Karen.",
    image: "images/project2.jpg",
    client: "Karen Homes Limited",
    date: "March 2023",
    services: "Topographic Mapping, Construction Layout"
  },
  {
    id: 3,
    title: "Infrastructure Planning",
    description: "GIS mapping for road infrastructure development project.",
    image: "images/project3.jpg",
    client: "Kenya National Highways Authority",
    date: "May 2023",
    services: "GIS Mapping, Spatial Analysis"
  }
];

let testimonials = [
  {
    id: 1,
    content: "Surveyors Den Ltd delivered exceptional accuracy on our commercial site survey. Their team was professional and met all deadlines.",
    author: "John Smith",
    position: "Construction Manager, ABC Builders"
  },
  {
    id: 2,
    content: "The GIS mapping services provided crucial insights for our urban planning project. Highly recommended!",
    author: "Sarah Johnson",
    position: "City Planner, Metro Council"
  },
  {
    id: 3,
    content: "We've worked with Surveyors Den on multiple projects and their consistency and attention to detail is impressive.",
    author: "Michael Ochieng",
    position: "Project Director, Kenya Developments"
  }
];

// Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  res.json(project);
});

app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Maybe add to your CRM
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    // For now, we'll just simulate a successful submission
    res.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
