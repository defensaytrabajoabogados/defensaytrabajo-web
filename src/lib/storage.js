import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

const DATA_DIR = path.join(process.cwd(), 'data');
const isProduction = process.env.NODE_ENV === 'production';

const DEFAULTS = [
  { id: 4, nombre: "María González", testimonio: "Excelente servicio profesional. Me acompañaron en todo momento y lograron una resolución favorable para mi caso. Altamente recomendados.", fecha: "Marzo 2026" },
  { id: 3, nombre: "Carlos Muñoz", testimonio: "Profesionales de primer nivel. Su conocimiento y dedicación marcaron la diferencia en un caso complejo. Agradezco su compromiso y transparencia.", fecha: "Enero 2026" },
  { id: 2, nombre: "Ana Soto", testimonio: "Un estudio jurídico que inspira confianza. Me asesoraron en materia laboral con total seriedad y obtuvimos un resultado justo.", fecha: "Diciembre 2025" },
  { id: 1, nombre: "Pedro Rivas", testimonio: "Gran equipo humano y profesional. Resolvieron mi caso con rapidez y eficiencia. Sin duda, los recomiendo a quienes busquen abogados de confianza.", fecha: "Octubre 2025" }
];

let pool = null;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

let initialized = false;

async function ensureDb() {
  if (initialized) return;
  const client = await getPool().connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonios (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        testimonio TEXT NOT NULL,
        fecha TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS contactos (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT DEFAULT '',
        area TEXT DEFAULT '',
        mensaje TEXT NOT NULL,
        fecha TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    const { rows } = await client.query('SELECT COUNT(*)::int AS count FROM testimonios');
    if (rows[0].count === 0) {
      for (const t of DEFAULTS) {
        await client.query(
          'INSERT INTO testimonios (nombre, testimonio, fecha) VALUES ($1, $2, $3)',
          [t.nombre, t.testimonio, t.fecha]
        );
      }
    }
    initialized = true;
  } finally {
    client.release();
  }
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJSON(filename) {
  ensureDir();
  const fp = path.join(DATA_DIR, filename);
  if (!fs.existsSync(fp)) return [];
  return JSON.parse(fs.readFileSync(fp, 'utf-8'));
}

function writeJSON(filename, data) {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

export async function getTestimonios() {
  if (isProduction) {
    try {
      await ensureDb();
      const { rows } = await getPool().query(
        'SELECT id, nombre, testimonio, fecha FROM testimonios ORDER BY id DESC'
      );
      return rows.length > 0 ? rows : DEFAULTS;
    } catch (err) {
      console.error('DB error (getTestimonios), falling back to JSON:', err.message);
    }
  }
  const saved = readJSON('testimonios.json');
  if (saved.length > 0) return saved.reverse();
  return DEFAULTS;
}

export async function saveTestimonio(nombre, testimonio, fecha) {
  if (isProduction) {
    try {
      await ensureDb();
      await getPool().query(
        'INSERT INTO testimonios (nombre, testimonio, fecha) VALUES ($1, $2, $3)',
        [nombre, testimonio, fecha]
      );
      return;
    } catch (err) {
      console.error('DB error (saveTestimonio), falling back to JSON:', err.message);
    }
  }
  const list = readJSON('testimonios.json');
  list.push({ id: Date.now(), nombre, testimonio, fecha });
  writeJSON('testimonios.json', list);
}

export async function saveContacto(nombre, email, telefono, area, mensaje, fecha) {
  if (isProduction) {
    try {
      await ensureDb();
      await getPool().query(
        'INSERT INTO contactos (nombre, email, telefono, area, mensaje, fecha) VALUES ($1, $2, $3, $4, $5, $6)',
        [nombre, email, telefono, area, mensaje, fecha]
      );
      return;
    } catch (err) {
      console.error('DB error (saveContacto), falling back to JSON:', err.message);
    }
  }
  const list = readJSON('contactos.json');
  list.push({ id: Date.now(), nombre, email, telefono, area, mensaje, fecha });
  writeJSON('contactos.json', list);
}
