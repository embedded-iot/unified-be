const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const masterSchema = mongoose.Schema(
  {
    masterKey: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
masterSchema.plugin(toJSON);
masterSchema.plugin(paginate);

/**
 * Check if master key is taken
 * @param {string} masterKey - The master's key
 * @param {ObjectId} [excludeMasterId] - The id of the master to be excluded
 * @returns {Promise<boolean>}
 */
masterSchema.statics.isMasterKeyTaken = async function (masterKey, excludeMasterId) {
  const master = await this.findOne({ masterKey, _id: { $ne: excludeMasterId } });
  return !!master;
};

/**
 * @typedef Master
 */
const Master = mongoose.model('Master', masterSchema);

module.exports = Master;
