import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const adminTemplate = ({
    name,
    email,
    company,
    projectType,
    budget,
    message,
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background:#0a0a0a;
      color:#ffffff;
      font-family: Helvetica, Arial, sans-serif;
      padding:40px;
    }
    .card {
      max-width:620px;
      margin:auto;
      border:1px solid #1f1f1f;
      padding:40px;
    }
    h1 {
      font-size:28px;
      margin-bottom:30px;
    }
    .row {
      margin-bottom:14px;
    }
    .label {
      opacity:0.6;
      font-size:12px;
      text-transform:uppercase;
      letter-spacing:1px;
    }
    .value {
      font-size:16px;
      margin-top:4px;
    }
    .divider {
      height:1px;
      background:#1f1f1f;
      margin:30px 0;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>New Project Enquiry</h1>

    <div class="row">
      <div class="label">Client Name</div>
      <div class="value">${name}</div>
    </div>

    <div class="row">
      <div class="label">Email</div>
      <div class="value">${email}</div>
    </div>

    <div class="row">
      <div class="label">Company</div>
      <div class="value">${company || "—"}</div>
    </div>

    <div class="row">
      <div class="label">Project Type</div>
      <div class="value">${projectType}</div>
    </div>

    <div class="row">
      <div class="label">Budget</div>
      <div class="value">${budget}</div>
    </div>

    <div class="divider"></div>

    <div class="row">
      <div class="label">Project Brief</div>
      <div class="value">${message}</div>
    </div>
  </div>
</body>
</html>
`;


const userTemplate = ({ name }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background:#ffffff;
      color:#000000;
      font-family: Helvetica, Arial, sans-serif;
      padding:40px;
    }
    .card {
      max-width:600px;
      margin:auto;
      border:1px solid #eaeaea;
      padding:40px;
    }
    h1 {
      font-size:26px;
      margin-bottom:20px;
    }
    p {
      font-size:16px;
      line-height:1.6;
    }
    .footer {
      margin-top:40px;
      font-size:14px;
      opacity:0.6;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>Hello ${name},</h1>

    <p>
      Thank you for reaching out to <strong>NR Studio</strong>.
      We’ve received your project enquiry and our team is already reviewing it.
    </p>

    <p>
      You can expect a response from us within <strong>24–48 hours</strong>.
    </p>

    <p>
      We’re excited about the possibility of working together.
    </p>

    <div class="footer">
      — NR Studio<br/>
      Crafting premium digital experiences
    </div>
  </div>
</body>
</html>
`;


export async function POST(req) {
    try {
        const {
            name,
            email,
            company,
            projectType,
            budget,
            message,
        } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // ✅ Gmail App Password Transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASS,
            },
        });

        // Admin Email
        await transporter.sendMail({
            from: `"NR Studio" <${process.env.SMTP_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🚀 New Project Enquiry — ${name}`,
            html: adminTemplate({
                name,
                email,
                company,
                projectType,
                budget,
                message,
            }),
        });

        // User Auto-reply
        await transporter.sendMail({
            from: `"NR Studio" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: "✨ We received your enquiry",
            html: userTemplate({ name }),
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("EMAIL ERROR:", err);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
