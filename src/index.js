function HashMap(originalSize = 12) {
  let size = originalSize;
  let hashMap = new Array(size).fill([]);
  const loadFactor = 0.75;
  let count = 0;

  const hash = (key) => {
    const primeNumber = 15;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  };

  const get = (key) => {
    const index = hash(key);
    const bucket = hashMap[index];

    for (const [bucketKey, value] of bucket) {
      if (key === bucketKey) return value;
    }

    return null;
  };

  const set = (key, value) => {
    if (null == key) throw new Error('Invalid key');
    if (null == value) throw new Error('Invalid value');

    const index = hash(key);
    const bucket = hashMap[index];

    if (!Array.isArray(bucket) || bucket.length === 0) {
      hashMap[index] = [[key, value]];
      ++count;

      return;
    }

    for (let i = 0; i < bucket.length; i++) {
      const bucketKey = bucket[i][0];

      if (bucketKey == key) {
        bucket[i][1] = value;

        return;
      }
    }

    bucket.push([key, value]);

    return;
  };

  const has = (key) => {
    const index = hash(key);
    const bucket = hashMap[index];

    if (!Array.isArray(bucket) || bucket.length === 0) return false;

    return bucket.some(([bucketKey]) => key === bucketKey);
  };

  const length = () => {
    let count = 0;
    for (const bucket of hashMap) {
      if (!Array.isArray(bucket)) continue;

      count += bucket.length;
    }

    return count;
  };

  const clear = () => {
    for (let i = 0; i < size; i++) {
      hashMap[i] = [];
    }
  };

  const keys = () => {
    const allKeys = [];

    for (const bucket of hashMap) {
      if (bucket.length === 0) continue;

      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }

    return allKeys;
  };

  const values = () => {
    const allValues = [];

    for (const bucket of hashMap) {
      if (bucket.length === 0) continue;

      for (const [, value] of bucket) {
        allValues.push(value);
      }
    }

    return allValues;
  };

  const entries = () => {
    const allEntries = [];

    for (const bucket of hashMap) {
      if (bucket.length === 0) continue;

      for (const [key, value] of bucket) {
        allEntries.push([key, value]);
      }
    }

    return allEntries;
  };

  const remove = (key) => {
    const index = hash(key);
    const bucket = hashMap[index];

    if (null == bucket || bucket.length === 0) return false;

    filteredBucket = bucket.filter(([bucketKey]) => key !== bucketKey);

    if (filteredBucket.length === bucket.length) return false;

    hashMap[index] = filteredBucket;

    return true;
  };

  return {
    get,
    set,
    has,
    length,
    clear,
    keys,
    values,
    entries,
    remove,
  };
}

const h = HashMap();
