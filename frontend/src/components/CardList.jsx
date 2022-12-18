import Table from './Table';

const CardList = ({ cards = [] }) => {
	return(
		<>
			<label className="larger"> Existing Cards </label>
			{cards.length === 0 ? (
				<div> No Cards </div>
			) : (
			  	<Table cards={cards} />
			)}
		</>
	)
}

export default CardList;