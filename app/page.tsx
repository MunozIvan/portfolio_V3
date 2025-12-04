"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function Page() {
  const [activeSection, setActiveSection] = useState("about")
  const [isVisible, setIsVisible] = useState(false)
  // Replaced isDark with isDarkMode and adjusted toggleChain function
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPulling, setIsPulling] = useState(false)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [snakeScore, setSnakeScore] = useState(0)
  const [snakeGameOver, setSnakeGameOver] = useState(false)
  const [arkanoidScore, setArkanoidScore] = useState(0)
  const [arkanoidGameOver, setArkanoidGameOver] = useState(false)
  const [dinoScore, setDinoScore] = useState(0)
  const [dinoGameOver, setDinoGameOver] = useState(false)
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [isTyping, setIsTyping] = useState(false)
  const [displayedTexts, setDisplayedTexts] = useState<Record<string, string>>({})
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)

    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  // Added effect to apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const resetGames = () => {
    setSelectedGame(null)
    setSnakeScore(0)
    setSnakeGameOver(false)
    setArkanoidScore(0)
    setArkanoidGameOver(false)
    setDinoScore(0)
    setDinoGameOver(false)
  }

  // Renamed handlePullChain to toggleTheme and adjusted logic
  const toggleTheme = () => {
    setIsPulling(true)
    setTimeout(() => {
      setIsDarkMode(!isDarkMode)
      setIsPulling(false)
    }, 300)
  }

  useEffect(() => {
    // Clear any existing animation
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    setIsTyping(true)
    setDisplayedTexts({})

    const textsToAnimate = [
      "subtitle",
      "description",
      "aboutText1",
      "aboutText2",
      "navAbout",
      "navExperience",
      "navTechnologies",
      "seniorRole",
      "seniorDesc",
      "backendRole",
      "backendDesc",
      "gamesSubtitle",
      "gamesDesc",
    ]

    const fullTexts = textsToAnimate.map((key) => translations[language][key as keyof typeof translations.en])
    const maxLength = Math.max(...fullTexts.map((text) => text?.length))
    const animationDuration = 3000 // 3 seconds total
    const stepDelay = animationDuration / maxLength

    let currentStep = 0

    const animateStep = () => {
      currentStep++
      const newDisplayedTexts: Record<string, string> = {}

      textsToAnimate.forEach((key, index) => {
        const fullText = fullTexts[index]
        const charsToShow = Math.min(currentStep, fullText?.length)
        newDisplayedTexts[key] = fullText?.substring(0, charsToShow)
      })

      setDisplayedTexts(newDisplayedTexts)

      if (currentStep < maxLength) {
        typingTimeoutRef.current = setTimeout(animateStep, stepDelay)
      } else {
        setIsTyping(false)
      }
    }

    animateStep()

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const translations = {
    en: {
      about: "About",
      experience: "Experience",
      technologies: "Technologies",
      games: "Games",
      navAbout: "ABOUT",
      navExperience: "EXPERIENCE",
      navTechnologies: "TECHNOLOGIES",
      subtitle: "Backend Developer",
      description: "Building scalable systems and APIs for modern applications.",
      aboutText1:
        "I am a developer passionate about creating scalable and reliable backend systems that power modern applications. I specialize in crafting solid APIs and fine-tuning database performance to make everything run smoothly.",
      aboutText2:
        "I enjoy learning and continuously progressing, which is why I am currently pursuing a Bachelor’s Degree in Cybersecurity at the University of Palermo to expand my knowledge and strengthen my technical skills.",
      experienceTitle: "Experience",
      present: "Present",
      seniorRole: "Backend Developer · Epicfarma",
      seniorDesc:
        "I developed multiple APIs to automate prescription validation via WhatsApp and created a financial management platform for pharmaceutical chains, increasing subscribed customers by 30%. I managed and optimized two collections of SQL databases and developed custom scripts that accelerated internal processes.",
      backendRole: "DevTools Developer · Freelance",
      backendDesc:
        "I designed programs to automate data extraction and processing from various websites, generating reports in XLS format for more efficient analysis. I also created Telegram bots that automatically notify specific changes, optimizing repetitive tasks and improving workflow.",
      viewResume: "View Full Resume",
      university: "University of Palermo",
      technologiesTitle: "Technologies",
      languages: "Languages",
      frameworks: "Frameworks",
      databases: "Databases",
      devOpsCloud: "DevOps & Cloud",
      tools: "Tools",
      gamesTitle: "Easter egg",
      gamesSubtitle: "Thanks for reading!",
      gamesDesc: "Select your reward:",
      gameOver: "Game Over! Final Score: ",
      snake: "Snake",
      snakeInstructions: "Use arrow keys",
      arkanoid: "Arkanoid",
      arkanoidInstructions: "Move your mouse",
      dinoRun: "Dino Run",
      dinoRunInstructions: "Press Space to jump",
      backToTop: "Back to Top",
    },
    es: {
      about: "Sobre Mí",
      experience: "Experiencia",
      technologies: "Tecnologías",
      games: "Juegos",
      navAbout: "SOBRE MÍ",
      navExperience: "EXPERIENCIA",
      navTechnologies: "TECNOLOGÍAS",
      subtitle: "Desarrollador Backend",
      description: "Construyendo sistemas escalables y APIs para aplicaciones modernas.",
      aboutText1:
        "Soy un desarrollador apasionado por crear sistemas backend escalables y confiables que impulsan aplicaciones modernas. Mi experiencia radica en construir APIs robustas y en optimizar el rendimiento de bases de datos.",
      aboutText2:
        "Disfruto aprender y seguir progresando constantemente, por lo que actualmente estoy cursando una Licenciatura en Ciberseguridad en la Universidad de Palermo para ampliar mis conocimientos y fortalecer mis habilidades técnicas.",
      experienceTitle: "Experiencia",
      present: "Presente",
      seniorRole: "Desarrollador Backend · Epicfarma",
      seniorDesc:
        "Desarrollé múltiples APIs para automatizar la validación de recetas vía WhatsApp y creé una plataforma de gestión financiera para cadenas farmacéuticas, logrando aumentar los clientes suscritos en un 30%. Administré y optimicé dos bases de datos SQL, y desarrollé scripts personalizados que agilizaron el trabajo interno.",
      backendRole: "Desarrollador DevTools · Freelance",
      backendDesc:
        "Diseñé programas para automatizar la extracción y el procesamiento de datos desde diversos sitios web, generando reportes en formato XLS para un análisis más eficiente. También creé bots de Telegram que notifican automáticamente cambios específicos, optimizando tareas repetitivas y mejorando el ritmo de trabajo.",
      viewResume: "Ver Currículum Completo",
      university: "Universidad de Palermo",
      technologiesTitle: "Tecnologías",
      languages: "Lenguajes",
      frameworks: "Frameworks",
      databases: "Bases de Datos",
      devOpsCloud: "DevOps y Cloud",
      tools: "Herramientas",
      gamesTitle: "Easter egg",
      gamesSubtitle: "¡Gracias por ver mi Portfolio!",
      gamesDesc: "Seleccione su recompensa:",
      gameOver: "Game Over! Final Score: ",
      snake: "Snake",
      snakeInstructions: "Usa las flechas",
      arkanoid: "Arkanoid",
      arkanoidInstructions: "Mueve el mouse",
      dinoRun: "Dino Run",
      dinoRunInstructions: "Presione Espacio para saltar",
      backToTop: "Volver Arriba",
    },
  }

  const t = translations[language]

  return (
    // Added dynamic class for dark mode
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Updated header to be fixed and moved theme/language toggles */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-full mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-sm font-semibold text-foreground">IMG</div>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-golden-primary to-golden-accent text-golden-dark font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-golden-glow"
              aria-label="Toggle language"
            >
              {language === "en" ? "ES" : "EN"}
            </button>
            <button onClick={toggleTheme} className="flex flex-col items-center gap-1 group" aria-label="Toggle theme">
              {/* Chain */}
              <div className="flex flex-col items-center">
                <div className={`chain-link ${isPulling ? "pulling" : ""}`}>
                  <div className="h-3 w-5 border-2 border-golden-accent rounded-full"></div>
                </div>
                <div className={`chain-link animation-delay-100 ${isPulling ? "pulling" : ""}`}>
                  <div className="h-3 w-5 border-2 border-golden-accent rounded-full"></div>
                </div>
                <div className={`chain-link animation-delay-200 ${isPulling ? "pulling" : ""}`}>
                  <div className="h-3 w-5 border-2 border-golden-accent rounded-full"></div>
                </div>
              </div>
              {/* Pull handle */}
              <div
                className={`pull-handle w-10 h-10 rounded-full bg-gradient-to-br from-golden-primary to-golden-accent shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-golden-glow ${isPulling ? "pulling-handle" : ""}`}
              >
                <div className="w-7 h-7 rounded-full bg-golden-dark/20 flex items-center justify-center">
                  {isDarkMode ? (
                    <svg className="w-4 h-4 text-golden-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-golden-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 mt-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column - Navigation */}
          <aside className="lg:fixed lg:top-32 lg:left-8 lg:w-64 lg:h-screen">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in">Iván Muñoz Gomez</h1>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="invisible block text-lg"
                  >
                    {t.subtitle}
                  </span>

                  <p className="absolute left-0 top-0 text-lg text-golden-accent animate-fade-in animation-delay-200" aria-live="polite">
                    {displayedTexts.subtitle || t.subtitle}
                  </p>
                </div>
              </div>

              <div className="relative">
                <span aria-hidden="true" className="invisible block text-lg">
                  {t.description}
                </span>
                <p className="absolute left-0 top-0 text-sm text-muted-foreground leading-relaxed animate-fade-in animation-delay-400" aria-live="polite">
                  {displayedTexts.description || t.description}
                </p>
              </div>

              <nav className="space-y-4 animate-fade-in animation-delay-600">
                <a
                  href="#about"
                  className="flex items-center gap-3 text-sm transition-all duration-300 group text-muted-foreground hover:text-[#ff8c42]"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("about")
                    if (element) {
                      const offset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
                    }
                  }}
                >
                  <span className="h-px bg-current transition-all duration-300 w-8 group-hover:w-16"></span>
                  {displayedTexts.navAbout || t.navAbout}
                </a>
                <a
                  href="#experience"
                  className="flex items-center gap-3 text-sm transition-all duration-300 group text-muted-foreground hover:text-[#ff8c42]"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("experience")
                    if (element) {
                      const offset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
                    }
                  }}
                >
                  <span className="h-px bg-current transition-all duration-300 w-8 group-hover:w-16"></span>
                  {displayedTexts.navExperience || t.navExperience}
                </a>
                <a
                  href="#technologies"
                  className="flex items-center gap-3 text-sm transition-all duration-300 group text-muted-foreground hover:text-[#ff8c42]"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById("technologies")
                    if (element) {
                      const offset = 120
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" })
                    }
                  }}
                >
                  <span className="h-px bg-current transition-all duration-300 w-8 group-hover:w-16"></span>
                  {displayedTexts.navTechnologies || t.navTechnologies}
                </a>
              </nav>

              <div className="flex gap-4 animate-fade-in animation-delay-800">
                <Link
                  href="https://github.com/MunozIvan"
                  target="_blank"
                  className="text-muted-foreground hover:text-golden-accent transition-all duration-300 hover:scale-110 hover:drop-shadow-glow"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ivanmg-f-s-developer/"
                  target="_blank"
                  className="text-muted-foreground hover:text-golden-accent transition-all duration-300 hover:scale-110 hover:drop-shadow-glow"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="mailto:ivmunoz9@gmail.com"
                  className="text-muted-foreground hover:text-golden-accent transition-all duration-300 hover:scale-110 hover:drop-shadow-glow"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column - Content */}
          <main className="flex-1 space-y-24 lg:ml-80">

            {/* About */}
            <section id="about" className="space-y-4">
              <h2 className="text-s font-semibold text-golden-accent uppercase tracking-wider">{displayedTexts.about || t.about}</h2>

              <div className="relative"> 
                <span aria-hidden="true" className="invisible block">
                  {t.aboutText1}
                </span>

                <p
                  className="absolute left-0 top-0 text-foreground/90 leading-relaxed animate-fade-in animation-delay-1000"
                  aria-live="polite"
                >
                  {displayedTexts.aboutText1 || t.aboutText1}
                </p>
              </div>

              <div className="relative"> 
                <span aria-hidden="true" className="invisible block">
                  {t.aboutText2}
                </span>

                <p className="absolute left-0 top-0 text-muted-foreground leading-relaxed animate-fade-in animation-delay-1200">
                  {displayedTexts.aboutText2?.split(t.university)[0]}
                  <Link
                    href="https://www.palermo.edu/"
                    target="_blank"
                    className="text-foreground hover:text-golden-accent transition-all duration-300 font-medium hover:drop-shadow-glow"
                  >
                    {displayedTexts.aboutText2?.includes(t.university) ? t.university : ""}
                  </Link>
                  {displayedTexts.aboutText2?.split(t.university)[1]}
                </p>
              </div>
              
            </section>

            {/* Experience */}
            <section id="experience" className="space-y-10">
              <h2 className="text-s font-semibold text-golden-accent uppercase tracking-wider">{displayedTexts.experienceTitle ||t.experienceTitle}</h2>

              <div className="space-y-12">
                <article className="group relative grid gap-4 pb-4 transition-all duration-500 sm:grid-cols-8 sm:gap-8 hover:scale-[1.02] rounded-lg p-4 hover:bg-golden-neutral/30 hover:shadow-xl">
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide transition-colors duration-300 group-hover:text-golden-accent">
                      2023/12 — {displayedTexts.present || t.present}
                    </p>
                  </div>
                  <div className="sm:col-span-6">
                    <h3 className="font-semibold text-foreground leading-snug mb-2">
                      <Link
                        href="#"
                        className="hover:text-golden-accent transition-all duration-300 inline-flex items-baseline gap-2 group/link"
                      >
                        {displayedTexts.seniorRole || t.seniorRole}
                        <span className="inline-block transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-hover/link:text-golden-accent">
                          ↗
                        </span>
                      </Link>
                    </h3>

                    <div className="relative"> 
                      <span aria-hidden="true" className="invisible block">
                        {t.seniorDesc}
                      </span>

                      <p className="absolute left-0 top-0 text-sm text-muted-foreground leading-relaxed mb-4">{displayedTexts.seniorDesc|| t.seniorDesc}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        Node.js
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        MySQL
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        Typescript
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        Express
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        API
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        Postman
                      </span>
                    </div>
                  </div>
                </article>

                <article className="group relative grid gap-4 pb-4 transition-all duration-500 sm:grid-cols-8 sm:gap-8 hover:scale-[1.02] rounded-lg p-4 hover:bg-golden-neutral/30 hover:shadow-xl">
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide transition-colors duration-300 group-hover:text-golden-accent">
                      2025/07 — {displayedTexts.present || t.present}
                    </p>
                  </div>
                  <div className="sm:col-span-6">
                    <h3 className="font-semibold text-foreground leading-snug mb-2">
                      <Link
                        href="#"
                        className="hover:text-golden-accent transition-all duration-300 inline-flex items-baseline gap-2 group/link"
                      >
                        {displayedTexts.backendRole || t.backendRole}
                        <span className="inline-block transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-hover/link:text-golden-accent">
                          ↗
                        </span>
                      </Link>
                    </h3>
                    <div className="relative"> 
                      <span aria-hidden="true" className="invisible block">
                        {t.backendDesc}
                      </span>

                      <p className="absolute left-0 top-0 text-sm text-muted-foreground leading-relaxed mb-4">{displayedTexts.backendDesc || t.backendDesc}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        Node.js
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        NPM
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        Selenium
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:bg-golden-accent hover:shadow-lg">
                        API
                      </span>
                    </div>
                  </div>
                </article>
              </div>

              <Link
                href={`/ivan_resume_${language}.pdf`}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-golden-accent transition-all duration-300 group hover:gap-4"
              >
                {t.viewResume}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </section>

            <section id="technologies" className="space-y-12">
              <h2 className="text-s font-semibold text-golden-accent uppercase tracking-wider">
                {t.technologiesTitle}
              </h2>

              <div className="grid gap-8 sm:grid-cols-2">
                {/* Languages */}
                <div className="group rounded-lg p-6 bg-card border border-border transition-all duration-500 hover:scale-105 hover:border-golden-accent hover:shadow-golden-glow">
                  <h3 className="text-sm font-semibold text-golden-accent mb-4 uppercase tracking-wide">
                    {t.languages}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      TypeScript
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Javascript
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      HTML5
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      CSS3
                    </span>
                  </div>
                </div>

                {/* Frameworks */}
                <div className="group rounded-lg p-6 bg-card border border-border transition-all duration-500 hover:scale-105 hover:border-golden-accent hover:shadow-golden-glow">
                  <h3 className="text-sm font-semibold text-golden-accent mb-4 uppercase tracking-wide">
                    {t.frameworks}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Node.js
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Express
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      React
                    </span>
                  </div>
                </div>

                {/* Databases */}
                <div className="group rounded-lg p-6 bg-card border border-border transition-all duration-500 hover:scale-105 hover:border-golden-accent hover:shadow-golden-glow">
                  <h3 className="text-sm font-semibold text-golden-accent mb-4 uppercase tracking-wide">
                    {t.databases}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      MySQL
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      PostgreSQL
                    </span>
                  </div>
                </div>

                {/* DevOps & Cloud */}
                <div className="group rounded-lg p-6 bg-card border border-border transition-all duration-500 hover:scale-105 hover:border-golden-accent hover:shadow-golden-glow">
                  <h3 className="text-sm font-semibold text-golden-accent mb-4 uppercase tracking-wide">
                    {t.devOpsCloud}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Vercel
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      WN Power
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Github
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      PM2
                    </span>
                  </div>
                </div>

                {/* Tools & Other */}
                <div className="group rounded-lg p-6 bg-card border border-border transition-all duration-500 hover:scale-105 hover:border-golden-accent hover:shadow-golden-glow sm:col-span-2">
                  <h3 className="text-sm font-semibold text-golden-accent mb-4 uppercase tracking-wide">{t.tools}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Git
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Postman
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Figma
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      VS Code
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      WebSocket
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      NPM
                    </span>
                    <span className="px-3 py-1.5 text-sm font-medium bg-golden-accent text-golden-dark rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg">
                      Axios
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Games Section */}
            <section id="games" className="space-y-8 hidden md:block">
              <div className="text-center space-y-4">
                <h2 className="text-xs font-semibold text-golden-accent uppercase tracking-wider">{t.gamesTitle}</h2>
                <h3 className="text-2xl font-bold text-foreground">
                  {displayedTexts.gamesSubtitle || t.gamesSubtitle}
                </h3>
                <p className="text-muted-foreground">{displayedTexts.gamesDesc || t.gamesDesc}</p>
              </div>

              {!selectedGame ? (
                <div className="grid gap-6 sm:grid-cols-3">
                  <button
                    onClick={() => setSelectedGame("snake")}
                    className="group p-8 rounded-xl bg-gradient-to-br from-green-500/20 to-green-700/20 border-2 border-green-500/50 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
                  >
                    <div className="text-4xl mb-4">🐍</div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{t.snake}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.snakeInstructions}
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedGame("arkanoid")}
                    className="group p-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 border-2 border-blue-500/50 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                  >
                    <div className="text-4xl mb-4">🧱</div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{t.arkanoid}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.arkanoidInstructions}
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedGame("dino")}
                    className="group p-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-700/20 border-2 border-orange-500/50 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                  >
                    <div className="text-4xl mb-4">🦖</div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{t.dinoRun}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.dinoRunInstructions}
                    </p>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={resetGames}
                      className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all duration-300"
                    >
                      ← Back to Games
                    </button>
                    <span className="text-golden-accent font-semibold">
                      Score:{" "}
                      {selectedGame === "snake" ? snakeScore : selectedGame === "arkanoid" ? arkanoidScore : dinoScore}
                    </span>
                  </div>

                  {selectedGame === "snake" && (
                    <SnakeGame
                      score={snakeScore}
                      setScore={setSnakeScore}
                      gameOver={snakeGameOver}
                      setGameOver={setSnakeGameOver}
                    />
                  )}
                  {selectedGame === "arkanoid" && (
                    <ArkanoidGame
                      score={arkanoidScore}
                      setScore={setArkanoidScore}
                      gameOver={arkanoidGameOver}
                      setGameOver={setArkanoidGameOver}
                    />
                  )}
                  {selectedGame === "dino" && (
                    <DinoGame
                      score={dinoScore}
                      setScore={setDinoScore}
                      gameOver={dinoGameOver}
                      setGameOver={setDinoGameOver}
                    />
                  )}
                </div>
              )}
            </section>

            {/* Back to Top Button */}
            <div className="flex justify-center pb-12">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-golden-primary to-golden-accent text-golden-dark font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-golden-accent/50 flex items-center gap-3"
              >
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-2">↑</span>
                {t.backToTop}
              </button>
            </div>

          </main>
        </div>
      </section>


      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-sm text-muted-foreground border-t border-border">
        <p>2025 - Iván Muñoz Gomez - 😊</p>
      </footer>
    </div>
  )
}

