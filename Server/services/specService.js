const SPEC_LIBRARY = require('../data/specLibrary');

let specsStore = [...SPEC_LIBRARY];
let scheduleStore = [];   
let nextId = specsStore.reduce((max, s) => Math.max(max, s.id), 0) + 1;

function filter(specs, filterModel) {
  if (!filterModel?.items?.length) return specs;
  filterModel.items.forEach(({ field, value, operator }) => {
    if (!field || value == null) return;
    specs = specs.filter((spec) => {
      const v = spec[field];
      switch (operator) {
        case "contains":   return String(v).toLowerCase().includes(String(value).toLowerCase());
        case "equals":     return v === value;
        case "startsWith": return String(v).toLowerCase().startsWith(String(value).toLowerCase());
        case "endsWith":   return String(v).toLowerCase().endsWith(String(value).toLowerCase());
        case ">":          return v > value;
        case "<":          return v < value;
        default:           return true;
      }
    });
  });
  return specs;
}

function sort(specs, sortModel) {
  if (!sortModel?.length) return specs;
  return specs.sort((a, b) => {
    for (const { field, sort } of sortModel) {
      if (a[field] < b[field]) return sort === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sort === "asc" ? 1 : -1;
    }
    return 0;
  });
}

function paginate(specs, paginationModel) {
  const start = paginationModel.page * paginationModel.pageSize;
  return { items: specs.slice(start, start + paginationModel.pageSize), itemCount: specs.length };
}

function getAll() {
  return specsStore;
}

function getLibrary({ paginationModel, filterModel, sortModel }) {
  return paginate(filter(sort([...specsStore], sortModel), filterModel), paginationModel);
}

function getMany({ paginationModel, filterModel, sortModel }) {
  return paginate(filter(sort([...scheduleStore], sortModel), filterModel), paginationModel);
}


function getOne(id) {
  const spec = scheduleStore.find((s) => s.id === id);
  if (!spec) throw new Error("Spec not found");
  return spec;
}

function createOne(data) {
  const newSpec = { ...data, id: nextId++ };
  scheduleStore.push(newSpec);  
  return newSpec;                
}

function updateOne(id, data) {
  let updatedSpec = null;
  scheduleStore = scheduleStore.map((spec) => {
    if (spec.id === id) { updatedSpec = { ...spec, ...data }; return updatedSpec; }
    return spec;
  });
  if (!updatedSpec) throw new Error("Spec not found");
  return updatedSpec;
}

function deleteOne(id) {
  const exists = scheduleStore.find((s) => s.id === id);
  if (!exists) throw new Error("Spec not found");
  scheduleStore = scheduleStore.filter((s) => s.id !== id);
}


function searchLibrary(query) {
  if (!query) return [];
  return SPEC_LIBRARY.filter((spec) =>
    spec.code.toLowerCase().includes(query.toLowerCase()) ||
    spec.desc.toLowerCase().includes(query.toLowerCase()) ||
    spec.supplier.toLowerCase().includes(query.toLowerCase())
  );
}

module.exports = { getAll, getLibrary, getMany, getOne, createOne, updateOne, deleteOne, searchLibrary };