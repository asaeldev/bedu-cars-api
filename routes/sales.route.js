const router = require('express').Router();
const SalesController = require('../controllers/sales.controller');

const salesController = new SalesController();

router.get('/', async (req, res) => {
  const { fields } = req.query;
  const parsedFields = fields ? fields.split(',') : null;
  const sales = await salesController.all(parsedFields);
  return res.status(200).json(sales);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const sale = await salesController.findOne(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const data = req.body;

  try {
    const sale = await salesController.create(data);
    return res.status(201).json({
      created: sale !== null,
      data: sale,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedRecords = await salesController.updateStatus(id, status);
    const sale = await salesController.findOne(id);
    return res.status(200).json({
      updated: updatedRecords > 0,
      data: sale,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRows = await salesController.delete(id);
    return res.status(200).json({
      deleted: deletedRows > 0,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;