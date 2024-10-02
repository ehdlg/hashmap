function HashMap(originalSize = 12) {
  const size = originalSize;
  const hashMap = new Array(size).fill([]);

  const hash = (key) => {
    const primeNumber = 15;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  };

  const get = (key) => {
    const hashKey = hash(key);
    const bucket = hashMap[hashKey];

    for (const [bucketKey, value] of bucket) {
      if (key === bucketKey) return value;
    }

    return null;
  };

  const set = (key, value) => {
    const hashKey = hash(key);
    const bucket = hashMap[hashKey];

    if (!Array.isArray(bucket) || bucket.length === 0) return (hashMap[hashKey] = [[key, value]]);

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
    const hashKey = hash(key);
    const bucket = hashMap[hashKey];

    if (!Array.isArray(bucket) || bucket.length === 0) return false;

    for (const [bucketKey] of bucket) {
      if (bucketKey === key) return true;
    }

    return false;
  };

  return {
    get,
    set,
    has,
  };
}

const h = HashMap();
