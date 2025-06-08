import express from 'express';
import { searchEmails } from '../controllers/email.controller';

const router = express.Router();
router.get('/search', searchEmails);
export default router;
