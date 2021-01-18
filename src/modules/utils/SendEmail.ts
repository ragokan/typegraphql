import nodemailer from "nodemailer";

export async function SendEmail(targetMail: string, mailUrl: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.mailerEmail,
        pass: process.env.mailerPassword,
      },
    });

    const info = await transporter.sendMail({
      from: `"Typegraphql 👻" <${process.env.mailerEmail}>`,
      to: targetMail,
      subject: "Email Validation ✔",
      text: "Something",
      html: `<a href="${mailUrl}">Please click here to validate your email.</a>`,
    });
  } catch (error) {
    throw new Error(error);
  }
}
