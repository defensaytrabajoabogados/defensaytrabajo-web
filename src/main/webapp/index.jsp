<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*, java.io.*" %>
<%!
    private List<Map<String,String>> leerTestimonios() {
        List<Map<String,String>> lista = new ArrayList<>();
        File file = new File(System.getProperty("java.io.tmpdir") + "/webabogado/testimonios.txt");
        if (file.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String line;
                while ((line = br.readLine()) != null) {
                    String[] parts = line.split("\\|\\|\\|", 3);
                    if (parts.length == 3) {
                        Map<String,String> t = new HashMap<>();
                        t.put("nombre", parts[0]);
                        t.put("testimonio", parts[1]);
                        t.put("fecha", parts[2]);
                        lista.add(t);
                    }
                }
            } catch (Exception e) { e.printStackTrace(); }
        }
        return lista;
    }
%>
<%
    String appName = "Estudio Jurídico [Nombre]";
    String whatsappNumber = "56912345678";
    String whatsappLink = "https://wa.me/" + whatsappNumber;
    String telefono = "+56 9 1234 5678";
    String email = "contacto@estudiojuridico.cl";
    String direccion = "Tucapel 564, Ed. Los Alerces, Of. 65, Concepción, Chile";

    List<Map<String,String>> testimoniosList = leerTestimonios();

    if (testimoniosList.isEmpty()) {
        String[][] defaults = {
            {"María González", "Excelente servicio profesional. Me acompañaron en todo momento y lograron una resolución favorable para mi caso. Altamente recomendados.", "Marzo 2026"},
            {"Carlos Muñoz", "Profesionales de primer nivel. Su conocimiento y dedicación marcaron la diferencia en un caso complejo. Agradezco su compromiso y transparencia.", "Enero 2026"},
            {"Ana Soto", "Un estudio jurídico que inspira confianza. Me asesoraron en materia laboral con total seriedad y obtuvimos un resultado justo.", "Diciembre 2025"},
            {"Pedro Rivas", "Gran equipo humano y profesional. Resolvieron mi caso con rapidez y eficiencia. Sin duda, los recomiendo a quienes busquen abogados de confianza.", "Octubre 2025"}
        };
        for (String[] d : defaults) {
            Map<String,String> t = new HashMap<>();
            t.put("nombre", d[0]);
            t.put("testimonio", d[1]);
            t.put("fecha", d[2]);
            testimoniosList.add(t);
        }
    }

    Collections.reverse(testimoniosList);

    String msg = request.getParameter("msg");
    String msgType = request.getParameter("tipo");
