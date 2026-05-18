const PptxGenJS = require('pptxgenjs');

let pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';

// Define Master Slide
pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  background: { color: 'F8F9FA' },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: '2563EB' } } },
    { text: { text: 'OYD: Driver Hiring Platform', options: { x: 0.5, y: 0.15, w: 4, h: 0.5, color: 'FFFFFF', fontSize: 18, bold: true } } },
    { text: { text: 'MCA Final Year Project', options: { x: '70%', y: 0.2, w: '25%', h: 0.4, align: 'right', color: 'FFFFFF', fontSize: 14 } } },
    { rect: { x: 0, y: 5.3, w: '100%', h: 0.3, fill: { color: '1E293B' } } },
  ],
  slideNumber: { x: '95%', y: 5.35, color: 'FFFFFF', fontSize: 12 }
});

const addSlide = (title, bulletPoints) => {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
  slide.addText(title, { x: 0.5, y: 1.0, w: '90%', h: 0.8, fontSize: 32, bold: true, color: '1E293B' });
  
  if (bulletPoints && bulletPoints.length > 0) {
    let items = bulletPoints.map(bp => ({ text: bp, options: { bullet: true, color: '334155', fontSize: 20, breakLine: true, paraSpaceAfter: 15 } }));
    slide.addText(items, { x: 0.5, y: 2.0, w: '90%', h: 3.0, valign: 'top' });
  }
  return slide;
};

const addScreenshotSlide = (title, subtitle) => {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
  slide.addText(title, { x: 0.5, y: 1.0, w: '90%', h: 0.6, fontSize: 32, bold: true, color: '1E293B' });
  slide.addText(subtitle, { x: 0.5, y: 1.6, w: '90%', h: 0.3, fontSize: 16, color: '64748B' });
  // Placeholder box
  slide.addShape(pptx.ShapeType.rect, { 
    x: 1.5, y: 2.0, w: 7, h: 3.2, 
    fill: { color: 'E2E8F0' }, 
    line: { color: '94A3B8', width: 2, dashType: 'dash' } 
  });
  slide.addText(`📸 Insert [${title}] Screenshot Here\n(Right-click -> Change Picture)`, {
    x: 1.5, y: 2.0, w: 7, h: 3.2, align: 'center', valign: 'middle', color: '64748B', fontSize: 16
  });
};

const addCodeSlide = (title, codeString) => {
  let slide = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
  slide.addText(title, { x: 0.5, y: 1.0, w: '90%', h: 0.6, fontSize: 32, bold: true, color: '1E293B' });
  slide.addText(codeString, {
    x: 0.5, y: 1.7, w: 9, h: 3.5,
    fontFace: 'Courier New', fontSize: 12, color: 'D4D4D8',
    fill: { color: '18181B' }, align: 'left', valign: 'top',
    margin: 10
  });
};

// Slide 1: Title
let slide1 = pptx.addSlide();
slide1.background = { color: '2563EB' };
slide1.addText('OYD (Own Your Driver)', { x: 0, y: 2, w: '100%', h: 1, align: 'center', fontSize: 54, bold: true, color: 'FFFFFF' });
slide1.addText('A Premium Driver Hiring Platform', { x: 0, y: 3, w: '100%', h: 1, align: 'center', fontSize: 28, color: 'E2E8F0' });
slide1.addText('MCA Final Year Project', { x: 0, y: 4, w: '100%', h: 0.5, align: 'center', fontSize: 20, color: '93C5FD' });

// Slide 2: Introduction
addSlide('1. Introduction & Abstract', [
  'OYD (Own Your Driver) is a web-based platform connecting verified professional drivers with car owners.',
  'Facilitates hiring drivers for round trips, one-way drops, or local hourly needs.',
  'Eliminates the hassle of negotiating with unverified, informal driver networks.',
  'Provides a centralized, secure, and reputation-based ecosystem for transportation needs.'
]);

// Slide 3: Problem Statement
addSlide('2. Problem Statement', [
  'Difficulty in finding reliable, professional drivers for personal vehicles on short notice.',
  'Lack of trust and security due to unverified backgrounds of informal drivers.',
  'Inconsistent pricing and lack of standardized service quality.',
  'No centralized system to manage bookings, track driver ratings, and ensure accountability.'
]);

// Slide 4: Proposed Solution
addSlide('3. Proposed Solution', [
  'A dedicated platform matching car owners with strictly vetted and rated drivers.',
  'Implementation of a multi-role web application with tailored dashboards.',
  'Transparent pricing model based on trip type, duration, and driver experience.',
  'An integrated admin console to verify driver documents before they can accept rides.',
  'A robust feedback and rating system to maintain high service quality.'
]);

