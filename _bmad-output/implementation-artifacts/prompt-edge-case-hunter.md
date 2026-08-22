# Edge Case Hunter Review

Conduct a review of the supplied code. Look for missing handling, unguarded conditions, or logical gaps.

## Instructions
- Walk all branching paths and boundary conditions within scope.
- Derive the relevant edge classes from the content itself (e.g. missing else/default, null inputs, off-by-one, coercion issues).
- Present findings ONLY as a valid JSON array of objects. Each edge-case finding contains exactly these four fields:
  ```json
  [{
    "location": "file:line (or file:hunk)",
    "trigger_condition": "one-line description (max 15 words)",
    "guard_snippet": "minimal code sketch that closes the gap (single-line escaped string)",
    "potential_consequence": "what could actually go wrong (max 15 words)"
  }]
  ```
- Return ONLY the valid JSON array. No explanations, no markdown formatting (except code block).

## Content to Review
We have implemented a brand new React single-page informational website for a Tuition Academy. The files implemented are:

### File: `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
```

### File: `index.html`
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap"
    rel="stylesheet">
  <title>The HOPE Tuition Academy</title>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
```

### File: `src/index.css`
```css
@import "tailwindcss";

@theme {
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", sans-serif;
  --color-oxford-blue: #0b2545;
  --color-warm-gold: #c5a880;
  --color-warm-gold-hover: #b0936b;
  --color-soft-ivory: #f9f9f8;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-soft-ivory);
  color: #1f2937;
}

.font-serif {
  font-family: var(--font-serif);
}

/* Custom styles for smooth glassmorphism header */
.header-glass {
  background-color: rgba(11, 37, 69, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(197, 168, 128, 0.2);
}
```

