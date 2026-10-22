import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, cognome, email, prefisso, telefono, categoria, note } = body;

    const data = await resend.emails.send({
      from: 'Forge Games <noreply@forgebuildyourstrength.com>',
      to: ['info@forgebuildyourstrength.com'],
      subject: `ISCRIZIONE FORGE GAMES - ${nome} ${cognome}`,
      html: `
        <div style="font-family: sans-serif; color: #171717;">
          <h2 style="color: #FF4000;">Nuova iscrizione - FORGE GAMES 1ª Edizione</h2>
          <p><strong>Nome:</strong> ${nome} ${cognome}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefono:</strong> ${prefisso} ${telefono}</p>
          <p><strong>Categoria:</strong> ${categoria}</p>
          ${
            note
              ? `<br/><p><strong>Note:</strong></p>
                 <p style="padding: 12px; background-color: #f5f5f5; border-radius: 8px;">${note}</p>`
              : ''
          }
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Errore durante l\'invio' }, { status: 500 });
  }
}
