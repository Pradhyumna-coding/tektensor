import React, { useCallback, useEffect, useRef, useState } from "react"
import './HomePage.css';

import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { Link } from 'react-router-dom';
import GradientBorderDiv from "../components/GradientBorder";
import { Chip, ReadMore, ListItem } from '../components/ListItem';
import { desc } from "framer-motion/client";
import TimeLineSingle from "../components/TimeLine";
import HorizontalScroll from '../components/HorizontalScroll';
import { type } from "@testing-library/user-event/dist/type";

/******************************
 * Components
******************************/
function FlipWords({ words, duration = 1000 }) {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation()
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          filter: "blur(8px)",
          position: "absolute",
        }}
        className="flipword-container"
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="flipword-span"
              >
                {letter}
              </motion.span>
            ))}
            <span className="flipword-span">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>

    </AnimatePresence>
  )

}

function NavHome() {
  const [activeSection, setActiveSection] = useState(null);
  const sections = ['achivements', 'sports', 'skills', 'projects', 'journey', 'contact'];

  useEffect(() => {
    // Function to determine active section based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const active = sections.find((section) => {
        const element = document.getElementById(section);
        if (element != null) { return scrollY >= (element.offsetTop - 200) && scrollY <= element.offsetTop + element.offsetHeight; }
        return false;
      });
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call initially to set active section
  });

  return (
    <motion.div className='nav-home' >

      <ul className="home-menu">
        {
          sections.map((section, index) => (
            <li className={activeSection == section ? 'home-item active' : 'home-item'}>
              <a
                onClick={() => { document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>{section}</a>
            </li>
          ))
        }
      </ul>
    </motion.div>
  );
}
function ProjectIterator({ heading, projectList }) { // Destructure props
  console.log(projectList)
  const [selectedProject, setSelectedProject] = useState(projectList[0]); // Initialize with the first project

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };



  return (
    <div>
      <p className="card-heading">{heading}</p>
      <div className="grid two-column">
        <div>
          <ul>
            {projectList.map((project) => (
              <li onClick={() => handleProjectClick(project)} onMouseOver={() => handleProjectClick(project)}
                className={"project-list" + (selectedProject == project ? " selected" : "")}>{project.projectName}</li>
            ))}
          </ul>
        </div>

        <div className="project-detail-div">
          <p className="card-heading">{selectedProject.projectName}</p>
          {selectedProject.tag ? <Chip text={selectedProject.tag}
            iconText={selectedProject.tag}
            color={selectedProject.tag == "android" ? "#74fc86" : "#8ad0ff"} /> : null}

          <p className="card-text">{selectedProject.projectDesc}</p>
        </div>
      </div>
    </div>
  )
}


