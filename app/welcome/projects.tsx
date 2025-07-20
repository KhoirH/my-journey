import BottomSheet from "components/bottomSheet";
import { Carousel } from "components/carousel";
import Modal from "components/modal";
import { ExternalLink, Github } from "lucide-react";
import { memo, useState } from "react";

type ProjectsProps = {
  isVisible: boolean;
}

const projects = [
  {
    title: "Video Analytic System",
    description: "A Video Analytic System is an intelligent solution that utilizes computer vision and AI to analyze video content in real time. In this project, I contributed by designing the CMS and Analytic dashboard, as well as setting up the media server and integrating tools like Datadog for system observability.",
    tech: ["React", "Next.js", "Node.js", "Tailwind", "FSD", "Atomic", "React Query", 'Scss', 'Webrtc', 'Ffmpag', 'Linux', 'MediaMTX', 'Datadog', "HTML5", "CSS3"],
    // github: "#",
    video_demo: "/assets/video-analytic-system/demo-cms.mp4",
    image: "bg-gradient-to-br from-blue-400 to-purple-500",
    stats: { year: '2025' }
  },
  {
    title: "Public Service System",
    description: "A Public Service System is a digital platform that helps manage interactions between government institutions and the public. It allows citizens to access services, submit complaints, give feedback, and track their requests transparently. In this project, I worked on slicing the design and integrating it into the system.",
    tech: ["React", "Next.js", "Websocket", "Material UI", "React Query", "Jitsi", "PWA", "Workbox", "HTML5", "CSS3"],
    // github: "#",
    image_demo: ["/assets/public-service-system/image.png"],
    // demo: "#",
    image: "bg-gradient-to-br from-green-400 to-blue-500",
    stats: { year: '2022' }
  },
  {
    title: "eKYC",
    description: "An eKYC (Electronic Know Your Customer) is a toolkit that allows digital identity verification include feature active liveness detection. In this project, I created an embedding system that consumes the SDK for both Android and iOS platforms.",
    tech: ["React", "WASM", "Webhook"],
    // github: "#",
    // demo: "#",
    // image_demo: "/assets/public-service-system/image.png",
    image: "bg-gradient-to-br from-pink-400 to-red-500",
    stats: { year: '2025' }
  },
  {
    title: "Assets Management System",
    description: "An Assets Management System is a platform used to track, monitor, and manage company assets—both physical and digital—more efficiently. It helps organize asset data, monitor usage, assign ownership, and manage the asset lifecycle. In this project, I was fully involved in designing the system from front to back.",
    tech: ["React", "Antd", "Next.js", "Nest.js", "Prisma", "ORM", "MySql", "Linux", "Node.js", "HTML5", "CSS3"],
    github: "https://github.com/orgs/AMS-Khoir",
    // demo: "#",
    image: "bg-gradient-to-br from-purple-400 to-pink-500",
    stats: { year: '2024' }
  },
  {
    title: "Workforce Planning System",
    description: "A Workforce Planning System is a platform designed to help organizations manage employee allocation, scheduling, and resource planning effectively. In this project, I worked on developing the frontend dashboard for both client and admin sides.",
    tech: ["React", "React Router", "Material UI", "Redux", "HTML5", "CSS3"],
    // github: "#",
    // demo: "#",
    image_demo: ["/assets/workforce-planning-system/image-admin.jpeg", "/assets/workforce-planning-system/image-client.jpeg"],
    image: "bg-gradient-to-br from-cyan-400 to-blue-500",
    stats: { year: '2021' }
  },
  {
    title: "HRIS System",
    description: "An HRIS (Human Resource Information System) is a platform that manages employee data, attendance, payroll, and other HR-related processes in one integrated system. In this project, I developed the attendance feature, the \"Ask the Expert\" application, and the community application. I also worked on developing the community website to support employee engagement and knowledge sharing.",
    tech: ["React", "Flutter", "Material UI", "Redux", "HTML5", "CSS3", "Dart", "Next.js"],
    // github: "#",
    // demo: "#",
    image_demo: ["/assets/hris-system/image-application.jpeg", "/assets/hris-system/image-dashboard.jpeg"],
    image: "bg-gradient-to-br from-green-400 to-teal-500",
    stats: { year: '2021' }
  },
  {
    title: "Sosial Media Analytic",
    description: "An HRIS (Human Resource Information System) is a platform that manages employee data, attendance, payroll, and other HR-related processes in one integrated system. In this project, I developed the attendance feature, the \"Ask the Expert\" application, and the community application. I also worked on developing the community website to support employee engagement and knowledge sharing.",
    tech: ["React", "Flutter", "Material UI", "Redux", "HTML5", "CSS3", "Dart", "Next.js"],
    // github: "#",
    // demo: "#",
    image_demo: ["/assets/sosial-media-analytic/image.jpeg"],
    image: "bg-gradient-to-br from-orange-400 to-red-500",
    stats: { year: '2020' }
  },
  {
    title: "Biometric Application",
    description: "A Biometric Application is a system that uses fingerprint or face recognition for secure identity verification. In this project, I handled the integration of the biometric system and its implementation with the payment gateway to ensure secure transaction processing.",
    tech: ["React", "React Native", "Java", "Redux", "React Navigation"],
    // github: "#",
    // demo: "#",
    image_demo: ["/assets/biometric-application/image.jpeg"],
    image: "bg-gradient-to-br from-indigo-400 to-violet-500",
    stats: { year: '2019' }
  },
  {
    title: "Lifestyle Application",
    description: "A Lifestyle Application is a mobile platform designed to support daily activities like personal well-being. In this project, I built the system end-to-end—from initialization to publishing on the Play Store.",
    tech: ["React", "React Native", "Java", "Gradle", "React Navigation", "XML"],
    // github: "#",
    image_demo: ["/assets/life-style-application/image.jpeg"],
    // demo: "#",
    image: "bg-gradient-to-br from-teal-400 to-purple-500",
    stats: { year: '2018' }
  },
];

