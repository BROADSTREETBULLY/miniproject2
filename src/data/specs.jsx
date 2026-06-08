import SPEC_LIBRARY from './specLibrary';

export function getSpecsStore() {
  const stringifiedSpecs = localStorage.getItem("Specs-store");
  return stringifiedSpecs ? JSON.parse(stringifiedSpecs) : [];
  // updated to empty array so that list doesn't autopopulate
}


export function searchLibrary(query) {
  if (!query) return [];
  return SPEC_LIBRARY.filter((spec) =>
  spec.code.toLowerCase().includes(query.toLowerCase()) ||
  spec.desc.toLowerCase().includes(query.toLowerCase()) ||
  spec.supplier.toLowerCase().includes(query.toLowerCase())
);
}

export function setSpecsStore(Specs) {
  return localStorage.setItem("Specs-store", JSON.stringify(Specs));
}

export async function getMany({ paginationModel, filterModel, sortModel }) {
  const SpecsStore = getSpecsStore();

  let filteredSpecs = [...SpecsStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredSpecs = filteredSpecs.filter((Spec) => {
        const SpecValue = Spec[field];

        switch (operator) {
          case "contains":
            return String(SpecValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case "equals":
            return SpecValue === value;
          case "startsWith":
            return String(SpecValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(SpecValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case ">":
            return SpecValue > value;
          case "<":
            return SpecValue < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredSpecs.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field] < b[field]) {
          return sort === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sort === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedSpecs = filteredSpecs.slice(start, end);

  return {
    items: paginatedSpecs,
    itemCount: filteredSpecs.length,
  };
}

export async function getAll({ paginationModel, filterModel, sortModel }) {
  const SpecsStore = getSpecsStore();
  const allSpecs = [...SPEC_LIBRARY, ...SpecsStore];
  let filteredSpecs = [...allSpecs];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredSpecs = filteredSpecs.filter((Spec) => {
        const SpecValue = Spec[field];

        switch (operator) {
          case "contains":
            return String(SpecValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case "equals":
            return SpecValue === value;
          case "startsWith":
            return String(SpecValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(SpecValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case ">":
            return SpecValue > value;
          case "<":
            return SpecValue < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredSpecs.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field] < b[field]) {
          return sort === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sort === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedSpecs = filteredSpecs.slice(start, end);

  return {
    items: paginatedSpecs,
    itemCount: filteredSpecs.length,
  };
}

export async function getOne(SpecId) {
  const SpecsStore = getSpecsStore();

  const SpecToShow = SpecsStore.find((Spec) => Spec.id === SpecId) 
    ?? SPEC_LIBRARY.find((Spec) => Spec.id === SpecId);

  if (!SpecToShow) {
    throw new Error("Spec not found");
  }
  return SpecToShow;
}

export async function createOne(data) {
  const SpecsStore = getSpecsStore();

  const newSpec = {
    ...data,
    id: SpecsStore.reduce((max, Spec) => Math.max(max, Spec.id), 0) + 1,
    
  };

  setSpecsStore([...SpecsStore, newSpec]);

  return newSpec;
}

export async function updateOne(SpecId, data) {
  const SpecsStore = getSpecsStore();

  let updatedSpec = null;

  setSpecsStore(
    SpecsStore.map((Spec) => {
      if (Spec.id === SpecId) {
        updatedSpec = { ...Spec, ...data };
        return updatedSpec;
      }
      return Spec;
    }),
  );

  if (!updatedSpec) {
    throw new Error("Spec not found");
  }
  return updatedSpec;
}

export async function deleteOne(SpecId) {
  const SpecsStore = getSpecsStore();

  setSpecsStore(SpecsStore.filter((Spec) => Spec.id !== SpecId));
}

// Validation follows the [Standard Schema](https://standardschema.dev/).
export function validate(Spec) {
  let issues = [];

  if (!Spec.code) {
    issues = [...issues, { message: "Code is required", path: ["code"] }];
  }

  if (!Spec.desc) {
    issues = [
      ...issues,
      { message: "Description is required", path: ["desc"] },
    ];
  }

  if (!Spec.supplier) {
    issues = [
      ...issues,
      { message: "Supplier is required", path: ["supplier"] },
    ];
  }

  return { issues };
}
