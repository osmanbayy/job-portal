import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk User with database
export const clerkWebhooks = async (request, response) => {
  try {
    // Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verifying headers
    await whook.verify(JSON.stringify(request.body), {
      "svix-id": request.headers["svix-id"],
      "svix-timestamp": request.headers["svix-timestamp"],
      "svix-signature": request.headers["svix-signature"]
    });

    // Getting data from request body
    const { data, type } = request.body;

    // Switch cases for different events
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ""
        }
        await User.create(userData);
        response.json({});
        break;
      }
      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        }
        await User.findByIdAndUpdate(data.id, userData);
        response.json({});
        break;
      }
      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        response.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    response.json({ success: false, message: "Webhooks error!" })
  }
}