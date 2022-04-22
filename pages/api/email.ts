import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';
import striptags from 'striptags';
import axios from 'axios';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAUTH2',
    user: process.env.REACT_APP_EMAIL,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

async function validateCaptcha(responseKey: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
  const url = new URL('https://www.google.com/recaptcha/api/siteverify');
  url.searchParams.append('secret', secretKey);
  url.searchParams.append('response', responseKey);
  const res = await axios.post(url.href);
  return res.data.success;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(404).end();
  if (!req.body) return res.status(400).end();
  const {
    name,
    email,
    message,
    recaptchaToken,
  } = req.body;
  const isValidRecaptcha = await validateCaptcha(recaptchaToken);
  if (!isValidRecaptcha) {
    return res.status(403).send('Recaptcha is invalid');
  }
  const sanitizedMessage = striptags(message);

  const mailOptions = {
    from: process.env.TRANSPORTER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: `New porftolio message from ${name}, email:${email}.`,
    html: `${sanitizedMessage}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json(info);
  } catch (err) {
    return res.status(500).json(err);
  }
}