### File: `src/data.js`
```javascript
// Tuition Academy Static Data

export const courses = [
  {
    id: "course-1",
    title: "Mathematics Excellence",
    category: "Secondary",
    grade: "Grades 8 - 10",
    description: "Core algebraic concepts, geometry, trigonometry, and analytical problem-solving tailored for school curriculum and board exams.",
    duration: "10 Months (3 sessions/week)",
    topics: ["Algebra & Equations", "Coordinate Geometry", "Trigonometry Basics", "Probability & Statistics"]
  },
  {
    id: "course-2",
    title: "Advanced Physics & Chemistry",
    category: "High School",
    grade: "Grades 11 - 12",
    description: "In-depth conceptual lectures and laboratory fundamentals covering mechanics, electromagnetism, chemical bonding, and thermodynamics.",
    duration: "12 Months (4 sessions/week)",
    topics: ["Classical Mechanics", "Electromagnetism", "Organic Chemistry", "Chemical Kinetics"]
  },
  {
    id: "course-3",
    title: "Integrated General Sciences",
    category: "Primary",
    grade: "Grades 5 - 7",
    description: "A curiosity-driven foundation class explaining core physics, biology, and chemistry concepts with everyday examples.",
    duration: "8 Months (2 sessions/week)",
    topics: ["States of Matter", "Human Biology Basics", "Forces & Motion", "Ecosystems"]
  },
  {
    id: "course-4",
    title: "English Literature & Writing",
    category: "Secondary",
    grade: "Grades 8 - 10",
    description: "Improves grammatical precision, essay structure, literature analysis, and expressive spoken communication.",
    duration: "6 Months (2 sessions/week)",
    topics: ["Creative Writing", "Poetry Analysis", "Grammar Mechanics", "Public Speaking"]
  },
  {
    id: "course-5",
    title: "College Prep & SAT Prep",
    category: "High School",
    grade: "Grades 11 - 12",
    description: "Targeted strategy sessions, vocabulary expansion, reading shortcuts, and intensive math drill sessions for college entrance tests.",
    duration: "3 Months (4 sessions/week)",
    topics: ["SAT Math Strategies", "Evidence-Based Reading", "Essay Prompt Writing", "Mock Diagnostic Tests"]
  }
];

export const teachers = [
  {
    id: "teacher-1",
    name: "Dr. Arthur Pendelton",
    subject: "Physics & Applied Math",
    experience: "15+ Years",
    bio: "Former university lecturer with a passion for simplifying complex spatial calculus and mechanics.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "teacher-2",
    name: "Ms. Clara Vance",
    subject: "Chemistry & Life Sciences",
    experience: "8 Years",
    bio: "Specializes in molecular biochemistry and hands-on experiments that make chemical equations intuitive.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "teacher-3",
    name: "Mr. Samuel Johnson",
    subject: "English Literature & Rhetoric",
    experience: "12 Years",
    bio: "Dedicated editor and literature expert who focuses on developing structural essay-writing frameworks.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  }
];

export const timings = {
  morning: [
    { day: "Mon / Wed / Fri", time: "09:00 AM - 10:30 AM", course: "Mathematics (Grade 8-10)", room: "Hall A" },
    { day: "Mon / Wed / Fri", time: "11:00 AM - 12:30 PM", course: "English Literature (Grade 8-10)", room: "Room 102" },
    { day: "Tue / Thu / Sat", time: "08:30 AM - 10:00 AM", course: "College Prep & SAT Prep", room: "Seminar Room" },
    { day: "Tue / Thu / Sat", time: "10:30 AM - 12:00 PM", course: "Integrated Sciences (Grade 5-7)", room: "Lab B" }
  ],
  evening: [
    { day: "Mon / Wed / Fri", time: "04:00 PM - 05:30 PM", course: "Advanced Physics (Grade 11-12)", room: "Lab A" },
    { day: "Mon / Wed / Fri", time: "06:00 PM - 07:30 PM", course: "Advanced Chemistry (Grade 11-12)", room: "Lab B" },
    { day: "Tue / Thu / Sat", time: "04:30 PM - 06:00 PM", course: "Mathematics (Grade 8-10)", room: "Hall A" },
    { day: "Tue / Thu / Sat", time: "06:15 PM - 07:45 PM", course: "Integrated Sciences (Grade 5-7)", room: "Room 101" }
  ]
};

export const testimonials = [
  {
    id: "test-1",
    role: "Parent",
    name: "Sarah Jenkins",
    quote: "The progress tracking tests and small batch sizes really set this center apart. My son’s science grades improved by two letter grades in just one term, and he actually looks forward to his doubts sessions.",
    rating: 5
  },
  {
    id: "test-2",
    role: "Student (Grade 12)",
    name: "Devon Miller",
    quote: "The SAT prep courses here were game-changing. The test strategies and intensive math drills helped me boost my scores by 200 points. The teachers explain exactly why an answer is wrong, not just what is right.",
    rating: 5
  },
  {
    id: "test-3",
    role: "Parent",
    name: "Rohan Gupta",
    quote: "Dr. Arthur and Ms. Clara are incredibly patient. The level of personal attention my daughter received during doubt-clearing sessions gave her the confidence she needed to excel in her grade 10 board exams.",
    rating: 5
  }
];

export const reasons = [
  {
    title: "Experienced Teachers",
    description: "Learn from passionate educators with over a decade of classroom and subject-specific teaching experience."
  },
  {
    title: "Small Batch Sizes",
    description: "We cap our classes at 12 students to guarantee meaningful interaction and individual tracking."
  },
  {
    title: "Personal Attention",
    description: "Every student's baseline is assessed, allowing tutors to adapt teaching speeds and materials."
  },
  {
    title: "Regular Diagnostic Tests",
    description: "Weekly structured mock papers map syllabus retention and flag micro-gaps before school tests."
  },
  {
    title: "Doubt Clearing Slots",
    description: "Dedicated daily 1-on-1 hours where students can bring any school homework or conceptual blockers."
  },
  {
    title: "Detailed Progress Tracking",
    description: "Parents receive comprehensive monthly report summaries on test performance, behavior, and attendance targets."
  }
];
```

