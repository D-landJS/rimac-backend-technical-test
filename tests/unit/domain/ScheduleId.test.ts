import { ScheduleId } from '@domain/value-objects/ScheduleId';
import { InvalidScheduleIdError } from '@domain/errors';

describe('ScheduleId', () => {
  it('acepta un entero positivo', () => {
    expect(ScheduleId.create(100).value).toBe(100);
  });

  it.each([0, -1, 1.5, NaN])('rechaza %p por no ser un entero positivo', (invalidValue) => {
    expect(() => ScheduleId.create(invalidValue)).toThrow(InvalidScheduleIdError);
  });
});
