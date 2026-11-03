import Razorpay from 'razorpay';
import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayPayment {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: string | null;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: Record<string, string>;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  created_at: number;
}

export interface RazorpayRefund {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  payment_id: string;
  notes: Record<string, string>;
  receipt: string | null;
  acquirer_data: Record<string, unknown>;
  created_at: number;
  batch_id: string | null;
  status: string;
  speed_processed: string;
  speed_requested: string;
}

// ---------------------------------------------------------------------------
// Singleton instance
// ---------------------------------------------------------------------------

let razorpayInstance: Razorpay | null = null;

/**
 * Returns a singleton Razorpay instance.
 * Throws if RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET are missing.
 */
export function getRazorpayInstance(): Razorpay {
  if (razorpayInstance) return razorpayInstance;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      'RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables must be set.'
    );
  }

  razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return razorpayInstance;
}

// ---------------------------------------------------------------------------
// Order management
// ---------------------------------------------------------------------------

/**
 * Creates a Razorpay order.
 * @param amount - Amount in the smallest currency unit (paise for INR).
 * @param currency - ISO 4217 currency code (default 'INR').
 * @param receipt - Unique receipt identifier (max 40 chars).
 * @param notes - Optional key-value metadata attached to the order.
 */
export async function createOrder(
  amount: number,
  currency: string = 'INR',
  receipt: string,
  notes: Record<string, string> = {}
): Promise<RazorpayOrder> {
  const rz = getRazorpayInstance();

  const order = await rz.orders.create({
    amount: Math.round(amount),
    currency,
    receipt: receipt.slice(0, 40), // Razorpay limit
    notes,
  });

  return order as unknown as RazorpayOrder;
}

// ---------------------------------------------------------------------------
// Signature verification
// ---------------------------------------------------------------------------

/**
 * Verifies the Razorpay payment signature to confirm the payment is authentic.
 * Must be called server-side.
 */
export function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error('RAZORPAY_KEY_SECRET environment variable must be set.');
  }

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

// ---------------------------------------------------------------------------
// Refunds
// ---------------------------------------------------------------------------

/**
 * Creates a refund for a captured Razorpay payment.
 * @param paymentId - The Razorpay payment ID (pay_XXXX).
 * @param amount - Amount to refund in smallest currency unit (paise for INR).
 *                 Pass 0 or omit to refund the full payment amount.
 * @param notes - Optional key-value metadata.
 */
export async function createRefund(
  paymentId: string,
  amount: number,
  notes: Record<string, string> = {}
): Promise<RazorpayRefund> {
  const rz = getRazorpayInstance();

  const refundOptions: Record<string, unknown> = {
    speed: 'normal',
    notes,
  };

  if (amount > 0) {
    refundOptions.amount = Math.round(amount);
  }

  const refund = await rz.payments.refund(paymentId, refundOptions);
  return refund as unknown as RazorpayRefund;
}
