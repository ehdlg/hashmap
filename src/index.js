function HashMap(size = 12) {
  const size = size;

  const hash = (key) => {
    const primeNumber = 15;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  };

  const hashMap = new Array(size).fill([]);

  const get = (index) => {
    if (typeof index !== 'number') throw new Error('Not a valid index');
    if (index < 0 || index > size) throw new Error('Index out of bounds');

    return hashMap[index];
  };

  const set = (key, value) => {
    //get hash key

    hashMap[hashKey] = value;

    return hashKey;
  };

  return {
    get,
    set,
  };
}

const h = HashMap();
