
const Table = ({ cards }) => {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Card Number</th>
            <th scope="col">Limit</th>
          </tr>
        </thead>
        <tbody>
          {
            cards.map(card => 
                <tr key={card.cardNumber}>
                  <td> {card.customerName} </td>
                  <td> {formatNumber(card.cardNumber)} </td>
                  <td> {card.limit} </td>
                </tr>
            )
          }
        </tbody>
      </table>
    );
  }
  
  const formatNumber = number => {
    return number && number.replace(/ /g,'')
                 .replace(/-/g,'')
                 .replace(/(.{4})/g,"$1 ");
  }
  
  export default Table;