import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fernandaalzate165@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendAppointmentEmails = functions.firestore
  .document('mail/{docId}')
  .onCreate(async (snap, context) => {
    const mailData = snap.data();
    
    try {
      // Email to client
      await transporter.sendMail({
        from: '"Maria Fernanda Salud y Belleza" <fernandaalzate165@gmail.com>',
        to: mailData.to[0], // client email
        subject: 'Confirmación de tu Cita',
        html: `
          <h1>¡Gracias por agendar tu cita!</h1>
          <p>Hola ${mailData.template.data.clientName},</p>
          <p>Tu cita ha sido confirmada para:</p>
          <ul>
            <li>Servicio: ${mailData.template.data.serviceName}</li>
            <li>Fecha: ${mailData.template.data.date}</li>
            <li>Hora: ${mailData.template.data.time}</li>
            <li>Precio: ${new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(mailData.template.data.price)}</li>
          </ul>
          <p>Te esperamos en nuestra ubicación en Medellín.</p>
          <p>Si necesitas cambiar o cancelar tu cita, por favor contáctanos al +57 311 6763975.</p>
        `
      });

      // Email to business owner
      await transporter.sendMail({
        from: '"Sistema de Citas" <fernandaalzate165@gmail.com>',
        to: mailData.to[1], // business email
        subject: 'Nueva Cita Agendada',
        html: `
          <h1>Nueva Cita Agendada</h1>
          <p>Detalles de la cita:</p>
          <ul>
            <li>Cliente: ${mailData.template.data.clientName}</li>
            <li>Servicio: ${mailData.template.data.serviceName}</li>
            <li>Fecha: ${mailData.template.data.date}</li>
            <li>Hora: ${mailData.template.data.time}</li>
            <li>Precio: ${new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(mailData.template.data.price)}</li>
          </ul>
        `
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new functions.https.HttpsError('internal', 'Error sending email');
    }
  });