import { useEffect, useState, useContext } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import NotificationContext from '../../store/NotificationContext';

import classes from './Comments.module.css';

function Comments(props) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [isFetchingComments, setIsFetchingComments] = useState(false);

	const notificationCtx = useContext(NotificationContext);

	useEffect(() => {
		if (showComments) {
			setIsFetchingComments(true);

			fetch(`/api/comments/${eventId}`)
				.then(response => response.json())
				.then(data => {
					setComments(data.comments);
					setIsFetchingComments(false);
				});
		}
	}, [showComments, eventId]);

	function toggleCommentsHandler() {
		setShowComments(prevStatus => !prevStatus);
	}

	function addCommentHandler(commentData) {
		notificationCtx.showNotification({
			title: 'Zapis komentarza',
			message: 'Wysyłanie komentarza do zapisu w bazie danych.',
			status: 'pending',
		});

		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
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
					message: 'Zapisano komentarz w bazie danych.',
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
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Ukryj' : 'Pokaż'} komentarz(e)
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isFetchingComments && <CommentList items={comments} />}
			{showComments && isFetchingComments && <p>Pobieranie danych...</p>}
		</section>
	);
}

export default Comments;
