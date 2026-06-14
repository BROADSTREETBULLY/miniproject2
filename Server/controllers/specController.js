
const specService = require("../services/specService");

function getAll(req, res) {
  try {
    const { paginationModel, filterModel, sortModel } = req.query;

    const result = specService.getMany({
      paginationModel: paginationModel ? JSON.parse(paginationModel) : { page: 0, pageSize: 10 },
      filterModel: filterModel ? JSON.parse(filterModel) : { items: [] },
      sortModel: sortModel ? JSON.parse(sortModel) : [],
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function getLibrary(req, res) {
  try {
    const { paginationModel, filterModel, sortModel } = req.query;

    const result = specService.getLibrary({
      paginationModel: paginationModel ? JSON.parse(paginationModel) : { page: 0, pageSize: 10 },
      filterModel: filterModel ? JSON.parse(filterModel) : { items: [] },
      sortModel: sortModel ? JSON.parse(sortModel) : [],
    });

    res.json(result);
  } catch (err) {
    console.error('getLibrary error:', err); 
    res.status(500).json({ error: err.message });
  }
}

function getOne(req, res) {
  try {
    const id = Number(req.params.id);
    const spec = specService.getOne(id);
    res.json(spec);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

function createOne(req, res) {
  try {
    const newSpec = specService.createOne(req.body);
    res.status(201).json(newSpec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function updateOne(req, res) {
  try {
    const id = Number(req.params.id);
    const updatedSpec = specService.updateOne(id, req.body);
    res.json(updatedSpec);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

function deleteOne(req, res) {
  try {
    const id = Number(req.params.id);
    specService.deleteOne(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

function searchLibrary(req, res) {
  try {
    const { q } = req.query;
    const results = specService.searchLibrary(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll, getLibrary, getOne, createOne, updateOne, deleteOne, searchLibrary };