import { MailtrapClient } from "mailtrap";


export const mailTrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  endpoint:process.env.MAILTRAP_ENDPOINT
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "AUTH SYSTEM",
};
