import { Router } from 'express';
import TiktokRoutes from './tiktok';
import InstagramRoutes from './instagram';
import FacebookRoutes from './facebook';
import YoutubeRoutes from './youtube';

const SocialRoutes = Router();

SocialRoutes.use(
	'/tiktok',
	TiktokRoutes
);
SocialRoutes.use(
	'/instagram',
	InstagramRoutes
);
SocialRoutes.use(
	'/facebook',
	FacebookRoutes
);
SocialRoutes.use(
	'/youtube',
	YoutubeRoutes
);

export default SocialRoutes;
