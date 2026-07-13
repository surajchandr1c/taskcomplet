import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "surajkurmar731974@gmail.com";

    // If SMTP_USER or SMTP_PASS are missing, we cannot actually send an email,
    // so we log it and inform the client.
    if (!smtpUser || !smtpPass) {
      console.warn("SMTP_USER or SMTP_PASS environment variables are not set.");
      console.log("Contact form submission logged to console:");
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Message: ${message}`);
      
      return NextResponse.json({
        success: true,
        warning: "SMTP credentials not configured. Please add SMTP_USER and SMTP_PASS to your .env file.",
        message: "Message received (development/simulation mode)."
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for others (e.g. 587)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // To prevent spam filters from rejecting, 'from' is SMTP_USER
      replyTo: email, // replyTo is set to the user's email
      to: recipientEmail,
      subject: `[TaskComplet] New message from ${name}`,
      text: `You have received a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #2563eb; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280; text-align: center;">Sent from TaskComplet About Us Page</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: unknown) {
    console.error("Contact API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
