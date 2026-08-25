import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  ChevronRight, 
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
import DepthCarousel from "./components/DepthCarousel";
import ParticleText from "./components/ParticleText";
import ClickSpark from "./components/ClickSpark";
import CardSwap, { Card } from "./components/CardSwap";
import aboutBgVideo from "./enaku_video_la_student_irukanu.mp4";

function App() {
  // Navigation scroll state
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter states
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeScheduleTab, setActiveScheduleTab] = useState("morning");
  


  // Active teacher index for DepthCarousel details
  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);

  // Active section tracking for Scrollspy
  const [activeSection, setActiveSection] = useState("home");

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

  // Listen to scroll to apply glassmorphism effect to header and run scrollspy section checks
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 50);

          // Scrollspy active section detection
          const sections = ["home", "about", "courses", "why-us", "timings", "teachers", "testimonials", "contact"];
          const scrollPosition = currentScrollY + 180; // Offset threshold

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial scroll trigger for mount state alignment
    handleScroll();
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
    <ClickSpark
      sparkColor="#c5a880"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={500}
    >
      <div className="min-h-screen bg-soft-ivory text-slate-800 flex flex-col selection:bg-warm-gold selection:text-oxford-blue">
      
      {/* 1. STICKY NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "header-glass py-2 shadow-2xl" : "header-initial py-1"}`}>
        {/* Top Info utility ribbon */}
        <div className={`bg-gradient-to-r from-[#020a14] via-[#061932] to-[#020a14] border-b border-warm-gold/20 transition-all duration-300 ${scrolled ? "max-h-0 opacity-0 overflow-hidden py-0 border-none" : "max-h-12 opacity-100 py-1.5"}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-[11px] text-slate-300 font-medium gap-2 sm:gap-0">
            <div className="flex items-center gap-6">
              <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Admissions Open 2026-27
              </span>
              <a href="tel:+919443312345" className="flex items-center gap-1.5 hover:text-warm-gold transition-colors">
                <div className="w-4 h-4 rounded-full bg-warm-gold/20 flex items-center justify-center">
                  <Phone className="w-2.5 h-2.5 text-warm-gold" />
                </div>
                <span className="font-semibold">+91 94433 12345</span>
              </a>
              <a href="mailto:admissions@hopetuition.in" className="flex items-center gap-1.5 hover:text-warm-gold transition-colors">
                <div className="w-4 h-4 rounded-full bg-warm-gold/20 flex items-center justify-center">
                  <Mail className="w-2.5 h-2.5 text-warm-gold" />
                </div>
                <span className="font-semibold">admissions@hopetuition.in</span>
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <div className="w-4 h-4 rounded-full bg-warm-gold/20 flex items-center justify-center">
                <MapPin className="w-2.5 h-2.5 text-warm-gold" />
              </div>
              <span className="font-medium">Cantonment, Tiruchirappalli</span>
            </div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2" : "py-3.5"}`}>
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3.5 group shrink-0">
            <div className="bg-gradient-to-br from-[#faecd5] via-[#d4af37] to-[#997328] p-2.5 rounded-xl text-[#051428] shadow-[0_0_18px_rgba(197,168,128,0.35)] ring-1 ring-white/40 transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 shrink-0">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg md:text-xl font-bold tracking-wide text-gold-gradient group-hover:brightness-110 transition-all whitespace-nowrap">
                HOPE TUITION ACADEMY
              </span>
              <span className="text-[9px] md:text-[10px] text-warm-gold font-semibold uppercase tracking-[0.22em] leading-none flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Tuition Center of Excellence
              </span>
            </div>
          </a>

          {/* Desktop Nav Links - Clean, Professional Horizontal Layout */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 mx-4">
            {[
              { id: "about", label: "About Us" },
              { id: "courses", label: "Courses" },
              { id: "why-us", label: "Why Choose Us" },
              { id: "timings", label: "Class Timings" },
              { id: "teachers", label: "Teachers" },
              { id: "testimonials", label: "Testimonials" },
              { id: "contact", label: "Contact" }
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  className={`text-[13px] font-medium tracking-wide whitespace-nowrap py-1.5 transition-colors duration-300 ${
                    isActive 
                      ? "text-warm-gold font-semibold" 
                      : "text-slate-200 hover:text-warm-gold"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden lg:block shrink-0">
            <a 
              href="#contact" 
              className="btn-gold-luxury px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-md hover:shadow-warm-gold/30 transition-all duration-300"
            >
              <span>Join Now</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-warm-gold/30 text-warm-gold hover:bg-warm-gold/20 transition-all shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Panel with Active scrollspy highlights */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-b from-[#061830]/98 via-[#0b2545]/98 to-[#040f1e]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-center p-8 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute top-6 right-6">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-full bg-white/10 text-warm-gold hover:bg-warm-gold/20 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 text-center max-w-sm mx-auto w-full">
          {[
            { id: "about", label: "About Us" },
            { id: "courses", label: "Courses" },
            { id: "why-us", label: "Why Choose Us" },
            { id: "timings", label: "Class Timings" },
            { id: "teachers", label: "Teachers" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contact", label: "Contact Us" }
          ].map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={() => setMobileMenuOpen(false)} 
                className={`py-2.5 px-4 rounded-xl text-lg font-serif transition-all ${
                  isActive 
                    ? "bg-warm-gold/20 text-warm-gold border border-warm-gold/40 font-bold shadow-[0_0_15px_rgba(197,168,128,0.2)]" 
                    : "text-slate-200 hover:text-warm-gold hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="mt-6">
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold-luxury block w-full py-3.5 rounded-xl font-bold text-base uppercase tracking-wider text-center"
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
              <div className="absolute -inset-4 bg-warm-gold/15 rounded-full blur-3xl opacity-40"></div>
              <div className="relative card-glass-dark p-6 rounded-2xl shadow-2xl max-w-md w-full grid grid-cols-2 gap-4">
                <div className="bg-white/[0.06] hover:bg-white/[0.12] p-5 rounded-xl border border-white/10 hover:border-warm-gold/40 transition-all duration-300 flex flex-col justify-between h-34 shadow-sm group">
                  <div className="w-10 h-10 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-none">100%</h3>
                    <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1.5 font-semibold">Board Pass Rate</p>
                  </div>
                </div>
                <div className="bg-white/[0.06] hover:bg-white/[0.12] p-5 rounded-xl border border-white/10 hover:border-warm-gold/40 transition-all duration-300 flex flex-col justify-between h-34 shadow-sm group">
                  <div className="w-10 h-10 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white leading-none">12 Max</h3>
                    <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1.5 font-semibold">Batch Size Limit</p>
                  </div>
                </div>
                <div className="bg-white/[0.06] hover:bg-white/[0.12] p-5 rounded-xl border border-white/10 hover:border-warm-gold/40 transition-all duration-300 flex flex-col justify-between h-34 col-span-2 shadow-sm group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold group-hover:scale-110 transition-transform">
                      <Star className="w-6 h-6 fill-warm-gold" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-warm-gold bg-warm-gold/15 px-2.5 py-1 rounded-full border border-warm-gold/30">Top Rated</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Expert Mentorship</h3>
                    <p className="text-xs text-slate-300 mt-1">Qualified school educators committed to deep conceptual clarity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE BRAND BANNER (Moved upper to seamlessly transition from Hero into Content Cards) */}
        <section className="py-20 bg-gradient-to-b from-oxford-blue via-[#061830] to-[#0a2342] relative overflow-hidden border-t border-b border-warm-gold/25 flex flex-col items-center justify-center text-center shadow-inner">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-warm-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="w-full max-w-4xl px-6 space-y-4 relative z-10">
            <div className="h-28 md:h-36 w-full relative overflow-hidden flex items-center justify-center">
              <ParticleText
                text="HOPE ACADEMY"
                particleSize={2.4}
                density={3.6}
                color="#ffffff"
                highlightColor="#c5a880"
                scatter={120}
                gatherDuration={1500}
                stagger={300}
                pointerRepel={40}
                repelRadius={110}
                idleDrift={0.6}
                trigger="hover"
                fontSize="clamp(2.8rem, 7.5vw, 5.8rem)"
                fontWeight={900}
                fontFamily="Playfair Display"
                glow
              />
            </div>
            <p className="text-warm-gold font-serif text-sm md:text-lg tracking-[0.28em] uppercase font-bold italic drop-shadow-sm">
              Inspiring Excellence, Securing Futures
            </p>
          </div>
        </section>

        {/* 3. ABOUT US */}
        <section id="about" className="relative py-24 overflow-hidden">
          {/* Transparent Background Video */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover opacity-45"
              style={{ filter: "saturate(0.88) hue-rotate(-4deg) contrast(1.04) brightness(1.02)" }}
            >
              <source src={aboutBgVideo} type="video/mp4" />
            </video>
            {/* Subtle cool-navy tinted glass layer to neutralize yellow warmth & harmonize with palette */}
            <div 
              className="absolute inset-0 backdrop-blur-[1px]"
              style={{ 
                background: "linear-gradient(135deg, rgba(238, 244, 252, 0.30) 0%, rgba(255, 255, 255, 0.20) 50%, rgba(240, 246, 252, 0.28) 100%)" 
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-oxford-blue px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-oxford-blue/15 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-warm-gold"></span>
                  Who We Are
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-blue leading-tight">
                  Dedicated to Cultivating Academic Excellence & Confidence
                </h2>
                <p className="text-slate-700 leading-relaxed text-base font-medium">
                  Founded with the core vision of closing educational gaps, Hope Tuition Academy is a premium tutoring center built on the values of clarity, rigor, and personalization. We do not support complex administrative tracking systems; our singular focus is delivering world-class tutoring.
                </p>
                <div 
                  className="border-l-4 border-warm-gold pl-5 py-3 italic text-oxford-blue font-serif text-lg rounded-r-xl shadow-sm backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}
                >
                  "Our teaching approach is based on deep conceptual understanding, structured evaluation, and reinforcing student self-belief."
                </div>
                <p className="text-slate-700 leading-relaxed text-base font-medium">
                  We believe that education should not be an assembly line. By keeping our batches small and hiring only seasoned subject experts, we ensure every student receives targeted coaching that fits their unique learning rate.
                </p>
              </div>

              {/* Mission/Vision Cards */}
              <div className="grid gap-6">
                <div 
                  className="card-luxury p-8 rounded-2xl border-l-4 border-l-oxford-blue shadow-lg text-left group backdrop-blur-md"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.82)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-2xl font-bold text-oxford-blue">Our Mission</h3>
                    <div className="w-8 h-8 rounded-full bg-oxford-blue/10 flex items-center justify-center text-oxford-blue group-hover:bg-oxford-blue group-hover:text-white transition-colors">
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To empower secondary and high school students with structured academic mastery, turning classroom difficulties into academic confidence through custom mentorship.
                  </p>
                </div>
                <div 
                  className="card-luxury p-8 rounded-2xl border-l-4 border-l-warm-gold shadow-lg text-left group backdrop-blur-md"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.82)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-2xl font-bold text-oxford-blue">Our Vision</h3>
                    <div className="w-8 h-8 rounded-full bg-warm-gold/20 flex items-center justify-center text-warm-gold-hover group-hover:bg-warm-gold group-hover:text-oxford-blue transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To be the leading beacon of tutoring credibility, setting the benchmark for small-batch excellence where parents feel secure and students thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHY CHOOSE US */}
        <section id="why-us" className="py-24 bg-soft-ivory border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm block">
                Our Differentiators
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-blue">
                Why Students Succeed With Us
              </h2>
              <p className="text-slate-600 text-base">
                We focus strictly on premium learning dynamics, eliminating distracting administrative systems to keep attention on what matters: lesson clarity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="card-luxury p-8 rounded-2xl text-left space-y-5 group relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-oxford-blue/10 via-oxford-blue/5 to-transparent border border-oxford-blue/10 flex items-center justify-center text-oxford-blue group-hover:bg-gradient-to-br group-hover:from-warm-gold group-hover:to-[#a07c48] group-hover:text-white transition-all duration-300 shadow-sm">
                      {getReasonIcon(index)}
                    </div>
                    <span className="text-3xl font-serif font-extrabold text-slate-200 group-hover:text-warm-gold/40 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-oxford-blue group-hover:text-oxford-blue/90 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                  {/* Bottom animated border line */}
                  <div className="w-full h-[3px] bg-gradient-to-r from-warm-gold via-[#e0c7a0] to-warm-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 absolute bottom-0 left-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. COURSES */}
        <section id="courses" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
              <div className="space-y-4 text-left">
                <span className="text-warm-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm block">
                  Curriculum Options
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-blue">
                  Our Expert-Led Courses
                </h2>
                <p className="text-slate-600 max-w-lg text-base">
                  Explore subjects structured around board syllabus guidelines and college admission targets.
                </p>
              </div>

              {/* Segmented control tabs */}
              <div className="flex flex-wrap gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
                {["All", "Primary", "Secondary", "High School"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                      activeCategory === cat 
                        ? "bg-oxford-blue text-white shadow-md" 
                        : "text-slate-600 hover:text-oxford-blue hover:bg-white/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="card-luxury rounded-2xl flex flex-col justify-between group"
                >
                  <div className="p-7 text-left space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="card-badge-gold px-3.5 py-1 rounded-full text-[10px] uppercase tracking-wider">
                        {course.grade}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-oxford-blue leading-snug group-hover:text-warm-gold-hover transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    <div className="space-y-2.5 pt-3 pb-3 px-4 rounded-xl bg-soft-ivory/80 border border-slate-200/60">
                      <span className="text-[11px] font-bold text-oxford-blue uppercase tracking-wider block">Key Learning Modules:</span>
                      <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                        {course.topics.map((topic, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <div className="w-3.5 h-3.5 rounded-full bg-warm-gold/20 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 text-warm-gold stroke-[3]" />
                            </div>
                            <span className="truncate">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-7 py-4 border-t border-slate-100 flex items-center justify-between z-10">
                    <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200/80">{course.duration}</span>
                    <a 
                      href="#contact" 
                      onClick={() => setFormData(prev => ({ ...prev, grade: `${course.grade} - ${course.title}` }))}
                      className="text-xs font-bold text-oxford-blue hover:text-warm-gold flex items-center gap-1.5 transition-colors group/btn"
                    >
                      Enquire Now <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                    </a>
                  </div>
                  {/* Bottom animated border line */}
                  <div className="w-full h-[3px] bg-gradient-to-r from-warm-gold via-[#e0c7a0] to-warm-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 absolute bottom-0 left-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CLASS TIMINGS */}
        <section id="timings" className="py-24 bg-soft-ivory border-t border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm block">
                Schedule Timetable
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-blue">
                Weekly Class Timings
              </h2>
              <p className="text-slate-600 text-base">
                Select your preferred slot from our morning or evening batches. Perfect for balancing academic and extra-curricular timings.
              </p>

              {/* Timetable Tab Toggle */}
              <div className="inline-flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm mt-4">
                <button
                  onClick={() => setActiveScheduleTab("morning")}
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                    activeScheduleTab === "morning"
                      ? "bg-oxford-blue text-white shadow-sm"
                      : "text-slate-600 hover:text-oxford-blue"
                  }`}
                >
                  Morning Batches
                </button>
                <button
                  onClick={() => setActiveScheduleTab("evening")}
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                    activeScheduleTab === "evening"
                      ? "bg-oxford-blue text-white shadow-sm"
                      : "text-slate-600 hover:text-oxford-blue"
                  }`}
                >
                  Evening Batches
                </button>
              </div>
            </div>

            {/* Timetable schedule grid */}
            <div className="card-luxury rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-oxford-blue to-[#061830] text-white text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Days</th>
                      <th className="px-6 py-4">Time Slot</th>
                      <th className="px-6 py-4">Class / Subject</th>
                      <th className="px-6 py-4">Classroom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {timings[activeScheduleTab].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-semibold text-oxford-blue">{row.day}</td>
                        <td className="px-6 py-4">{row.time}</td>
                        <td className="px-6 py-4 font-medium">{row.course}</td>
                        <td className="px-6 py-4 text-xs">
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-mono border border-slate-200 font-semibold">
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
        <section id="teachers" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm block">
                Academy Educators
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-blue">
                Meet Our Expert Instructors
              </h2>
              <p className="text-slate-600 text-base">
                Highly qualified professionals dedicated to delivering structured conceptual breakdowns and guidance.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
              {/* Left pane: The 3D Carousel */}
              <div className="lg:col-span-6 h-[450px] relative w-full flex items-center justify-center overflow-hidden">
                <DepthCarousel
                  items={teachers.map(t => ({ image: t.image, alt: t.name }))}
                  onChange={(idx) => setActiveTeacherIndex(idx)}
                  depth={160}
                  spread={70}
                  tilt={15}
                  perspective={1200}
                  visibleCards={3}
                  autoplay
                  loop
                  cardWidth={260}
                  cardHeight={340}
                  tint="#0b2545"
                />
              </div>

              {/* Right pane: Teacher Details Card */}
              <div className="lg:col-span-6 text-left space-y-6 card-luxury p-8 md:p-10 rounded-2xl shadow-xl relative min-h-[360px] flex flex-col justify-between bg-gradient-to-br from-white via-soft-ivory to-white">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="card-badge-gold px-3.5 py-1 rounded-full text-[10px] uppercase tracking-wider inline-block mb-3">
                        {teachers[activeTeacherIndex].subject}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl font-bold text-oxford-blue transition-all duration-300">
                        {teachers[activeTeacherIndex].name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-oxford-blue bg-white border border-warm-gold/40 px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 shadow-sm">
                      {teachers[activeTeacherIndex].experience} Exp
                    </span>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed italic border-l-4 border-warm-gold pl-5 py-2 bg-white/60 rounded-r-xl">
                    "{teachers[activeTeacherIndex].bio}"
                  </p>
                </div>
                <div className="pt-5 border-t border-slate-200 flex items-center justify-between">
                  <a 
                    href="#contact"
                    className="btn-gold-luxury px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Book Free Trial Class
                  </a>
                  <span className="text-xs text-slate-500 font-mono font-semibold bg-slate-100 px-3 py-1 rounded-full">
                    Instructor {activeTeacherIndex + 1} / {teachers.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section id="testimonials" className="py-24 bg-oxford-blue text-white relative overflow-hidden border-t border-b border-warm-gold/20">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a880_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
            <span className="text-warm-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm block">
              Academy Reviews
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              What Students & Parents Say
            </h2>

            {/* Interactive Card Stack Deck */}
            <div className="h-[360px] relative overflow-visible flex items-center justify-center pt-8">
              <CardSwap
                width={500}
                height={260}
                cardDistance={35}
                verticalDistance={25}
                delay={4500}
                pauseOnHover={true}
                skewAmount={3}
                easing="elastic"
              >
                {testimonials.map((t, idx) => (
                  <Card key={idx} className="card-glass-dark p-8 rounded-2xl shadow-2xl flex flex-col justify-between select-none text-left border border-warm-gold/30">
                    <div className="space-y-4">
                      {/* Rating Stars */}
                      <div className="flex gap-1 justify-start">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-warm-gold fill-warm-gold" />
                        ))}
                      </div>
                      
                      {/* Quote text */}
                      <blockquote className="font-serif text-sm md:text-base leading-relaxed italic text-slate-100 pl-4 border-l-2 border-warm-gold/60">
                        "{t.quote}"
                      </blockquote>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-auto">
                      <div>
                        <p className="font-bold text-white text-sm">{t.name}</p>
                        <p className="text-warm-gold text-[10px] uppercase tracking-wider font-semibold">{t.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </section>

        {/* 9. CONTACT US */}
        <section id="contact" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-warm-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm block">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-blue">
                Start Your Learning Journey
              </h2>
              <p className="text-slate-600 text-base">
                Submit an inquiry or contact us directly. We will get back to you within 24 hours to schedule a session.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
              
              {/* Inquiry Form Card */}
              <div className="card-luxury p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden bg-white border border-slate-200">
                
                {submitStatus === "success" && (
                  <div className="absolute inset-0 bg-oxford-blue/98 flex flex-col items-center justify-center text-center p-6 z-20 transition-opacity">
                    <div className="bg-warm-gold p-4 rounded-full text-oxford-blue mb-4 shadow-lg">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">Inquiry Submitted!</h3>
                    <p className="text-slate-300 text-sm max-w-sm">
                      Thank you, {formData.name}. We have received your query and will contact you at {formData.phone} shortly.
                    </p>
                  </div>
                )}

                <h3 className="font-serif text-2xl font-bold text-oxford-blue mb-6 text-left">Send an Inquiry</h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="text-left space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Student / Parent Name *
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-soft-ivory border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-oxford-blue focus:bg-white transition-colors ${
                        errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200"
                      }`}
                      placeholder="e.g. Salim Smith"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-semibold mt-1">Name is required.</p>}
                  </div>

                  <div className="text-left space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-soft-ivory border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-oxford-blue focus:bg-white transition-colors ${
                        errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-200"
                      }`}
                      placeholder="e.g. +91 94433 12345"
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-semibold mt-1">Phone number is required.</p>}
                  </div>

                  <div className="text-left space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-soft-ivory border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-oxford-blue focus:bg-white transition-colors"
                      placeholder="e.g. parent@email.com"
                    />
                  </div>

                  <div className="text-left space-y-1.5">
                    <label htmlFor="grade" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Target Class / Grade
                    </label>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full bg-soft-ivory border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-oxford-blue focus:bg-white transition-colors"
                    >
                      <option>Primary (Grades 5-7)</option>
                      <option>Secondary (Grades 8-10)</option>
                      <option>High School (Grades 11-12)</option>
                      <option>SAT & College Prep</option>
                    </select>
                  </div>

                  <div className="text-left space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Brief Message
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-soft-ivory border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-oxford-blue focus:bg-white transition-colors resize-none"
                      placeholder="Specify subjects or doubt-clearing needs..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-oxford-blue hover:bg-oxford-blue/90 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Submit Inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Location Details & Map Card */}
              <div className="space-y-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-oxford-blue">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="card-luxury p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-warm-gold/40 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold-hover shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Academy Location</h4>
                        <p className="text-slate-600 text-sm mt-0.5">102 Hope Tower, Cantonment, Tiruchirappalli, Tamil Nadu - 620001</p>
                      </div>
                    </div>

                    <div className="card-luxury p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-warm-gold/40 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold-hover shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Phone Queries</h4>
                        <p className="text-slate-600 text-sm mt-0.5">+91 94433 12345 (Mon-Sat, 9AM-8PM)</p>
                      </div>
                    </div>

                    <div className="card-luxury p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-warm-gold/40 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-warm-gold/20 flex items-center justify-center text-warm-gold-hover shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Email Admissions</h4>
                        <p className="text-slate-600 text-sm mt-0.5">admissions@hopetuition.in</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Card Container */}
                <div className="card-luxury rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-md">
                  <iframe 
                    title="Hope Tuition Academy Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9242967674257!2d78.68532457492167!3d10.817112089333918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf507c3905cf1%3A0x7d632551cfd23d8c!2sCantonment%2C%20Tiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
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
                <span>+91 94433 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-warm-gold" />
                <span>admissions@hopetuition.in</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-warm-gold" />
                <span>102 Hope Tower, Cantonment, Tiruchirappalli, Tamil Nadu - 620001</span>
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
  </ClickSpark>
);
}

export default App;
