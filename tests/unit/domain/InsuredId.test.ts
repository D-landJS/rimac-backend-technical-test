import { InsuredId } from '@domain/value-objects/InsuredId';
import { InvalidInsuredIdError } from '@domain/errors';

describe('InsuredId', () => {
  it('acepta un codigo de 5 digitos', () => {
    expect(InsuredId.create('00123').value).toBe('00123');
  });

  it('acepta un codigo con ceros a la izquierda', () => {
    expect(InsuredId.create('00001').value).toBe('00001');
  });

  it.each(['1234', '123456', 'abcde', '', '12a45'])(
    'rechaza "%s" por no ser 5 digitos numericos',
    (invalidValue) => {
      expect(() => InsuredId.create(invalidValue)).toThrow(InvalidInsuredIdError);
    },
  );
});
