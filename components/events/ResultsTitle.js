import Button from '../ui/button';
import classes from './ResultsTitle.module.css';

function ResultsTitle(props) {
	const { date } = props;

	const humanReadableDate = new Date(date).toLocaleDateString('pl-PL', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<section className={classes.title}>
			<h1>Wydarzenia na: {humanReadableDate}</h1>
			<Button link='/events'>Pokaż wszystkie wydarzenia</Button>
		</section>
	);
}

export default ResultsTitle;
