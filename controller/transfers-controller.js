import TransferModel from '../models/transfer.js';
import PlayerModel from '../models/player.js';

export const getTransfer = async (req, res) => {
  try {
    const transfer = await TransferModel.find();
    res.status(200).json(transfer);
  } catch (error) {
    res.status(404).json({ errors: error.message });
  }
};

export const newTransfer = async (req, res) => {
  try {
    const { origin, destination, value } = req.body;
    const validOrigin = await PlayerModel.findOne({ playerName: `${origin}` });
    const validDestination = await PlayerModel.findOne({
      playerName: `${destination}`
    });
    console.log(validOrigin);

    if (!validOrigin) {
      return res.status(400).json({ errors: ['Jogador origem não existe'] });
    }
    if (!validDestination) {
      return res.status(400).json({ errors: ['Jogador destino não existe'] });
    }
    console.log(validOrigin.playerCoins);
    if ((validOrigin.playerCoins - value) < 0) {
      return res
        .status(400)
        .json({ errors: ['Jogador origem não tem saldo suficiente'] });
    }
    const newTransferency = new TransferModel(req.body);
    const newValueOrigin = validOrigin.playerCoins - Number(value);
    const newValueDestination = validDestination.playerCoins + Number(value);
    await PlayerModel.updateOne({playerName: `${origin}`, }, {playerCoins: `${newValueOrigin}`});
    await PlayerModel.updateOne({playerName: `${destination}`, }, {playerCoins: `${newValueDestination}`});
    await newTransferency.save();
    return res.status(201).json(newTransferency);
  } catch (error) {
    return res.status(409).json({ errors: error.message });
  }
};

export const delTransfer = async (req, res) => {
  try {
    console.log(req.params.id)
    const updateCoins = await TransferModel.findOne({ _id: req.params.id });

    if(!updateCoins) {
      return res.status(400).json({ errors: ['Transferência não existe'] });
    }
    const {origin, destination, value} = updateCoins
    const playerOrigin = await PlayerModel.findOne({ playerName: `${origin}` });
    const playerDestination = await PlayerModel.findOne({
      playerName: `${destination}`
    });
    const newValueOrigin = playerOrigin.playerCoins + Number(value);
    const newValueDestination = playerDestination.playerCoins - Number(value);
    await PlayerModel.updateOne({playerName: `${origin}`, }, {playerCoins: `${newValueOrigin}`});
    await PlayerModel.updateOne({playerName: `${destination}`, }, {playerCoins: `${newValueDestination}`});

    await TransferModel.deleteOne({ _id: req.params.id });
    res.status(201).json('Transfer deleted Successfully');
  } catch (error) {
    res.status(201).json('Transfer deleted Successfully');
  }
};
