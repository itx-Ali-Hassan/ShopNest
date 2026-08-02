const { Resend } = require('resend')
require('dotenv').config()

const resend = new Resend(process.env.RESEND_KEY)

const sendEmail = async (email, subject, message) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject,
    html: message,
  });
  if (error) return console.error({ error })
  console.log(data);
}

module.exports = sendEmail