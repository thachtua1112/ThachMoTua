import { Request, Response } from 'express';
import resourceService from '../services/resourceService';

class ResourceController {
  // Create a resource
  create(req: Request, res: Response) {
    const { name, description } = req.body;
    resourceService.create({ name, description }, (err, id) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating resource', error: err });
      }
      res.status(201).json({ message: 'Resource created', id });
    });
  }

  // List all resources with optional filters
  list(req: Request, res: Response) {
    const { name } = req.query;
    resourceService.list({ name: name as string }, (err, resources) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching resources', error: err });
      }
      res.status(200).json(resources);
    });
  }

  // Get a resource by ID
  get(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    resourceService.get(id, (err, resource) => {
      if (err || !resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.status(200).json(resource);
    });
  }

  // Update a resource
  update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    resourceService.update(id, { name, description }, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating resource', error: err });
      }
      res.status(200).json({ message: 'Resource updated' });
    });
  }

  // Delete a resource
  delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    resourceService.delete(id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting resource', error: err });
      }
      res.status(200).json({ message: 'Resource deleted' });
    });
  }
}

export default new ResourceController();
