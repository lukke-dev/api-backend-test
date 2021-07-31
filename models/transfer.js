import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const transferSchema = mongoose.Schema({
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

autoIncrement.initialize(mongoose.connection);
transferSchema.plugin(autoIncrement.plugin, 'transfer');

const postTransfer = mongoose.model('transfers', transferSchema);
export default postTransfer;
