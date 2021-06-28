import { useRef } from 'react';

import Button from '../ui/button';
import classes from './EventsSearch.module.css';

function EventsSearch(props) {
	const yearInputRef = useRef();
	const monthInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const selectedYear = yearInputRef.current.value;
		const selectedMonth = monthInputRef.current.value;

		props.onSearch(selectedYear, selectedMonth);
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor='year'>Rok</label>
					<select id='year' ref={yearInputRef}>
						<option value='2021'>2021</option>
						<option value='2022'>2022</option>
					</select>
				</div>
				<div className={classes.control}>
					<label htmlFor='month'>Miesiąc</label>
					<select id='month' ref={monthInputRef}>
						<option value='1'>Styczeń</option>
						<option value='2'>Luty</option>
						<option value='3'>Marzec</option>
						<option value='4'>Kwiecień</option>
						<option value='5'>Maj</option>
						<option value='6'>Czerwiec</option>
						<option value='7'>Lipiec</option>
						<option value='8'>Sierpień</option>
						<option value='9'>Wrzesień</option>
						<option value='10'>Październik</option>
						<option value='11'>Listopad</option>
						<option value='12'>Grudzień</option>
					</select>
				</div>
			</div>
			<Button>Znajdź</Button>
		</form>
	);
}

export default EventsSearch;
