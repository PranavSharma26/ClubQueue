import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const payload = {
      sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email }],
      subject: "Your One-Time Password (OTP) for Verification",
      htmlContent: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Hello,</h2>
    <p>Thank you for using our service. To proceed with your request, please use the following One-Time Password (OTP) to verify your identity:</p>
    <p style="font-size: 18px;">Your OTP is: <strong>${otp}</strong></p>
    <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share this code with anyone for security reasons.</p>
    <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
    <br />
    <p>Best regards,<br /><strong>The Support Team</strong></p>
  </div>
`,
    };

    const headers = {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      { headers }
    );

    res.status(200).json({
      message: "OTP email sent successfully",
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Error sending OTP email:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to send OTP email",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
