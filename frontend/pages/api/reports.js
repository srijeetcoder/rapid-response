// PulseCore API Route
// Replaces the Express backend for Vercel deployment

let reports = [];
let nextId = 1;

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(reports);
  }

  if (req.method === 'POST') {
    const { location, description } = req.body;
    if (!location || !description) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    
    const newReport = {
      id: nextId++,
      location,
      description,
      timestamp: new Date().toISOString()
    };
    
    reports.push(newReport);
    return res.status(201).json(newReport);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
