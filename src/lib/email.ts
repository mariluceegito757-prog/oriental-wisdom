import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM ?? "Oriental Wisdom <hello@orientalwisdom.com>";

export async function sendBookingConfirmation({
  to,
  name,
  consultationName,
  date,
  time,
  duration,
}: {
  to: string;
  name: string;
  consultationName: string;
  date: string;
  time: string;
  duration: number;
}) {
  if (!resend) {
    console.log("[email] Booking confirmation not sent (no API key):", { to, consultationName, date, time });
    return;
  }

  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: `Booking Confirmed: ${consultationName}`,
      html: `
        <div style="font-family:serif;max-width:560px;margin:0 auto;padding:48px 24px;background:#faf7f2;color:#1a1a1a">
          <h1 style="font-size:28px;color:#c41e3a;margin-bottom:24px">Oriental Wisdom</h1>
          <p>Dear ${name},</p>
          <p>Your consultation has been confirmed.</p>
          <div style="background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:24px;margin:24px 0">
            <h2 style="font-size:20px;margin-bottom:16px">${consultationName}</h2>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Duration:</strong> ${duration} minutes</p>
          </div>
          <p>A meeting link will be sent closer to the appointment date.</p>
          <p style="color:#4a4a4a;margin-top:32px">If you need to reschedule, please contact us.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send booking confirmation:", error);
  }
}
