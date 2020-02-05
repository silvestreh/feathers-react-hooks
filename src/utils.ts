import omit from 'lodash.omit';
import sift from 'sift';

export const isRecordInData = (record: object, list: object[], idField: string) => {
  const index: number = list.findIndex((r: object) => r[idField] === record[idField]);
  const isInData: boolean = index >= 0;
  return { index, isInData };
};

export const allowedOperators = [
  '$in',
  '$nin',
  '$exists',
  '$gte',
  '$gt',
  '$lte',
  '$lt',
  '$eq',
  '$ne',
  '$mod',
  '$all',
  '$and',
  '$or',
  '$nor',
  '$not',
  '$size',
  '$type',
  '$regex',
  '$where',
  '$elemMatch'
];

export const handleCreate = (created: object, result: FResponse, query: object, idField: string, handleChange: Function) => {
  const { data } = result;
  const shouldUpdateData = isRecordInData(created, data, idField);
  const keys = Object.keys(query)
    .filter(key => (
      key.includes('$') && !allowedOperators.includes(key)
    ));
  //@ts-ignore
  const filter = sift(omit(query, ...keys));

  if (filter(created) && !shouldUpdateData.isInData) {
    data.unshift(created);

    if (data.length > result.limit) {
      data.pop();
    }
  }

  handleChange({
    ...omit(result, 'data'),
    data
  });
};

export const handlePatch = (updated: object, result: FResponse, idField: string, handleChange: Function) => {
  const { data } = result;
  const shouldUpdateData = isRecordInData(updated, data, idField);

  if (shouldUpdateData.isInData) {
    data[shouldUpdateData.index] = updated;
    handleChange({
      ...omit(result, 'data'),
      data
    });
  }
};

export const handleRemove = async (removed: object, result: FResponse, idField: string, handleChange: Function) => {
  const { data } = result;
  const count =  data.length;
  const shouldUpdateData = isRecordInData(removed, data, idField);

  if (shouldUpdateData.isInData) {
    const updatedData: object[] = [];

    for (let i: number = 0; i < count; i++) {
      const current = data[i];

      if (current[idField] !== removed[idField]) {
        updatedData.push(current);
      }
    }

    handleChange({
      ...omit(result, 'data'),
      data: updatedData
    });
  }
};
