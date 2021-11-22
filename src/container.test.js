/**
 * @jest-environment jsdom
 */

import { expect, jest } from "@jest/globals";
import { getContainerDimensions } from "./container";

test("width and height available", async () => {
  const injected = { width: 10, height: 10 };
  const getBoundingClientRectSpy = jest.fn(() => injected);
  global.document.getElementById = jest.fn(() => ({
    getBoundingClientRect: getBoundingClientRectSpy,
  }));
  const actual = await getContainerDimensions("ignoredId");
  expect(actual).toStrictEqual(injected);
});

test("width initially unavailable", async () => {
  const initiallyZero = { width: 0, height: 10 };
  const finalValue = { width: 10, height: 10 };
  const getBoundingClientRectSpy = jest
    .fn()
    .mockReturnValueOnce(initiallyZero)
    .mockReturnValueOnce(finalValue);
  global.document.getElementById = jest.fn(() => ({
    getBoundingClientRect: getBoundingClientRectSpy,
  }));
  const actual = await getContainerDimensions("ignoredId");
  expect(actual).toStrictEqual(finalValue);
});

test("height initially unavailable", async () => {
  const initiallyZero = { width: 10, height: 0 };
  const finalValue = { width: 10, height: 10 };
  const getBoundingClientRectSpy = jest
    .fn()
    .mockReturnValueOnce(initiallyZero)
    .mockReturnValueOnce(finalValue);
  global.document.getElementById = jest.fn(() => ({
    getBoundingClientRect: getBoundingClientRectSpy,
  }));
  const actual = await getContainerDimensions("ignoredId");
  expect(actual).toStrictEqual(finalValue);
});

test("width always unavailable", async () => {
  const injected = { width: 0, height: 10 };
  const getBoundingClientRectSpy = jest.fn(() => injected);
  global.document.getElementById = jest.fn(() => ({
    getBoundingClientRect: getBoundingClientRectSpy,
  }));

  expect.assertions(2);
  try {
    await getContainerDimensions("ignoredId");
  } catch (error) {
    expect(error).not.toBeNull();
    expect(error).toMatch(
      /width or height not set: (\d+)x(\d+), but ran out of attempts/
    );
  }
});

test("height always unavailable", async () => {
  const injected = { width: 10, height: 0 };
  const getBoundingClientRectSpy = jest.fn(() => injected);
  global.document.getElementById = jest.fn(() => ({
    getBoundingClientRect: getBoundingClientRectSpy,
  }));

  expect.assertions(2);
  try {
    await getContainerDimensions("ignoredId");
  } catch (error) {
    expect(error).not.toBeNull();
    expect(error).toMatch(
      /width or height not set: (\d+)x(\d+), but ran out of attempts/
    );
  }
});
