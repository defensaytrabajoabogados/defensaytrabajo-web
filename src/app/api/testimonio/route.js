import { getTestimonios, saveTestimonio } from '@/lib/storage';

export async function GET() {
  const list = await getTestimonios();
  return Response.json(list);
}

export async function POST(request) {
  const { nombre, testimonio } = await request.json();

  if (!nombre?.trim() || !testimonio?.trim()) {
    return Response.json({ error: 'Campos obligatorios' }, { status: 400 });
  }

  const date = new Date();
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const fecha = `${date.getDate()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`;

  await saveTestimonio(nombre.trim(), testimonio.trim(), fecha);

  return Response.json({ success: true });
}
