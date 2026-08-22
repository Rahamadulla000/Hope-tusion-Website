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
