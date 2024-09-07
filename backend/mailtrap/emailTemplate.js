export const VERIFY_EMAIL_TEMPLATE =`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>

`

export const RESET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #51545e;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    table {
      border-spacing: 0;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    .email-container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      font-size: 24px;
      color: #333333;
      margin: 0;
    }
    .content {
      text-align: center;
    }
    .content p {
      font-size: 16px;
      color: #51545e;
      margin-bottom: 20px;
    }
    .reset-btn {
      display: inline-block;
      background-color: #e63946;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      font-size: 16px;
    }
    .reset-btn:hover {
      background-color: #d62839;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      padding-top: 20px;
    }
    .footer p {
      margin: 0;
    }
    @media only screen and (max-width: 600px) {
      .reset-btn {
        width: 100%;
        display: block;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" class="email-container">
    <tr>
      <td class="header">
        <h1>Reset Your Password</h1>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to proceed.</p>
        <a href="https://example.com/reset-password" class="reset-btn">Reset Password</a>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>If you did not request a password reset, please ignore this email or contact support if you have any concerns.</p>
      </td>
    </tr>
    <tr>
      <!--<td class="footer">-->
      <!--  <p>If you’re having trouble clicking the button, copy and paste the following URL into your browser:</p>-->
      <!--  <p><a href="https://example.com/reset-password" style="color: #e63946; text-decoration: none;">https://example.com/reset-password</a></p>-->
      <!--  <p>&copy; 2024 Your Company. All rights reserved.</p>-->
      <!--</td>-->
    </tr>
  </table>
</body>
</html>

`

export const PASSWORD_RESET_SUCCESS_TEMPLATE=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      color: #51545e;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    table {
      border-spacing: 0;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    .email-container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      font-size: 24px;
      color: #333333;
      margin: 0;
    }
    .content {
      text-align: center;
    }
    .content p {
      font-size: 16px;
      color: #51545e;
      margin-bottom: 20px;
    }
    .success-icon {
      font-size: 50px;
      color: #28a745;
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      padding-top: 20px;
    }
    .footer p {
      margin: 0;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .content p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" class="email-container">
    <tr>
      <td class="header">
        <h1>Password Reset Successful</h1>
      </td>
    </tr>
    <tr>
      <td class="content">
        <div class="success-icon">✔️</div>
        <p>Hello,</p>
        <p>Your password has been successfully reset. You can now log in with your new password.</p>
        <p>If you did not make this change, please <a href="https://example.com/support">contact our support team</a> immediately.</p>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p>&copy; 2024 Auth-System. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`
export const WELCOME_TEMPLATE=`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Application</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      color: #333;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      font-size: 28px;
      color: #333;
      margin: 0;
    }
    .header p {
      font-size: 18px;
      color: #555;
    }
    .content {
      text-align: center;
      margin-bottom: 30px;
    }
    .content p {
      font-size: 16px;
      color: #51545e;
    }
    .welcome-gif {
      width: 100%;
      max-width: 400px;
      border-radius: 10px;
      margin: 0 auto;
    }
    .cta-btn {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 14px 30px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s, transform 0.3s;
    }
    .cta-btn:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }
    .cta-btn:active {
      transform: scale(0.98);
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      padding-top: 20px;
    }
    .footer p {
      margin: 0;
    }
  </style>
</head>
<body>
  <table role="presentation" class="email-container">
    <tr>
      <td class="header">
        <h1>Welcome to Our Application!</h1>
        <p>We’re excited to have you on board</p>
      </td>
    </tr>
    <tr>
      <td class="content">
        <p>You're now part of an amazing community! To get started, click the button below and explore what we have to offer.</p>
        <img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="Welcome Gif" class="welcome-gif">
        <br>
        <a href=#{websiteLink} class="cta-btn">Get Started</a>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p>If you have any questions, feel free to reach out to us at any time. We're here to help!</p>
        <p>&copy; 2024 Auth-System. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>

`
