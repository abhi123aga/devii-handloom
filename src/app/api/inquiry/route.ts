import { NextResponse } from "next/server";
import { Resend } from "resend";
import { auth } from "@clerk/nextjs/server";
import { saveInquiry } from "@/db/queries";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(request: Request) {
  try {
    const { name, email, phone, saree, message, channel } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { userId } = await auth();

    // Save submission to database
    await saveInquiry({
      name,
      email,
      phone,
      sareeName: saree,
      message,
      channel,
      userId: userId || undefined,
    });

    const destinationEmail = process.env.NOTIFICATION_EMAIL || "contact@deviihandloom.in";
    
    // Simulate email in development/local testing if key is absent
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_dummy_key") {
      console.log("📧 Simulating Email Dispatch (RESEND_API_KEY is not set):", {
        to: destinationEmail,
        subject: `New Saree Inquiry: ${saree || "General Handlooms"}`,
        body: { name, email, phone, saree, message, channel }
      });
      return NextResponse.json({ success: true, mock: true });
    }

    // Dispatch via Resend (using your verified custom domain)
    const data = await resend.emails.send({
      from: "Devii Handlooms <contact@deviihandloom.in>",
      to: [destinationEmail],
      replyTo: email,
      subject: `[Devii Saree Inquiry] From ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 6px;">
          <h2 style="color: #b5892c; font-family: serif; border-bottom: 2px solid #b5892c; padding-bottom: 8px; margin-top: 0;">New Saree Inquiry</h2>
          <p style="margin-top: 20px; font-size: 14px;">You have received a new artisan customer request from your Devii website:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 160px; border-bottom: 1px solid #f3f4f6;">Customer Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email Address:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}" style="color: #b5892c; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">WhatsApp/Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Saree of Interest:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #b5892c; font-weight: bold;">${saree || "General Handlooms Showcase"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Preferred Channel:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; font-weight: bold;">${channel}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; background-color: #f9fafb; padding: 18px; border-left: 4px solid #b5892c; font-style: italic; border-radius: 4px; font-size: 14px; line-height: 1.6;">
            <strong>Customer Message:</strong><br/>
            ${message.replace(/\n/g, "<br/>")}
          </div>
          <p style="margin-top: 36px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 15px; margin-bottom: 0;">
            This email was securely delivered by the Devii Showcase contact integration.
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