// Slide 5: Key Features
addSlide('4. Key Features', [
  'Role-Based Access: Dedicated portals for Customer, Driver, and Admin.',
  'OTP Authentication: Secure, passwordless login using Fast2SMS API.',
  'Dynamic Trip Creation: Custom forms for round-trip, one-way, and local rentals.',
  'Driver Discovery: Advanced listing with filtering, badges, and ratings.',
  'Status Management: Real-time availability toggles and trip accept/reject workflows.',
  'Feedback Engine: 5-star rating system with categorized issue reporting.'
]);

// Slide 6: Target Audience / Users
addSlide('5. Project Roles & Audience', [
  'Car Owners (Customers): Individuals or families who own a car but need a temporary driver for outstation trips or local errands.',
  'Professional Drivers: Skilled individuals seeking flexible, well-paying gigs driving client vehicles.',
  'Platform Administrators: Support staff verifying documents (License, Aadhaar) and monitoring platform health.'
]);

// Slide 7: Technology Stack
addSlide('6. Technology Stack', [
  'Frontend Framework: React 18 with TypeScript for type-safe components.',
  'Build Tool: Vite for optimized and rapid development.',
  'Routing: React Router DOM for single-page application navigation.',
  'Styling: Custom CSS3 with modern Glassmorphism aesthetics and CSS variables.',
  'Icons: Lucide-React for clean, scalable vector graphics.',
  'External Integrations: Fast2SMS API for OTP verification.'
]);

// Slide 8: System Architecture
addSlide('7. System Architecture Flow', [
  'Client Layer: React Application rendering dynamic components based on the user role.',
  'Routing Layer: Protected routes ensure that only authenticated roles access specific dashboards.',
  'Authentication Service: Fast2SMS API integration for generating and validating OTPs.',
  'State Management: React Hooks (useState, useEffect) for managing complex local states (booking workflows).',
  'Mock API Layer: Designed for future transition to Node.js/Express.js endpoints.'
]);

// Slide 9: Module 1 - Authentication
addSlide('8. Module 1: Authentication', [
  'Mobile-first login approach ensuring real user accounts.',
  'Integrated Fast2SMS API to deliver One-Time Passwords (OTP).',
  'Dynamic role selection during login to route users to the correct dashboard.',
  'Simulated API layer built-in for seamless presentation and testing.'
]);

// Slide 10: UI Screenshot - Customer Login
addScreenshotSlide('Customer Login Interface', 'Users enter their 10-digit mobile number and receive an OTP to proceed.');

// Slide 11: UI Screenshot - Driver Login
addScreenshotSlide('Driver Login Interface', 'Drivers select the "Driver" role toggle to authenticate into their specific dashboard.');

// Slide 12: Code Implementation - OTP Service
addCodeSlide('Code Implementation: Secure OTP Service', `
// src/services/sms.ts
import axios from "axios";

const FAST2SMS_API_KEY = import.meta.env.VITE_FAST2SMS_API_KEY || "YOUR_KEY";

export async function sendOtp({ phone, otp }: {phone: string, otp: string}) {
    try {
        const response = await axios.post("https://www.fast2sms.com/dev/bulkV2",
            { route: "otp", variables_values: otp, numbers: phone },
            { headers: { authorization: FAST2SMS_API_KEY, "Content-Type": "application/json" }}
        );
        return { success: response.data.return === true, data: response.data };
    } catch (error) {
        return { success: false, error: "Failed to send OTP" };
    }
}
`);

// Slide 13: Module 2 - Customer Portal
addSlide('9. Module 2: Customer Portal (Booking)', [
  'Interactive trip configuration form with intuitive UI.',
  'Options to select pickup, drop, date, time, and specific car type (Hatchback, Sedan, SUV, Luxury).',
  'Real-time validation and localized data handling.',
  'Seamless transition from search criteria to matching driver results.'
]);

// Slide 14: UI Screenshot - Booking Form
addScreenshotSlide('Customer Booking Interface', 'Form capturing trip details including route, date, time, and preferred car category.');

// Slide 15: Module 3 - Driver Discovery
addSlide('10. Module 3: Driver Discovery & Selection', [
  'Displays available drivers matching the customer’s route and date requirements.',
  'Detailed driver profiles featuring avatar, name, verification badge, and rating.',
  'Highlights specific driver attributes (e.g., Experience, Total Trips, Daily Rate).',
  'Summary review page before finalizing the booking with advance payment notification.'
]);

// Slide 16: UI Screenshot - Driver Listing
addScreenshotSlide('Driver Discovery Page', 'List of verified drivers matching the search criteria, displaying ratings and rates.');

// Slide 17: Code Implementation - Routing
addCodeSlide('Code Implementation: Core Application Routing', `
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home, Login, DriverDashboard, OwnerDashboard, AdminDashboard } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      
      <Route path="/driver-dashboard" 
             element={<Layout userRole="driver"><DriverDashboard /></Layout>} />
             
      <Route path="/owner-dashboard" 
             element={<Layout userRole="owner"><OwnerDashboard /></Layout>} />
             
      <Route path="/admin/dashboard" 
             element={<Layout userRole="admin"><AdminDashboard /></Layout>} />
    </Routes>
  );
}
`);

