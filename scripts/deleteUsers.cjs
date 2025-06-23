const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function deleteUserByEmail(email) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { email },
    });

    console.log("✅ User deleted successfully:", deletedUser);
  } catch (error) {
    if (error.code === "P2025") {
      console.log("❌ User not found.");
    } else {
      console.error("❌ Error deleting user:", error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

// 📝 Replace the email below with the one you want to delete:
deleteUserByEmail("tamrakardiya0319@gmail.com");
