import db from '../db/database';
import { Resource } from '../models/resource';

class ResourceService {
  // Create a resource
  create(resource: Omit<Resource, 'id'>, callback: (err: Error | null, id?: number) => void) {
    const { name, description } = resource;
    db.run(
      'INSERT INTO resources (name, description) VALUES (?, ?)',
      [name, description],
      function (err) {
        callback(err, this.lastID);
      }
    );
  }

  // Get all resources with optional filters
  list(filter: { name?: string } = {}, callback: (err: Error | null, resources: Resource[]) => void) {
    const { name } = filter;
    const query = name
      ? 'SELECT * FROM resources WHERE name LIKE ?'
      : 'SELECT * FROM resources';
    const params = name ? [`%${name}%`] : [];

    db.all(query, params, (err, rows) => {
      callback(err, rows as Resource[]);
    });
  }

  // Get details of a resource by ID
  get(id: number, callback: (err: Error | null, resource?: Resource) => void) {
    db.get('SELECT * FROM resources WHERE id = ?', [id], (err, row) => {
      callback(err, row as Resource);
    });
  }

  // Update a resource
  update(id: number, resource: Partial<Resource>, callback: (err: Error | null) => void) {
    const { name, description } = resource;
    db.run(
      'UPDATE resources SET name = ?, description = ? WHERE id = ?',
      [name, description, id],
      (err) => {
        callback(err);
      }
    );
  }

  // Delete a resource
  delete(id: number, callback: (err: Error | null) => void) {
    db.run('DELETE FROM resources WHERE id = ?', [id], (err) => {
      callback(err);
    });
  }
}

export default new ResourceService();
