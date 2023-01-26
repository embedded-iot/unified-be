const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categories = ['General', 'Master', 'Devices', 'DeviceLogs', 'Fault'];
const types = ['Success', 'Error', 'Warning'];

const activityLogSchema = mongoose.Schema(
  {
    master: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Master',
      required: true,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    type: {
      type: String,
      enum: types,
      required: true,
    },
    description: {
      type: String,
    },
    activityLogData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
activityLogSchema.plugin(toJSON);
activityLogSchema.plugin(paginate);

/**
 * @typedef ActivityLog
 */
const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
