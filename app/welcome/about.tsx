import { Github, Linkedin, Mail } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

type AboutProps = {
	isVisible: boolean;
}
function About(props: AboutProps) {
	const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: any) => {
		const [count, setCount] = useState(0);
		const [isVisible, setIsVisible] = useState(false);
		const ref = useRef(null);

		useEffect(() => {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				},
				{ threshold: 0.1 }
			);

			if (ref.current) {
				observer.observe(ref.current);
			}

			return () => observer.disconnect();
		}, []);

		useEffect(() => {
			if (!isVisible) return;

			let startTime: number;
			const animate = (currentTime: number) => {
				if (!startTime) startTime = currentTime;
				const progress = Math.min((currentTime - startTime) / duration, 1);
				setCount(Math.floor(progress * end));

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			};

			requestAnimationFrame(animate);
		}, [isVisible, end, duration]);

		return (
			<span ref={ref} className="text-6xl font-bold text-blue-400 mb-2">
				{count}{suffix}
			</span>
		);
	};

	return (

		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className={`transform transition-all duration-1000 ${props.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
				<h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
					About Me
				</h2>
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<div className="animate-slide-in-left">
							<p className="text-lg text-gray-300 leading-relaxed">
								As a Fullstack Developer, I take pleasure in creating resilient web and hybrid applications.
								I possess a comprehensive understanding of the Software Development Life Cycle (SDLC) and can pinpoint the best front-end and back-end technologies to meet project goals effectively.
								Committed to the SOLID principles, I ensure that my code remains clean, scalable, and easy to maintain.
								However, my role extends beyond mere coding; I embrace responsibility for my contributions, engage in technical decision-making, and monitor project timelines to guarantee the timely delivery of dependable solutions.
							</p>
						</div>
						<div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
							<p className="text-lg text-gray-300 leading-relaxed">
								Beyond my coding experience, I have managed comprehensive projects from the initial planning stages all the way to deployment.
								I have also instructed vocational students and participated in business discussions to shape future project strategies.
								I am proficient in both Scrum and Waterfall methodologies and can easily adjust to various teams and project needs.
							</p>
						</div>
						<div className="flex space-x-6 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
							<a href="https://github.com/KhoirH" className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-125">
								<Github size={24} />
							</a>
							<a href="https://www.linkedin.com/in/hilmi-k-247640131" className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-125">
								<Linkedin size={24} />
							</a>
							<a href="mailto:hilmi.khoirulloh02@gmail.com" className="text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-125">
								<Mail size={24} />
							</a>
						</div>
					</div>
					<div className="relative animate-slide-in-right">
						<div className="w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto opacity-20 animate-pulse-slow"></div>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center">
								<div className="mb-2">
									<AnimatedCounter end={5} suffix="+" />
								</div>
								<div className="text-lg text-gray-300">Years Experience</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(About);