
const Form = ({ card, handleInputChange, handleAddCard }) => {
    return (
        <div className="form">
          <label> Name </label>
          <input type="text" name="customerName"
                 value={card.customerName}
                 onChange={handleInputChange} />
          <label> Card number </label>
          <input type="text" name="cardNumber"
                 value={card.cardNumber}
                 onChange={handleInputChange} />
          <label> Limit </label>
          <input type="number" name="limit"
                 value={card.limit}
                 onChange={handleInputChange} />
          <button onClick={handleAddCard}> Add </button>
        </div>
      );
};

export default Form;