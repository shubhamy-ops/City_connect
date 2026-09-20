import express from 'express';
import {
  getIssues,
  getIssueById,
  createIssue,
  updateIssueStatus,
  upvoteIssue,
  verifyIssue
} from '../controllers/issueController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getIssues)
  .post(protect, createIssue);

router.route('/:id')
  .get(getIssueById);

router.route('/:id/status')
  .patch(protect, admin, updateIssueStatus);

router.route('/:id/upvote')
  .post(protect, upvoteIssue);

router.route('/:id/verify')
  .post(protect, verifyIssue);

export default router;
