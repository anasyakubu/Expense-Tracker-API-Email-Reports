const renderResetTokenMail = (resetToken: string) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Daily Invoice - Reset Your Password</title>
    <style type="text/css">
      /* Base styles */
      body {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f6f6f6;
      }

      /* Container */
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }

      /* Logo section */
      .logo-section {
        padding: 20px 30px;
        text-align: center;
        background-color: #f0f7ff;
      }

      .logo-section img {
        max-width: 180px;
        height: auto;
      }

      /* Content */
      .content {
        padding: 30px;
        text-align: center;
      }

      h1 {
        color: #1e88e5;
        margin-top: 0;
        font-size: 28px;
        text-align: center;
      }

      p {
        margin-bottom: 15px;
        font-size: 16px;
      }

      /* Notice section */
      .notice-section {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
        text-align: left;
      }

      .notice-title {
        color: #1e88e5;
        font-weight: bold;
        margin-bottom: 10px;
      }

      /* Call to action */
      .cta-button {
        display: inline-block;
        background-color: #1e88e5;
        color: #ffffff !important;
        padding: 12px 30px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 30px;
        text-align: center;
      }

      .cta-container {
        text-align: center;
      }

      /* Footer */
      .footer {
        background-color: #f0f7ff;
        padding: 20px 30px;
        text-align: center;
        font-size: 14px;
        color: #666;
      }

      .footer a {
        color: #1e88e5;
        text-decoration: none;
      }

      /* Responsive design */
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }

        .content {
          padding: 20px !important;
        }

        h1 {
          font-size: 24px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Logo Section -->
      <div class="logo-section">
        <img
          src="https://res.cloudinary.com/do52dpekr/image/upload/v1739627671/Logo-Dark_qibhcr.png"
          alt="Daily Invoice"
        />
      </div>

      <!-- Main Content -->
      <div class="content">
        <h1>Reset Your Password</h1>

        <p>Hello,</p>

        <p>
          We received a request to reset the password for your Daily Invoice
          account. To create a new password, click the button below:
        </p>

        <div class="cta-container">
          <a
            href="http://app.dailyinvoice.xyz/auth/reset-password/${resetToken}"
            class="cta-button"
            >Reset Password</a
          >
        </div>

        <div class="notice-section">
          <div class="notice-title">Important Security Notice:</div>
          <ul style="margin-top: 5px">
            <li>This password reset link will expire in 24 hours.</li>
            <li>
              If you didn't request a password reset, please ignore this email
              or contact support immediately.
            </li>
            <li>
              For security reasons, please create a strong password that you
              don't use on other websites.
            </li>
          </ul>
        </div>

        <p>
          Need help? Our support team is ready to assist you. Simply reply to
          this email or contact us at
          <a href="mailto:info.dailyinvoice@gmail.com" style="color: #1e88e5"
            >info.dailyinvoice@gmail.com</a
          >.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; 2025 Daily Invoice. All rights reserved.</p>
        <p>
          <a href="https://dailyinvoice.xyz">Visit Our Website</a> |
          <a href="#">Privacy Policy</a> |
          <a href="#">Terms of Service</a>
        </p>
      </div>
    </div>
  </body>
</html>

`;
};

export default renderResetTokenMail;
