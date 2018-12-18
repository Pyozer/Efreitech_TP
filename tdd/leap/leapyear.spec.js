/*
```text
on every year that is evenly divisible by 4
  except every year that is evenly divisible by 100
    unless the year is also evenly divisible by 400
```
For example, 1997 is not a leap year, but 1996 is.  1900 is not a leap
year, but 2000 is.
*/

import { isLeap, leapBetween0And9000 } from './leapyear'

describe('A leap year', () => {
  test('year not divisible by 4: common year', () => {
    expect(isLeap(2015)).toEqual(false)
  })

  test('year divisible by 4, not divisible by 100: leap year', () => {
    expect(isLeap(2016)).toEqual(true)
  })

  test('year divisible by 100, not divisible by 400: common year', () => {
    expect(isLeap(2100)).toEqual(false)
  })

  test('year divisible by 400: leap year', () => {
    expect(isLeap(2000)).toEqual(true)
  })

  test('year divisible by 200, not divisible by 400: common year', () => {
    expect(isLeap(1800)).toEqual(false)
  })

  test('year pass is not a integer: common year', () => {
    expect(() => isLeap("test")).toThrow(Error)
  })

  // Test leap year between 0 and 9000
  for (let i = 0; i <= 9000; i++) {
    if (leapBetween0And9000.includes(i))
      test(`year ${i}: Leap year`, () => expect(isLeap(i)).toEqual(true))
    else
      test(`year ${i}: Common year`, () => expect(isLeap(i)).toEqual(false))
  }

})