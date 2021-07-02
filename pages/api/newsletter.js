import { connectDatabase, insertDocument } from '../../helpers/DbUtilities';

async function handler(req, res) {
	if (req.method === 'POST') {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes('@')) {
			res.status(422).json({ message: 'Nieprawidłowy adres email.' });
			return;
		}

		let client;

		try {
			client = await connectDatabase();
		} catch (error) {
			res.status(500).json({ message: 'Błąd przy połączeniu z bazą danych.' });
			return;
		}

		try {
			await insertDocument(client, 'newsletter', { email: userEmail });

			client.close();
		} catch (error) {
			res.status(500).json({ message: 'Błąd przy zapisie danych do bazy.' });
			return;
		}

		res.status(201).json({ message: 'Email zapisany.' });
	}
}

export default handler;
