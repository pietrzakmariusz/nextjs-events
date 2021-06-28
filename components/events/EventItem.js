import Image from 'next/image';

import Button from '../ui/button';
import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

import classes from './EventItem.module.css';
// will transform to unique classes only for this component

function EventItem(props) {
	const { id, title, location, date, image } = props;

	const humanReadableDate = new Date(date).toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const formattedAddress = location.replace(', ', '\n');

	const exploreLink = `/events/${id}`;

	return (
		<li className={classes.item}>
			<Image src={'/' + image} alt={title} width={250} height={160} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{humanReadableDate}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{formattedAddress}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={exploreLink}>
						<span>Zobacz szczegóły wydarzenia</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
