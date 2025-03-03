import db from './database';

interface Resource {
  name: string;
  description?: string;
}

const seedData: Resource[] = [
  { name: 'Resource 1', description: 'This is the first resource.' },
  { name: 'Resource 2', description: 'This is the second resource.' },
  { name: 'Resource 3', description: 'This is the third resource.' },
  { name: 'Resource 4', description: 'This is the fourth resource.' },
  { name: 'Resource 5', description: 'This is the fifth resource.' },
];

const seedDatabase = () => {
  // Start a transaction to improve performance for bulk inserts
  db.serialize(() => {
    // Clear any existing data in the table (optional)
    db.run('DELETE FROM resources');

    // Insert seed data into the resources table
    const stmt = db.prepare('INSERT INTO resources (name, description) VALUES (?, ?)');

    seedData.forEach((resource) => {
      stmt.run(resource.name, resource.description);
    });

    stmt.finalize();
    console.log('Database seeded successfully.');
  });
};

seedDatabase();
