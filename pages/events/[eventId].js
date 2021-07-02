// import { useRouter } from 'next/router';
import Head from 'next/head';

import { getEventById, getFeaturedEvents } from '../../helpers/ApiUtilities';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Comments from '../../components/input/Comments';

function EventDetailsPage(props) {
	// const router = useRouter();
	// const eventId = router.query.eventId;
	const event = props.selectedEvent;

	if (!event) {
		return (
			<div className='center'>
				<p>Pobieranie danych...</p>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{event.title}</title>
				<meta name='description' content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;

	const event = await getEventById(eventId);

	return {
		props: {
			selectedEvent: event,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	const paths = events.map(event => ({ params: { eventId: event.id } }));
	return {
		paths: paths,
		fallback: true,
	};
}

export default EventDetailsPage;