// Slide 18: Module 4 - Driver Dashboard
addSlide('11. Module 4: Driver Dashboard', [
  'Online/Offline availability toggle allowing drivers to control their working hours.',
  'Financial dashboard showing "Today\'s Earnings" and "Trips This Month".',
  'Real-time incoming trip requests queue.',
  'Interactive Accept/Reject capabilities with immediate status updates in the UI.'
]);

// Slide 19: UI Screenshot - Driver Dashboard
addScreenshotSlide('Driver Dashboard Interface', 'Dashboard showing real-time ride requests and daily earning statistics.');

// Slide 20: Module 5 - Admin Console
addSlide('12. Module 5: Admin Console', [
  'High-level statistical overview of platform health (Pending Verifications, Active Trips, Revenue).',
  'Comprehensive Driver Verification Queue (FR-16 requirement).',
  'Visual indicators for missing or flawed documents (License, Aadhaar).',
  'Action buttons to approve or reject driver applications, updating status.'
]);

// Slide 21: UI Screenshot - Admin Console
addScreenshotSlide('Admin Control Center', 'Document verification queue allowing admins to approve or reject driver applications.');

// Slide 22: Module 6 - Feedback System
addSlide('13. Module 6: Feedback & Rating System', [
  'Dedicated /feedback route accessible to all authenticated users.',
  'Interactive 5-star rating component with visual feedback.',
  'Categorized inputs for Role, Subject, and detailed Message.',
  'Animated success states and automatic form resets post-submission to enhance UX.'
]);

// Slide 23: UI Screenshot - Feedback
addScreenshotSlide('Feedback & Rating Page', 'Interactive interface for submitting reviews and platform feedback.');

// Slide 24: Code Implementation - Dynamic UI
addCodeSlide('Code Implementation: Dynamic Typewriter UI', `
// src/components/Typewriter.tsx (Snippet)
import { useState, useEffect } from 'react';

export function Typewriter({ segments, typingSpeed = 50 }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIdx = 0;
    const textToType = segments.map(s => s.text || '').join('');
    
    const intervalId = setInterval(() => {
      setDisplayedText(textToType.substring(0, currentIdx + 1));
      currentIdx++;
      if (currentIdx === textToType.length) clearInterval(intervalId);
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [segments, typingSpeed]);

  return <span className="typewriter-text">{displayedText}</span>;
}
`);

// Slide 25: UI/UX & Design
addSlide('14. UI/UX & Design Highlights', [
  'Glassmorphism Design: Translucent panels over gradient backgrounds for a premium feel.',
  'Responsive Layouts: Mobile-first CSS grids ensuring usability on phones, tablets, and desktops.',
  'Micro-interactions: Hover effects, card elevations, and animated fade-ins.',
  'Dynamic Typewriter Effect: Engaging hero section on the homepage emphasizing professionalism and confidence.'
]);

// Slide 26: Security Measures
addSlide('15. Security & Trust Measures', [
  'Mandatory Phone Verification: Eliminates fake accounts and spam bookings.',
  'Strict Admin Verification: Drivers cannot accept rides until documents are manually verified by an Admin.',
  'Visual Trust Indicators: Verified badge (green shield) displayed prominently on vetted driver profiles.',
  'Transparent Ratings: Two-way rating system ensuring accountability for both drivers and owners.'
]);

// Slide 27: Future Scope
addSlide('16. Future Enhancements', [
  'Live GPS Tracking: Integrate Google Maps API to track the driver’s location during the trip.',
  'In-App Payment Gateway: Integrate Razorpay/Stripe for seamless advance and final payments.',
  'Background Verification API: Automate Aadhaar and Driving License checks using third-party APIs.',
  'In-App Chat: Enable secure, masked communication between driver and customer.'
]);

// Slide 28: Conclusion & Q&A
let slide28 = pptx.addSlide();
slide28.background = { color: '2563EB' };
slide28.addText('Thank You!', { x: 0, y: 1.5, w: '100%', h: 1, align: 'center', fontSize: 60, bold: true, color: 'FFFFFF' });
slide28.addText('Any Questions?', { x: 0, y: 3, w: '100%', h: 1, align: 'center', fontSize: 36, color: 'E2E8F0' });
slide28.addText('Project: OYD (Own Your Driver)', { x: 0, y: 4.5, w: '100%', h: 0.5, align: 'center', fontSize: 20, color: '93C5FD' });

pptx.writeFile({ fileName: 'MCA_Project_Presentation.pptx' }).then(fileName => {
  console.log('Presentation created successfully: ' + fileName);
});