%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= appName %> — Abogados en Concepción</title>
    <meta name="description" content="Estudio jurídico en Concepción. Abogados especializados en litigación, derecho laboral, civil y más. Profesionales de confianza.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <!-- ============ HEADER ============ -->
    <header class="header" id="header">
        <div class="container">
            <a href="#inicio" class="logo">
                <div class="logo-icon">EJ</div>
                <div class="logo-text">
                    <h3>Estudio Jurídico</h3>
                    <span>Concepción</span>
                </div>
            </a>
            <nav class="nav-menu" id="navMenu">
                <a href="#inicio">Inicio</a>
                <a href="#nosotros">Nosotros</a>
                <a href="#equipo">Equipo</a>
                <a href="#areas">Áreas</a>
                <a href="#testimonios">Testimonios</a>
                <a href="#contacto">Contacto</a>
            </nav>
            <button class="nav-toggle" id="navToggle" aria-label="Menú">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>

    <!-- ============ HERO ============ -->
    <section class="hero" id="inicio">
        <div class="hero-slideshow">
            <div class="hero-slide active" style="background-image: linear-gradient(135deg, rgba(10,22,40,0.7), rgba(74,44,26,0.5)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80');"></div>
            <div class="hero-slide" style="background-image: linear-gradient(135deg, rgba(10,22,40,0.7), rgba(74,44,26,0.5)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80');"></div>
            <div class="hero-slide" style="background-image: linear-gradient(135deg, rgba(10,22,40,0.7), rgba(74,44,26,0.5)), url('https://images.unsplash.com/photo-1505663910305-48c73bc1c0e6?w=1600&q=80');"></div>
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <span class="badge">Estudio Jurídico en Concepción</span>
            <h1>Compromiso, Excelencia<br>y Confianza Legal</h1>
            <p>Somos un estudio jurídico dedicado a brindar asesoría legal de excelencia, con más de 10 años de experiencia en litigación compleja y defensa de sus derechos.</p>
            <div class="hero-buttons">
                <a href="#contacto" class="btn btn-primary">Solicitar Asesoría</a>
                <a href="#nosotros" class="btn btn-outline">Conócenos</a>
            </div>
        </div>
        <div class="hero-scroll">
            <span>Descubre</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    <!-- ============ NOSOTROS ============ -->
    <section class="section" id="nosotros">
        <div class="container">
            <div class="section-title">
                <h2>Nuestro Estudio</h2>
                <p>Conozca nuestra trayectoria y el compromiso que nos define</p>
            </div>
            <div class="nosotros-grid">
                <div class="nosotros-img">
                    <img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80" alt="Estudio Jurídico">
                </div>
                <div class="nosotros-text">
                    <h2>Más de una <span>década</span> defendiendo sus derechos</h2>
                    <p>
                        Somos un estudio jurídico con sede en Concepción, fundado por abogados de la 
                        Universidad de Concepción con una visión clara: ofrecer un servicio legal de 
                        excelencia, cercano y comprometido con cada cliente.
                    </p>
                    <p>
                        Nuestra práctica abarca diversas áreas del derecho, con especial énfasis en 
                        litigación civil, laboral y comercial. Trabajamos con un enfoque estratégico, 
                        poniendo la experiencia y el conocimiento al servicio de sus intereses.
                    </p>
                    <p>
                        Creemos en la abogacía como un servicio esencial para la justicia, y cada caso 
                        lo asumimos con la seriedad, dedicación y confidencialidad que usted merece.
                    </p>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">10+</span>
                            <span class="stat-label">Años de Experiencia</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">Casos Exitosos</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">100%</span>
                            <span class="stat-label">Compromiso</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ============ EQUIPO ============ -->
    <section class="section section-beige" id="equipo">
        <div class="container">
            <div class="section-title">
                <h2>Nuestro Equipo</h2>
                <p>Profesionales del derecho comprometidos con su tranquilidad</p>
            </div>
            <div class="equipo-grid">
                <div class="equipo-card">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" alt="Abogado 1" class="equipo-img">
                    <div class="equipo-info">
                        <h3>Francisco Martínez</h3>
                        <p class="equipo-cargo">Socio Fundador</p>
                        <p class="equipo-especialidad">Derecho Civil · Litigación · Responsabilidad Civil</p>
                        <p class="equipo-descripcion">
                            Abogado de la Universidad de Concepción, Magíster en Derecho Privado. 
                            Con más de 15 años de experiencia en litigación civil y comercial, 
                            ha representado a clientes en causas de alta complejidad ante tribunales 
                            de todo el país. Profesor de Derecho Civil en la Universidad del Desarrollo.
                        </p>
                        <div class="equipo-social">
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" aria-label="Email"><i class="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
                <div class="equipo-card">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="Abogado 2" class="equipo-img">
                    <div class="equipo-info">
                        <h3>Carolina Vega</h3>
                        <p class="equipo-cargo">Socia Fundadora</p>
                        <p class="equipo-especialidad">Derecho Laboral · Derecho de Familia · Compliance</p>
                        <p class="equipo-descripcion">
                            Abogada de la Pontificia Universidad Católica de Chile, con un Magíster 
                            en Derecho Laboral de la Universidad Adolfo Ibáñez. Cuenta con vasta 
                            experiencia en asesoría laboral estratégica, negociaciones colectivas y 
                            litigación laboral. Ha sido reconocida por su excelencia y dedicación.
                        </p>
                        <div class="equipo-social">
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" aria-label="Email"><i class="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ============ ÁREAS ============ -->
    <section class="section" id="areas">
        <div class="container">
            <div class="section-title">
                <h2>Áreas de Desempeño</h2>
                <p>Especialización y experiencia en múltiples ramas del derecho</p>
            </div>
            <div class="areas-grid">
                <div class="area-card">
                    <div class="area-icon"><i class="fas fa-gavel"></i></div>
                    <h3>Litigación Civil</h3>
                    <p>Representación en juicios civiles, redacción de demandas, contestaciones y recursos ante todas las instancias judiciales.</p>
                </div>
                <div class="area-card">
                    <div class="area-icon"><i class="fas fa-briefcase"></i></div>
                    <h3>Derecho Laboral</h3>
                    <p>Asesoría en relaciones laborales, negociaciones colectivas, tutela laboral y defensa en juicios del trabajo.</p>
                </div>
                <div class="area-card">
                    <div class="area-icon"><i class="fas fa-building"></i></div>
                    <h3>Derecho Corporativo</h3>
                    <p>Constitución de sociedades, contratos comerciales, due diligence y asesoría legal integral para empresas.</p>
                </div>
                <div class="area-card">
                    <div class="area-icon"><i class="fas fa-balance-scale"></i></div>
                    <h3>Responsabilidad Civil</h3>
                    <p>Acciones indemnizatorias por daños, responsabilidad médica, accidentes de tránsito y responsabilidad del Estado.</p>
                </div>
                <div class="area-card">
                    <div class="area-icon"><i class="fas fa-shield-alt"></i></div>
                    <h3>Derecho de Familia</h3>
                    <p>Divorcios, cuidado personal, alimentos, régimen de visitas y todas las materias del derecho de familia.</p>
                </div>
                <div class="area-card">
                    <div class="area-icon"><i class="fas fa-file-contract"></i></div>
                    <h3>Compliance</h3>
                    <p>Implementación de modelos de prevención de delitos, asesoría en cumplimiento normativo y gestión de riesgos legales.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ============ TESTIMONIOS ============ -->
    <section class="section section-dark" id="testimonios">
        <div class="container">
            <div class="section-title">
                <h2>Testimonios</h2>
                <p>La opinión de nuestros clientes es nuestro mejor respaldo</p>
            </div>

            <div class="testimonios-container" id="testimoniosContainer">
                <% for (Map<String,String> t : testimoniosList) { %>
                <div class="testimonio-card">
                    <p class="testimonio-texto"><%= t.get("testimonio") %></p>
                    <div class="testimonio-autor">
                        <div class="testimonio-avatar"><%= t.get("nombre").charAt(0) %></div>
                        <div>
                            <p class="testimonio-nombre"><%= t.get("nombre") %></p>
                            <p class="testimonio-fecha"><%= t.get("fecha") %></p>
                        </div>
                    </div>
                </div>
                <% } %>
            </div>

            <div class="testimonio-form">
                <h3>Deje su testimonio</h3>
                <form action="enviar-testimonio" method="POST" id="testimonioForm">
                    <div id="testimonioAlert" class="alert"></div>
                    <div class="form-group">
                        <label for="testNombre">Nombre completo</label>
                        <input type="text" class="form-control" id="testNombre" name="nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="testMensaje">Su testimonio</label>
                        <textarea class="form-control" id="testMensaje" name="testimonio" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-outline" style="width:100%;">
                        <span class="btn-text">Enviar Testimonio</span>
                        <span class="spinner" style="display:none;"></span>
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- ============ CONTACTO ============ -->
    <section class="section section-beige" id="contacto">
        <div class="container">
            <div class="section-title">
                <h2>Contacto</h2>
                <p>Estamos disponibles para atender su consulta. Contáctenos sin compromiso.</p>
            </div>
            <div class="contacto-grid">
                <div class="contacto-form">
                    <h3>Envíenos su mensaje</h3>
                    <p>Complete el formulario y un abogado se comunicará con usted a la brevedad.</p>
                    <% if (msg != null) { %>
                        <div class="alert alert-<%= msgType != null ? msgType : "success" %> show"><%= msg %></div>
                    <% } %>
                    <form action="enviar-contacto" method="POST" id="contactoForm">
                        <div id="contactoAlert" class="alert"></div>
                        <div class="form-group">
                            <label for="nombre">Nombre completo *</label>
                            <input type="text" class="form-control" id="nombre" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Correo electrónico *</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="tel" class="form-control" id="telefono" name="telefono">
                        </div>
                        <div class="form-group">
                            <label for="area">Área de consulta</label>
                            <select class="form-control" id="area" name="area">
                                <option value="">Seleccione un área</option>
                                <option>Litigación Civil</option>
                                <option>Derecho Laboral</option>
                                <option>Derecho Corporativo</option>
                                <option>Responsabilidad Civil</option>
                                <option>Derecho de Familia</option>
                                <option>Compliance</option>
                                <option>Otra</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="mensaje">Mensaje *</label>
                            <textarea class="form-control" id="mensaje" name="mensaje" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">
                            <span class="btn-text">Enviar Mensaje</span>
                            <span class="spinner" style="display:none;"></span>
                        </button>
                    </form>
                </div>
                <div class="contacto-info">
                    <div class="contacto-info-item">
                        <div class="contacto-info-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div class="contacto-info-text">
                            <h4>Dirección</h4>
                            <p><%= direccion %></p>
                        </div>
                    </div>
                    <div class="contacto-info-item">
                        <div class="contacto-info-icon"><i class="fas fa-phone-alt"></i></div>
                        <div class="contacto-info-text">
                            <h4>Teléfono</h4>
                            <p><a href="tel:<%= telefono %>"><%= telefono %></a></p>
                        </div>
                    </div>
                    <div class="contacto-info-item">
                        <div class="contacto-info-icon"><i class="fas fa-envelope"></i></div>
                        <div class="contacto-info-text">
                            <h4>Email</h4>
                            <p><a href="mailto:<%= email %>"><%= email %></a></p>
                        </div>
                    </div>
                    <div class="contacto-info-item">
                        <div class="contacto-info-icon"><i class="fas fa-clock"></i></div>
                        <div class="contacto-info-text">
                            <h4>Horario de Atención</h4>
                            <p>Lunes a Viernes: 09:00 — 18:00 hrs</p>
                        </div>
                    </div>
                    <a href="<%= whatsappLink %>" target="_blank" rel="noopener noreferrer" class="contacto-whatsapp">
                        <i class="fab fa-whatsapp"></i> Escríbanos por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ============ FOOTER ============ -->
    <footer class="footer">
        <div class="footer-mapa">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.523248754971!2d-73.049191!3d-36.827082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5f0d5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sConcepci%C3%B3n!5e0!3m2!1ses!2scl!4v1" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="footer-content">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <h3>Estudio Jurídico</h3>
                        <p>
                            Su aliado de confianza en Concepción. Profesionales del derecho 
                            comprometidos con la excelencia, la ética y la defensa de sus intereses.
                        </p>
                    </div>
                    <div class="footer-col">
                        <h4>Enlaces</h4>
                        <ul>
                            <li><a href="#inicio">Inicio</a></li>
                            <li><a href="#nosotros">Nosotros</a></li>
                            <li><a href="#equipo">Equipo</a></li>
                            <li><a href="#areas">Áreas</a></li>
                            <li><a href="#contacto">Contacto</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Áreas</h4>
                        <ul>
                            <li><a href="#areas">Litigación Civil</a></li>
                            <li><a href="#areas">Derecho Laboral</a></li>
                            <li><a href="#areas">Derecho Corporativo</a></li>
                            <li><a href="#areas">Familia</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Contacto</h4>
                        <div class="contacto-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span><%= direccion %></span>
                        </div>
                        <div class="contacto-item">
                            <i class="fas fa-phone-alt"></i>
                            <span><%= telefono %></span>
                        </div>
                        <div class="contacto-item">
                            <i class="fas fa-envelope"></i>
                            <span><%= email %></span>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>&copy; 2026 Estudio Jurídico Concepción. Todos los derechos reservados.</span>
                    <span>Diseñado con <i class="fas fa-heart" style="color: var(--dorado);"></i> en Concepción</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- ============ WHATSAPP FLOATING ============ -->
    <a href="<%= whatsappLink %>" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="WhatsApp">
        <i class="fab fa-whatsapp"></i>
        <span class="whatsapp-tooltip">Escríbanos</span>
    </a>

    <!-- ============ BACK TO TOP ============ -->
    <button class="back-to-top" id="backToTop" aria-label="Volver arriba">
        <i class="fas fa-chevron-up"></i>
    </button>

    <script src="js/scripts.js"></script>
</body>
</html>
