const STATE_VALUES = {
  ACTIVATED: 'ACTIVATED',
  BLOCKED: 'BLOCKED',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
};

const userStates = [STATE_VALUES.ACTIVATED, STATE_VALUES.BLOCKED];
const gatewayStates = [STATE_VALUES.ONLINE, STATE_VALUES.ONLINE];
const deviceStates = [STATE_VALUES.ONLINE, STATE_VALUES.ONLINE];

const DEVICE_TYPE_VALUES = {
  LOGGER: 'LOGGER',
  INVERTER: 'INVERTER',
  SENSOR: 'SENSOR',
};

const deviceTypes = [DEVICE_TYPE_VALUES.LOGGER, DEVICE_TYPE_VALUES.INVERTER, DEVICE_TYPE_VALUES.SENSOR];

module.exports = {
  STATE_VALUES,
  userStates,
  gatewayStates,
  DEVICE_TYPE_VALUES,
  deviceTypes,
  deviceStates,
};
