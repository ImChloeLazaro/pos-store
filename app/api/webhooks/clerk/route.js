import { verifyWebhook } from '@clerk/nextjs/webhooks';
import {prisma} from '@/lib/prisma';
export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    const user = await prisma.user.create({
      data: {
        clerkId: id,
        email: evt.data.email_addresses[0].email_address,
        name: evt.data.first_name + ' ' + evt.data.last_name,
        picture: evt.data.profile_image_url,
      },
    });

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    console.log('Webhook payload:', evt.data);

    if (evt.type === 'user.created') {
      console.log('userId:', evt.data.id);
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}