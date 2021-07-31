import express from 'express';
import {
  getPlayer, addPlayer, getPlayerById, editPlayer, delPlayer, getPlayerByName,
} from '../controller/player-controller.js';
import { getTransfer, newTransfer, delTransfer } from '../controller/transfers-controller.js';
const router = express.Router();

router.get('/', getPlayer);
router.post('/add', addPlayer);
router.get('/:name', getPlayerByName);
router.get('/:id', getPlayerById);
router.put('/:id', editPlayer);
router.delete('/:id', delPlayer);

router.get('/transfers/', getTransfer);
router.post('/transfers/new', newTransfer);
router.delete('/transfers/:id', delTransfer);

export default router;
