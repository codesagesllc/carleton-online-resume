import { ChevronRightIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link'; 


export default function Home()  {
  return (
    <div className="container mx-auto p-8">
          {/* Navigation Bar */}
          <nav className="flex justify-end mb-4"> {/* Position the nav bar at the top right */}
          <Link href="/contact" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700">
            <EnvelopeOpenIcon className="w-5 h-5" /> {/* Add an envelope icon */}
            <span>Contact Me</span>
          </Link>
        </nav>
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Carleton Cabarrus</h1>
          <p className="text-gray-600">Software Developer</p>
        </div>

        {/* Objective */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Objective</h2>
          <p>
            Experienced Full-Stack Software Developer with 5+ years of expertise in Java, C#, Azure, AWS, and front-end technologies. Proven track record in building microservices, crafting user interfaces, and designing efficient databases.
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {/* Job 1 */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Software Developer</h3>
                <p className="text-gray-600">Core Consulting | Jan 2024 - Present</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            </div>
            <ul className="list-disc ml-6 mt-2">
              <li>Develop Applications and Microservices as a contractor for the National Guard using Visual Studio 2022</li>
            </ul>
          </div>

          {/* Add more job entries similarly */}
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Bachelors of Science Information Systems</h3>
                <p className="text-gray-600">Virginia Commonwealth University | 2016</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap">
            {/* Skill badges */}
            <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Java</span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">C#</span>
            {/* Add more skills similarly */}
          </div>
        </div>
      </div>
    </div>
  );
};

