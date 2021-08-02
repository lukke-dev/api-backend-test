import PlayerModel from '../models/player.js';

export const getPlayer = async (req, res) => {
  try {
    const {page, limit} = req.query
    if(page && limit){
      const players = await PlayerModel.find().limit(limit*1).skip((page-1) * limit)
      res.status(200).json(players);
    }else {
      const players = await PlayerModel.find()
      res.status(200).json(players);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPlayer = async (req, res) => {
  const player = req.body;

  const newPlayer = new PlayerModel(player);
  try {
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPlayerById = async (req, res) => {
  try {
    const player = await PlayerModel.findById(req.params.id);
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPlayerByName = async (req, res) => {
  try {
    const player = await PlayerModel.findOne({playerName: `${req.params.name}`});
    console.log(player)
    if(player === null) ErrorEvent({message:  error.message})
    res.status(200).json(player);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const editPlayer = async (req, res) => {
  let player = await PlayerModel.findById(req.params.id);
  player = req.body;

  const edit = new PlayerModel(player);
  try {
    await PlayerModel.updateOne({ _id: req.params.id }, edit);
    res.status(201).json(edit);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const delPlayer = async (req, res) => {
  try {
    await PlayerModel.deleteOne({ _id: req.params.id });
    res.status(201).json('Player deleted Successfully');
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

