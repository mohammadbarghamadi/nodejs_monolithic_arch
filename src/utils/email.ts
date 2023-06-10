import nodemailer from "nodemailer";
import config from 'config'

export interface MailToOptions {
    to: string, subject: string, html: string
}

const mailTo = async (options: MailToOptions): Promise<string> => {

    const transporter = nodemailer.createTransport({
        host: config.get<string>('serverMail'),
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: { rejectUnauthorized: false },
        auth: {
            user: config.get<string>('mailUser'),
            pass: config.get<string>('mailPass')
        },
    });

    const { to, subject, html } = options
    const info = await transporter.sendMail({ from: config.get('emailAddress'), to, subject, html });
    return info.response
}

export default mailTo