type TCardProject = {
  index: number;
  image: string;
  title: string;
  stats: any;
  description: string;
  tech: string[];
  github?: string;
  image_demo?: string[];
  video_demo?: string;
}
function CardProject(props: TCardProject) {
  const [isShowDemo, setIsShowDemo] = useState(false);
  return (
    <div
      className={`bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 animate-slide-in-up group`}
      style={{ animationDelay: `${props.index * 0.2}s` }}
    >
      <div className={`h-48 ${props.image}  flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <div className="text-white text-2xl font-bold z-10 transform group-hover:scale-110 transition-all duration-300">
          {props.title}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{props.title}</h3>
        <p className="text-gray-300 mb-4">{props.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {props.tech.map((tech, techIndex) => (
            <span
              key={tech}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-gray-600 hover:scale-110"
              style={{ animationDelay: `${techIndex * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {
            props.github ? (

              <a target="_blank" href={props.github} className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                <Github size={18} className="mr-2" />
                Code
              </a>
            ) : null
          }
          {
            props.video_demo ? (
              <>
                <a onClick={(e) => {
                  e.preventDefault();
                  setIsShowDemo(true);
                }} className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                  <ExternalLink size={18} className="mr-2" />
                  Preview
                </a>
                <BottomSheet title={props.title}  onClose={() => setIsShowDemo(false)} isOpen={isShowDemo} >
                  <video className="w-full"  autoPlay src={props.video_demo}/>
                </BottomSheet>
              </>
            )
            : null
          }
          {
            props.image_demo ? (
              <>
                <a onClick={(e) => {
                  e.preventDefault();
                  setIsShowDemo(true);
                }} className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110">
                  <ExternalLink size={18} className="mr-2" />
                  Preview
                </a>
                <BottomSheet showFooter={false} title={props.title}  onClose={() => setIsShowDemo(false)} isOpen={isShowDemo} >
                  {/* <div className="flex w-full justify-center gap-4 px-5"> */}
                    {
                      props.image_demo.map((img) => (
                        <img key={img} className="border border-gray-400 m-auto block my-2"  src={img} />
                      ))
                    }
                  {/* </div> */}
                </BottomSheet>
              </>
            )
            : null
          }
        </div>
      </div>
    </div>
  )
}

function Projects(props: ProjectsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transform transition-all duration-1000 ${props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <CardProject index={index} {...project} />
          ))}
        </div>

      </div>
    </div>
  )
}


export default memo(Projects);