/******************************
 * Values
******************************/
var skills = [
  {
    skillName: "Python",
    skillImage: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg"
  },
  {
    skillName: "Android",
    skillImage: "https://upload.wikimedia.org/wikipedia/commons/archive/d/d7/20110805155935%21Android_robot.svg"
  },
  {
    skillName: "Machine Learning",
    skillImage: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"
  },
  {
    skillName: "Power System Automation",
    skillImage: "https://www.pscad.com/img/pscad-logo.svg?1727980463",
    imageStyle: { width: '80%', margin: 'auto' }
  },
  {
    skillName: "Web Development",
    skillImages: [
      "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/CSS.3.svg",
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
    ],
    span: 2
  },
  {
    skillName: "React",
    skillImage: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  },
  {
    skillName: "Flutter",
    skillImage: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flutter_logo.svg"
  },
]
var projects = {
  python: [
    {
      projectName: "Power System Simulation Automation",
      projectDesc: "I have created a Python scripts that auatomates and distributes multiple cases across multiple Computers to run Power System Simulations and collect the simulated Data and Generate Graphs and Tables completely. This reduces the time taken to run multiple cases across devices and also reduces the error in data collection by days.",
    },
    {
      projectName: "Stock Price Prediction using Machine Learning",
      projectDesc: "Stock Price Prediction using RNNs and LSTMs and few important techniques for finetuning.",
    },
    {
      projectName: "Vision Controller",
      projectDesc: "I have created a project in which the mouse moves to where the user is seeing using OpenCV, mediaPipe and Pyautogui and also Gesture control such as move or click anything using hands similar to Vision Pro just using a single webcam.",
    },
    {
      projectName: "Self Driving Car",
      projectDesc: "I have built a Self driving car project using Tensorflow in a simulation called Udacity",
    },
    {
      projectName: "AI controlled video games",
      projectDesc: "i have built a few games in Godot and made an AI to play them using Reinforcement Learning and even an AI that learns to play chess rather than traditional algorithms. and AI that can walk bipedal or land rocket using OpenAI Gym.",
    },
    {
      projectName: "Computer Vision Projects",
      projectDesc: "I have worked on openCV projects using openCV in python and tensorflow such as Mask and Face Detection, Object detection using Yolo, Drumming in air using Hand Detection,",
    },
    {
      projectName: "Smart Subway Surfer",
      projectDesc: "I have created a project in which user can play Subway Surfer by jumping, moving aside and tucking similar to game using OpenCV,mediaPipe and Pyautogui.",
    },
    {
      projectName: "Machine Learning Projects",
      projectDesc: "I have worked on Machine Learning projects using tensorflow and other libraries such as RNN, LSTM, CNN, GAN, Autoencoders, etc. etc.",
    },
    {
      projectName: "Natural Language Processing Projects",
      projectDesc: "I have worked on NLP projects using tensorflow and other libraries such as Sentiment Analysis, Text Summarization, Text Generation, and Language Translation and even OCR.",
    },
    {
      projectName: "Robotics Projects",
      projectDesc: "I have worked on Robotics projects using Microbit such as Line follower, Remote Sensing and watering plants, and few electronic projects.",
    },
    {
      projectName: "Personal Assistant",
      projectDesc: "A Personal Assistant named Infinity that could here and repond to queries by searching online and opening apps and other functions completely offline running all TTS and STT on computer.",
    },
    {
      projectName: "Disease Prediction using Machine Learning",
      projectDesc: "Pneumonia detection using Xray using CNN and scans and plant disease detection using images with a high degree of accuracy.",
    },
  ],
  mobile: [
    {
      projectName: "Ride Hailing App",
      projectDesc: "I built a Ride Hailing App like Uber using Flutter and Firebase from scratch with both customer and driver apps connecting to each other.",
      tag: "flutter"
    },
    {
      projectName: "Abacus App",
      projectDesc: "I built an app that simulates abacus in mobile for kids to learn with question checking and history analysis.",
      tag: "android"
    },
    {
      projectName: "Smart Atlas Game",
      projectDesc: "I made an innovative game where user can play atlas with each other and the plays are automatically shown in Google Maps just by hearing them and the mobile shows the history of all places, shows error in case it repeats ",
      tag: "android"
    },
    {
      projectName: "Power Quality App",
      projectDesc: "An app that shows table of data and changes as per user requirement, built for IPR Technologies.",
      tag: "android"
    },
  ],
  web: [
    {
      projectName: "Tektensor.com",
      projectDesc: "Tektensor.com that is this website itself! was built from ground up by me alone using React.\nThat is why this website looks so unique and futuristic which would never be possible using other Website builder application",
      projectLink: "https://tektensor.com",
      projectImage: "/tektensor_logo.svg"
    },
    {
      projectName: "Iprtechnologies.com",
      projectDesc: "IPR Technologies is a company that specialises in Power Systems and related services.\nI worked on their website from scratch using React which was my first big project and also my first relesed website.",
      projectLink: "https://iprtechnologies.com",
      projectImage: "https://iprtechnologies.com/ipr_logo.png"
    },
  ]
}

var mainProjects = [
  {
    projectName: "Power System Simulation Automation",
    projectDesc: "I have created a Python scripts that auatomates and distributes multiple cases across multiple Computers to run Power System Simulations and collect the simulated Data and Generate Graphs and Tables completely. This reduces the time taken to run multiple cases across devices and also reduces the error in data collection by days.",
    type: "Python",
    color: "#8ad0ff",
    span: 2
  },
  {
    projectName: "Ride Hailing App",
    projectDesc: "I built a Ride Hailing App like Uber using Flutter and Firebase from scratch with both customer and driver apps connecting to each other.",
    type: "Mobile",
    color: "#74fc86"
  },
  {
    projectName: "Tektensor.com",
    projectDesc: "Tektensor.com that is this website itself! was built from ground up by me alone using React.\nThat is why this website looks so unique and futuristic which would never be possible using other Website builder application",
    projectLink: "tektensor.com",
    type: "Website",
    color: "#ff8989"
  },
  {
    projectName: "Vision Controller",
    projectDesc: "I have created a project in which the mouse moves to where the user is seeing using OpenCV, mediaPipe and Pyautogui and also Gesture control such as move or click anything using hands similar to Vision Pro just using a single webcam.",
    type: "Python",
    color: "#8ad0ff",
    span: 2
  }
]


