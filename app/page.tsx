import { ChevronRightIcon, DownloadIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link'; 


export default function Home(){
  return (
      <div className="container mx-auto p-8 bg-white shadow-md rounded-lg"> 
          {/* Navigation Bar */}
          <nav className="flex justify-end mb-4">
              <Link href="/contact" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700">
                  <EnvelopeOpenIcon className="w-5 h-5" />
                  <span>Contact Me</span>
              </Link>
          </nav>

          <div className="flex flex-col space-y-6"> 
              {/* Header */}
              <div className="text-center">
              <h1 className="text-4xl font-bold text-indigo-600">Carleton Cabarrus</h1> 
                  <p className="text-lg text-gray-700">Full-Stack Software Developer</p> 
              </div>

              {/* Objective */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Objective</h2> {/* Dark text */}
                  <p className="text-gray-700">
                      Experienced Full-Stack Software Developer with 5+ years of expertise in Java, C#, Azure, AWS, and front-end technologies. Proven track record in building microservices, crafting user interfaces, and designing efficient databases.
                  </p>
              </div>

              {/* Experience */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Experience</h2>
                  {/* Job 1 */}
                  <div className="mb-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="font-semibold text-gray-800">Software Developer</h3>
                              <p className="text-gray-600">Core Consulting | Jan 2024 - Present</p>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <ul className="list-disc ml-6 mt-2 text-gray-700">
                          <li>Developed a Training Tracking application using Blazor that allowed the Army to track and assign training to personnel</li>
                          <li>Developed a Budget Tracking application for the Army&apos;s Assets that also gave Data Visualization using ChartJS with .NET Core Web App</li>
                      </ul>
                  </div>
                  <div className="mb-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="font-semibold text-gray-800">Agile Developer 2</h3>
                              <p className="text-gray-600">Freddie Mac | Sept 2021 - Jan 2024</p> 
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <ul className="list-disc ml-6 mt-2 text-gray-700">
                          <li>Working in Single Family Division to perform maintenance activities on Icertis Contract Management System.</li>
                          <li>OpenShift to run microservices in pods, changing config files</li>
                          <li>Selenium with Cucumber to test the UI and API</li>
                          <li>Java to debug microservices and write test scripts. Jenkins pipelines for build runs</li>
                          <li>Goldfield stack Creating microservices and adding additional endpoints in Java Spring Framework</li>
                      </ul>
                  </div>

                  <div className="mb-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="font-semibold text-gray-800">J2EE Developer</h3>
                              <p className="text-gray-600">Estes Express | Oct 2020 - Sept 2021</p>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <ul className="list-disc ml-6 mt-2 text-gray-700">
                          <li>Selenium,Test NG,to Automate user interactions with various desktop,mobile, and web applications </li>
                      </ul>
                  </div>
                  <div className="mb-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="font-semibold text-gray-800">Programmer 3</h3>
                              <p className="text-gray-600">Onshore Outsourcing | Aug 2019 - Oct 2020</p>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <ul className="list-disc ml-6 mt-2 text-gray-700">
                          <li>Developed Applications and Modernized Legacy Applications using Vaadin 8 Java Spring Boot  ASP.NET Core and Entity Framework</li>
                      </ul>
                  </div>

              </div>

              {/* Education */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Education</h2>
                  <div className="mb-4">
                      <div className="flex items-center justify-between">
                          <div>
                              <h3 className="font-semibold text-gray-800">Bachelors of Science Information Systems</h3>
                              <p className="text-gray-600">Virginia Commonwealth University | 2016</p>
                          </div>
                          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                      </div>
                  </div>
              </div>

              {/* Skills */}
              <div>
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Skills</h2>
                  <div className="flex flex-wrap">
                      {/* Skill badges */}
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Java</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">C#</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Entity Framework</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">NextJs</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Vercel</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Auth0/IAM&apos;s</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Selenium</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">JUnit</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">TestNG</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">SQL</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">API&apos;s</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Swagger API Doc&apos;s</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Spring REST</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">Spring Boot</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">ASP.NET Web API</span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mb-2">ASP.NET Core Web</span>
                  </div>
              </div>
          </div>
          <div className="text-center mt-4"> 
          <a 
    href="https://docs.google.com/document/d/1TudqEyB5urs_uukjfC1ET8q2Ob47mxev/export?format=pdf" 
    download 
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
>
    <DownloadIcon className="w-5 h-5 mr-2" /> 
    Download Resume
</a>
                </div>
      </div>
  );
};
