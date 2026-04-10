import { PrismaClient } from "../src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("PrimorAdmin@2026", 12);

  await prisma.user.upsert({
    where: { email: "admin@primorholding.com.br" },
    update: { password },
    create: {
      email: "admin@primorholding.com.br",
      password,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin criado: admin@primorholding.com.br / PrimorAdmin@2026");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
