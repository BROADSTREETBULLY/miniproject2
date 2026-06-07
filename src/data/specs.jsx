const INITIAL_SPECS_STORE = [
  {
    id: 1,
    code: 'CH01',
    age: 25,
    joinDate: '2025-07-16T00:00:00.000Z',
    role: 'Finance',
    isFullTime: true,
  },
  {
    id: 2,
    code: 'CH02',
    age: 36,
    joinDate: '2025-07-16T00:00:00.000Z',
    role: 'Market',
    isFullTime: false,
  },
  {
    id: 3,
    code: 'CH03',
    age: 19,
    joinDate: '2025-07-16T00:00:00.000Z',
    role: 'Development',
    isFullTime: true,
  },
];

export function getSpecsStore() {
  const stringifiedSpecs = localStorage.getItem('Specs-store');
  return stringifiedSpecs
    ? JSON.parse(stringifiedSpecs)
    : INITIAL_SPECS_STORE;
}

export function setSpecsStore(Specs) {
  return localStorage.setItem('Specs-store', JSON.stringify(Specs));
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
          case 'contains':
            return String(SpecValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case 'equals':
            return SpecValue === value;
          case 'startsWith':
            return String(SpecValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(SpecValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case '>':
            return SpecValue > value;
          case '<':
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
          return sort === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sort === 'asc' ? 1 : -1;
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

  const SpecToShow = SpecsStore.find(
    (Spec) => Spec.id === SpecId,
  );

  if (!SpecToShow) {
    throw new Error('Spec not found');
  }
  return SpecToShow;
}

export async function createOne(data) {
  const SpecsStore = getSpecsStore();

  const newSpec = {
    id: SpecsStore.reduce((max, Spec) => Math.max(max, Spec.id), 0) + 1,
    ...data,
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
    throw new Error('Spec not found');
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
    issues = [...issues, { message: 'Code is required', path: ['code'] }];
  }

  if (!Spec.age) {
    issues = [...issues, { message: 'Age is required', path: ['age'] }];
  } else if (Spec.age < 18) {
    issues = [...issues, { message: 'Age must be at least 18', path: ['age'] }];
  }

  if (!Spec.joinDate) {
    issues = [...issues, { message: 'Join date is required', path: ['joinDate'] }];
  }

  if (!Spec.role) {
    issues = [...issues, { message: 'Role is required', path: ['role'] }];
  } else if (!['Market', 'Finance', 'Development'].includes(Spec.role)) {
    issues = [
      ...issues,
      {
        message: 'Role must be "Market", "Finance" or "Development"',
        path: ['role'],
      },
    ];
  }

  return { issues };
}
