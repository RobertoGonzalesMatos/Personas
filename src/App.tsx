import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown";
import { ReactComponent as ListIcon } from "./components/list.svg";
import { ReactComponent as ThreeLinesIcon } from "./components/threeLines.svg";
import { ReactComponent as Drop } from "./components/drop.svg";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Mousewheel,
} from "swiper/modules";

function App() {
  const [viewMode, setViewMode] = useState("features");
  const [compact, isCompact] = useState(false);
  const [showAccordions, setShowAccordions] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [activeSection, setActiveSection] = useState(""); // Track active section
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const contentRef = useRef<HTMLDivElement | null>(null); // Reference for .app-content

  const sections = [
    { id: "analysis", title: "Analysis of CIT's Elevators" },
    { id: "preparation", title: "Preparation and Observations" },
    { id: "empathy", title: "Empathy Maps" },
    { id: "storyboard", title: "Storyboard and Persona Journey" },
  ];

  useEffect(() => {
    const contentEl = contentRef.current; // Get .app-content div

    const handleScroll = () => {
      if (!contentEl) return; // Safety check

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[sections[i].id];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= contentEl.getBoundingClientRect().top + 150) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    if (contentEl) {
      contentEl.addEventListener("scroll", handleScroll);
      return () => contentEl.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    setShowAccordions(false);
    const timer = setTimeout(() => setShowAccordions(true), 1);
    return () => clearTimeout(timer);
  }, [compact]);

  const handleSelect = (
    section: string,
    item: { label: string },
    binaryState?: number
  ) => {
    if (section === "Display") {
      const a = compact;
      isCompact(item.label !== "Compact");
    }
  };

  const viewOptions = [
    {
      title: "Display",
      useAsDropTitle: true,
      useIcon: true,
      items: [
        { label: "Compact", icon: <ThreeLinesIcon /> },
        { label: "List", icon: <ListIcon /> },
      ],
    },
  ];

  const analysisTable: Record<string, Record<string, string>> = {
    "Posed Questions": {
      "1": "What is the primary reason to use the CIT elevators?",
      "2": "Do you ever opt for the stairs instead of the elevator? If so, why?",
      "3": "How long do you typically wait for an elevator during peak hours? What factors affect this?",
      "4": "How would you describe your experience with the elevator system in terms of efficiency and usability?",
      "5": "Have you ever experienced delays, malfunctions or issues when using the elevators? If so, how often?",
      "6": "Are there any confusing aspects of the elevator interface?",
      "7": "If you could redesign one aspect of the elevator system, what would it be?",
      invisible:
        "The purpose of these questions was to retrieve information on how the users interact with the interface, for how long they do it, why they interact with it, etc. It also tells me which aspects they like/dislike about the elevators and how their priorities shoe us what changes would most benefit them",
    },
    "Sketch of the Interface": {
      "Annotations on the interface": "./images/elevator.png",
    },
    "Full Responses": {
      "Responses from interviewees": "./images/fullResponseQuestions.png",
    },
    "Response Analysis": {
      "1": "Most of the users interact with the elevator to get to the higher floors of the CIT either for class or meetings, one of them thinks they are forced to use it regardless",
      "2": "Most people take the stairs for short distances, but their decision depends on urgency, and availability. Some avoid certain stairs due to their inconvenient/hidden placement. Others take the stairs if they see a full elevator or if it's going in the opposite direction.",
      "3": "Wait times vary significantly based on the individual's patience and urgency. Mostly its between 1-5 minutes. Some are willing to wait as long as necessary if they are not in a rush, whereas others won’t wait more than a minute.",
      "4": "There is a shared perception that the elevators are slow and inefficient, especially at peak hours. Issues like unclear direction indicators and unintuitive button layouts contribute to dissatisfaction. Some experience occasional confusion but don't consider it a major problem, while others feel the entire system could be more streamlined.",
      "5": "Malfunctions are rare, and most interviewees do not report significant breakdowns. However, one respondent mentioned experiencing an elevator going in the wrong direction due to unclear indicators. Overall, while technical failures are uncommon, the perceived inefficiencies create a sense of inconvenience.",
      "6": "The most common confusion stems from the door-closing buttons. Users struggle to differentiate between >< and >|<. Another issue mentioned is unclear swipe access feedback. Some interviewees also felt that choosing between elevators adds uncertainty. The larger one tends to take longer while the smaller one often gets overcrowded.",
      "7": "Suggestions include clearer floor indicators, better swipe access feedback, and have better labeling for 'open' and 'close' to avoid confusion. Some also want the elevator interior to be redesigned, as its current look is uninviting.",
    },
  };

  const imageDescriptions = [
    "After staying late coding, Katie wakes up late to class and rushes out of her dorm",
    "When she enters the CIT, she takes the stairs to the second floor knowing that the elevator is slow",
    "Inside, she can't find the stairs to the third floor but only 2 elevators",
    "She presses the up button many times trying to make the elevator arrive faster",
    "When the elevator arrives she is greeted with a swarm of people but she still goes in",
    "Then, she realizes that the elevator was going down since there was no clear indicator when she got in",
    "She swipes her card but it doesn't seem to go through, so she waits for other people to select her floor",
    "She tries to close the elevator door but she confuses the open and close button",
    "At last by the time she arrives it is already too late",
  ];

  const apps = Object.keys(analysisTable);
  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          alignContent: "start",
          marginRight: "50px",
          width: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "500px",
            marginLeft: "-30px",
          }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: "black" }}>
            Analysis on the CIT's Elevator Interface
          </h1>
          <div style={{ color: "black", width: "320px", fontSize: "large" }}>
            The current webpage will display my work on analysing the interface
            for the elevators of Brown's Center of Information and Technology
            through the use of Personas.
          </div>
          <div
            style={{ marginTop: "50px", marginBottom: "30px", height: "100%" }}
          >
            <Dropdown
              sections={viewOptions}
              closeOnSelect={false}
              onSelect={handleSelect}
            />
          </div>
          <nav className="sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-link ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => {
                  const contentEl = contentRef.current;
                  const targetEl = sectionRefs.current[section.id];

                  if (contentEl && targetEl) {
                    const offsetTop = targetEl.offsetTop - contentEl.offsetTop;
                    contentEl.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div
        className="app-content space-y-3"
        style={{
          position: "absolute",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          height: "920px",
          right: "100px",
          maxWidth: "900px",
          padding: "30px",
        }}
        ref={contentRef}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <section className="intro-section">
            <h2
              className="section-title"
              ref={(el) => {
                if (el) sectionRefs.current["analysis"] = el;
              }}
            >
              Analysis of CIT's Elevators
            </h2>
            <p>
              For Computer Science students at Brown University, one of the most
              frequently visited buildings is the Center for Information
              Technology (CIT). To navigate between floors, most students rely
              on the two available elevators. However, is the current system as
              efficient and user-friendly as it could be?
            </p>
            <p>
              This project aims to analyze the elevator interface using
              personas, allowing for a deeper understanding of both its
              strengths and pain points. Through this approach, I will assess
              the user experience and identify potential areas for improvement.
            </p>
          </section>
          <h2
            className="section-title"
            ref={(el) => {
              if (el) sectionRefs.current["preparation"] = el;
            }}
          >
            Preparation and Observations
          </h2>
          <p style={{ marginTop: "-20px", marginBottom: "20px" }}>
            Our first step is to formulate questions that will allow us to know
            how users of the CIT elevators feel about the interface
          </p>
          {showAccordions &&
            apps.map((item) => {
              const subCategories = Object.keys(analysisTable[item]);

              return (
                <Accordion
                  key={item}
                  defaultExpanded={compact}
                  disableGutters
                  elevation={0}
                  className="transition-all border-b border-gray-200 hover:bg-gray-50"
                  style={{
                    backgroundColor: "#e9e5e2",
                    border: "none",
                    borderRadius: "15px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <div style={{ maxWidth: "18px", maxHeight: "18px" }}>
                        <Drop />
                      </div>
                    }
                    className="py-2"
                  >
                    <Typography
                      variant="h6"
                      className="font-medium text-gray-800"
                    >
                      {item}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="pl-4 space-y-1">
                    {subCategories.map((subItem) => (
                      <Typography key={subItem} className="accordionText">
                        {subItem !== "invisible" && <strong>{subItem}:</strong>}{" "}
                        {analysisTable[item][subItem].includes(".png") ? (
                          <img
                            src={
                              analysisTable[subItem]?.[item] ||
                              analysisTable[item]?.[subItem]
                            }
                            alt="Dropdown Annotations"
                            className="mt-2"
                            style={{ width: "850px" }}
                          />
                        ) : (
                          analysisTable[item][subItem]
                        )}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          <div>
            <h2
              className="imageText"
              ref={(el) => {
                if (el) sectionRefs.current["empathy"] = el;
              }}
            >
              Empathy Maps
            </h2>
            <img src={"./images/persona_1.png"} className="imageAnalysis" />
            <h3 className="imageTextSmall">
              Katie is a third year Philosophy student who is takes some CS
              clases and doesn't frequent the CIT. She is perpetually late,
              relies on coffee, and is a fast-walker. Katie pushes time to the
              limit, squeezing in activities before running to the next task.
            </h3>
            <img src={"./images/persona_2.png"} className="imageAnalysis" />
            <h3 className="imageTextSmall">
              Megan is an observant, socially awkward individual. She is a 2nd
              year CS student who prefers structured and predictable things.
              Megan will go out of her way to avoid awkward interactions, even
              if it means taking the stairs or a longer route.
            </h3>
          </div>
          <h2
            className="section-title"
            ref={(el) => {
              if (el) sectionRefs.current["storyboard"] = el;
            }}
          >
            Storyboard and Persona journey
          </h2>
          <Swiper
            modules={[EffectCoverflow, Pagination, Navigation, Mousewheel]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2.2}
            spaceBetween={-150}
            loop={false}
            mousewheel={true}
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 1.2,
              slideShadows: false,
            }}
            style={{
              width: "90%",
              maxWidth: "900px",
            }}
            onSlideChange={(swiper: SwiperType) =>
              setActiveSlide(swiper.realIndex)
            }
          >
            {Array.from({ length: 9 }, (_, i) => (
              <SwiperSlide
                key={i}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={`./images/st_${i + 1}.png`}
                  alt={`Storyboard ${i + 1}`}
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <p
            style={{
              marginTop: "40px",
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "500",
              color: "#444",
            }}
          >
            {imageDescriptions[activeSlide]}
          </p>
          <section className="conclusion-section">
            <h2 className="section-title">Conclusion</h2>
            <p style={{ marginBottom: "50px", marginTop: "20px" }}>
              This project has allowed me to understand how the use of personas
              can help me better internalize the workflow and intent of
              interfaces. In this case having individuals who pose constraints
              different from the "common average user" allows me to take into
              consideration accesibility or pain points which, if fixed, will
              favor many. This process is further excemplified with the use of a
              story board which allows me to plan out how specific users will
              interact with the selected interface. Additionally, having empathy
              maps helps to better understand the characters created and better
              embody their experience to tailor the interface analysis to them.
            </p>
            <p style={{ marginBottom: "50px", marginTop: "20px" }}></p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
