import mongoose from 'mongoose';
import { log } from 'node:console';

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['info', 'warning', 'error'],
    default: 'info'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  capped: {
    size: 1024 * 1024, 
    max: 1000         
  },
  collection: 'logs'
});

const Log = mongoose.model('log', logSchema);

export default log;