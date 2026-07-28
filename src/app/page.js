'use client';

import { useState, useEffect, useRef } from 'react';

const CONFIG = {
  appName: 'Defensa y Trabajo',
  appShort: 'D&T',
  slogan: 'Derechos que se defienden, trabajo que se respeta',
  heroSubtitle: 'Trabajo digno, justicia para ti',
  heroBtn: 'Contáctanos',
  whatsappNumber: '56926226704',
  whatsappLink: 'https://wa.me/56926226704',
  telefono: '+56 9 2622 6704',
  email: 'defensaytrabajoabogados@gmail.com',
  direccion: 'O\'Higgins 940 Of. 407, Concepción',
  horario: '09:00 a 17:00 horas',
  instagram: 'https://www.instagram.com/defensaytrabajo.abogados?igsh=MXh5NGxtaXk4bzV2cw==',
  anosExperiencia: 5,
  casosExitosos: '+590',
  descripcion: 'En Defensa y Trabajo somos un estudio jurídico especializado y dedicado al Derecho Laboral desde hace más de 5 años. Con nuestra experiencia y disposición, buscamos darte atención cercana, así como soluciones reales y prácticas para el problema legal que hoy te aflige. Por eso, nuestro objetivo principal va más allá de llevar juicios: queremos entregarte la mejor estrategia frente a despidos injustificados, autodespidos, acoso laboral o accidentes del trabajo. Hablamos tu mismo idioma, con total transparencia desde el primer día y con el compromiso absoluto de que no enfrentarás este proceso en soledad.',
  abogado1: {
    nombre: 'Jorge Fuentes Chacana',
    cargo: 'Abogado Socio y Fundador',
    especialidad: 'Derecho Laboral',
    descripcion: 'Abogado. Magíster en Derecho del Trabajo UdeC. Licenciado en Derecho UCSC. Diplomado en aspectos laborales, tributarios y comerciales UCSC. Profesional con formación especial en el Derecho del Trabajo y con vasta experiencia en su área de desempeño defendiendo a trabajadores como asesorando a empresas a cumplir la normativa laboral. Gran capacidad de análisis y empatía para buscar la solución que más se ajuste a tus necesidades legales.',
    linkedin: 'https://www.linkedin.com/in/jorge-ignacio-fuentes-chacana-177b03300/',
    email: 'defensaytrabajoabogados@gmail.com'
  },
  abogado2: {
    nombre: 'Benjamín Sepúlveda Fernández',
    cargo: 'Abogado Socio',
    especialidad: 'Derecho Laboral',
    descripcion: 'Abogado. Licenciado en Derecho UCSC. Diplomado en compliance laboral, comercial, tributario y penal UCSC.',
    linkedin: '#',
    email: ''
  },
  areas: [
    { icon: 'fa-briefcase', title: 'Derecho Laboral', desc: 'Asesoría y defensa integral en relaciones laborales, negociaciones colectivas, tutela laboral y juicios del trabajo.' },
    { icon: 'fa-shield-alt', title: 'Tutela Laboral', desc: 'Protección de derechos fundamentales en el ámbito laboral, incluyendo acoso laboral, discriminación y vulneración de garantías.' },
    { icon: 'fa-building', title: 'Funcionarios Públicos', desc: 'Asesoría especializada a funcionarios públicos en materias administrativas, sumarios, y defensa ante la Contraloría.' },
    { icon: 'fa-file-alt', title: 'Despidos Injustificados', desc: 'Representación en juicios por despido injustificado, cobro de indemnizaciones y negociación de finiquitos.' },
    { icon: 'fa-gavel', title: 'Autodespidos', desc: 'Asesoría y patrocinio en autodespidos o despido indirecto, cuando el trabajador debe poner término al contrato por incumplimiento del empleador.' },
    { icon: 'fa-heartbeat', title: 'Ley Karin', desc: 'Asesoría en la implementación y defensa ante denuncias por acoso laboral, sexual y violencia en el trabajo conforme a la Ley Karin.' },
    { icon: 'fa-handshake', title: 'Asesoría a Empresas', desc: 'Consultoría legal laboral para empresas: cumplimiento normativo, contratos de trabajo, regulaciones internas y defensa en fiscalizaciones.' },
    { icon: 'fa-ambulance', title: 'Accidentes del Trabajo', desc: 'Defensa y asesoría en accidentes laborales y enfermedades profesionales, incluyendo tutela ante mutuales y la Dirección del Trabajo.' },
  ],
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.18!2d-73.051!3d-36.826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5d5d81a1b41%3A0xe2cdf6d5891734c8!2sOHiggins+940+Of.+407,+Concepci%C3%B3n!5e0!3m2!1ses-419!2scl!4v1'
};