function SnakeGame({
  score,
  setScore,
  gameOver,
  setGameOver,
}: { score: number; setScore: (s: number) => void; gameOver: boolean; setGameOver: (g: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 12, y: 12 }])
  const foodRef = useRef({ x: 18, y: 18 })
  const directionRef = useRef({ dx: 0, dy: 0 })
  const nextDirectionRef = useRef({ dx: 0, dy: 0 })

  const tileCount = 25
  const gridSize = 20

  const generateFood = () => {
    let newFood: any;
    let attempts: number = 0
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      }
      attempts++
    } while (attempts < 100 && snakeRef.current.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }

  useEffect(() => {
    if (!gameStarted || gameOver || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key
      const currentDir = directionRef.current

      if (key === "ArrowUp" && currentDir.dy === 0) {
        e.preventDefault()
        nextDirectionRef.current = { dx: 0, dy: -1 }
      } else if (key === "ArrowDown" && currentDir.dy === 0) {
        e.preventDefault()
        nextDirectionRef.current = { dx: 0, dy: 1 }
      } else if (key === "ArrowLeft" && currentDir.dx === 0) {
        e.preventDefault()
        nextDirectionRef.current = { dx: -1, dy: 0 }
      } else if (key === "ArrowRight" && currentDir.dx === 0) {
        e.preventDefault()
        nextDirectionRef.current = { dx: 1, dy: 0 }
      }
    }

    const gameLoop = () => {
      // Update direction
      directionRef.current = nextDirectionRef.current

      const { dx, dy } = directionRef.current

      // Only move if direction is set
      if (dx !== 0 || dy !== 0) {
        const head = snakeRef.current[0]
        const newHead = { x: head.x + dx, y: head.y + dy }

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount) {
          setGameOver(true)
          return
        }

        // Check self collision
        if (snakeRef.current.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          return
        }

        // Add new head
        snakeRef.current.unshift(newHead)

        // Check if food eaten
        if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
          setScore((prev) => prev + 10)
          foodRef.current = generateFood()
        } else {
          // Remove tail if no food eaten
          snakeRef.current.pop()
        }
      }

      // Draw game
      ctx.fillStyle = "#1a1a2e"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw snake
      snakeRef.current.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = "#34d399"
        } else {
          ctx.fillStyle = "#10b981"
        }
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
      })

      // Draw food
      ctx.fillStyle = "#f59e0b"
      ctx.shadowColor = "#f59e0b"
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(
        foodRef.current.x * gridSize + gridSize / 2,
        foodRef.current.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2,
      )
      ctx.fill()
      ctx.shadowBlur = 0
    }

    window.addEventListener("keydown", handleKeyPress)
    const intervalId = setInterval(gameLoop, 150)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      clearInterval(intervalId)
    }
  }, [gameStarted, gameOver, setScore, setGameOver])

  const startGame = () => {
    snakeRef.current = [{ x: 12, y: 12 }]
    foodRef.current = generateFood()
    directionRef.current = { dx: 0, dy: 0 }
    nextDirectionRef.current = { dx: 0, dy: 0 }
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border-2 border-green-500/50 rounded-lg bg-[#1a1a2e]"
      />
      {!gameStarted || gameOver ? (
        <div className="text-center space-y-4">
          {gameOver && <p className="text-red-400 font-semibold">Game Over! Score: {score}</p>}
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-golden-glow"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function ArkanoidGame({
  score,
  setScore,
  gameOver,
  setGameOver,
}: { score: number; setScore: (s: number) => void; gameOver: boolean; setGameOver: (g: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let paddleX = canvas.width / 2 - 50
    const paddleWidth = 100
    const paddleHeight = 10
    let ballX = canvas.width / 2
    let ballY = canvas.height - 30
    let ballDX = 3
    let ballDY = -3
    const ballRadius = 8
    let currentScore = 0

    const bricks: { x: number; y: number; status: number }[][] = []
    const brickRowCount = 5
    const brickColumnCount = 8
    const brickWidth = 45
    const brickHeight = 20
    const brickPadding = 5
    const brickOffsetTop = 30
    const brickOffsetLeft = 10

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = []
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
      }
    }

    const drawBall = () => {
      ctx.beginPath()
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = "#f59e0b"
      ctx.fill()
      ctx.closePath()
    }

    const drawPaddle = () => {
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight)
    }

    const drawBricks = () => {
      const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16"]
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
            bricks[c][r].x = brickX
            bricks[c][r].y = brickY
            ctx.fillStyle = colors[r]
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight)
            // Add border
            ctx.strokeStyle = "#1a1a2e"
            ctx.lineWidth = 1
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight)
          }
        }
      }
    }

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r]
          if (b.status === 1) {
            if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
              // Calculate where the ball hit the brick
              const ballCenterX = ballX
              const ballCenterY = ballY
              const brickCenterX = b.x + brickWidth / 2
              const brickCenterY = b.y + brickHeight / 2

              const dx = ballCenterX - brickCenterX
              const dy = ballCenterY - brickCenterY

              // Determine if hit from side or top/bottom
              if (Math.abs(dx / brickWidth) > Math.abs(dy / brickHeight)) {
                // Hit from left or right side
                ballDX = -ballDX
              } else {
                // Hit from top or bottom
                ballDY = -ballDY
              }

              b.status = 0
              currentScore += 10
              setScore(currentScore)

              const allBricksGone = bricks.every((col) => col.every((brick) => brick.status === 0))
              if (allBricksGone) {
                setGameOver(true)
              }
            }
          }
        }
      }
    }

    const draw = () => {
      if (gameOver) return

      ctx.fillStyle = "#1a1a2e"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawBricks()
      drawBall()
      drawPaddle()
      collisionDetection()

      // Ball movement
      ballX += ballDX
      ballY += ballDY

      // Wall collision
      if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX
      }
      if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY
      } else if (ballY + ballDY > canvas.height - ballRadius - paddleHeight - 10) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          const hitPos = (ballX - paddleX) / paddleWidth
          ballDX = (hitPos - 0.5) * 8
          ballDY = -ballDY
        } else if (ballY + ballDY > canvas.height - ballRadius) {
          setGameOver(true)
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      if (mouseX > paddleWidth / 2 && mouseX < canvas.width - paddleWidth / 2) {
        paddleX = mouseX - paddleWidth / 2
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    const gameLoop = setInterval(draw, 16)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      clearInterval(gameLoop)
    }
  }, [gameStarted, gameOver, setScore, setGameOver])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-blue-500/50 rounded-lg bg-[#1a1a2e]"
      />
      {!gameStarted || gameOver ? (
        <div className="text-center space-y-4">
          {gameOver && <p className="text-red-400 font-semibold">Game Over! Score: {score}</p>}
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-golden-glow"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        </div>
      ) : null}
    </div>
  )
}

