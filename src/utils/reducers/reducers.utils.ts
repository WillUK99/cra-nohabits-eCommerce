import { AnyAction } from "redux"

/**
 * Matchable takes a generic in this case called AC (action creator) and we know this action creator is going to be some function that returns back any action we want -> hence AnyAction
 * 
 * We want this Matchable type to be of the type AC (this type will be an enum value) and an intersection of another type
 *  -> type: is the ts type from one of the createAction overloads, the syntax ['type'] can be used to extract this value because the type we are creating is an object :)  
 *  -> match(): recieves an action which will be of the type AnyAction (AnyAction being a redux action object)
 *    -> So whatever redux action match() gets given, if it passes the check then we know that the redux action given to match() is the return type of the generic AC
 * 
 * Furthermore the AC generic we are passing in for example could be 'FetchCategoriesStart' (category.action.ts) this is an alias for the generic the createAction overloads.
 *  -> see the createAction overloads for the properties they have on them. eg - type: T
 */
export type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type']
  match(action: AnyAction): action is ReturnType<AC>
}

// Ac or actionCreator is a function hence why the generic syntax '<AC extends () => AnyAction ...>'
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string}>(actionCreator: AC): Matchable<AC>
/**
 * Notes for future Joe:
 * We don't need to use the ts <> syntax here as we are explicitly typing the actionCreator param to be a Function 
 *  -> in the case we were not 100% on the type being passed in then we would use the <> generic syntax
 * 
 * We can access the .type of the actionCreator() due to it returning a redux action with a type property and a payload property -> which can be seen below
 *  -> we could also get .payload too if we wanted to
 * 
 * Then we assign two new methods:
 *  -> .type is the action type from the redux action object.... 🤔
 *  -> .match() returns a boolean indicating whether the redux action being passed as a argument matches that of the type which is on the action creator we pass to withMatcher()
 */
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type
  console.log(actionCreator(), type)
  return Object.assign(actionCreator, {
    type,
    match(newReduxAction: AnyAction) {
      // if this returns false then the reducer will carry on passing this down the reducer chain until the condition is true, if it is true then the reducer will return out and not try an other reducers
      return newReduxAction.type === type 
    }
  })
}

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
