import axios from 'axios';

const CARDS_SERVICE_BACKEND_URL = 'http://localhost:8081/v1';

const cardsService = {
    addCard: async ({ customerName, cardNumber, limit }) => {
        try {
            const card = await axios({
                method: 'post',
                url: `${CARDS_SERVICE_BACKEND_URL}/card`,
                data: {
                    customerName,
                    cardNumber,
                    limit
                }
            });
            return card.data;
        } catch (error) {
            console.log(`Error: ${error}`);
            throw error.response && error.response.data;
        }
    },
    getAllCards: async () => {
        try {
            const allCards = await axios({
                method: 'get',
                url: `${CARDS_SERVICE_BACKEND_URL}/cards`
            });

            return allCards.data;
        } catch (error) {
            console.log(`Error: ${error}`);
            throw error.response && error.response.data;
        }
    }
};

export default cardsService;