### File: `src/App.jsx`
```javascript
import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Check,
  Award,
  Users,
  Target,
  ClipboardList,
  HelpCircle,
  TrendingUp,
  GraduationCap
} from "lucide-react";
import { courses, teachers, timings, testimonials, reasons } from "./data";
import "./App.css";

function App() {
  // Navigation scroll state
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter states
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeScheduleTab, setActiveScheduleTab] = useState("morning");
  
  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    grade: "Secondary (Grades 8-10)",
    message: ""
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | success

  // Listen to scroll to apply glassmorphism effect to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Testimonials autoplay carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Validate and submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim()
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.phone) {
      // Scroll to contact form if error occurs
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Trigger mock success state
    setSubmitStatus("success");
    // Reset form after a few seconds
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        email: "",
        grade: "Secondary (Grades 8-10)",
        message: ""
      });
      setSubmitStatus("idle");
    }, 5000);
  };

  // Helper to map icon names from reasons structure
  const getReasonIcon = (index) => {
    const iconClass = "w-6 h-6 text-warm-gold";
    switch (index) {
      case 0: return <Award className={iconClass} />;
      case 1: return <Users className={iconClass} />;
      case 2: return <Target className={iconClass} />;
      case 3: return <ClipboardList className={iconClass} />;
      case 4: return <HelpCircle className={iconClass} />;
      case 5: return <TrendingUp className={iconClass} />;
      default: return <GraduationCap className={iconClass} />;
    }
  };

  // Filter courses based on active category
  const filteredCourses = activeCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-soft-ivory text-slate-800 flex flex-col selection:bg-warm-gold selection:text-oxford-blue">
      
      {/* 1. STICKY NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "header-glass py-3" : "bg-oxford-blue py-5 border-b border-warm-gold/10"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="bg-warm-gold p-2 rounded-sm text-oxford-blue transition-transform duration-300 group-hover:rotate-12">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-white group-hover:text-warm-gold transition-colors">
                HOPE TUITION ACADEMY
              </span>
              <span className="text-[10px] text-warm-gold uppercase tracking-[0.2em] font-semibold leading-none">
                Tuition Center of Excellence
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">About Us</a>
            <a href="#courses" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">Courses</a>
            <a href="#why-us" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">Why Choose Us</a>
            <a href="#timings" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">Class Timings</a>
            <a href="#teachers" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">Teachers</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">Testimonials</a>
            <a href="#contact" className="text-sm font-medium text-slate-300 hover:text-warm-gold transition-colors">Contact</a>
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden lg:block">
            <a 
              href="#contact" 
              className="bg-warm-gold hover:bg-warm-gold-hover text-oxford-blue px-6 py-2.5 rounded-sm font-bold text-sm transition-all duration-300 shadow-md hover:shadow-warm-gold/20 flex items-center gap-2"
            >
              Join Now <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-warm-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Panel */}
      <div className={`fixed inset-0 z-40 bg-oxford-blue/95 transition-all duration-300 flex flex-col justify-center p-8 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col gap-6 text-center">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">About Us</a>
          <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">Courses</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">Why Choose Us</a>
          <a href="#timings" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">Class Timings</a>
          <a href="#teachers" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">Teachers</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">Testimonials</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-white hover:text-warm-gold">Contact Us</a>
          <div className="mt-8">
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block bg-warm-gold hover:bg-warm-gold-hover text-oxford-blue px-8 py-3 rounded-sm font-bold text-lg transition-all"
            >
              Join Now
            </a>
          </div>
        </nav>
      </div>

      <main className="flex-grow pt-24">

        {/* 2. HERO SECTION */}
        <section id="home" className="relative bg-oxford-blue py-20 lg:py-32 overflow-hidden border-b border-warm-gold/20">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-left space-y-8">
              <span className="text-warm-gold font-semibold uppercase tracking-[0.25em] text-xs md:text-sm block">
                Premium Academic Tutoring
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Excellence in Tuition for a <span className="text-warm-gold italic">Brighter Future.</span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Unlock your academic potential with personalized coaching, expert teacher mentorship, and small-batch attention designed to achieve top grades.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#contact" 
                  className="bg-warm-gold hover:bg-warm-gold-hover text-oxford-blue px-8 py-3.5 rounded-sm font-bold transition-all shadow-lg hover:shadow-warm-gold/20 flex items-center gap-2"
                >
                  Join Academy Now <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#courses" 
                  className="border border-slate-500 hover:border-warm-gold text-white hover:text-warm-gold px-8 py-3.5 rounded-sm font-bold transition-all"
                >
                  Explore Courses
                </a>
              </div>
            </div>

            {/* Styled Hero Display Grid */}
            <div className="relative flex justify-center">
              <div className="absolute -inset-4 bg-warm-gold/10 rounded-full blur-3xl opacity-30"></div>
              <div className="relative border border-warm-gold/20 bg-oxford-blue/60 p-6 rounded-md backdrop-blur-md shadow-2xl max-w-md w-full grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 flex flex-col justify-between h-32">
                  <GraduationCap className="w-8 h-8 text-warm-gold" />
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-none">100%</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Board Pass Rate</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 flex flex-col justify-between h-32">
                  <Users className="w-8 h-8 text-warm-gold" />
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-none">12 Max</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Student Batch Size</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 flex flex-col justify-between h-32 col-span-2">
                  <Star className="w-8 h-8 text-warm-gold fill-warm-gold" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Expert Mentorship</h3>
                    <p className="text-xs text-slate-300 mt-1">Qualified school educators committed to conceptual clarity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT US */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <div className="inline-block bg-oxford-blue/5 text-oxford-blue px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider border border-oxford-blue/10">
                  Who We Are
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue">
                  Dedicated to Cultivating Academic Excellence & Confidence
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Founded with the core vision of closing educational gaps, Hope Tuition Academy is a premium tutoring center built on the values of clarity, rigor, and personalization. We do not support complex administrative tracking systems; our singular focus is delivering world-class tutoring.
                </p>
                <div className="border-l-4 border-warm-gold pl-4 py-2 italic text-oxford-blue font-serif text-lg bg-soft-ivory pr-2">
                  "Our teaching approach is based on deep conceptual understanding, structured evaluation, and reinforcing student self-belief."
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We believe that education should not be an assembly line. By keeping our batches small and hiring only seasoned subject experts, we ensure every student receives targeted coaching that fits their unique learning rate.
                </p>
              </div>

              {/* Mission/Vision Cards */}
              <div className="grid gap-6">
                <div className="bg-soft-ivory p-8 rounded-sm border-l-4 border-oxford-blue shadow-sm text-left">
                  <h3 className="font-serif text-xl font-bold text-oxford-blue mb-2">Our Mission</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To empower secondary and high school students with structured academic mastery, turning classroom difficulties into academic confidence through custom mentorship.
                  </p>
                </div>
                <div className="bg-soft-ivory p-8 rounded-sm border-l-4 border-warm-gold shadow-sm text-left">
                  <h3 className="font-serif text-xl font-bold text-oxford-blue mb-2">Our Vision</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To be the leading beacon of tutoring credibility, setting the benchmark for small-batch excellence where parents feel secure and students thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE US */}
        <section id="why-us" className="py-20 bg-soft-ivory border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-semibold uppercase tracking-wider text-xs md:text-sm">
                Our Differentiators
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue">
                Why Students Succeed With Us
              </h2>
              <p className="text-slate-600">
                We focus strictly on premium learning dynamics, eliminating distracting administrative systems to keep attention on what matters: lesson clarity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-sm border border-slate-200 hover:border-warm-gold shadow-sm transition-all duration-300 hover:scale-[1.02] text-left space-y-4"
                >
                  <div className="bg-oxford-blue/5 p-3 rounded-sm inline-block">
                    {getReasonIcon(index)}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-oxford-blue">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COURSES */}
        <section id="courses" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="space-y-4 text-left">
                <span className="text-warm-gold font-semibold uppercase tracking-wider text-xs md:text-sm">
                  Curriculum Options
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue">
                  Our Expert-Led Courses
                </h2>
                <p className="text-slate-600 max-w-lg">
                  Explore subjects structured around board syllabus guidelines and college admission targets.
                </p>
              </div>

              {/* Segmented control tabs */}
              <div className="flex flex-wrap gap-2">
                {["All", "Primary", "Secondary", "High School"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                      activeCategory === cat 
                        ? "bg-oxford-blue text-white shadow-md border border-oxford-blue" 
                        : "bg-soft-ivory text-slate-600 hover:text-oxford-blue border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="border border-slate-200 rounded-sm hover:border-warm-gold shadow-sm flex flex-col justify-between bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-6 text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-warm-gold/15 text-warm-gold-hover px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                        {course.grade}
                      </span>
                      <span className="text-xs text-slate-400 uppercase tracking-widest">{course.category}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-oxford-blue leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-oxford-blue uppercase tracking-wider block">What you will learn:</span>
                      <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                        {course.topics.map((topic, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-warm-gold shrink-0" />
                            <span className="truncate">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-soft-ivory px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{course.duration}</span>
                    <a 
                      href="#contact" 
                      onClick={() => setFormData(prev => ({ ...prev, grade: `${course.grade} - ${course.title}` }))}
                      className="text-xs font-bold text-oxford-blue hover:text-warm-gold flex items-center gap-1 group transition-colors"
                    >
                      Enquire <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CLASS TIMINGS */}
        <section id="timings" className="py-20 bg-soft-ivory border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-semibold uppercase tracking-wider text-xs md:text-sm">
                Schedule Timetable
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue">
                Weekly Class Timings
              </h2>
              <p className="text-slate-600">
                Select your preferred slot from our morning or evening batches. Perfect for balancing academic and extra-curricular timings.
              </p>

              {/* Timetable Tab Toggle */}
              <div className="inline-flex bg-white p-1 rounded-sm border border-slate-200 mt-4">
                <button
                  onClick={() => setActiveScheduleTab("morning")}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                    activeScheduleTab === "morning"
                      ? "bg-oxford-blue text-white"
                      : "text-slate-600 hover:text-oxford-blue"
                  }`}
                >
                  Morning Batches
                </button>
                <button
                  onClick={() => setActiveScheduleTab("evening")}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                    activeScheduleTab === "evening"
                      ? "bg-oxford-blue text-white"
                      : "text-slate-600 hover:text-oxford-blue"
                  }`}
                >
                  Evening Batches
                </button>
              </div>
            </div>

            {/* Timetable schedule grid */}
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-oxford-blue text-white text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Days</th>
                      <th className="px-6 py-4">Time Slot</th>
                      <th className="px-6 py-4">Class / Subject</th>
                      <th className="px-6 py-4">Classroom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {timings[activeScheduleTab].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-oxford-blue">{row.day}</td>
                        <td className="px-6 py-4">{row.time}</td>
                        <td className="px-6 py-4 font-medium">{row.course}</td>
                        <td className="px-6 py-4 text-xs">
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-sm font-mono border border-slate-200">
                            {row.room}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 7. TEACHERS */}
        <section id="teachers" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-semibold uppercase tracking-wider text-xs md:text-sm">
                Academy Educators
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue">
                Meet Our Expert Instructors
              </h2>
              <p className="text-slate-600">
                Highly qualified professionals dedicated to delivering structured conceptual breakdowns and guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <div 
                  key={teacher.id}
                  className="bg-white border border-slate-200 rounded-sm hover:border-warm-gold overflow-hidden shadow-sm transition-all duration-300 hover:scale-[1.02] text-left flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-oxford-blue text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm border border-warm-gold/20 shadow-lg">
                        {teacher.subject}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3 flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-xl font-bold text-oxford-blue">{teacher.name}</h3>
                      <span className="text-xs font-semibold text-warm-gold-hover">{teacher.experience} Exp</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {teacher.bio}
                    </p>
                  </div>
                  <div className="bg-soft-ivory p-4 border-t border-slate-100 text-center">
                    <a 
                      href="#contact"
                      className="text-xs font-bold text-oxford-blue hover:text-warm-gold"
                    >
                      Book Free Trial Class
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section id="testimonials" className="py-20 bg-oxford-blue text-white relative overflow-hidden border-t border-b border-warm-gold/20">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a880_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
            <span className="text-warm-gold font-semibold uppercase tracking-wider text-xs md:text-sm">
              Academy Reviews
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              What Students & Parents Say
            </h2>

            {/* Carousel Viewport */}
            <div className="min-h-[220px] flex flex-col justify-center py-6">
              <div className="space-y-6 animate-fade-in">
                {/* Rating Stars */}
                <div className="flex justify-center gap-1">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warm-gold fill-warm-gold" />
                  ))}
                </div>
                
                {/* Quote text */}
                <blockquote className="font-serif text-lg md:text-2xl leading-relaxed italic text-slate-100 max-w-3xl mx-auto">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>

                {/* Author Name */}
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold text-white text-base">{testimonials[activeTestimonial].name}</span>
                  <span className="text-slate-400 text-xs">|</span>
                  <span className="text-warm-gold text-xs font-semibold uppercase tracking-wider">{testimonials[activeTestimonial].role}</span>
                </div>
              </div>
            </div>

            {/* Testimonials controls */}
            <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 border border-white/20 hover:border-warm-gold rounded-full hover:text-warm-gold transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Indicator dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeTestimonial === i ? "bg-warm-gold scale-125" : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  ></button>
                ))}
              </div>

              <button 
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-2 border border-white/20 hover:border-warm-gold rounded-full hover:text-warm-gold transition-all"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* 9. CONTACT US */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-semibold uppercase tracking-wider text-xs md:text-sm">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue">
                Start Your Learning Journey
              </h2>
              <p className="text-slate-600">
                Submit an inquiry or contact us directly. We will get back to you within 24 hours to schedule a session.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Inquiry Form */}
              <div className="bg-soft-ivory p-8 rounded-sm border border-slate-200 relative overflow-hidden">
                
                {submitStatus === "success" && (
                  <div className="absolute inset-0 bg-oxford-blue/95 flex flex-col items-center justify-center text-center p-6 z-10 transition-opacity">
                    <div className="bg-warm-gold p-4 rounded-full text-oxford-blue mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">Inquiry Submitted!</h3>
                    <p className="text-slate-300 text-sm max-w-sm">
                      Thank you, {formData.name}. We have received your query and will contact you at {formData.phone} shortly.
                    </p>
                  </div>
                )}

                <h3 className="font-serif text-xl font-bold text-oxford-blue mb-6">Send an Inquiry</h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="text-left space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Student / Parent Name *
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white border px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-oxford-blue transition-colors ${
                        errors.name ? "border-red-500 focus:border-red-500" : "border-slate-300"
                      }`}
                      placeholder="e.g. Salim Smith"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-semibold mt-1">Name is required.</p>}
                  </div>

                  <div className="text-left space-y-1">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-white border px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-oxford-blue transition-colors ${
                        errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-300"
                      }`}
                      placeholder="e.g. +1 555-0199"
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-semibold mt-1">Phone number is required.</p>}
                  </div>

                  <div className="text-left space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-oxford-blue transition-colors"
                      placeholder="e.g. parent@email.com"
                    />
                  </div>

                  <div className="text-left space-y-1">
                    <label htmlFor="grade" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Target Class / Grade
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-slate-300 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-oxford-blue transition-colors"
                    >
                      <option>Primary (Grades 5-7)</option>
                      <option>Secondary (Grades 8-10)</option>
                      <option>High School (Grades 11-12)</option>
                      <option>SAT & College Prep</option>
                    </select>
                  </div>

                  <div className="text-left space-y-1">
                    <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Brief Message
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-white border border-slate-300 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-oxford-blue transition-colors resize-none"
                      placeholder="Specify subjects or doubt-clearing needs..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-oxford-blue hover:bg-oxford-blue/90 text-white font-bold py-3.5 rounded-sm text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Submit Inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Location Details & Map */}
              <div className="space-y-8 flex flex-col justify-between text-left">
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-oxford-blue">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-warm-gold/20 p-2.5 rounded-sm text-warm-gold-hover mt-1 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Academy Location</h4>
                        <p className="text-slate-600 text-sm mt-1">102 Hope Crescent, Academic District, London, UK</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-warm-gold/20 p-2.5 rounded-sm text-warm-gold-hover mt-1 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Phone Queries</h4>
                        <p className="text-slate-600 text-sm mt-1">+44 (0) 20 7946 0192 (Mon-Sat, 9AM-8PM)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-warm-gold/20 p-2.5 rounded-sm text-warm-gold-hover mt-1 shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Email Admissions</h4>
                        <p className="text-slate-600 text-sm mt-1">admissions@hopetuition.co.uk</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps embed iframe */}
                <div className="border border-slate-200 rounded-sm overflow-hidden h-64 bg-slate-100 shadow-inner">
                  <iframe 
                    title="Hope Tuition Academy Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.432325320297!2d-0.12209768422941552!3d51.51449597963666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b77c5c0c9d%3A0xc3cfd618d7f7663e!2sOxford%20St%2C%20London%2C%20UK!5e0!3m2!1sen!2sus!4v1655029302930!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="bg-oxford-blue text-white py-12 border-t border-warm-gold/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-left text-sm text-slate-300">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-warm-gold" />
              <span className="font-serif text-lg font-bold text-white">HOPE TUITION ACADEMY</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-slate-400">
              A premium, academic-focused tuition academy providing structured curriculum tutoring and mentorship in small classroom environments.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#about" className="hover:text-warm-gold transition-colors">About Us</a>
              <a href="#courses" className="hover:text-warm-gold transition-colors">Our Courses</a>
              <a href="#why-us" className="hover:text-warm-gold transition-colors">Why Choose Us</a>
              <a href="#timings" className="hover:text-warm-gold transition-colors">Class Timings</a>
              <a href="#teachers" className="hover:text-warm-gold transition-colors">Our Tutors</a>
              <a href="#contact" className="hover:text-warm-gold transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Column 3: Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Contact Admissions</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-warm-gold" />
                <span>+44 (0) 20 7946 0192</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-warm-gold" />
                <span>admissions@hopetuition.co.uk</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-warm-gold" />
                <span>102 Hope Crescent, London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/5 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Hope Tuition Academy. All Rights Reserved. Not a management system.</p>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
```
