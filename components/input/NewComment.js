import { useRef, useState } from 'react';
import classes from './NewComment.module.css';

function NewComment(props) {
	const [isInvalid, setIsInvalid] = useState(false);

	const emailInputRef = useRef();
	const nameInputRef = useRef();
	const commentInputRef = useRef();

	function sendCommentHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredName = nameInputRef.current.value;
		const enteredComment = commentInputRef.current.value;

		if (
			!enteredEmail ||
			enteredEmail.trim() === '' ||
			!enteredEmail.includes('@') ||
			!enteredName ||
			enteredName.trim() === '' ||
			!enteredComment ||
			enteredComment.trim() === ''
		) {
			setIsInvalid(true);
			return;
		}

		props.onAddComment({
			email: enteredEmail,
			name: enteredName,
			comment: enteredComment,
		});
	}

	return (
		<form className={classes.form} onSubmit={sendCommentHandler}>
			<div className={classes.row}>
				<div className={classes.control}>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='name'>Imię</label>
					<input type='text' id='name' ref={nameInputRef} />
				</div>
			</div>
			<div className={classes.control}>
				<label htmlFor='comment'>Komentarz</label>
				<textarea id='comment' rows='5' ref={commentInputRef}></textarea>
			</div>
			{isInvalid && <p>Podaj prawidłowy email i wypełnij wszystkie pola!</p>}
			<button>Wyślij</button>
		</form>
	);
}

export default NewComment;
