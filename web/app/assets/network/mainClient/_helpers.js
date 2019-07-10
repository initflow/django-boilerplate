export const transformListModel = Model => data => {
  if (Array.isArray(data)) {
    return data.map(x => new Model(x));
  }
  if (Array.isArray(data.data)) {
    return data.data.map(x => new Model(x));
  } 
  return [];
};