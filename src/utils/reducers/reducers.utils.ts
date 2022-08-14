import { AnyAction } from "redux"

export type ActionWithPayload<T, P> = {
  type: T,
  payload: P,
}

export type Action<T> = {
  type: T,
}

// function overloading - can only be done with OG functions
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T extends string>(type: T, payload: void): Action<T>

// T being the 'type' we are passing into the function e.g category.types.ts
// P being the payload we are passing in
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }
}
