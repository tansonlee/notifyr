import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromReq } from '../../../lib/auth/user';
import { insertNotification } from '../../../lib/db/insert';
import { cors, runMiddleware } from '../auth/get-token';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const user = await getUserFromReq(req);
	if (!user) {
		return res.status(401).end({ error: 'Unauthorized' });
	}

	const { title, body, type, groupId } = req.body;

	const notification = await insertNotification({
		userId: user.id,
		groupId,
		title,
		body,
		type,
	});

	return res.status(200).json({ notification });
};

export default handler;
