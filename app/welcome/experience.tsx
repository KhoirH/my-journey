import { Code, Heart, Star, Zap } from "lucide-react";
import { memo } from "react";

type ExperiencesProps = {
  isVisible: boolean;
}

const experiences = [
  {
    company: "Bigbox - Telkom indonesia",
    position: "Software Enginer",
    duration: "2024 - Present",
    description: "As a Software Engineer, I design and develop scalable solutions for real-time video analytics platforms. My work spans from backend architecture to frontend development, with a focus on delivering high-performance, user-friendly applications.",
    achievements: [
      "Designed the architecture for service migration and media server integration using STUN/TURN servers",
      "Developed SaaS dashboard video analytics",
      "Leveraged WebRTC for low-latency real-time video streaming and analytics",
      "Implemented CI/CD pipelines to automate the development and deployment process"
    ],
    icon: <Zap className="text-yellow-400" size={24} />
  },
  {
    company: "Bigbox - Telkom indonesia",
    position: "Frontend Developer",
    duration: "2021 - 2024",
    description: "As an accomplished Web Developer with a strong track record of delivering high-impact projects, I specialize in leveraging modern technologies to build dynamic, scalable, and responsive web applications.",
    achievements: [
      "Developed visually compelling landing pages, product showcases, and admin panels using React.js and Redux, enhancing user engagement and interface performance",
      "Built a B2B object detection dashboard using an atomic design pattern to support modularity and scalability in web architecture",
      "Implemented end-to-end testing using Cypress and component testing with Jest, ensuring application stability and cross-platform reliability",
      "Engineered real-time dashboards for crowd detection, people counting, and vehicle counting by integrating WebRTC for live video streaming and Tailwind CSS for modern UI design",
      "Delivered cutting-edge Progressive Web Apps (PWAs) using Next.js, leveraging Workbox for service worker management (precaching, routing, runtime caching) and React Query for efficient server state handling"
    ],
    icon: <Code className="text-blue-400" size={24} />
  },
  {
    company: "Bagidata - Telkom Indonesia",
    position: "Frontend Developer",
    duration: "2019 - 2020",
    description: "As a dedicated Frontend Developer, I have consistently delivered high-quality applications across web and mobile platforms. My work combines a user-centered approach with technical expertise to build performant and reliable digital products.",
    achievements: [
      "Developed user-friendly and high-performance B2C mobile applications using React Native, ensuring seamless experiences across Android and iOS devices",
      "Built dynamic, responsive web applications with React.js, utilizing Redux for global state management and application consistency",
      "Created robust web solutions using PHP, demonstrating flexibility in adapting to various tech stacks to meet diverse client requirements"],
    icon: <Code className="text-blue-400" size={24} />

  },
];


function Experience(props: ExperiencesProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transform transition-all duration-1000 ${props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-500 transform hover:scale-105 animate-slide-in-right relative overflow-hidden group`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-gray-700 rounded-lg group-hover:bg-gray-600 transition-colors duration-300">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">{exp.position}</h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm mt-2 md:mt-0 transform group-hover:scale-110 transition-transform duration-300">{exp.duration}</span>
                  </div>
                  <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start transform translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-300" style={{ transitionDelay: `${i * 0.1}s` }}>
                        <Star className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(Experience);