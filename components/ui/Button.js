import Link from 'next/link';

import classes from './Button.module.css';

function Button(props) {
	if (props.link) {
		return (
			<Link href={props.link}>
				<a className={classes.btn}>{props.children}</a>
			</Link>
		);
	} else {
		return (
			<button className={classes.btn} onClick={props.onClick}>
				{props.children}
			</button>
		);
	}
}

export default Button;

// <a> dodane, by móc go stylować (ale bez href!); bez <a>, <Link> doda go domyślnie
