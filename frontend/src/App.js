import { useState, useEffect } from 'react';
import './App.css';
import cardsService from './services/cardsService';

import Form from './components/Form';
import ValidationErrors from './components/ValidationErrors';
import CardList from './components/CardList';

function App() {
  const [card, setCard] = useState({
    customerName: '', cardNumber: '', limit: 0
  });
  const [validationErrors, setValidationErrors] = useState({
    customerName: false, cardNumber: false, limit: false
  });
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const allCards = await cardsService.getAllCards();
      setCardList(allCards);
    }
    fetchCards();
  }, []);

  const handleInputChange = event => {
    let obj = {[event.target.name] : event.target.value};
    setCard(() => ({ ...card, ...obj }));
  }

  const isFormValid = () => {
    const nameRegex = /^[^0-9.]+$/;
    const cardRegEx = /^[0-9]+$/;
    const limitRegex = /^[0-9]+$/;
    let errors = { customerName: true, cardNumber: true, limit: true };
    if (nameRegex.test(card.customerName))
      errors.customerName = false;
    if (cardRegEx.test(card.cardNumber))
      errors.cardNumber = false;
    if (limitRegex.test(card.limit) && card.limit >= 100)
      errors.limit = false;
    setValidationErrors(errors);
    return !Object.values(errors).some(error => error === true);
}

  const handleAddCard = async () => {
    if(isFormValid()) {
      try {
        const addedCard = await cardsService.addCard(card);
        if(addedCard) {
          setCardList( [...cardList, addedCard] );
          setCard({customerName: '', cardNumber: '', limit: ''});
        }
      } catch (error) {
        console.log('ERROR', error);
        const message = error.status === 409 ? 'A Credit Card with that number already exists!' :
                                              'A service error occurred, please try again later!';
        alert(error.error);
      }
    }
  }

  return (
    <div className="App">
      <h1>Credit Card System</h1>
      <p> Use the form below to add a new Credit Card to the System </p>

      <Form card={card} 
            handleInputChange={handleInputChange}
            handleAddCard={handleAddCard} />

      <ValidationErrors errors={validationErrors} />

      <CardList cards={cardList} />

    </div>
  );
}

export default App;
