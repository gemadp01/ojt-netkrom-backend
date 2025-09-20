import { sendEmail } from "../lib/mail.js";
import { validationResult } from "express-validator";
import Contact from "../models/Contact.js";

export const sendContactMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, category, subject, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      category,
      subject,
      message,
    });
    await newContact.save();

    // Email admin (HTML + Tailwind)
    const adminHtml = `
			<div style="padding:32px; font-family:sans-serif; background-color:#f3f4f6;">
				<div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:24px; box-shadow:0 4px 6px rgba(0,0,0,0.1); overflow:hidden;">
					<div style="padding:24px;">
						<h2 style="font-size:24px; font-weight:bold; color:#111827; margin-bottom:8px;">New Contact Message</h2>
						<span style="display:inline-block; background-color:#dbeafe; color:#1d4ed8; font-size:12px; font-weight:600; padding:4px 12px; border-radius:9999px; margin-bottom:16px;">${category}</span>
						<div style="margin-bottom:16px; color:#374151; line-height:1.5;">
							<p><strong>Name:</strong> ${name}</p>
							<p><strong>Email:</strong> ${email}</p>
							<p><strong>Phone:</strong> ${phone}</p>
							<p><strong>Subject:</strong> ${subject}</p>
						</div>
						<div style="margin-top:16px; padding:16px; background-color:#f9fafb; border-left:4px solid #3b82f6; border-radius:8px; color:#111827; line-height:1.5;">
							${message}
						</div>
					</div>
					<div style="padding:16px; background-color:#f3f4f6; text-align:center; color:#6b7280; font-size:12px;">
						This message was sent via your contact form
					</div>
				</div>
			</div>
		`;

    // Email user (konfirmasi)
    const userHtml = `
      <div style="font-family: sans-serif; padding: 16px; background: #f3f4f6;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="font-size: 20px; font-weight: bold; color: #111827;">Hi ${name},</h2>
          <p>Thank you for contacting us! We'll get back to you soon.</p>
          <p style="margin-top: 16px; font-weight: bold;">Your message:</p>
          <blockquote style="background: #f9fafb; border-left: 4px solid #3b82f6; padding: 12px; color: #111827;">${message}</blockquote>
        </div>
      </div>
    `;

    // Kirim email secara parallel
    await Promise.all([
      sendEmail({
        to: process.env.GMAIL_RECEIVER,
        subject: `[${category}] ${subject}`,
        html: adminHtml,
      }),
      sendEmail({
        to: email,
        subject: "Thank you for contacting us!",
        html: userHtml,
      }),
    ]);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send message." });
  }
};
