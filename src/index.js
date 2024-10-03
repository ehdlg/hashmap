function HashMap(originalSize = 12) {
  let size = originalSize;
  let buckets = Array.from({ length: size }, () => []);
  let count = 0;
  const loadFactor = 0.75;

  const hash = (key) => {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  };

  const get = (key) => {
    const index = hash(key);
    const bucket = buckets[index];

    for (const [bucketKey, value] of bucket) {
      if (key === bucketKey) return value;
    }

    return null;
  };

  const set = (key, value) => {
    if (null == key) throw new Error('Invalid key');
    if (null == value) throw new Error('Invalid value');

    if (count / size >= loadFactor) grow();

    const index = hash(key);
    const bucket = buckets[index];

    if (!Array.isArray(bucket) || bucket.length === 0) {
      buckets[index] = [[key, value]];
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
    const bucket = buckets[index];

    if (!Array.isArray(bucket) || bucket.length === 0) return false;

    return bucket.some(([bucketKey]) => key === bucketKey);
  };

  const length = () => {
    let count = 0;
    for (const bucket of buckets) {
      if (!Array.isArray(bucket)) continue;

      count += bucket.length;
    }

    return count;
  };

  const clear = () => {
    buckets = Array.from({ length: size }, () => []);
  };

  const keys = () => {
    const allKeys = [];

    for (const bucket of buckets) {
      if (bucket.length === 0) continue;

      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }

    return allKeys;
  };

  const values = () => {
    const allValues = [];

    for (const bucket of buckets) {
      if (bucket.length === 0) continue;

      for (const [, value] of bucket) {
        allValues.push(value);
      }
    }

    return allValues;
  };

  const entries = () => {
    const allEntries = [];

    for (const bucket of buckets) {
      if (bucket.length === 0) continue;

      for (const [key, value] of bucket) {
        allEntries.push([key, value]);
      }
    }

    return allEntries;
  };

  const grow = () => {
    size *= 2;
    const newBuckets = Array.from({ length: size }, () => []);
    const currentEntries = entries();

    currentEntries.forEach(([key, value]) => {
      const index = hash(key);
      newBuckets[index].push([key, value]);
    });

    buckets = newBuckets;
  };

  const remove = (key) => {
    const index = hash(key);
    const bucket = buckets[index];

    if (null == bucket || bucket.length === 0) return false;

    filteredBucket = bucket.filter(([bucketKey]) => key !== bucketKey);

    if (filteredBucket.length === bucket.length) return false;

    buckets[index] = filteredBucket;

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
    grow,
  };
}

const test = HashMap();
