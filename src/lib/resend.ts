import { Resend } from 'resend';

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------

const apiKey = process.env.RESEND_API_KEY || 're_mock_placeholder_key';
const resend = new Resend(apiKey);

const FROM_ADDRESS =
  process.env.EMAIL_FROM ?? 'Royal Blue Heaven <noreply@royalbluehaven.com>';

const HOTEL_WEBSITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://royalbluehaven.com';

// ---------------------------------------------------------------------------
// Brand colours
// ---------------------------------------------------------------------------
const ROYAL_BLUE = '#1A3FA3';
const GOLD = '#C9A24B';
const BG = '#F8F6F0';
const TEXT = '#1A1A1A';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export interface BookingWithDetails {
  bookingCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  rooms: { roomTypeName: string; roomNumber?: string; quantity: number }[];
  totalAmount: number;
  currency?: string;
  paymentStatus: string;
  specialRequests?: string;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Royal Blue Heaven</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};font-family:'Georgia',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BG};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
               style="max-width:600px;width:100%;background:#fff;border-radius:8px;
                      box-shadow:0 2px 12px rgba(26,63,163,0.08);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:${ROYAL_BLUE};padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;color:${GOLD};
                         text-transform:uppercase;font-family:Arial,sans-serif;">The Exclusive</p>
              <h1 style="margin:8px 0 0;font-size:28px;color:#fff;font-weight:400;letter-spacing:1px;">
                Royal Blue Heaven
              </h1>
              <div style="width:48px;height:2px;background:${GOLD};margin:12px auto 0;"></div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px;color:${TEXT};font-size:15px;line-height:1.7;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f0ece4;padding:24px 40px;text-align:center;
                        border-top:1px solid #e5dfd3;">
              <p style="margin:0 0 6px;font-size:13px;color:#666;font-family:Arial,sans-serif;">
                © ${new Date().getFullYear()} Royal Blue Heaven. All rights reserved.
              </p>
              <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;">
                <a href="${HOTEL_WEBSITE}" style="color:${ROYAL_BLUE};text-decoration:none;">
                  ${HOTEL_WEBSITE}
                </a>
                &nbsp;|&nbsp;
                <a href="${HOTEL_WEBSITE}/privacy" style="color:${ROYAL_BLUE};text-decoration:none;">
                  Privacy Policy
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function goldDivider(): string {
  return `<div style="border-top:1px solid ${GOLD};margin:24px 0;"></div>`;
}

function infoRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 0;color:#777;font-family:Arial,sans-serif;
                  font-size:13px;vertical-align:top;width:40%;">${label}</td>
      <td style="padding:6px 0;font-weight:600;font-family:Arial,sans-serif;
                  font-size:13px;vertical-align:top;">${value}</td>
    </tr>`;
}

// ---------------------------------------------------------------------------
// Core send function
// ---------------------------------------------------------------------------

/**
 * Sends a transactional email via Resend.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailOptions): Promise<void> {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_mock_placeholder_key') {
    console.log(`[Resend Mock Email] To: ${to} | Subject: ${subject}`);
    return;
  }
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text: text ?? '',
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// Booking confirmation
// ---------------------------------------------------------------------------

/**
 * Sends a booking confirmation email to the guest.
 */
export async function sendBookingConfirmation(
  booking: BookingWithDetails
): Promise<void> {
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);

  const currency = booking.currency ?? 'INR';
  const amountFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(booking.totalAmount);

  const roomRows = booking.rooms
    .map(
      (r) =>
        `<li style="margin:4px 0;font-family:Arial,sans-serif;font-size:13px;">
          ${r.quantity}× ${r.roomTypeName}${r.roomNumber ? ` (Room ${r.roomNumber})` : ''}
         </li>`
    )
    .join('');

  const content = `
    <h2 style="margin:0 0 4px;color:${ROYAL_BLUE};font-size:22px;font-weight:400;">
      Booking Confirmed
    </h2>
    <p style="margin:0 0 24px;color:#555;font-family:Arial,sans-serif;font-size:14px;">
      Thank you, <strong>${booking.guestName}</strong>! Your reservation at Royal Blue Heaven
      has been confirmed.
    </p>

    ${goldDivider()}

    <p style="margin:0 0 12px;font-size:13px;color:#888;font-family:Arial,sans-serif;
               letter-spacing:1px;text-transform:uppercase;">Booking Summary</p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${infoRow('Booking Code', `<span style="color:${ROYAL_BLUE};font-size:16px;letter-spacing:1px;">${booking.bookingCode}</span>`)}
      ${infoRow('Check-in', fmt(booking.checkIn))}
      ${infoRow('Check-out', fmt(booking.checkOut))}
      ${infoRow('Duration', `${booking.nights} night${booking.nights !== 1 ? 's' : ''}`)}
      ${infoRow('Total Amount', amountFormatted)}
      ${infoRow('Payment Status', booking.paymentStatus)}
    </table>

    ${goldDivider()}

    <p style="margin:0 0 8px;font-size:13px;color:#888;font-family:Arial,sans-serif;
               letter-spacing:1px;text-transform:uppercase;">Rooms</p>
    <ul style="margin:0 0 24px;padding-left:18px;">${roomRows}</ul>

    ${
      booking.specialRequests
        ? `<p style="margin:0 0 8px;font-size:13px;color:#888;font-family:Arial,sans-serif;
                      letter-spacing:1px;text-transform:uppercase;">Special Requests</p>
           <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:13px;color:#555;">
             ${booking.specialRequests}
           </p>`
        : ''
    }

    ${goldDivider()}

    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#777;text-align:center;">
      Need help? Contact us at
      <a href="mailto:reservations@royalbluehaven.com"
         style="color:${ROYAL_BLUE};text-decoration:none;">
        reservations@royalbluehaven.com
      </a>
    </p>
  `;

  await sendEmail({
    to: booking.guestEmail,
    subject: `Booking Confirmed – ${booking.bookingCode} | Royal Blue Heaven`,
    html: emailWrapper(content),
    text: `Booking Confirmed!\nCode: ${booking.bookingCode}\nCheck-in: ${fmt(booking.checkIn)}\nCheck-out: ${fmt(booking.checkOut)}\nTotal: ${amountFormatted}`,
  });
}

// ---------------------------------------------------------------------------
// Enquiry confirmation
// ---------------------------------------------------------------------------

/**
 * Sends an acknowledgment email to a guest who submitted an enquiry.
 */
export async function sendEnquiryConfirmation(
  enquiry: EnquiryData
): Promise<void> {
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d);

  const datesSection =
    enquiry.checkIn && enquiry.checkOut
      ? `${goldDivider()}
         <p style="margin:0 0 8px;font-size:13px;color:#888;font-family:Arial,sans-serif;
                    letter-spacing:1px;text-transform:uppercase;">Requested Dates</p>
         <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
           ${infoRow('Check-in', fmt(enquiry.checkIn))}
           ${infoRow('Check-out', fmt(enquiry.checkOut))}
           ${enquiry.adults ? infoRow('Guests', `${enquiry.adults} adults${enquiry.children ? `, ${enquiry.children} children` : ''}`) : ''}
         </table>`
      : '';

  const content = `
    <h2 style="margin:0 0 4px;color:${ROYAL_BLUE};font-size:22px;font-weight:400;">
      We've Received Your Enquiry
    </h2>
    <p style="margin:0 0 24px;color:#555;font-family:Arial,sans-serif;font-size:14px;">
      Dear <strong>${enquiry.name}</strong>, thank you for reaching out to Royal Blue Heaven.
      Our reservations team will get back to you within 24 hours.
    </p>

    ${goldDivider()}

    <p style="margin:0 0 12px;font-size:13px;color:#888;font-family:Arial,sans-serif;
               letter-spacing:1px;text-transform:uppercase;">Your Message</p>
    <blockquote style="margin:0 0 24px;padding:16px;background:#f8f4ee;
                         border-left:3px solid ${GOLD};font-family:Arial,sans-serif;
                         font-size:13px;color:#555;line-height:1.6;">
      ${enquiry.message}
    </blockquote>

    ${datesSection}

    ${goldDivider()}

    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#777;text-align:center;">
      For immediate assistance, call us or email
      <a href="mailto:reservations@royalbluehaven.com"
         style="color:${ROYAL_BLUE};text-decoration:none;">
        reservations@royalbluehaven.com
      </a>
    </p>
  `;

  await sendEmail({
    to: enquiry.email,
    subject: 'Your Enquiry Has Been Received | Royal Blue Heaven',
    html: emailWrapper(content),
    text: `Dear ${enquiry.name},\n\nThank you for your enquiry. We'll respond within 24 hours.\n\nYour message:\n${enquiry.message}`,
  });
}