function DinoGame({
  score,
  setScore,
  gameOver,
  setGameOver,
}: { score: number; setScore: (s: number) => void; gameOver: boolean; setGameOver: (g: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dinoY = 250
    let dinoVelocity = 0
    const gravity = 0.6
    const jumpPower = -12
    let isJumping = false
    const dinoX = 50
    const dinoSize = 40

    const obstacles: { x: number; width: number; height: number }[] = []
    let obstacleTimer = 0
    let currentScore = 0
    let gameSpeed = 3

    const drawDino = () => {
      ctx.fillStyle = "#f97316"
      ctx.fillRect(dinoX, dinoY, dinoSize, dinoSize)

      // Simple dino details
      ctx.fillStyle = "#1a1a2e"
      ctx.fillRect(dinoX + 5, dinoY + 5, 8, 8) // eye
      ctx.fillRect(dinoX, dinoY + dinoSize - 10, 12, 10) // leg 1
      ctx.fillRect(dinoX + 20, dinoY + dinoSize - 10, 12, 10) // leg 2
    }

    const drawObstacles = () => {
      ctx.fillStyle = "#64748b"
      obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, 290 - obs.height, obs.width, obs.height)
      })
    }

    const draw = () => {
      if (gameOver) return

      ctx.fillStyle = "#1a1a2e"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw ground
      ctx.fillStyle = "#475569"
      ctx.fillRect(0, 290, canvas.width, 2)

      // Dino physics
      dinoVelocity += gravity
      dinoY += dinoVelocity

      if (dinoY > 250) {
        dinoY = 250
        dinoVelocity = 0
        isJumping = false
      }

      drawDino()

      // Spawn obstacles
      obstacleTimer++
      if (obstacleTimer > 150 / gameSpeed) {
        obstacles.push({
          x: canvas.width,
          width: 20,
          height: Math.random() > 0.5 ? 40 : 30,
        })
        obstacleTimer = 0
      }

      // Move and draw obstacles
      obstacles.forEach((obs, index) => {
        obs.x -= gameSpeed

        // Remove off-screen obstacles
        if (obs.x + obs.width < 0) {
          obstacles.splice(index, 1)
          currentScore += 10
          setScore(currentScore)
          if (currentScore % 50 === 0) gameSpeed += 0.5
        }

        // Collision detection
        if (dinoX < obs.x + obs.width && dinoX + dinoSize > obs.x && dinoY + dinoSize > 290 - obs.height) {
          setGameOver(true)
        }
      })

      drawObstacles()
    }

    const handleJump = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.key === " " || e.key === "ArrowUp") && !isJumping) {
        e.preventDefault()
        dinoVelocity = jumpPower
        isJumping = true
      }
    }

    window.addEventListener("keydown", handleJump)
    const gameLoop = setInterval(draw, 16)

    return () => {
      window.removeEventListener("keydown", handleJump)
      clearInterval(gameLoop)
    }
  }, [gameStarted, gameOver, setScore, setGameOver])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border-2 border-orange-500/50 rounded-lg bg-[#1a1a2e]"
      />
      {!gameStarted || gameOver ? (
        <div className="text-center space-y-4">
          {gameOver && <p className="text-red-400 font-semibold">Game Over! Score: {score}</p>}
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-golden-glow"
          >
            {gameOver ? "Play Again" : "Start Game"}
          </button>
        </div>
      ) : null}
    </div>
  )
}
