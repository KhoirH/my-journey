import { Linkedin, Mail } from "lucide-react";
import { memo } from "react";


type ContactProps = {
  isVisible: boolean;
}

function Contact(props: ContactProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`transform transition-all duration-1000 ${props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-up">
            I'm always open to discussing new opportunities and interesting projects.
            Let's connect and build something amazing together!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:hilmi.khoirulloh02@gmail.com"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center animate-bounce-subtle"
            >
              <Mail className="mr-2" size={20} />
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/hilmi-k-247640131"
              className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center animate-bounce-subtle"
              style={{ animationDelay: '0.2s' }}
            >
              <Linkedin className="mr-2" size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Contact);