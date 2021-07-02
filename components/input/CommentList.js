import classes from './CommentList.module.css';

function CommentList(props) {
	return (
		<ul className={classes.comments}>
			{props.items.map(item => (
				<li key={item._id}>
					<p>{item.comment}</p>
					<div>
						Utworzony przez <address>{item.name}</address>
					</div>
				</li>
			))}
		</ul>
	);
}

export default CommentList;