var contactDetails = [
  {
    name: "pradhyumnakm24@gmail.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/120px-Gmail_icon_%282020%29.svg.png?20221017173631",
    link: "mailto:pradhyumnakm24@gmail.com"
  },
  {
    name: "Pradhyumna-coding",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/120px-GitHub_Invertocat_Logo.svg.png?20230417032619",
    link: "https://github.com/Pradhyumna-coding"
  },
  {
    name: "@codingExplorerPradhyumna",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/YouTube_full-color_icon_%282024%29.svg/120px-YouTube_full-color_icon_%282024%29.svg.png?20241018202936",
    link: "https://www.youtube.com/@codingExplorerPradhyumna"
  },

]


var achievements = [
  {
    name: "1st in Silverzone Science Olympiad Level-2",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured International Rank 1 in Silverzone Science Olympiad Level-2 width a perfect score of 100/100\n\nDate:2022-23",
  },
  {
    name: "1st in Running Race[100 m]",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Race[100 m] in school competition\n\nDate:2022-23",
  },
  {
    name: "1st in Running Race[200 m]",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Race[200 m] in school competition\n\nDate:2022-23",
  },
  {
    name: "Rank 3 in South India in Silverzone STEM Innovation Olympiad",
    iconText: "workspace_premium",
    iconColor: "brown",
    desc: "I secured Zonal rank 3 in Silverzone STEM Innovation Olympiad Level-1\n\nDate:2022-23",
  },
  {
    name: "Rank 17 in India in SOF Science Olympiad",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured National rank 17 and International rank 29 in SOF Science Olympiad\n\nDate:2022-23",
  },
  {
    name: "International Rank 8 in SOF Maths Olympiad",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured International rank 8 in SOF Maths Olympiad with score of 58/60\n\nDate:2022-23",
  },
  {
    name: "Rank 33 in South India in Silverzone Informatics Olympiad",
    iconText: "workspace_premium",
    iconColor: "brown",
    desc: "I secured Zonal rank 33 in Silverzone Informatics Olympiad Level-1\n\nDate:2022-23",
  },
  {
    name: "Rank 35 in South India in Silverzone Reasoning and Aptitude Olympiad",
    iconText: "workspace_premium",
    iconColor: "brown",
    desc: "I secured Zonal rank 35 in Silverzone Reasoning and Aptitude Olympiad Level-1\n\nDate:2022-23",
  },
  {
    name: "1st in Running Race",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Race in school competition\n\nDate:2023-24",
  },
  {
    name: "1st in Running Relay",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Relay with my team in school competition\n\nDate:2023-24",
  },
  {
    name: "3rd with my team in Interschool Quiz Competition",
    iconText: "workspace_premium",
    iconColor: "brown",
    desc: "I secured 3rd position with my team in Interschool Quiz Competition\n\nDate:2023-24",
  },
]

var sports = [
  {
    name: "1st in Running Race[100 m]",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Race[100 m] in school competition in 2022-23",
  },
  {
    name: "1st in Running Race[200 m]",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Race[200 m] in school competition in 2022-23",
  },
  {
    name: "1st in Running Race",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Race in school competition in 2023-24",
  },
  {
    name: "1st in Running Relay",
    iconText: "workspace_premium",
    iconColor: "gold",
    desc: "I secured a Gold Medal in Running Relay with my team in school competition in 2023-24",
  },
]
var extracurricular = [
  {
    name: "3rd with my team in Interschool Quiz Competition",
    iconText: "workspace_premium",
    iconColor: "brown",
    desc: "I secured 3rd position with my team in Interschool Quiz Competition in 2023-24",
  },
  {
    name: "2nd with my team in School Quiz Competition",
    iconText: "workspace_premium",
    iconColor: "silver",
    desc: "I secured 2nd position with my team in School Quiz Competition in 2023-24",
  },
]


