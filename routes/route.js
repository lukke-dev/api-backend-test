import express from 'express';
import {
  getPlayer, addPlayer, getPlayerById, editPlayer, delPlayer, getPlayerByName,
} from '../controller/player-controller.js';
import { getTransfer, newTransfer, delTransfer } from '../controller/transfers-controller.js';
const router = express.Router();

router.get('/', getPlayer);
router.post('/add', addPlayer);
router.get('/find/', getPlayerByName);
router.get('/find/:id', getPlayerById);
router.put('/:id', editPlayer);
router.delete('/:id', delPlayer);

router.get('/transfers/show', getTransfer);
router.post('/transfers/new', newTransfer);
router.delete('/transfers/:id', delTransfer);

export default router;
