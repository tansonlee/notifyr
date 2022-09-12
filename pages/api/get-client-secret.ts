import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}

	console.log('GET /api/get-client-secret');

	try {
		const { groupId } = req.query;

		const response = await fetch(`http://localhost:3000/api/v1/generate-client-secret`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.NOTIFYR_API_KEY}`,
			},
			body: JSON.stringify({
				groupId: groupId || 'homepage',
			}),
		});

		console.log('response', response);

		const json = await response.json();

		res.status(200).json(json);
	} catch (e) {
		console.log('unexpected error', e);
		return res.status(500).json({ error: e });
	}
}
