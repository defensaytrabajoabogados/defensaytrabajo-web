import { saveContacto } from '@/lib/storage';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const emailTo = process.env.EMAIL_TO || 'defensaytrabajoabogados@gmail.com';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request) {
  const { nombre, email, telefono, area, mensaje } = await request.json();

  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
    return Response.json({ error: 'Campos obligatorios' }, { status: 400 });
  }

  const date = new Date();
  const fecha = date.toLocaleDateString('es-CL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  await saveContacto(
    nombre.trim(), email.trim(),
    telefono?.trim() || '',
    area?.trim() || '',
    mensaje.trim(), fecha
  );

  if (resend) {
    try {
      await resend.emails.send({
        from: 'Defensa y Trabajo Web <onboarding@resend.dev>',
        to: emailTo,
        subject: `Nuevo contacto de ${nombre.trim()} - Defensa y Trabajo`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #12372a; padding: 30px; text-align: center;">
              <h1 style="color: #c9a66b; margin: 0;">Defensa y Trabajo</h1>
              <p style="color: #fff; margin: 5px 0 0;">Nuevo contacto desde la web</p>
            </div>
            <div style="padding: 30px; background: #f6f7f8;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px; font-weight: bold; color: #12372a;">Nombre</td><td style="padding: 10px;">${nombre.trim()}</td></tr>
                <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #12372a;">Email</td><td style="padding: 10px;">${email.trim()}</td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #12372a;">Teléfono</td><td style="padding: 10px;">${telefono?.trim() || '—'}</td></tr>
                <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #12372a;">Área</td><td style="padding: 10px;">${area?.trim() || '—'}</td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #12372a;">Mensaje</td><td style="padding: 10px; white-space: pre-wrap;">${mensaje.trim()}</td></tr>
                <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #12372a;">Fecha</td><td style="padding: 10px;">${fecha}</td></tr>
              </table>
            </div>
            <div style="background: #12372a; padding: 15px; text-align: center;">
              <p style="color: #f6f7f8; font-size: 12px; margin: 0;">Defensa y Trabajo - O'Higgins 940 Of. 407, Concepción</p>
            </div>
          </div>
        `
      });
    } catch (err) {
      console.error('Resend error:', err.message);
    }
  }

  return Response.json({ success: true });
}
