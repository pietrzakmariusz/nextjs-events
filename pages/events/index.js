import { useRouter } from 'next/router';

// import { getAllEvents } from '../../data';
import { getAllEvents } from '../../helpers/ApiUtilities';
import EventsList from '../../components/events/EventsList';
import EventsSearch from '../../components/events/EventsSearch';

function AllEventsPage(props) {
	const router = useRouter();
	const events = props.events;

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

export async function getStaticProps() {
	const events = await getAllEvents();
	return {
		props: {
			events: events,
		},
		revalidate: 60,
	};
}

export default AllEventsPage;
