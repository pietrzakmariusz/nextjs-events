import { useRouter } from 'next/router';

import { getAllEvents } from '../../data';
import EventsList from '../../components/events/EventsList';
import EventsSearch from '../../components/events/EventsSearch';

function AllEventsPage() {
	const router = useRouter();
	const events = getAllEvents();

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<>
			<EventsSearch onSearch={findEventsHandler} />
			<EventsList items={events} />
		</>
	);
}

export default AllEventsPage;
