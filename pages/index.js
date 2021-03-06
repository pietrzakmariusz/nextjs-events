import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/ApiUtilities';
import EventsList from '../components/events/EventsList';
import NewsletterRegistration from '../components/input/NewsletterRegistration';

function HomePage(props) {
	return (
		<div>
			<Head>
				<title>Next.js Wydarzenia</title>
				<meta
					name='description'
					content='Znajdź dla siebie najlepsze wydarzenia programistyczne'
				/>
			</Head>
			<NewsletterRegistration />
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
