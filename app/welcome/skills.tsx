import { Code, Database, Globe, PhoneIcon, Server, Tablet } from "lucide-react";

type SkillsProps = {
  isVisible: boolean;
}


const skills = {
  frontend: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'SASS', 'Redux', 'Zustand', 'PostCSS', 'Websocket', 'PWA', 'Cypress', 'Jest', 'WASM'],
  backend: ['Node.js', 'Nest.js', 'Express.js', 'Golang', 'RESTful APIs', 'PHP'],
  mobile: ['React Native', 'Fluter',  'Flutter Bloc', 'Dart', 'React Navigation', 'Firebase', 'Google Maps SDK'],
  database: ['MongoDB', 'MySQL', 'Redis', 'SQLite', 'PostgreSQL'],
  tools: ['Git', 'Docker', 'Kubernates', 'Vercel', 'Postman', 'VS Code', 'Linux', 'Apache Jmeter', 'Datadog', 'MediaMTX', 'Ffmpage']
};

function Skills(props: SkillsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transform transition-all duration-1000 ${props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Frontend', icon: Code, color: 'blue', skills: skills.frontend },
            { title: 'Backend', icon: Server, color: 'green', skills: skills.backend },
            { title: 'Database', icon: Database, color: 'purple', skills: skills.database },
            { title: 'Mobile', icon: Tablet, color: 'red', skills: skills.mobile },
            { title: 'Tools', icon: Globe, color: 'pink', skills: skills.tools }
          ].map((category, index) => (
            <div
              key={category.title}
              className={`bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-${category.color}-500 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                <category.icon className={`text-${category.color}-400 mr-3 animate-pulse`} size={24} />
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`bg-${category.color}-500/20 text-${category.color}-300 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 animate-fade-in`}
                    style={{ animationDelay: `${skillIndex * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills;