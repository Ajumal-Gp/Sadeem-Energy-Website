/**
 * Sadeem Energy - Advanced Contact Form Processor
 * Version: 4.0 (Sadeem Energy Corporate Branding & Google Sheets Integration)
 * 
 * Instructions:
 * 1. Open Google Sheets (https://docs.google.com/spreadsheets/d/1GoHn8cLsPVUrwfj0m55u8eqN0gZFPAA1nfG71SVAq5Y)
 * 2. Go to Extensions -> Apps Script.
 * 3. Replace any existing code with this script.
 * 4. Click the Save icon (floppy disk).
 * 5. Click "Deploy" -> "New deployment".
 * 6. Under "Select type", select "Web app".
 * 7. Set "Execute as" to "Me (your-email@gmail.com)".
 * 8. Set "Who has access" to "Anyone" (crucial for public form submissions).
 * 9. Click "Deploy", authorize the permissions, and copy the generated Web App URL.
 */

const SPREADSHEET_ID = "1GoHn8cLsPVUrwfj0m55u8eqN0gZFPAA1nfG71SVAq5Y";
const COMPANY_RECEIVER_EMAIL = "info@sadeemenergy.com";

function doPost(e) {
  try {
    // 1. Log to the specific Spreadsheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0]; // Targets the first sheet (Sheet1)
    var params = e.parameter;
    
    // Safety check for empty parameters
    var name = params.name || "N/A";
    var email = params.email || "N/A";
    var phone = params.phone || "N/A";
    var subject = params.subject || "N/A";
    var message = params.message || "N/A";

    sheet.appendRow([
      new Date(), 
      name, 
      email, 
      phone, 
      subject, 
      message
    ]);
    
    // --- BRANDING CONFIG ---
    // Sadeem Energy Primary Deep Navy and Secondary Gold
    var primaryColor = "#003366";   
    var secondaryColor = "#FFB81C"; 
    
    // Stylized HTML Header Logo fallback in case image URL is omitted
    var headerHtml = `
      <div style="background: linear-gradient(135deg, ${primaryColor} 0%, #002244 100%); padding: 30px; text-align: center; border-bottom: 4px solid ${secondaryColor};">
        <h1 style="color: white; margin: 0; font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 24px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">SADEEM ENERGY</h1>
        <p style="color: ${secondaryColor}; margin: 5px 0 0 0; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;">Sustainable · Dependable · Nuclear</p>
      </div>
    `;

    // 2. TEMPLATE FOR COMPANY (Receiver Side)
    var companyHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        ${headerHtml}
        <div style="padding: 40px;">
          <h2 style="color: ${primaryColor}; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 25px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px;">New Inquiry Received</h2>
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid #f3f4f6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 15px; color: #6b7280; font-size: 13px; font-weight: 600; width: 120px; text-transform: uppercase; letter-spacing: 0.05em;">Sender Name</td>
                <td style="padding-bottom: 15px; font-weight: 700; color: #111827; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 15px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding-bottom: 15px; font-weight: 700; color: ${primaryColor}; font-size: 15px;"><a href="mailto:${email}" style="color: ${primaryColor}; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding-bottom: 15px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td>
                <td style="padding-bottom: 15px; font-weight: 700; color: #111827; font-size: 15px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding-bottom: 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td>
                <td style="padding-bottom: 0; font-weight: 700; color: #111827; font-size: 15px;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 15px; text-transform: uppercase;">Message Content</p>
          <div style="color: #374151; line-height: 1.7; border-left: 4px solid ${secondaryColor}; padding-left: 20px; font-size: 15px; background-color: #fcfcfc; padding-top: 10px; padding-bottom: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 11px; border-top: 1px solid #f3f4f6; font-weight: 500;">
          © ${new Date().getFullYear()} Sadeem Energy. All rights reserved.
        </div>
      </div>
    `;

    // 3. TEMPLATE FOR USER (Sender Side - Confirmation)
    var userHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        ${headerHtml}
        <div style="padding: 45px; text-align: center;">
          <div style="color: ${primaryColor}; font-size: 13px; font-weight: 700; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 0.1em;">Inquiry Received</div>
          <h2 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 20px; font-family: 'Plus Jakarta Sans', sans-serif;">Dear ${name},</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">
            Thank you for reaching out to <strong>Sadeem Energy</strong>. We have received your inquiry regarding <strong>${subject}</strong>.
          </p>
          
          <div style="background-color: #fcf8e3; border: 1px dashed ${secondaryColor}; color: #8a6d3b; padding: 18px; border-radius: 10px; font-size: 14px; margin-bottom: 35px; text-align: left; font-weight: 500;">
            <strong style="color: ${primaryColor};">Next Steps:</strong>
            <ul style="margin: 8px 0 0 16px; padding: 0; line-height: 1.5;">
              <li>Our strategic advisory team is reviewing your message.</li>
              <li>A representative will reach back to you at <strong>${email}</strong>.</li>
              <li>Typical response window is <strong>24 business hours</strong>.</li>
            </ul>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; line-height: 1.5;">
            This is an automated confirmation of receipt. Please do not reply directly to this email.
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #f3f4f6;">
          <p style="color: #111827; font-size: 14px; font-weight: 700; margin-bottom: 5px;">Sadeem Energy</p>
          <p style="color: #6b7280; font-size: 12px; margin-bottom: 15px;">Dubai, Deira, Al Qaizi Building, Office 202B</p>
          <div style="font-size: 13px;">
            <a href="https://sadeemenergy.com" style="color: ${primaryColor}; text-decoration: none; font-weight: 700; border-bottom: 2px solid ${secondaryColor}; padding-bottom: 2px;">Visit Our Website</a>
          </div>
        </div>
      </div>
    `;

    // --- SEND EMAILS ---
    
    // To Company (Lead Notification)
    MailApp.sendEmail({
      to: COMPANY_RECEIVER_EMAIL,
      subject: "Priority Lead: " + name + " [" + subject + "]",
      htmlBody: companyHtml
    });
    
    // To User (Acknowledgment / Confirmation)
    if (email && email !== "N/A" && email.indexOf("@") !== -1) {
      MailApp.sendEmail({
        to: email,
        subject: "Thank you for contacting Sadeem Energy",
        htmlBody: userHtml
      });
    }

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
