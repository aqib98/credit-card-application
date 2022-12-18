const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const cardsService = {
  addCard: async ({ customerName, cardNumber, limit }) => {
    try {
      const card = await prisma.card.create({
        data: {
          customerName,
          cardNumber,
          limit
        }
      });
      console.log(`New card has been created with id: ${card.id}`);
      return card;
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log('There is a unique constraint violation, Card number already exists in database');
          throw new Error({
            code: 'P2002',
            message: 'Card number already exists, enter a valid card details'
          });
        }
      }
      await prisma.$disconnect();
    }
  },
  getAllCards: async () => {
    try {
      const allCards = await prisma.card.findMany();
      console.log('Fetch all cards operation successful');
      return allCards;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = cardsService;
