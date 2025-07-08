const mongoose = require('mongoose');

async function generateId(prefix, Model) {
  const count = await Model.countDocuments();
  return `${prefix}${count + 1}`;
}

module.exports = { generateId };
