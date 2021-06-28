// dla więcej niż jednego segmentu: /events/xxx/yyy...
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../data';
import EventsList from '../../components/events/EventsList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/ErrorAlert';

function FilteredEventsPage() {
	const router = useRouter();

	const filterData = router.query.slug;

	// przy pierwszym wywołaniu, gdy url nie zawiera segmentów do szukania
	// korzystanie z globalnego stylu .center

	if (!filterData) {
		return <p className='center'>Wczytywanie...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	// konwersja string na number
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1
	) {
		return (
			<>
				<ErrorAlert>
					<p>Nieprawidłowane dane do szukania.</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Pokaż wszystkie wydarzenia</Button>
				</div>
			</>
		);
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>Nie znaleziono wydarzeń dla podanego filtra danych.</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Pokaż wszystkie wydarzenia</Button>
				</div>
			</>
		);
	}

	// miesiące liczone od zera
	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventsList items={filteredEvents} />
		</>
	);
}

export default FilteredEventsPage;
