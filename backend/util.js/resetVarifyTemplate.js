const resetVerifyTemplate = ({ name, otp }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; color: #333;">
    <h2 style="color: #007bff;">Hello ${name},</h2>
    <p>You requested to reset your password. Use the OTP below to proceed:</p>
    <h3 style="color: #ff4500; font-size: 22px;">${otp}</h3>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Thanks,<br>Your Company Team</p>
  </div>
`;

export default resetVerifyTemplate;
