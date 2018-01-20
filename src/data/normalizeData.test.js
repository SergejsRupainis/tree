import normalizeData from './normalizeData';

describe('Normalize data', () => {
  it('check null data', () => {
    expect(normalizeData(null)).toBe(null);
  });

  it('check non-object data', () => {
    expect(normalizeData('test this string')).toBe(null);
  });

  it('check non-object, array data', () => {
    expect(normalizeData([1, 2])).toBe(null);
  });

  it('check first-level normalization, non-array category', () => {
    const data = {
      categories: null,
    };
    const expectedResult = {
      type: 'root',
      id: 0,
      name: '',
    };

    expect(normalizeData(data)).toEqual(expectedResult);
  });

  it('check second-level normalization, non-array brand', () => {
    const data = {
      categories: [
        {
          id: '57b42bfe31b6f0132cb96836',
          name: 'Mobile phones',
          brands: null,
        },
      ],
    };
    const expectedResult = {
      type: 'root',
      id: 0,
      name: '',
      children: [
        {
          id: '57b42bfe31b6f0132cb96836',
          name: 'Mobile phones',
          type: 'category',
        },
      ],
    };

    expect(normalizeData(data)).toEqual(expectedResult);
  });

  it('check normalization', () => {
    const data = {
      categories: [
        {
          id: '57b42bfe31b6f0132cb96836',
          name: 'Mobile phones',
          brands: [
            {
              id: 1,
              name: 'Samsung',
              products: [
                {
                  id: 12345,
                  name: 'Galaxy S4',
                },
                {
                  id: 23456,
                  name: 'Galaxy S5',
                },
              ],
            },
            {
              id: 2,
              name: 'Sony',
              products: [
                {
                  id: 45678,
                  name: 'XPeria Z3',
                },
              ],
            },
          ],
        },
        {
          id: '57b42bfe7e7298611b333652',
          name: 'Computers',
          brands: [
            {
              id: 2,
              name: 'Sony',
              products: [
                {
                  id: 7564534,
                  name: 'Sony Vaio',
                },
              ],
            },
            {
              id: 3,
              name: 'Apple',
              products: [
                {
                  id: 7560001,
                  name: 'MacBook Pro',
                },
                {
                  id: 665451,
                  name: 'MacBook Air',
                },
              ],
            },
          ],
        },
      ],
    };
    const expectedResult = {
      type: 'root',
      id: 0,
      name: '',
      children: [
        {
          id: '57b42bfe31b6f0132cb96836',
          name: 'Mobile phones',
          type: 'category',
          children: [
            {
              id: 1,
              name: 'Samsung',
              type: 'brand',
              children: [
                {
                  id: 12345,
                  name: 'Galaxy S4',
                  type: 'product',
                },
                {
                  id: 23456,
                  name: 'Galaxy S5',
                  type: 'product',
                },
              ],
            },
            {
              id: 2,
              name: 'Sony',
              type: 'brand',
              children: [
                {
                  id: 45678,
                  name: 'XPeria Z3',
                  type: 'product',
                },
              ],
            },
          ],
        },
        {
          id: '57b42bfe7e7298611b333652',
          name: 'Computers',
          type: 'category',
          children: [
            {
              id: 2,
              name: 'Sony',
              type: 'brand',
              children: [
                {
                  id: 7564534,
                  name: 'Sony Vaio',
                  type: 'product',
                },
              ],
            },
            {
              id: 3,
              name: 'Apple',
              type: 'brand',
              children: [
                {
                  id: 7560001,
                  name: 'MacBook Pro',
                  type: 'product',
                },
                {
                  id: 665451,
                  name: 'MacBook Air',
                  type: 'product',
                },
              ],
            },
          ],
        },
      ],
    };

    expect(normalizeData(data)).toEqual(expectedResult);
  });
});
