import express from 'express';
import resourceController from '../controllers/resourceController';

const router = express.Router();

router.post('/', resourceController.create);
router.get('/', resourceController.list);
router.get('/:id', resourceController.get);
router.put('/:id', resourceController.update);
router.delete('/:id', resourceController.delete);

export default router;
