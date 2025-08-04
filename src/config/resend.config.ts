import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class ResendConfig {
  private host: string; private secure: boolean; private port: number; private user: string;
  private pass: string;

  constructor() {
    this.host = "smtp.resend.com"; this.secure = true; this.port = 465; this.user = "resend";
    this.pass = process.env.RESEND_API_KEY || "";
  }

  // Method to create a transporter instance
  public getTransporter() {
    return nodemailer.createTransport({
      host: this.host, secure: this.secure, port: this.port,
      auth: { user: this.user, pass: this.pass, },
    });
  }
}

// Create instance of transporter
const resendMailer = new ResendConfig();
const transporter = resendMailer.getTransporter();

export default transporter;