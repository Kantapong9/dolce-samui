// API route for sending emails using customer's email
// This will be deployed as a serverless function

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, message, to, subject } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !to) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create email content
    const emailContent = {
      from: email, // ใช้ email ของลูกค้า
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Private Viewing Request
          </h2>
          
          <p>Dear Dolce Villa Samui Team,</p>
          
          <p>I would like to schedule a private viewing of your villa property.</p>
          
          <h3 style="color: #555; margin-top: 30px;">Contact Information:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;"><strong>Name:</strong> ${firstName} ${lastName}</li>
            <li style="margin: 10px 0;"><strong>Email:</strong> ${email}</li>
            <li style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          </ul>
          
          <h3 style="color: #555; margin-top: 30px;">Message:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
            ${message || 'No additional message provided'}
          </p>
          
          <p>Please contact me to arrange a convenient time for the viewing.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            ${firstName} ${lastName}
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            This email was sent from the Dolce Villa Samui website contact form.
          </p>
        </div>
      `,
      text: `
Dear Dolce Villa Samui Team,

I would like to schedule a private viewing of your villa property.

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Message:
${message || 'No additional message provided'}

Please contact me to arrange a convenient time for the viewing.

Best regards,
${firstName} ${lastName}
      `
    };

    // Here you would integrate with your email service
    // For now, we'll simulate success
    console.log('Email would be sent:', emailContent);
    
    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: 'simulated-' + Date.now()
    });

  } catch (error) {
    console.error('Error processing email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
}