const HomePage = () => {

  return (
    <div className="home">
      <div className='hero-section' id="hero-section">
        <p className='hero-text'>Hi this is <span className='highlight'>Pradhyumna K M</span></p>
        <p className='hero-text' >I Love</p>
        <div justifyContent="center"><FlipWords
          words={['Coding', 'Maths', 'Physics', 'Chemistry', 'Neuroscience', 'Machine Learning']} />
        </div>

      </div>

      <NavHome />

      <div className="section full-width" id="achivements">
        <HorizontalScroll header="My Achivements">
          {achievements.map((achievement) => (
            <ListItem details={achievement} type="detailed" />
          ))}
        </HorizontalScroll>
      </div>

      <div className="section" id="sports">

        <p className='section-heading'>
          <span class="material-symbols-outlined">
            sprint
          </span>
          Sports and Extracurricular
        </p>

        <div className="grid two-column">
          <GradientBorderDiv radius={10}>
            {sports.map((sport) => (
              <div style={{ padding: "10px 2px 10px 2px" }}>
                <p className='card-heading' style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span class="material-symbols-outlined" style={{ color: sport.iconColor, minWidth: 'fit-content' }}>
                    {sport.iconText}
                  </span>
                  <span>{sport.name}</span>
                </p>
                <p className='card-text' style={{ padding: "0px 0px 10px 40px" }}>{sport.desc}</p>
              </div>
            ))}
          </GradientBorderDiv>

          <GradientBorderDiv radius={10}>
            {extracurricular.map((sport) => (
              <div style={{ padding: "10px 2px 10px 2px" }}>
                <p className='card-heading' style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <span class="material-symbols-outlined" style={{ color: sport.iconColor, minWidth: 'fit-content' }}>
                    {sport.iconText}
                  </span>
                  <span>{sport.name}</span>
                </p>
                <p className='card-text' style={{ padding: "0px 0px 10px 40px" }}>{sport.desc}</p>
              </div>
            ))}
          </GradientBorderDiv>
        </div>

      </div>

      <div className="section" id="skills">
        <p className="section-heading">
          <span class="material-symbols-outlined">
            deployed_code_account
          </span>
          Skills
        </p>
        <div className="grid four-column">
          {
            skills.map((skill) => (
              <GradientBorderDiv radius={20} style={skill.span ? { gridColumn: `span ${skill.span}` } : {}}>
                <div className="skill-div">
                  {skill.skillImages ? (
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center', height: '100%' }}>
                      {skill.skillImages.map(img => <img src={img} style={{ width: '30%', maxWidth: '100px' }} />)}
                    </div>
                  ) : (
                    <img src={skill.skillImage} style={skill.imageStyle || {}} />
                  )}
                  <p className="card-heading">{skill.skillName}</p>
                </div>
              </GradientBorderDiv>
            ))
          }
        </div>

        <p className="section-heading">Youtube Channel</p>
        <p className="section-subheading">Check out My Youtube channel where I teach Coding</p>
        <div className="grid two-column" id="youtube-div">
          <div className="video-div" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <iframe style={{ width: '100%', aspectRatio: '16/9' }} src="https://www.youtube.com/embed/cit_A4T-0vU?si=sAYltRFKNhR4clle" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="video-div" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <iframe style={{ width: '100%', aspectRatio: '16/9' }} src="https://www.youtube.com/embed/z_pIGfxUI-o?si=GPiQxKZ4CzAPnRvq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>

        <div className="grid two-column">
          <ListItem type="detailed"
            details={{
              name: "Abacus",
              desc: "I have completed learning Abacus from SIP abacus till GMC Level which is the highest level in 6th standard giving me a speed high speed in Mathematical Calculation.",
              image: "https://m.media-amazon.com/images/I/61v0RqAvxKL.jpg"
            }} />
          <ListItem type="detailed"
            details={{
              name: "Rubics Cube",
              desc: "I also loving solving different types of Rubics Cube and various variants",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Rubik%27s_Cube_Collection_%284316806619%29.jpg/1200px-Rubik%27s_Cube_Collection_%284316806619%29.jpg"
            }} />
        </div>
      </div>

      <div className="section" id="projects">
        <p className="section-heading">
          <span class="material-symbols-outlined">
            devices
          </span>
          My Projects
        </p>
        <p className="section-subheading">I have been coding for past 6 years in variuos Languages and Frameworks</p>

        <div className="grid three-column">
          {
            mainProjects.map((project) => (
              <GradientBorderDiv radius={20} className={project.span ? "project-card-span" : ""}>
                <div>
                  <p className="card-heading">{project.projectName}</p>
                  <Chip text={project.type} color={project.color} />
                  <p className="card-text">{project.projectDesc}</p>
                </div>
              </GradientBorderDiv>
            ))
          }
        </div>

        <div className="grid">
          <GradientBorderDiv radius={30}>
            <ProjectIterator heading="Python Projects" projectList={projects.python} />
          </GradientBorderDiv>

          <GradientBorderDiv radius={30}>
            <ProjectIterator heading="Android Projects" projectList={projects.mobile} />
          </GradientBorderDiv>

          <GradientBorderDiv radius={30}>
            <p className="card-heading">Web Projects</p>
            <div className="grid two-column">
              {projects.web.map((project) => (
                <div className="project-detail-div">
                  <div className="card-heading-div">
                    <img className="logo navbar" src={project.projectImage} />
                    <p className="card-heading">{project.projectName}</p>
                  </div>
                  <p className="card-text">{project.projectDesc}</p>

                  <ReadMore url={project.projectLink} text="Open" />
                </div>
              ))}
            </div>
          </GradientBorderDiv>
        </div>

      </div>

      {/* <div className="section" id="blog">
              <p className="section-heading">
                <span class="material-symbols-outlined">
                  Newsmode
                </span>
                  My Blogs
                </p>
              <p className="section-subheading">Check out My Blog on Tech</p>

              <div className="grid three-column">
                {
                  mainBlogs.map((blog) => (
                    <ListItem details={blog} type="blog"/>
                  ) )
                }
              </div>
            </div> */}

      < div className="section full-width" id="journey" >
        <p className="section-heading">
          <span class="material-symbols-outlined">
            conversion_path
          </span>
          My Journey
        </p>

        <div>
          <TimeLineSingle header={"2020"}>
            <p className="card-heading"> The Year when it all began</p>
            <ul className="card-text">
              <li>Started Learning Python</li>
            </ul>
          </TimeLineSingle>

          <TimeLineSingle header={"2021"}>
            <ul className="card-text">
              <li>Started Learning Android on my own</li>
              <li>Went deeper into AI and ML especially in Opencv</li>
            </ul>
          </TimeLineSingle>

          <TimeLineSingle header={"2022"}>
            <ul className="card-text">
              <li>First in Silverzone Science Olympiad</li>
              <p />
              <li>Built Simple Godot Games</li>
              <li>Explored more into Android, Python</li>
              <li>Began with Flutter for Cross-platform Devlopment</li>
              <li>Started my Youtube Channel for teaching Python and later AI and ML</li>
            </ul>
          </TimeLineSingle>

          <TimeLineSingle header={"2023"}>
            <ul className="card-text">
              <p />
              <li>Built Ride Hailing Website using flutter</li>
              <li>Built Face and Hand controlled computer using Python</li>
              <li>Prepared for 10th Board Examination</li>
            </ul>
          </TimeLineSingle>

          <TimeLineSingle header={"2024"}>
            <ul className="card-text">
              <li>Built IPR Technologies website</li>
              <li>Worked on My Everything App (under Devlopment)</li>
              <li>Started preparation for JEE</li>
            </ul>
          </TimeLineSingle>

          <TimeLineSingle header={"2025"}>
            <ul className="card-text">
              <li>Built TekTensor.com that is this website</li>
              <li>The Future awaits...</li>
            </ul>
          </TimeLineSingle>
        </div>
      </div>

      <div className="section" id="contact">
        <div className="contact-div">
          <p className="section-subheading centre">Contact Me</p>

          <div className="grid two-column">
            <p className="contact-item">Pradhyumna K M</p>
            {contactDetails.map((contact) => (
              <a className="contact-item" href={contact.link} target={contact.link && contact.link.startsWith("mailto") ? "_self" : "_blank"} rel="noreferrer">
                {contact.image ? <img src={contact.image} /> : null}
                <p>{contact.name}</p>

              </a>
            ))}
          </div>
        </div>
      </div>



    </div >
  )

}

export default HomePage;