export const permitRequestSource = `<!DOCTYPE html>
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
