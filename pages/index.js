import { getFeaturedEvents } from '../helpers/ApiUtilities';
import EventsList from '../components/events/EventsList';

function HomePage(props) {
	return (
		<div>
			<EventsList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();
	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 1800, // half hour
	};
}

export default HomePage;
