import express from 'express';
import * as agentController from '../controllers/agentController';

const router = express.Router();

router.post('/', agentController.addAgent);
router.get('/:id', agentController.getAgent);
router.get('/', agentController.getAllAgents);

export default router;
