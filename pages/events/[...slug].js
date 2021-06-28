// dla więcej niż jednego segmentu: /events/xxx/yyy...
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { getFilteredEvents } from '../../helpers/ApiUtilities';
import EventsList from '../../components/events/EventsList';
import ResultsTitle from '../../components/events/ResultsTitle';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/ErrorAlert';

function FilteredEventsPage(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_BASE);
	console.log(process.env.API_BASE);

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}
			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
		return <p className='center'>Wczytywanie...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1 ||
		error
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

	const filteredEvents = loadedEvents.filter(event => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
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

// export async function getServerSideProps(context) {
// 	const { params } = context;

// 	const filterData = params.slug;

// 	const filteredYear = filterData[0];
// 	const filteredMonth = filterData[1];

// 	// konwersja string na number
// 	const numYear = +filteredYear;
// 	const numMonth = +filteredMonth;

// 	if (
// 		isNaN(numYear) ||
// 		isNaN(numMonth) ||
// 		numYear > 2030 ||
// 		numYear < 2021 ||
// 		numMonth > 12 ||
// 		numMonth < 1
// 	) {
// 		return {
// 			props: { hasError: true },
// 			// notFound: true,
// 			// redirect: {
// 			// 	destrination: '/error',
// 			// },
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth,
// 	});

// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numYear,
// 				month: numMonth,
// 			},
// 		},
// 	};
// }

export default FilteredEventsPage;
