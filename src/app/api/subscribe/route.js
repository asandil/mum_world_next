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
        { status: 400 },
      );
    }

    // Email content for administrators
    const emailHtml = `
            <html
  lang="en-US"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title>New Newsletter Subscription</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: 1.6;
        margin: 0 0 10px 0;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 700px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }

      .section-title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e6e6e6;
      }

      .details-table {
        width: 100%;
        border-collapse: collapse;
      }

      .details-table tr {
        border-bottom: 1px solid #e6e6e6;
      }

      .details-table td {
        padding: 10px 0;
      }

      .details-table .label {
        color: #666;
        width: 40%;
      }

      .details-table .value {
        color: #232f3e;
        font-weight: bold;
        text-align: right;
      }
    </style>
  </head>

  <body
    class="body"
    style="
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #f5f5f5;
      "
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <!-- Header Section -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 30px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div
                              style="
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 12px;
                              "
                            >
                              <div style="max-width: 260px">
                                <img
                                  alt="MumWorld Logo"
                                  height="auto"
                                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1766166906/lcsvrxwp43tsqaep2feu.png"
                                  style="
                                    display: block;
                                    height: auto;
                                    border: 0;
                                    width: 100%;
                                  "
                                  title="MumWorld Logo"
                                  width="200"
                                />
                              </div>
                            </div>
                            <div
                              style="
                                color: #333;
                                font-size: 20px;
                                font-weight: bold;
                                margin-bottom: 15px;
                              "
                            >
                              New Newsletter Subscription
                            </div>
                            <div
                              style="
                                color: #666;
                                font-size: 14px;
                                line-height: 1.6;
                              "
                            >
                              A new user has subscribed to the MumWorld
                              newsletter.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Details Section -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-3"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #ffffff;
                        color: #000000;
                        padding: 20px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div
                              style="
                                background-color: #f8f9fa;
                                padding: 20px;
                                border-radius: 8px;
                              "
                            >
                              <div class="section-title">
                                Subscription Details
                              </div>

                              <table class="details-table">
                                <tr>
                                  <td class="label">Email:</td>
                                  <td class="value">${email}</td>
                                </tr>
                                <tr>
                                  <td class="label">Subscription Date:</td>
                                  <td class="value">
                                    ${new Date().toLocaleString()}
                                  </td>
                                </tr>
                                <tr>
                                  <td class="label">Source:</td>
                                  <td class="value">MumWorld Website</td>
                                </tr>
                                <tr>
                                  <td class="label">Status:</td>
                                  <td class="value" style="color: #008a00">
                                    Active
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Footer -->
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-7"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #232f3e;
                        color: #ffffff;
                        padding: 30px 40px;
                        width: 680px;
                        margin: 0 auto;
                      "
                      width="680"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: center;
                              vertical-align: top;
                            "
                            width="100%"
                          >
                            <div
                              style="
                                color: #ffffff;
                                font-size: 14px;
                                line-height: 1.6;
                                text-align: center;
                              "
                            >
                              <p style="margin-bottom: 6px">
                                <a
                                  href="#"
                                  style="
                                    color: #ffffff;
                                    text-decoration: none;
                                    font-weight: bold;
                                    font-size: 16px;
                                  "
                                >
                                  Mumworld.in
                                </a>
                              </p>
                              <p
                                style="
                                  color: #cccccc;
                                  font-size: 12px;
                                  margin-bottom: 6px;
                                  line-height: 1.5;
                                "
                              >
                                Admin Notification System
                              </p>
                              <p
                                style="
                                  color: #cccccc;
                                  font-size: 12px;
                                  margin-bottom: 20px;
                                  line-height: 1.5;
                                "
                              >
                                This notification was sent from the MumWorld
                                newsletter subscription form.
                              </p>
                              <p
                                style="
                                  color: #cccccc;
                                  font-size: 12px;
                                  margin-bottom: 0;
                                  line-height: 1.5;
                                "
                              >
                                Copyright © mumworld.in - All Rights Reserved.
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
        `;

    // Welcome email for the subscriber
    const welcomeEmailHtml = `
					<html
						lang="en-US"
						xmlns:o="urn:schemas-microsoft-com:office:office"
						xmlns:v="urn:schemas-microsoft-com:vml"
						>
						<head>
							<title>Welcome to MumWorld Newsletter</title>
							<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
							<meta content="width=device-width, initial-scale=1.0" name="viewport" />
							<style>
								* {
									box-sizing: border-box;
								}

								body {
									margin: 0;
									padding: 0;
									background-color: #f5f5f5;
									font-family: Arial, sans-serif;
								}

								a[x-apple-data-detectors] {
									color: inherit !important;
									text-decoration: inherit !important;
								}

								#MessageViewBody a {
									color: inherit;
									text-decoration: none;
								}

								p {
									line-height: 1.6;
									margin: 0 0 10px 0;
								}

								.desktop_hide,
								.desktop_hide table {
									mso-hide: all;
									display: none;
									max-height: 0px;
									overflow: hidden;
								}

								.image_block img + div {
									display: none;
								}

								@media (max-width: 700px) {
									.desktop_hide table.icons-inner,
									.social_block.desktop_hide .social-table {
										display: inline-block !important;
									}

									.icons-inner {
										text-align: center;
									}

									.icons-inner td {
										margin: 0 auto;
									}

									.mobile_hide {
										display: none;
									}

									.row-content {
										width: 100% !important;
									}

									.stack .column {
										width: 100%;
										display: block;
									}

									.mobile_hide {
										min-height: 0;
										max-height: 0;
										max-width: 0;
										overflow: hidden;
										font-size: 0px;
									}

									.desktop_hide,
									.desktop_hide table {
										display: table !important;
										max-height: none !important;
									}
								}

								.section-title {
									color: #333;
									font-size: 18px;
									font-weight: bold;
									margin-bottom: 15px;
									padding-bottom: 8px;
									border-bottom: 1px solid #e6e6e6;
								}
							</style>
						</head>

						<body
							class="body"
							style="
								background-color: #f5f5f5;
								margin: 0;
								padding: 0;
								-webkit-text-size-adjust: none;
								text-size-adjust: none;
							"
						>
							<table
								border="0"
								cellpadding="0"
								cellspacing="0"
								class="nl-container"
								role="presentation"
								style="
									mso-table-lspace: 0pt;
									mso-table-rspace: 0pt;
									background-color: #f5f5f5;
								"
								width="100%"
							>
								<tbody>
									<tr>
										<td>
											<!-- Welcome Section -->
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row row-2"
												role="presentation"
												style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
												width="100%"
											>
												<tbody>
													<tr>
														<td>
															<table
																align="center"
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="row-content stack"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	background-color: #ffffff;
																	color: #000000;
																	padding: 30px 40px;
																	width: 680px;
																	margin: 0 auto;
																"
																width="680"
															>
																<tbody>
																	<tr>
																		<td
																			class="column column-1"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				font-weight: 400;
																				text-align: left;
																				vertical-align: top;
																			"
																			width="100%"
																		>
																			<div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
																				<div style="max-width: 260px">
																					<img
																						alt="MumWorld Logo"
																						height="auto"
																						src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1766166906/lcsvrxwp43tsqaep2feu.png"
																						style="
																							display: block;
																							height: auto;
																							border: 0;
																							width: 100%;
																						"
																						title="MumWorld Logo"
																						width="200"
																					/>
																				</div>
																			</div>
																			<div style="color: #333; font-size: 20px; font-weight: bold; margin-bottom: 15px;">
																				Welcome to MumWorld Newsletter!
																			</div>
																			<div style="color: #666; font-size: 14px; line-height: 1.6;">
																				Thank you for subscribing to our newsletter. We're excited to have you as part of our community!
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>

											<!-- Content Section -->
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row row-3"
												role="presentation"
												style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
												width="100%"
											>
												<tbody>
													<tr>
														<td>
															<table
																align="center"
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="row-content stack"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	background-color: #ffffff;
																	color: #000000;
																	padding: 20px 40px;
																	width: 680px;
																	margin: 0 auto;
																"
																width="680"
															>
																<tbody>
																	<tr>
																		<td
																			class="column column-1"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				font-weight: 400;
																				text-align: left;
																				vertical-align: top;
																			"
																			width="100%"
																		>
																			<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
																				<div class="section-title">What You'll Receive</div>
																				<p style="font-size: 16px; color: #333;">You'll now receive updates about:</p>
																				<ul style="color: #666; margin: 15px 0; padding-left: 20px;">
																					<li style="margin-bottom: 8px;">Pregnancy journey tips and guidance</li>
																					<li style="margin-bottom: 8px;">Motherhood support and advice</li>
																					<li style="margin-bottom: 8px;">Baby care dos and don'ts</li>
																					<li style="margin-bottom: 8px;">Latest blog posts and articles</li>
																				</ul>
																				<p style="color: #666;">We're excited to share this journey with you!</p>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>

											<!-- Footer -->
											<table
												align="center"
												border="0"
												cellpadding="0"
												cellspacing="0"
												class="row row-7"
												role="presentation"
												style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
												width="100%"
												>
												<tbody>
													<tr>
														<td>
															<table
																align="center"
																border="0"
																cellpadding="0"
																cellspacing="0"
																class="row-content stack"
																role="presentation"
																style="
																	mso-table-lspace: 0pt;
																	mso-table-rspace: 0pt;
																	background-color: #232f3e;
																	color: #ffffff;
																	padding: 30px 40px;
																	width: 680px;
																	margin: 0 auto;
																"
																width="680"
															>
																<tbody>
																	<tr>
																		<td
																			class="column column-1"
																			style="
																				mso-table-lspace: 0pt;
																				mso-table-rspace: 0pt;
																				font-weight: 400;
																				text-align: center;
																				vertical-align: top;
																			"
																			width="100%"
																		>
																			<div style="color: #ffffff; font-size: 14px; line-height: 1.6; text-align: center;">
																				<p style="margin-bottom: 6px;">
																					<a href="#" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
																						Mumworld.in
																					</a>
																				</p>
																				<p style="color: #cccccc; font-size: 12px; margin-bottom: 6px; line-height: 1.5;">
																					mumworld.in@gmail.com
																				</p>
																				<p style="color: #cccccc; font-size: 12px; margin-bottom: 20px; line-height: 1.5;">
																					You received this email because you subscribed to MumWorld newsletter. 
																					If you didn't subscribe, please ignore this email.
																				</p>
																				<p style="color: #cccccc; font-size: 12px; margin-bottom: 0; line-height: 1.5;">
																					Copyright © mumworld.in - All Rights Reserved.
																				</p>
																			</div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
						</body>
					</html>
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
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing subscription:", error);

    return NextResponse.json(
      {
        error: "Failed to subscribe",
        details: error.message,
      },
      { status: 500 },
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
    { status: 200 },
  );
}
