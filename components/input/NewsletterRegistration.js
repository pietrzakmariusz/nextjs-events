import { useRef, useContext } from 'react';

import NotificationContext from '../../store/NotificationContext';
import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
	const emailInputRef = useRef();
	const notificationCtx = useContext(NotificationContext);

	function registrationHandler(event) {
		event.preventDefault();
		// optional: validate input

		const enteredEmail = emailInputRef.current.value;

		notificationCtx.showNotification({
			title: 'Zapisywanie',
			message: 'Rejestracja dla newslettera.',
			status: 'pending',
		});

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: enteredEmail }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				return response.json().then(data => {
					throw new Error(data.message || 'Błąd podczas przesyłania danych.');
				});
			})
			.then(data =>
				notificationCtx.showNotification({
					title: 'Powodzenie!',
					message: 'Rejestacja zakończona powodzeniem.',
					status: 'success',
				})
			)
			.catch(error =>
				notificationCtx.showNotification({
					title: 'Błąd!',
					message: error.message || 'Błąd podczas przesyłania danych.',
					status: 'error',
				})
			);
	}

	return (
		<section className={classes.newsletter}>
			<h2>Zapisz się, by być na bieżąco!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
						ref={emailInputRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
