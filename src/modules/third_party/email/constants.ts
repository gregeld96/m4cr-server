require('dotenv').config();

export default {
  confirmEmails: {
    from: `NO-REPLY, M4CR <${process.env.EMAIL_SMTP_USERNAME}>`,
  },
  attachmentsEmails: [
    {
      filename: 'social-media-instagram.png',
      path: `${process.env.BASE_URL_FILE}asset/social-media-instagram.png`,
      cid: 'icon-ig',
    },
    {
      filename: 'logo.png',
      path: `${process.env.BASE_URL_FILE}asset/logo.jpeg`,
      cid: 'icon-logo',
    },
  ],
};
