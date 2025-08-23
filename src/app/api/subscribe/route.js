// app/api/subscribe/route.js
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
		const { email } = body;

		// Validate required fields
		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Please enter a valid email address" },
				{ status: 400 }
			);
		}

		// Email content for administrators
		const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New Newsletter Subscription</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #007bff; margin-top: 0;">Subscription Details:</h3>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Source:</strong> MumWorld Website Subscription Form</p>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 12px;">This notification was sent from the MumWorld newsletter subscription form.</p>
            </div>
        `;

		// Welcome email for the subscriber
		const welcomeEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to MumWorld Newsletter!</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <p style="font-size: 16px; color: #333;">Thank you for subscribing to our newsletter!</p>
                    <p>You'll now receive updates about:</p>
                    <ul style="color: #666;">
                        <li>Pregnancy journey tips and guidance</li>
                        <li>Motherhood support and advice</li>
                        <li>Baby care dos and don'ts</li>
                        <li>Latest blog posts and articles</li>
                    </ul>
                    <p style="color: #666;">We're excited to have you as part of our community!</p>
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 12px;">
                    You received this email because you subscribed to MumWorld newsletter. 
                    If you didn't subscribe, please ignore this email.
                </p>
            </div>
        `;

		// Send notification to administrators
		const adminMailOptions = {
			from: '"MumWorld Newsletter" <noreply@mumworld.in>',
			to: "abhijeet@drupaltechie.com, mumworld.in@gmail.com",
			subject: `New Newsletter Subscription - ${email}`,
			html: emailHtml,
		};

		// Send welcome email to subscriber
		const welcomeMailOptions = {
			from: '"MumWorld Newsletter" <noreply@mumworld.in>',
			to: email,
			subject: "Welcome to MumWorld Newsletter!",
			html: welcomeEmailHtml,
		};

		// Send both emails
		const [adminEmailInfo, welcomeEmailInfo] = await Promise.all([
			transport.sendMail(adminMailOptions),
			transport.sendMail(welcomeMailOptions),
		]);

		console.log("Admin notification sent:", adminEmailInfo.messageId);
		console.log("Welcome email sent:", welcomeEmailInfo.messageId);

		return NextResponse.json(
			{
				success: true,
				message: "Successfully subscribed! Check your email for confirmation.",
				adminMessageId: adminEmailInfo.messageId,
				welcomeMessageId: welcomeEmailInfo.messageId,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing subscription:", error);

		return NextResponse.json(
			{
				error: "Failed to subscribe",
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
			message: "Subscription API is running",
			endpoints: {
				POST: "/api/subscribe - Subscribe with body: { email }",
			},
		},
		{ status: 200 }
	);
}