const DEFAULT_TESTIMONIOS = [
  { nombre: 'María González', testimonio: 'Excelente servicio profesional. Me acompañaron en todo momento y lograron una resolución favorable para mi caso. Altamente recomendados.', fecha: 'Marzo 2026' },
  { nombre: 'Carlos Muñoz', testimonio: 'Profesionales de primer nivel. Su conocimiento y dedicación marcaron la diferencia en un caso complejo. Agradezco su compromiso y transparencia.', fecha: 'Enero 2026' },
  { nombre: 'Ana Soto', testimonio: 'Un estudio jurídico que inspira confianza. Me asesoraron en materia laboral con total seriedad y obtuvimos un resultado justo.', fecha: 'Diciembre 2025' },
  { nombre: 'Pedro Rivas', testimonio: 'Gran equipo humano y profesional. Resolvieron mi caso con rapidez y eficiencia. Sin duda, los recomiendo a quienes busquen abogados de confianza.', fecha: 'Octubre 2025' }
];

export default function Home() {
  const [testimonios, setTestimonios] = useState(DEFAULT_TESTIMONIOS);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [areasBgIndex, setAreasBgIndex] = useState(0);
  const [areasPage, setAreasPage] = useState(0);
  const [testPage, setTestPage] = useState(0);
  const [casoPage, setCasoPage] = useState(0);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [contactMsg, setContactMsg] = useState(null);
  const [heroContactMsg, setHeroContactMsg] = useState(null);
  const contactoAlert = useRef(null);
  const heroContactAlert = useRef(null);

  useEffect(() => {
    fetch('/api/testimonio', { method: 'GET' })
      .then(r => r.json())
      .then(data => { if (data?.length) setTestimonios(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 80);
      setBackToTopVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(i => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAreasBgIndex(i => (i + 1) % areasBgSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const submitContactForm = async (e, alertRef, resetForm) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const alert = alertRef.current;
    if (!data.nombre || !data.email || !data.mensaje) {
      alert.className = 'alert alert-error show';
      alert.textContent = 'Por favor complete los campos obligatorios.';
      return;
    }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.querySelector('.btn-text').style.display = 'none';
    btn.querySelector('.spinner').style.display = 'inline-block';
    btn.disabled = true;

    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      alert.className = 'alert alert-success show';
      alert.textContent = 'Mensaje enviado con éxito. Le contactaremos pronto.';
      e.target.reset();
    } else {
      alert.className = 'alert alert-error show';
      alert.textContent = json.error || 'Error al enviar. Intente de nuevo.';
    }
    btn.querySelector('.btn-text').style.display = 'inline';
    btn.querySelector('.spinner').style.display = 'none';
    btn.disabled = false;
  };

  const handleTestimonioSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const alert = testimonioAlert.current;
    if (!data.nombre || !data.testimonio) {
      alert.className = 'alert alert-error show';
      alert.textContent = 'Por favor complete todos los campos.';
      return;
    }
    const btn = e.target.querySelector('button[type="submit"]');
    btn.querySelector('.btn-text').style.display = 'none';
    btn.querySelector('.spinner').style.display = 'inline-block';
    btn.disabled = true;

    const res = await fetch('/api/testimonio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      alert.className = 'alert alert-success show';
      alert.textContent = 'Testimonio enviado con éxito. ¡Gracias!';
      e.target.reset();
      setTimeout(() => window.location.reload(), 1500);
    } else {
      alert.className = 'alert alert-error show';
      alert.textContent = json.error || 'Error al enviar. Intente de nuevo.';
    }
    btn.querySelector('.btn-text').style.display = 'inline';
    btn.querySelector('.spinner').style.display = 'none';
    btn.disabled = false;
  };

  const heroSlides = [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
    'https://images.unsplash.com/photo-1505663910305-48c73bc1c0e6?w=1600&q=80',
    'https://radiocamilatv.cl/portal/core/controllers/Noticias/imagen/06-04-2022_23-34-59corte1.jpg',
    'https://assets.diarioconcepcion.cl/2022/07/pag-10-11-Aerea-Arco-de-Medicina-UdeC-foto-carolina.jpg'
  ];

  const areasBgSlides = [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80',
    'https://images.unsplash.com/photo-1505663910305-48c73bc1c0e6?w=1600&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80'
  ];

  const casos = [
    {
      icon: 'fa-gavel',
      rol: 'Rol O-643-2025',
      tribunal: 'Juzgado de Letras del Trabajo de Concepción',
      monto: '$95.000.000',
      desc: 'Litigación exitosa en causa laboral por despido injustificado, obteniendo sentencia favorable para el trabajador.'
    },
    {
      icon: 'fa-gavel',
      rol: 'Corte de Apelaciones de Valparaíso - 2368-2025',
      tribunal: 'Chamorro Águila Lionel Mauricio / Dirección General del Territorio Marítimo',
      monto: '$29.922.888',
      desc: 'Defensa exitosa en procedimiento laboral contra entidad pública, logrando el reconocimiento de derechos laborales del trabajador.'
    }
  ];

  return (
    <>
      {/* ============ HEADER ============ */}
      <header className={`header${headerScrolled ? ' scrolled' : ''}`} id="header">
        <div className="container">
          <a href="#inicio" className="logo">
            <img src="/logo.png" alt="Defensa y Trabajo" className="logo-img" />
            <div className="logo-text">
              <h3>Defensa y Trabajo</h3>
              <span>Concepción</span>
            </div>
          </a>
          <nav className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
            <a href="#equipo" onClick={() => setMenuOpen(false)}>Equipo</a>
            <a href="#areas" onClick={() => setMenuOpen(false)}>Áreas</a>
            <a href="#testimonios" onClick={() => setMenuOpen(false)}>Testimonios</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </nav>
          <button className="nav-toggle" id="navToggle" aria-label="Menú"
            onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="inicio">
        <div className="hero-slideshow">
          {heroSlides.map((img, i) => (
            <div key={i} className={`hero-slide${i === slideIndex ? ' active' : ''}`}
              style={{ backgroundImage: `linear-gradient(135deg, rgba(18,55,42,0.8), rgba(109,118,126,0.5)), url('${img}')` }} />
          ))}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content hero-content-split">
          <div className="hero-text-col">
            <span className="badge">Estudio Jurídico Laboral en Concepción</span>
            <h1>Derechos que se defienden,<br />trabajo que se respeta</h1>
            <p>Trabajo digno, justicia para ti. Somos un estudio especializado en Derecho Laboral con más de 5 años defendiendo los derechos de los trabajadores en Concepción.</p>
            <div className="hero-buttons">
              <a href="#nosotros" className="btn btn-outline">Conócenos</a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">{CONFIG.anosExperiencia}+</span>
                <span className="hero-stat-label">Años</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">{CONFIG.casosExitosos}</span>
                <span className="hero-stat-label">Casos</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">100%</span>
                <span className="hero-stat-label">Dedicación</span>
              </div>
            </div>
          </div>
          <div className="hero-form-col">
            <div className="hero-form-card">
              <h3>Solicita tu asesoría</h3>
              <p>Déjanos tus datos y te contactaremos a la brevedad.</p>
              <form onSubmit={(e) => submitContactForm(e, heroContactAlert, true)}>
                <div ref={heroContactAlert} className="alert"></div>
                <div className="form-group">
                  <input type="text" className="form-control hero-form-input" name="nombre" placeholder="Nombre completo" required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control hero-form-input" name="email" placeholder="Correo electrónico" required />
                </div>
                <div className="form-group">
                  <input type="tel" className="form-control hero-form-input" name="telefono" placeholder="Teléfono" />
                </div>
                <div className="form-group">
                  <select className="form-control hero-form-input" name="area">
                    <option value="">Área de consulta</option>
                    <option>Derecho Laboral</option>
                    <option>Tutela Laboral</option>
                    <option>Funcionarios Públicos</option>
                    <option>Despidos Injustificados</option>
                    <option>Autodespidos</option>
                    <option>Ley Karin</option>
                    <option>Asesoría a Empresas</option>
                    <option>Accidentes del Trabajo</option>
                    <option>Otra</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea className="form-control hero-form-input" name="mensaje" rows="3" placeholder="Cuéntanos tu caso..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary hero-form-btn">
                  <span className="btn-text">Enviar Mensaje</span>
                  <span className="spinner" style={{ display: 'none' }}></span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Descubre</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ============ NOSOTROS ============ */}
      <section className="section" id="nosotros">
        <div className="container">
          <div className="section-title">
            <h2>Nuestro Estudio</h2>
            <p>Conozca nuestra trayectoria y el compromiso que nos define</p>
          </div>
          <div className="nosotros-grid">
            <div className="nosotros-img">
              <img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80" alt="Defensa y Trabajo" />
            </div>
            <div className="nosotros-text">
              <h2>Más de <span>{CONFIG.anosExperiencia} años</span> defendiendo tus derechos</h2>
              <p>{CONFIG.descripcion}</p>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{CONFIG.anosExperiencia}+</span>
                  <span className="stat-label">Años de Experiencia</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{CONFIG.casosExitosos}</span>
                  <span className="stat-label">Casos Exitosos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Compromiso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EQUIPO ============ */}
      <section className="section section-beige" id="equipo">
        <div className="container">
          <div className="section-title">
            <h2>Nuestro Equipo</h2>
            <p>Profesionales del derecho comprometidos con tu tranquilidad</p>
          </div>
          <div className="equipo-grid">
            <div className="equipo-card">
              <img src="#" />
              <div className="equipo-info">
                <h3>{CONFIG.abogado1.nombre}</h3>
                <p className="equipo-cargo">{CONFIG.abogado1.cargo}</p>
                <p className="equipo-especialidad">{CONFIG.abogado1.especialidad}</p>
                <p className="equipo-descripcion">{CONFIG.abogado1.descripcion}</p>
                <div className="equipo-social">
                  <a href={CONFIG.abogado1.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href={`mailto:${CONFIG.abogado1.email}`} aria-label="Email"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
            </div>
            {/* <!-- Abogado 2: Comentado hasta que se incorpore -->
            <div className="equipo-card" style={{ display: 'none' }}>
              <img src="#" alt="Benjamín Sepúlveda Fernández" className="equipo-img" />
              <div className="equipo-info">
                <h3>{CONFIG.abogado2.nombre}</h3>
                <p className="equipo-cargo">{CONFIG.abogado2.cargo}</p>
                <p className="equipo-especialidad">{CONFIG.abogado2.especialidad}</p>
                <p className="equipo-descripcion">{CONFIG.abogado2.descripcion}</p>
                <div className="equipo-social">
                  <a href={CONFIG.abogado2.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                  <a href={`mailto:${CONFIG.abogado2.email}`} aria-label="Email"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* ============ ÁREAS ============ */}
      <section className="section section-areas" id="areas">
        <div className="areas-bg-slideshow">
          {areasBgSlides.map((img, i) => (
            <div key={i} className={`areas-bg-slide${i === areasBgIndex ? ' active' : ''}`}
              style={{ backgroundImage: `url('${img}')` }} />
          ))}
        </div>
        <div className="areas-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-title">
            <h2 style={{ color: 'var(--blanco)' }}>Áreas de Desempeño</h2>
            <p style={{ color: 'var(--texto-claro)' }}>Especialización en derecho laboral y materias relacionadas</p>
          </div>
          <div className="areas-carousel-wrap">
            <button className="areas-arrow areas-arrow-left" onClick={() => setAreasPage(p => p === 0 ? 1 : 0)} aria-label="Anterior">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="areas-carousel">
              <div className="areas-grid">
                {CONFIG.areas.map((a, i) => (
                  <div key={i} className={`area-card${(areasPage === 0 && i > 5) || (areasPage === 1 && i < 2) ? ' area-card-hidden' : ''}`}>
                    <div className="area-icon"><i className={`fas ${a.icon}`}></i></div>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="areas-arrow areas-arrow-right" onClick={() => setAreasPage(p => p === 0 ? 1 : 0)} aria-label="Siguiente">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="areas-dots">
            <span className={`areas-dot${areasPage === 0 ? ' active' : ''}`} onClick={() => setAreasPage(0)}></span>
            <span className={`areas-dot${areasPage === 1 ? ' active' : ''}`} onClick={() => setAreasPage(1)}></span>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section className="section section-dark" id="testimonios">
        <div className="container">
          <div className="section-title">
            <h2>Testimonios</h2>
            <p>La opinión de nuestros clientes es nuestro mejor respaldo</p>
          </div>
          <div className="test-carousel-wrap">
            <button className="test-arrow test-arrow-left" onClick={() => setTestPage(p => Math.max(0, p - 1))} aria-label="Anterior">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="test-carousel">
              <div className="testimonios-container">
                {testimonios.slice(testPage * 4, testPage * 4 + 4).map((t, i) => (
                  <div key={i} className="testimonio-card">
                    <p className="testimonio-texto">{t.testimonio}</p>
                    <div className="testimonio-autor">
                      <div className="testimonio-avatar">{t.nombre.charAt(0)}</div>
                      <div>
                        <p className="testimonio-nombre">{t.nombre}</p>
                        <p className="testimonio-fecha">{t.fecha}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="test-arrow test-arrow-right" onClick={() => setTestPage(p => Math.min(p + 1, Math.ceil(testimonios.length / 4) - 1))} aria-label="Siguiente">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="test-dots">
            {Array.from({ length: Math.ceil(testimonios.length / 4) }, (_, i) => (
              <span key={i} className={`test-dot${testPage === i ? ' active' : ''}`} onClick={() => setTestPage(i)}></span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASOS DE ÉXITO ============ */}
      <section className="section section-beige" id="casos">
        <div className="container">
          <div className="section-title">
            <h2>Casos de Éxito</h2>
            <p>Resultados que respaldan nuestro compromiso</p>
          </div>
          <div className="caso-carousel-wrap">
            <button className="caso-arrow caso-arrow-left" onClick={() => setCasoPage(p => Math.max(0, p - 1))} aria-label="Anterior">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="caso-carousel">
              <div className="casos-grid">
                {casos.slice(casoPage * 2, casoPage * 2 + 2).map((c, i) => (
                  <div key={i} className="caso-card">
                    <div className="caso-header">
                      <div className="caso-icon"><i className={`fas ${c.icon}`}></i></div>
                      <div className="caso-monto">{c.monto}</div>
                    </div>
                    <p className="caso-rol">{c.rol}</p>
                    <p className="caso-tribunal">{c.tribunal}</p>
                    <p className="caso-desc">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="caso-arrow caso-arrow-right" onClick={() => setCasoPage(p => Math.min(p + 1, Math.ceil(casos.length / 2) - 1))} aria-label="Siguiente">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="caso-dots">
            {Array.from({ length: Math.ceil(casos.length / 2) }, (_, i) => (
              <span key={i} className={`caso-dot${casoPage === i ? ' active' : ''}`} onClick={() => setCasoPage(i)}></span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section className="section" id="contacto">
        <div className="container">
          <div className="section-title">
            <h2>Contacto</h2>
            <p>Estamos disponibles para atender tu consulta. Escríbenos sin compromiso.</p>
          </div>
          <div className="contacto-grid">
            <div className="contacto-form">
              <h3>Envíanos tu mensaje</h3>
              <p>Completa el formulario y te responderemos a la brevedad.</p>
              <form onSubmit={(e) => submitContactForm(e, contactoAlert, true)} id="contactoForm">
                <div id="contactoAlert" ref={contactoAlert} className="alert"></div>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo *</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input type="tel" className="form-control" id="telefono" name="telefono" />
                </div>
                <div className="form-group">
                  <label htmlFor="area">Área de consulta</label>
                  <select className="form-control" id="area" name="area">
                    <option value="">Seleccione un área</option>
                    {CONFIG.areas.map((a, i) => (
                      <option key={i}>{a.title}</option>
                    ))}
                    <option>Otra</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea className="form-control" id="mensaje" name="mensaje" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <span className="btn-text">Enviar Mensaje</span>
                  <span className="spinner" style={{ display: 'none' }}></span>
                </button>
              </form>
            </div>
            <div className="contacto-info">
              <div className="contacto-info-item">
                <div className="contacto-info-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="contacto-info-text">
                  <h4>Dirección</h4>
                  <p>{CONFIG.direccion}</p>
                </div>
              </div>
              <div className="contacto-info-item">
                <div className="contacto-info-icon"><i className="fas fa-phone-alt"></i></div>
                <div className="contacto-info-text">
                  <h4>Teléfono / WhatsApp</h4>
                  <p><a href={`tel:${CONFIG.telefono}`}>{CONFIG.telefono}</a></p>
                </div>
              </div>
              <div className="contacto-info-item">
                <div className="contacto-info-icon"><i className="fas fa-envelope"></i></div>
                <div className="contacto-info-text">
                  <h4>Email</h4>
                  <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
                </div>
              </div>
              <div className="contacto-info-item">
                <div className="contacto-info-icon"><i className="fas fa-clock"></i></div>
                <div className="contacto-info-text">
                  <h4>Horario de Atención</h4>
                  <p>{CONFIG.horario}</p>
                </div>
              </div>
              <div className="contacto-info-item">
                <div className="contacto-info-icon"><i className="fab fa-instagram"></i></div>
                <div className="contacto-info-text">
                  <h4>Instagram</h4>
                  <p><a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer">@defensaytrabajo.abogados</a></p>
                </div>
              </div>
              <a href={CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="contacto-whatsapp">
                <i className="fab fa-whatsapp"></i> Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="footer-mapa">
          <iframe src={CONFIG.googleMapsEmbed}
            allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <div className="footer-content">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/logo.png" alt="Defensa y Trabajo" className="footer-logo-img" />
                  <h3>Defensa y Trabajo</h3>
                </div>
                <p>Estudio jurídico especializado en Derecho Laboral en Concepción. Compromiso, transparencia y dedicación absoluta con cada caso.</p>
              </div>
              <div className="footer-col">
                <h4>Enlaces</h4>
                <ul>
                  <li><a href="#inicio">Inicio</a></li>
                  <li><a href="#nosotros">Nosotros</a></li>
                  <li><a href="#equipo">Equipo</a></li>
                  <li><a href="#areas">Áreas</a></li>
                  <li><a href="#contacto">Contacto</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Áreas</h4>
                <ul>
                  <li><a href="#areas">Derecho Laboral</a></li>
                  <li><a href="#areas">Tutela Laboral</a></li>
                  <li><a href="#areas">Despidos</a></li>
                  <li><a href="#areas">Ley Karin</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Contacto</h4>
                <div className="contacto-item"><i className="fas fa-map-marker-alt"></i><span>{CONFIG.direccion}</span></div>
                <div className="contacto-item"><i className="fas fa-phone-alt"></i><span>{CONFIG.telefono}</span></div>
                <div className="contacto-item"><i className="fas fa-envelope"></i><span>{CONFIG.email}</span></div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>&copy; 2026 Defensa y Trabajo. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ WHATSAPP FLOATING ============ */}
      <a href={CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
        <span className="whatsapp-tooltip">Escríbenos</span>
      </a>

      {/* ============ BACK TO TOP ============ */}
      <button className={`back-to-top${backToTopVisible ? ' visible' : ''}`} id="backToTop" aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fas fa-chevron-up"></i>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-slide { transition: opacity 1.5s ease; }
        .area-card, .equipo-card, .testimonio-card, .caso-card { transition: opacity 0.6s ease, transform 0.6s ease; }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }
      `}} />
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          var cards = document.querySelectorAll('.area-card, .equipo-card, .testimonio-card, .caso-card');
          var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
              if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
            });
          }, { threshold: 0.15 });
          cards.forEach(function(c) { c.style.opacity = '0'; c.style.transform = 'translateY(30px)'; observer.observe(c); });

          document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
              var t = document.querySelector(this.getAttribute('href'));
              if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
            });
          });
        });
      `}} />
    </>
  );
}
