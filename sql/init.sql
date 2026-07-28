-- Inicializar base de datos para WebAbogado
-- Ejecutar: psql -d tu_base -f sql/init.sql

CREATE TABLE IF NOT EXISTS testimonios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  testimonio TEXT NOT NULL,
  fecha TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT DEFAULT '',
  area TEXT DEFAULT '',
  mensaje TEXT NOT NULL,
  fecha TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO testimonios (nombre, testimonio, fecha) VALUES
  ('María González', 'Excelente servicio profesional. Me acompañaron en todo momento y lograron una resolución favorable para mi caso. Altamente recomendados.', 'Marzo 2026'),
  ('Carlos Muñoz', 'Profesionales de primer nivel. Su conocimiento y dedicación marcaron la diferencia en un caso complejo. Agradezco su compromiso y transparencia.', 'Enero 2026'),
  ('Ana Soto', 'Un estudio jurídico que inspira confianza. Me asesoraron en materia laboral con total seriedad y obtuvimos un resultado justo.', 'Diciembre 2025'),
  ('Pedro Rivas', 'Gran equipo humano y profesional. Resolvieron mi caso con rapidez y eficiencia. Sin duda, los recomiendo a quienes busquen abogados de confianza.', 'Octubre 2025')
ON CONFLICT DO NOTHING;
