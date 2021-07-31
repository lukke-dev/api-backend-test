import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const playerSchema = mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    unique: true,
  },
  playerCoins: {
    type: Number,
    required: true,
    default: 10,
  },
});

autoIncrement.initialize(mongoose.connection);
playerSchema.plugin(autoIncrement.plugin, 'player');

const postPlayer = mongoose.model('player', playerSchema);
export default postPlayer;
