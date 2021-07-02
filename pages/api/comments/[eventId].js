import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
} from '../../../helpers/DbUtilities';

async function handler(req, res) {
	const eventId = req.query.eventId;

	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Błąd przy połączeniu z bazą danych.' });
		return;
	}

	if (req.method === 'POST') {
		const { email, name, comment } = req.body;

		if (
			!email.includes('@') ||
			!name ||
			!name.trim() === '' ||
			!comment ||
			!comment.trim() === ''
		) {
			res.status(422).json({ message: 'Nieprawidłowe dane.' });
			client.close();
			return;
		}

		const newComment = {
			eventId,
			email,
			name,
			comment,
		};

		let result;

		try {
			result = await insertDocument(client, 'comments', newComment);
			newComment._id = result.insertedId;

			res
				.status(201)
				.json({ message: 'Komentarz dodany.', comment: newComment });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Błąd przy zapisie komentarza do bazy.' });
		}
	}

	if (req.method === 'GET') {
		try {
			const documents = await getAllDocuments(
				client,
				'comments',
				{ _id: -1 },
				{ eventId: eventId }
			);
			res.status(200).json({ comments: documents });
		} catch (error) {
			res.status(500).json({ message: 'Błąd odczytu komentarzy z bazy.' });
		}
	}

	client.close();
}

export default handler;
