import { PrismaPg } from "@prisma/adapter-pg";
import { CheckinRuleType, PrismaClient } from "./generated/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.user.createMany({
    data: [
      {
        name: "User 1",
        email: "user1@email.com",
        password: "123456",
      },
      {
        name: "User 2",
        email: "user2@email.com",
        password: "123456",
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  const sampleImages = [
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
  ];

  const samplePlacements = [
    "São Paulo - Expo Center Norte",
    "Rio de Janeiro - Riocentro",
    "Belo Horizonte - Expominas",
    "Curitiba - Expo Barigui",
    "Porto Alegre - FIERGS",
    "Recife - Centro de Convenções",
  ];

  for (const user of allUsers) {
    for (let i = 1; i <= 10; i++) {
      const event = await prisma.event.create({
        data: {
          name: `Evento ${i} - ${user.name}`,
          placement:
            samplePlacements[
              Math.floor(Math.random() * samplePlacements.length)
            ],
          startDate: new Date(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
          status: "ACTIVE",
          imageUrl:
            sampleImages[Math.floor(Math.random() * sampleImages.length)],
        },
      });

      const rule1 = await prisma.checkinRule.create({
        data: {
          eventId: event.id,
          type: CheckinRuleType.QR_CODE,
          startOffset: 30,
          endOffset: 10,
          mandatory: true,
        },
      });

      const rule2 = await prisma.checkinRule.create({
        data: {
          eventId: event.id,
          type: CheckinRuleType.CONFIRMACAO_EMAIL,
          startOffset: 60,
          endOffset: 5,
          mandatory: false,
        },
      });

      for (let j = 0; j < 10; j++) {
        const randomUser =
          allUsers[Math.floor(Math.random() * allUsers.length)];

        await prisma.checkin
          .create({
            data: {
              userId: randomUser.id,
              eventId: event.id,
              checkinRuleId: Math.random() > 0.5 ? rule1.id : rule2.id,
            },
          })
          .catch(() => {});
      }
    }
  }

  console.log("✅ Seed finalizado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
