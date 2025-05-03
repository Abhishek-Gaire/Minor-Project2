import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Define the type for mail options
interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASSWORD, // The 16-character app password
  },
});

function createMailOptions(
  recipient: string,
  subject: string,
  html: string
): MailOptions {
  const mailOptions: MailOptions = {
    from: process.env.GMAIL_USER, // Sender address
    to: recipient, // Recipient address
    subject: subject, // Subject line
    html: html, // HTML body
  };

  return mailOptions;
}

// Function to send the email
async function sendEmail(mailOptions: MailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}

export { createMailOptions, sendEmail };
