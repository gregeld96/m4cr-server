import express, {
	Request,
	Response,
} from 'express';
import axios from 'axios';

const router = express.Router();

const GEMINI_API_URL =
	'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY =
	process.env.GEMINI_API_KEY;

router.post(
	'/',
	async (
		req: Request,
		res: Response
	) => {
		const { input } = req.body;

		if (!input) {
			res.status(400).json({
				error:
					'Input text is required.',
			});
			return;
		}

		if (!GEMINI_API_KEY) {
			res.status(500).json({
				error:
					'Server configuration error: Missing GEMINI_API_KEY.',
			});
			return;
		}

		try {
			const response = await axios.post(
				`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
				{
					contents: [
						{
							parts: [
								{
									text: input,
								},
							],
						},
					],
				},
				{
					headers: {
						'Content-Type':
							'application/json',
					},
				}
			);

			const responseMessage =
				response.data?.candidates?.[0]
					?.content?.parts?.[0]?.text;

			if (!responseMessage) {
				res.status(500).json({
					error:
						'Invalid response from Gemini API.',
				});
				return;
			}

			res.status(200).json({
				input,
				response:
					responseMessage.trim(),
			});
		} catch (error: any) {
			console.error(
				'Error with Gemini API:',
				error.response?.data ||
					error.message ||
					error
			);
			res.status(500).json({
				error:
					error.response?.data ||
					'Failed to fetch data from Gemini.',
			});
		}
	}
);

export default router;
