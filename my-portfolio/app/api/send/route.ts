import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inizializza Resend con la chiave segreta salvata nel file .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Riceviamo i dati dal form
    const body = await request.json();
    const { nome, cognome, email, prefisso, telefono, informazioni } = body;

    // Creiamo e inviamo l'email
    const data = await resend.emails.send({
      from: 'Forge Sito Web <noreply@forgebuildyourstrength.com>', // Resend usa questa mail di default per i test
      to: ['info@forgebuildyourstrength.com'], // La mail dove vuoi RICEVERE i messaggi
      subject: `Nuova richiesta da ${nome} ${cognome} - FORGE`,
      html: `
        <div style="font-family: sans-serif; color: #171717;">
          <h2 style="color: #FF4000;">Nuova richiesta - Offerta FORGE</h2>
          <p><strong>Nome:</strong> ${nome} ${cognome}</p>
          <p><strong>Email Cliente:</strong> ${email}</p>
          <p><strong>Telefono:</strong> ${prefisso} ${telefono}</p>
          <br/>
          <p><strong>Informazioni richieste:</strong></p>
          <p style="padding: 12px; background-color: #f5f5f5; border-radius: 8px;">
            ${informazioni}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Errore durante l\'invio' }, { status: 500 });
  }
}