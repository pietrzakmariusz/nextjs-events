const DUMMY_EVENTS = [
	{
		id: 'e1',
		title: 'JavaScript dla każdego',
		description: 'Nauka programowania JavaScript',
		location: 'Somestreet 15, 12335 San Somewhereo',
		date: '2021-06-21',
		image: 'images/javascript.jpg',
		isFeatured: false,
	},
	{
		id: 'e2',
		title: 'Java najpopularniejszy język programowania',
		description: 'Ucz się z nami - Java na poważnie',
		location: 'New Wall Street 6, 94765 New Work',
		date: '2021-06-29',
		image: 'images/java.jpg',
		isFeatured: true,
	},
	{
		id: 'e3',
		title: 'React - wyższy stopień interfejsu użytkownika',
		description: 'Twórz szybciej i więcej z React',
		location: 'My Street 7, 1115 Broke City',
		date: '2022-03-17',
		image: 'images/react.jpg',
		isFeatured: true,
	},
];

export function getFeaturedEvents() {
	return DUMMY_EVENTS.filter(event => event.isFeatured);
}

export function getAllEvents() {
	return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	let filteredEvents = DUMMY_EVENTS.filter(event => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}

export function getEventById(id) {
	return DUMMY_EVENTS.find(event => event.id === id);
}
