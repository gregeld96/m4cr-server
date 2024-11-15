export const forgotPasswordTemplate = async ({
  url,
  email,
}: {
  url: string,
  email: string,
}) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password</title>
      <!-- Include CSS for Email Styling -->
      <style>
        /* CSS for email container */
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
    
        /* Style for company logo */
        .logo {
          max-width: 150px;
          display: block;
          margin: 0 auto;
        }
    
        /* Style for header title */
        .header-title {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-top: 24px;
        }
    
        /* Style for introduction content */
        .intro-content {
          font-size: 16px;
          margin-top: 24px;
        }
    
        /* Style for payment details */
        .section {
          font-size: 20px;
          padding: 10px;
          margin-top: 20px;
        }
    
        /* Style for closing content */
        .closing-content {
          font-size: 16px;
          margin-top: 8px;
        }
    
        /* Style for social media icons */
        .box-sosmed {
          text-align: center;
          margin-top: 20px;
        }
    
        .social-icon {
          width: 30px;
          height: 30px;
          margin: 0 5px;
        }
    
        /* Style for company name */
        .box-company {
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
        }
    
        /* Style for copyright */
        .box-copyright {
          font-size: 14px;
          text-align: center;
          margin-top: 10px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <!-- Email container -->
      <div class="container">
        <!-- Company logo -->
        <img src="cid:icon-logo" alt="Company Logo" class="logo">
        <!-- Header title -->
        <div class="header-title">Forgot Password Link</div>
        <!-- Introduction content -->
        <div class="intro-content">
          <p style="margin-bottom: 8px;">Ini adalah notifikasi untuk merubah password, untuk ${email}.</p>
          <div style="padding-block: 0px; text-align: center;">
            <p style="margin-top: 8px;">${url}</p>
          </div>  
        </div>
        <!-- Closing content -->
        <div class="closing-content">
            <p>Jika anda merasa tidak melakukan permintaan ini silahkan mengabaikan email ini</p>
            <p style="margin-top: 0;">Salam hangat,</p>
            <p style="margin-top: -16px;">M4CR Team</p>
        </div>
        <!-- Social media icons -->
        <div class="box-sosmed">
          <a href="${process.env.URL_IG}" target="_blank">
            <img src="cid:icon-ig" alt="Instagram" class="social-icon">
          </a>
        </div>
        <!-- Company name -->
        <div class="box-company">m4cr.com</div>
        <!-- Copyright -->
        <div class="box-copyright">&copy; 2024</div>
      </div>
    </body>
  </html>`;
};