// backend/data.js
// In‑memory store for emergency reports
let reports = [];
let nextId = 1;

module.exports = {
  // Return all stored reports
  getAll: () => reports,

  // Add a new report and return it
  add: (report) => {
    const entry = {
      id: nextId++,
      ...report, // expects { location, description }
      timestamp: new Date().toISOString()
    };
    reports.push(entry);
    return entry;
  }
};
