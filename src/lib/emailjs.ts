import emailjs from '@emailjs/browser';

export type BookingEmailParams = {
  name: string;
  phone: string;
  travelDate: string;
  pickup: string;
  destination: string;
  vehicle: string;
  passengers: number;
  message?: string;
};

export async function sendEmailJSBooking(params: BookingEmailParams): Promise<{ success: boolean; message: string }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

  // If EmailJS credentials are default placeholders, return fallback signal
  if (!serviceId || !templateId || !publicKey || publicKey === 'user_public_key') {
    console.warn('[EmailJS] Keys not configured yet. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local');
    return { success: false, message: 'EmailJS keys not configured in environment variables' };
  }

  try {
    const templateParams = {
      from_name: params.name,
      user_phone: params.phone,
      travel_date: params.travelDate,
      pickup_location: params.pickup,
      destination_location: params.destination,
      vehicle_type: params.vehicle,
      passenger_count: params.passengers,
      message_text: params.message || 'No additional message provided.',
      reply_to: params.phone,
      site_name: 'Tamizhan Travels',
    };

    const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);

    if (res.status === 200) {
      return { success: true, message: 'Email sent successfully via EmailJS!' };
    }
    return { success: false, message: `EmailJS responded with status ${res.status}` };
  } catch (error: any) {
    console.error('[EmailJS Error]', error);
    return { success: false, message: error?.text || error?.message || 'Failed to send email via EmailJS' };
  }
}
