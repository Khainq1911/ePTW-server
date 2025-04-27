export const permitRequestTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Permit Request Submitted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            font-size: 16px;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Permit Request Submitted</h1>
        <p>Hello {{name}},</p>
        <p>We have received your permit request and it is currently under review. You will be notified once a decision has been made.</p>
        <p>You can check the status of your request by clicking the button below:</p>
        <a href="{{statusLink}}" class="button">Check Status</a>
        <p>If you have any questions, please contact our support team.</p>
        <p class="footer">Best regards</p>
    </div>
</body>
</html>`;

export const permitUpdateTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .status {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
      margin: 12px 0;
    }
    .footer {
      margin-top: 32px;
      font-size: 14px;
      color: #666;
    }
    .highlight {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">📝 Permit Status Update (Permit ID: {{permitId}})</div>

    <p>Dear {{name}},</p>

    <p>We would like to inform you that the status of your permit application (ID: <span class="highlight">{{permitId}}</span>) has been updated.</p>

    <p class="status">🔄 Updated Status: {{status}}</p>

    <p>
      <span class="highlight">Reason:</span> {{reason}}
    </p>

    <p>If you have any questions or require further clarification, feel free to reach out to our team.</p>

    <p>Thank you for your attention.</p>

    <div class="footer">
      Best regards,<br />
      Permit Management Team
    </div>
  </div>
</body>
</html>
`;


export const responseReviseTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
      color: #28a745;
    }
    .message {
      font-size: 16px;
      margin: 16px 0;
    }
    .highlight {
      font-weight: bold;
    }
    .footer {
      margin-top: 32px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">✅ Permit Revision Submitted (Permit ID: {{permitId}})</div>

    <p>Dear Admin,</p>

    <p class="message">
      The worker <span class="highlight">{{sender}}</span> has completed the requested revisions for the permit (ID: <span class="highlight">{{permitId}}</span>).
    </p>

    <p class="message">
      Please review the updated permit and proceed with the next steps in the approval process.
    </p>

    <p>Thank you for your coordination.</p>

    <div class="footer">
      Best regards,<br />
      Permit Management System
    </div>
  </div>
</body>
</html>
`