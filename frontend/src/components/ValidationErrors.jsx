
const ValidationErrors = ({ errors }) => {
    return (
      <div className="validation-errors">
        { errors.customerName &&
          <div className="alert">
            User Name field cannot contain numbers or be empty.
          </div>
        }
        { errors.cardNumber &&
          <div className="alert">
            Card Number not valid. It must be a 16 to 19 digit number and should work against Luhn 10 algorithm.
          </div>
        }
        { errors.limit &&
          <div className="alert">
            Limit field must be a valid number and greater or equal to 100.
          </div>
        }
      </div>
    )
  }
  
  export default ValidationErrors;