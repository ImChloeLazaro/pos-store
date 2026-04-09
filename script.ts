import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      email: "test@gmail.com",
      name: "Test User",
      clerkId: "clerk_1234567890",
      picture: "https://example.com/profile.jpg",
    },
  });

  console.log("Created user:", user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });