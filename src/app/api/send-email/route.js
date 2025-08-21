// app/api/send-email/route.js
import { NextResponse } from "next/server";
var nodemailer = require("nodemailer");

// Configure the email transporter
var transport = nodemailer.createTransport({
	host: "smtp.zeptomail.com",
	port: 587,
	auth: {
		user: "emailapikey",
		pass: "wSsVR60i+EWlDqZ6m2CududqkQhTBgzzQU8r2VOk737+T/vD/cc+xkCaUFKjGPFLQzM7F2EapO19y0wD0jsHj90ozFsIXCiF9mqRe1U4J3x17qnvhDzJW2xdmxKBL40MwA1pm2RiEcEn+g==",
	},
});

export async function POST(request) {
	try {
		const body = await request.json();
		const { name, email, message, subject } = body;

		// Validate required fields
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Name, email, and message are required" },
				{ status: 400 }
			);
		}

		// Email content for recipients
		const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #007bff; margin-top: 0;">Contact Details:</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${
											subject || "No subject provided"
										}</p>
                    
                    <h3 style="color: #007bff;">Message:</h3>
                    <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
                        ${message.replace(/\n/g, "<br>")}
                    </div>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 12px;">This email was sent from the MumWorld contact form.</p>
            </div>
        `;

		// Mail options for sending to both recipients
		var mailOptions = {
			from: '"MumWorld Contact Form" <noreply@mumworld.in>',
			to: "abhijeet@drupaltechie.com, sriti@madhulata.com",
			subject: `New Contact Form Submission: ${
				subject || "Message from " + name
			}`,
			html: emailHtml,
		};

		// Send the email
		const info = await transport.sendMail(mailOptions);

		console.log("Email sent successfully:", info.messageId);

		return NextResponse.json(
			{
				success: true,
				message: "Email sent successfully",
				messageId: info.messageId,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);

		return NextResponse.json(
			{
				error: "Failed to send email",
				details: error.message,
			},
			{ status: 500 }
		);
	}
}

// Optional: Add GET method to test if the API is working
export async function GET() {
	return NextResponse.json(
		{
			message: "Email API is running",
			endpoints: {
				POST: "/api/send-email - Send email with body: { name, email, message, subject }",
			},
		},
		{ status: 200 }
	);
}