// ---------------------------------------------------------------------------
// OTP email
// ---------------------------------------------------------------------------

/**
 * Sends a 6-digit OTP to the guest for magic-link / passwordless login.
 */
export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  const content = `
    <h2 style="margin:0 0 4px;color:${ROYAL_BLUE};font-size:22px;font-weight:400;">
      Your One-Time Password
    </h2>
    <p style="margin:0 0 32px;color:#555;font-family:Arial,sans-serif;font-size:14px;">
      Use the code below to sign in to your Royal Blue Heaven account.
      This code expires in <strong>10 minutes</strong>.
    </p>

    <div style="text-align:center;margin:0 0 32px;">
      <div style="display:inline-block;padding:20px 40px;background:${ROYAL_BLUE};
                   border-radius:6px;">
        <span style="font-size:36px;font-weight:700;letter-spacing:8px;
                      color:#fff;font-family:Courier New,monospace;">
          ${otp}
        </span>
      </div>
    </div>

    ${goldDivider()}

    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#999;text-align:center;">
      If you did not request this code, please ignore this email.
      Your account remains secure.
    </p>
  `;

  await sendEmail({
    to: email,
    subject: `${otp} – Your Royal Blue Heaven OTP`,
    html: emailWrapper(content),
    text: `Your Royal Blue Heaven OTP is: ${otp}\nThis code expires in 10 minutes.`,
  });
}

// ---------------------------------------------------------------------------
// Admin notifications
// ---------------------------------------------------------------------------

/**
 * Sends an internal notification to the hotel admin team.
 */
export async function sendAdminNotification(
  type: string,
  data: Record<string, unknown>
): Promise<void> {
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ?? 'admin@royalbluehaven.com';

  const rows = Object.entries(data)
    .map(
      ([k, v]) =>
        `<tr>
           <td style="padding:5px 8px;color:#777;font-family:Arial,sans-serif;font-size:13px;
                       border:1px solid #e5e5e5;background:#fafafa;">${k}</td>
           <td style="padding:5px 8px;font-family:Arial,sans-serif;font-size:13px;
                       border:1px solid #e5e5e5;">${String(v)}</td>
         </tr>`
    )
    .join('');

  const content = `
    <h2 style="margin:0 0 4px;color:${ROYAL_BLUE};font-size:20px;font-weight:400;">
      Admin Notification: ${type}
    </h2>
    <p style="margin:0 0 24px;color:#555;font-family:Arial,sans-serif;font-size:13px;">
      Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    </p>

    ${goldDivider()}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
           style="border-collapse:collapse;border:1px solid #e5e5e5;">
      ${rows}
    </table>
  `;

  await sendEmail({
    to: adminEmail,
    subject: `[RBH Admin] ${type} – Royal Blue Heaven`,
    html: emailWrapper(content),
    text: `Admin notification: ${type}\n\n${Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')}`,
  });
}
