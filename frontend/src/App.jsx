import { useRef } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef();
  const cld = new Cloudinary({ cloud: { cloudName: "dsq3wouwm" } });

  const myVideo = cld.video("1477027_People_Business_3840x2160_vjzf8q")
    .delivery(quality("auto"))
    .delivery(format("auto"));

  useGSAP(() => {

    const tl = gsap.timeline();
    tl.from(".nav-container", { 
      y: -30, 
      opacity: 0, 
      duration: 1.2, 
      ease: "expo.out" 
    })
    .from(".hero-content h1 span", { 
      y: 100, 
      opacity: 0, 
      stagger: 0.2, 
      duration: 1.5, 
      ease: "power4.out" 
    }, "-=0.8")
    .from(".hero-content p", { 
      opacity: 0, 
      y: 20, 
      duration: 1 
    }, "-=1");

    // 2. EFECTO PARALLAX EN VIDEO
    gsap.to(".video-container video", {
      scrollTrigger: {
        trigger: ".hero-content",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 150, // El video se mueve más lento que el scroll
      scale: 1.2
    });

    // 3. REVELACIÓN DE SECCIONES (CLASE .reveal)
    const reveals = gsap.utils.toArray('.reveal');
    reveals.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });

    // 4. CAMBIO DINÁMICO DE NAVBAR (OPTIMIZADO)
   


    // tl.from(".nav-container", { y: -20, opacity: 0, duration: 1, ease: "power3.out" })
    //   .from(".hero-content", { y: 60, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.5");

    const lightSections = document.querySelectorAll(".bg-white, .bg-\\[\\#ffffff\\]");

    lightSections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 10%", // Cuando la sección llega cerca del navbar
        end: "bottom 10%",
        onEnter: () => updateNavStyle(true),    // Entra en sección blanca
        onLeave: () => updateNavStyle(false),   // Sale por abajo
        onEnterBack: () => updateNavStyle(true),// Regresa desde abajo
        onLeaveBack: () => updateNavStyle(false)// Sale por arriba
      });
    });
    function updateNavStyle(isDarkText) {
      const navLogoBox = document.querySelector(".nav-logo-box");
      const navLinksBox = document.querySelector(".nav-links-box");
      const logoImg = document.querySelector(".logo-img");
      const brandText = document.querySelector(".brand-text");
      const navLinks = document.querySelectorAll(".nav-link");

      if (isDarkText) {
        // ESTILO PARA FONDO BLANCO (Texto oscuro)
        gsap.to(navLogoBox, { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", duration: 0.3 });
        gsap.to(navLinksBox, { backgroundColor: "rgba(0,0,0,0.05)", borderColor: "rgba(0,0,0,0.1)", duration: 0.3 });
        gsap.to(brandText, { color: "#1e293b", duration: 0.3 }); // Slate 800
        gsap.to(logoImg, { filter: "brightness(1) invert(0)", duration: 0.3 });
        navLinks.forEach(link => gsap.to(link, { color: "#47556900", duration: 0.3 }));
      } else {
        // ESTILO PARA FONDO OSCURO (Texto blanco - Original)
        gsap.to(navLogoBox, { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", duration: 0.3 });
        gsap.to(navLinksBox, { backgroundColor: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.4)", duration: 0.3 });
        gsap.to(brandText, { color: "#ffffff", duration: 0.3 });
        gsap.to(logoImg, { filter: "brightness(0) invert(1)", duration: 0.3 });
        navLinks.forEach(link => gsap.to(link, { color: "#4b5563", duration: 0.3 }));
      }
    }
    // Oscurecimiento dinámico al hacer scroll
    gsap.to(".video-overlay", {
      scrollTrigger: {
        trigger: ".fiscal-section",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
      backgroundColor: "rgba(25, 55, 76, 0.95)", // Se funde con el color de la siguiente sección
    });
  }, { scope: container });

  return (
    // CAMBIO: Fondo principal a tu color corporativo y texto claro
    <div ref={container} className="main-container bg-[#19374c] text-white overflow-x-hidden">

      {/* Navbar (Mantenemos el estilo claro para contraste o puedes usar el oscuro anterior) */}
      <nav className="nav-container fixed top-6 w-full z-50 px-4 flex justify-center">
        <div className="max-w-7xl w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="nav-logo-box flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm transition-all">
              <div className="flex items-center justify-center w-9 h-9 overflow-hidden">
                <img src="/favicon.svg" alt="Logo" className="logo-img w-full h-full object-contain brightness-0 invert" />
              </div>
              <div className="w-[1px] h-6 bg-white/20 ml-1"></div>
              <span className="brand-text tracking-tight text-white text-sm md:text-base font-medium">
                Tecnología Empresarial
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-sm transition-all">
            {['Conócenos', 'Servicios', 'Soporte'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white text-sm md:text-base transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
            <span className="brand-text tracking-tight text-white text-sm md:text-base font-medium">Transformar mi empresa</span>
            <div className="p-1.5 rounded-full group-hover:rotate-45 transition-transform">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <div className="video-container absolute inset-0 z-0">
          <AdvancedVideo
            cldVid={myVideo}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover scale-105" // Ligeramente más grande para el efecto de zoom
          />
          {/* CAMBIO: Overlay más oscuro desde el inicio */}
          <div className="video-overlay absolute inset-0 bg-black/60 transition-colors duration-500" />
          {/* Gradiente para suavizar la transición a la siguiente sección */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#19374c]" />
        </div>

        <div className="hero-content relative text-center text-left px-4 mb-6">
          <h1 className="header-text-sec1 tracking-tighter leading-[0.9]">
            <span className="text-white">Blinda tu empresa</span>
            <span className="text-[#5FC5F] italic"> con fiscalización digital</span>
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-slate-300 text-lg  text-center md:text-2xl leading-relaxed font-light">
            Especialistas en trazabilidad, materialidad y cumplimiento. <br />
            <span className="text-white font-medium">Un solo ecosistema para tu empresa.</span>
          </p>
        </div>
      </section>

      {/* --- SECCIÓN FISCAL (Fondo Corporativo) --- */}
      <section id="fiscal" className="fiscal-section min-h-screen py-32 px-6 bg-[#19374c]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <h2 className="text-p-sec2 mb-8 text-white leading-tight">
              Blindaje  <span className="text-[#39d1fa] ml-8" >Estratégico.</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Hacienda ahora ve lo que tú no ves. Si tu operación administrativa no tiene materialidad y razón de negocios, tu empresa es vulnerable.
            </p>
            <div className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="w-1 bg-[#39d1fa] rounded-full"></div>
              <div>
                <p className="font-bold text-white">Expertos en Transformación 2026</p>
                <p className="text-sm text-slate-400">Alineamos cada proceso a los nuevos criterios gubernamentales.</p>
              </div>
            </div>
          </div>
          <div class="canvas-container">
              {/* <spline-viewer url="https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode"></spline-viewer> */}
              <spline-viewer url="https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode"></spline-viewer>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN SERVICIOS --- */}
      <section className="py-32 px-6 bg-[#ffffff]"> {/* Un tono ligeramente más oscuro para separar */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {['Rediseño Operativo', 'Ecosistema Cloud', 'Blindaje Fiscal'].map((item, i) => (
              <div key={i} className="reveal bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-[#39d1fa]/50 transition-all group">
                <div className="w-14 h-14 bg-[#39d1fa]/10 rounded-2xl mb-6 flex items-center justify-center text-[#39d1fa] font-bold text-xl group-hover:bg-[#39d1fa] group-hover:text-[#19374c] transition-all">
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-black">{item}</h3>
                <p className="text-slate-400 leading-relaxed">
                  Soluciones diseñadas para la alta dirección y departamentos contables.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="fiscal" className="fiscal-section min-h-screen py-32 px-6 bg-[#19374c]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
              Blindaje <br /> <span className="text-[#39d1fa]">Estratégico.</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Hacienda ahora ve lo que tú no ves. Si tu operación administrativa no tiene materialidad y razón de negocios, tu empresa es vulnerable.
            </p>
            <div className="flex gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className="w-1 bg-[#39d1fa] rounded-full"></div>
              <div>
                <p className="font-bold text-white">Expertos en Transformación 2026</p>
                <p className="text-sm text-slate-400">Alineamos cada proceso a los nuevos criterios gubernamentales.</p>
              </div>
            </div>
          </div>

          <div className="reveal flex justify-center">
            {/* Elemento visual que simula tecnología */}
            <div className="w-full aspect-video bg-slate-800/50 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-3xl p-4">
              <div className="w-full h-full bg-[#19374c]/50 rounded-[1.5rem] flex items-center justify-center border border-white/5">
                <span className="text-[#39d1fa] font-mono animate-pulse">SYSTEM_READY: MONITORING_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  );
}

export default App;