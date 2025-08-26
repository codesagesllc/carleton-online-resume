import { 
  ChevronRightIcon, 
  DownloadIcon, 
  EnvelopeOpenIcon, 
  LinkedInLogoIcon, 
  GitHubLogoIcon, 
  CodeIcon, 
  Component1Icon, // Replacing DatabaseIcon
  GlobeIcon, // Replacing CloudIcon
  RocketIcon,
  LightningBoltIcon,
  TargetIcon,
  CheckCircledIcon,
  ExternalLinkIcon,
  CalendarIcon,
  TimerIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

// Project data
const projects = [
  {
    title: "Dynamic Group Management System",
    description: "Enterprise-scale system managing 5,000+ users with Microsoft Graph API integration",
    tech: [".NET 8", "Blazor", "SignalR", "Microsoft Graph", "Clean Architecture"],
    highlights: [
      "Processes 100,000+ records daily",
      "99.9% uptime in production",
      "85% reduction in manual processes"
    ],
    metrics: {
      users: "5,000+",
      records: "100K+ daily",
      performance: "2s load time"
    }
  },
  {
    title: "Contract Management Platform",
    description: "Icertis integration for Freddie Mac's Single Family Division",
    tech: ["Java", "Spring Boot", "OpenShift", "Selenium", "Cucumber"],
    highlights: [
      "Automated testing framework",
      "Microservices architecture",
      "CI/CD pipeline optimization"
    ],
    metrics: {
      coverage: "95% test",
      deployment: "30min",
      availability: "99.5%"
    }
  },
  {
    title: "Legacy System Modernization",
    description: "Transformed monolithic applications to modern cloud-native architecture",
    tech: ["ASP.NET Core", "Entity Framework", "Azure", "Docker", "Kubernetes"],
    highlights: [
      "60% performance improvement",
      "Reduced infrastructure costs by 40%",
      "Improved scalability and maintainability"
    ],
    metrics: {
      performance: "+60%",
      cost: "-40%",
      scalability: "10x"
    }
  }
];

// Skills data with proficiency levels
const skillsData = {
  "Languages & Frameworks": [
    { name: "C#/.NET", level: 95 },
    { name: "Java/Spring", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Blazor", level: 90 },
    { name: "React/Next.js", level: 75 },
    { name: "SQL", level: 90 }
  ],
  "Cloud & DevOps": [
    { name: "Azure", level: 85 },
    { name: "AWS", level: 70 },
    { name: "Docker/K8s", level: 75 },
    { name: "CI/CD", level: 85 },
    { name: "Git", level: 95 },
    { name: "OpenShift", level: 80 }
  ],
  "Tools & Platforms": [
    { name: "Microsoft Graph", level: 90 },
    { name: "SignalR", level: 85 },
    { name: "Entity Framework", level: 90 },
    { name: "REST APIs", level: 95 },
    { name: "Microservices", level: 85 },
    { name: "Clean Architecture", level: 90 }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Enhanced Navigation Bar */}
        <nav className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
          <div className="flex items-center space-x-2 group">
            <CodeIcon className="w-5 h-5 text-indigo-600 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm font-semibold text-gray-700">Carleton Cabarrus</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#projects" className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              <RocketIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Projects</span>
            </a>
            <a href="#skills" className="hidden md:flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
              <TargetIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Skills</span>
            </a>
            <Link href="/contact" className="flex items-center space-x-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105">
              <EnvelopeOpenIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Contact</span>
            </Link>
          </div>
        </nav>

        {/* Enhanced Hero Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-white/50 animate-fadeIn">
          <div className="text-center">
            <div className="mb-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient">
                Carleton Cabarrus
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <LightningBoltIcon className="w-5 h-5 text-yellow-500 animate-pulse" />
                <p className="text-xl md:text-2xl text-gray-700 font-semibold">Full-Stack Software Developer</p>
                <LightningBoltIcon className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Building enterprise-scale solutions with modern technologies • 5+ years experience • Cloud architecture specialist
              </p>
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://www.linkedin.com/in/carleton-cabarrus-jr/" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-white p-3 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                  <LinkedInLogoIcon className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium hidden sm:inline">LinkedIn</span>
                </div>
              </a>
              <a href="https://github.com/carletonDev" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-white p-3 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                  <GitHubLogoIcon className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium hidden sm:inline">GitHub</span>
                </div>
              </a>
              <a href="mailto:carleton.cabarrus@codesages.net" 
                 className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative bg-white p-3 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                  <EnvelopeOpenIcon className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium hidden sm:inline">Email</span>
                </div>
              </a>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                <GlobeIcon className="w-4 h-4" />
                <span>Azure & AWS</span>
              </div>
              <div className="flex items-center space-x-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                <Component1Icon className="w-4 h-4" />
                <span>SQL & NoSQL</span>
              </div>
              <div className="flex items-center space-x-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                <CodeIcon className="w-4 h-4" />
                <span>.NET & Java</span>
              </div>
              <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                <CheckCircledIcon className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Users Managed", value: "5,000+", icon: "👥" },
            { label: "Daily Records", value: "100K+", icon: "📊" },
            { label: "Cost Reduction", value: "40%", icon: "💰" },
            { label: "Performance Gain", value: "70%", icon: "🚀" }
          ].map((metric, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl mb-1">{metric.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div id="projects" className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-200"></div>
                <div className="relative bg-white rounded-xl p-6 h-full hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    {project.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-start">
                        <CheckCircledIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-bold text-indigo-600">{value}</div>
                        <div className="text-xs text-gray-500">{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, tIndex) => (
                      <span key={tIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Experience Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/50">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
            <CalendarIcon className="w-8 h-8 mr-3 text-indigo-600" />
            Professional Experience
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-purple-600"></div>
            
            {/* Marathon Consulting */}
            <div className="relative mb-8 ml-16">
              <div className="absolute -left-12 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Full Stack Developer - Enterprise Solutions</h3>
                    <p className="text-indigo-600 font-semibold">Marathon Consulting (Vital Core Client)</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <TimerIcon className="w-4 h-4" />
                      <span>Jan 2024 - Present</span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    CURRENT
                  </span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRightIcon className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Led development of enterprise Dynamic Group Management System managing 5,000+ users and processing 100,000+ records daily via Microsoft Graph API</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Architected multi-layered Clean Architecture solution using .NET 8, Blazor Server, and Entity Framework Core with 99.9% uptime</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Built real-time SignalR monitoring dashboard tracking 6 concurrent background sync jobs with intelligent conflict resolution</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Optimized performance reducing page load from 8s to under 2s and API calls by 70% through strategic caching</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Freddie Mac */}
            <div className="relative mb-8 ml-16">
              <div className="absolute -left-12 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-800">Agile Developer 2</h3>
                  <p className="text-indigo-600 font-semibold">Freddie Mac</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <TimerIcon className="w-4 h-4" />
                    <span>Sept 2021 - Jan 2024</span>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Maintained and enhanced Icertis Contract Management System in Single Family Division</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Managed microservices on OpenShift, handling configuration and deployment pipelines</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Other positions */}
            <div className="relative mb-8 ml-16">
              <div className="absolute -left-12 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-800">J2EE Developer</h3>
                  <p className="text-indigo-600 font-medium">Estes Express</p>
                  <p className="text-sm text-gray-600">Oct 2020 - Sept 2021</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-800">Programmer 3</h3>
                  <p className="text-indigo-600 font-medium">Onshore Outsourcing</p>
                  <p className="text-sm text-gray-600">Aug 2019 - Oct 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <div id="skills" className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-4">{category}</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-indigo-600 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Education</h2>
              <h3 className="text-xl font-semibold">Bachelor of Science in Information Systems</h3>
              <p className="text-indigo-100">Virginia Commonwealth University • Class of 2016</p>
            </div>
            <div className="text-6xl opacity-20">🎓</div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm passionate about creating robust, scalable solutions that make a real impact. 
            Whether you need a full-stack developer, cloud architect, or technical lead, I bring expertise and dedication to every project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/CarletonCabarrus_Resume.html"
              className="group relative inline-flex items-center px-6 py-3"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transform transition-all duration-200">
                <DownloadIcon className="w-5 h-5" />
                <span>Download Resume</span>
              </div>
            </a>
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center px-6 py-3"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transform transition-all duration-200">
                <EnvelopeOpenIcon className="w-5 h-5" />
                <span>Get In Touch</span>
              </div>
            </Link>
            <a 
              href="https://www.linkedin.com/in/carleton-cabarrus-jr/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-6 py-3"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transform transition-all duration-200">
                <ExternalLinkIcon className="w-5 h-5" />
                <span>View LinkedIn</span>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2024 Carleton Cabarrus • Built with Next.js, TypeScript & Tailwind CSS • Deployed on Vercel</p>
        </footer>
      </div>
    </div>
  );
}