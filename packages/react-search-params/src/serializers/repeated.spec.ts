import { repeated } from './repeated';

describe('repeated serializer', () => {
  it('serializes scalar and array values', () => {
    const serializer = repeated();

    expect(serializer.serialize('abc')).toEqual(['abc']);
    expect(serializer.serialize(12)).toEqual(['12']);
    expect(serializer.serialize(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('deserializes single and repeated values', () => {
    const serializer = repeated();

    expect(
      serializer.deserialize(new URLSearchParams('q=hello&page=2')),
    ).toEqual({
      q: 'hello',
      page: '2',
    });

    expect(
      serializer.deserialize(new URLSearchParams('tags=red&tags=blue')),
    ).toEqual({
      tags: ['red', 'blue'],
    });
  });
});
