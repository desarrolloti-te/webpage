import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef();

  useGSAP(() => {
    // Animación de aparición del texto Hero
    gsap.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out"
    });

    // Efecto de Parallax y cambio de color en el Scroll
    gsap.to(".main-container", {
      scrollTrigger: {
        trigger: ".fiscal-section",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      backgroundColor: "#0a0a0a", // Se vuelve más profundo/oscuro
    });

    // Revelado de secciones
    const sections = gsap.utils.toArray('.reveal');
    sections.forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="main-container bg-[#0f172a] text-white transition-colors duration-700">
      
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center">
        <picture>
          <source srcSet="/img/banners/dos-hombres-de-negocios-felices-leyendo-un-correo-electronico-en-la-computadora-portatil-en-la-oficina-el-foco-esta-en-el-hombre-de-negocios-adulto-medio.webp" type="image/webp" />
          <img 
            src="/img/banners/dos-hombres-de-negocios-felices-leyendo-un-correo-electronico-en-la-computadora-portatil-en-la-oficina-el-foco-esta-en-el-hombre-de-negocios-adulto-medio.webp" 
            alt="Rediseño Empresarial 2026" 
            loading="lazy" 
            className="banner-img w-full h-full object-cover"
          />
        </picture>
        <span className="text-blue-500 font-mono mb-4 tracking-[0.3em] uppercase text-sm">Innovación Administrativa</span>
        <h1 className="hero-title text-5xl md:text-8xl font-bold tracking-tighter leading-none">
          FISCALIZACIÓN <br /> <span className="text-blue-600 italic">INTELIGENTE</span>
        </h1>
        <p className="mt-8 max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed">
          Digitalizamos tu estructura operativa para la Reforma Fiscal 2026. 
          No solo software, sino materialidad y razón de negocios.
        </p>
        <div className="mt-12 animate-bounce text-gray-500">↓</div>
      </section>

      <section className="fiscal-section min-h-screen py-24 px-6 flex items-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">El Punto de <br/>Inflexión.</h2>
            <p className="text-gray-400 text-lg mb-6">
              La complejidad normativa actual exige trazabilidad documental. 
              Muchos saben que tienen un problema; pocos saben cómo cuantificarlo.
            </p>
            <div className="border-l-2 border-blue-600 pl-6 py-2">
              <p className="text-blue-400 font-bold italic">Reforma Fiscal 2026</p>
              <p className="text-sm text-gray-500">Evidencia operativa como centro de la estrategia.</p>
            </div>
          </div>
          <div className="reveal relative">
            <div className="aspect-square bg-blue-600/10 rounded-2xl border border-white/5 flex items-center justify-center p-12 text-center">
              <span className="text-7xl font-light text-blue-500/50">CONTPAQi</span>
              <div className="absolute inset-0 blur-3xl bg-blue-600/5 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: SERVICIOS (TARJETAS MODERNAS) */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-4xl md:text-7xl font-bold mb-20 tracking-tighter">Rediseño <br/>Empresarial.</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {['Consultoría Digital', 'Automatización', 'Cumplimiento Fiscal'].map((service, i) => (
              <div key={i} className="reveal group p-8 border border-gray-200 rounded-3xl hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
                <span className="text-xs font-mono text-gray-400">0{i+1}</span>
                <h3 className="text-2xl font-bold mt-4 mb-4">{service}</h3>
                <p className="text-gray-500 group-hover:text-gray-400">Integración consultiva de sistemas para una operación inteligente.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CTA */}
      <footer className="py-24 px-6 text-center border-t border-white/5">
        <h2 className="text-3xl font-bold mb-8 italic">¿Listo para la transición?</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-transform hover:scale-105">
          Agendar Consultoría Profesional
        </button>
      </footer>

    </div>
  );
}

export default App;