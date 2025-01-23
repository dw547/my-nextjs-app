// pages/api/saveData.js

import connectToDatabase from '../../lib/mongodb';
import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ua: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent model overwrite upon initial compile
const Data = mongoose.models.Data || mongoose.model('Data', DataSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, ua } = req.body;

    if (!name || !ua) {
      return res.status(400).json({ message: 'Name and UA are required.' });
    }

    try {
      await connectToDatabase();

      const newData = new Data({ name, ua });
      await newData.save();

      return res.status(201).json({ message: 'Data saved successfully.' });
    } catch (error) {
      console.error('Error saving data:', error);
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
