import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Ecommerce <onboarding@resend.dev>",
      to: sendTo, // Must be an array
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("❌ Error sending email:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("❌ Exception:", err);
    return null;
  }
};

// Export function
export default sendEmail;
