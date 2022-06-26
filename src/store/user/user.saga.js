import { takeLatest, all, call, put } from 'redux-saga/effects'

import { USER_ACTION_TYPES } from './user.types'

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  emailSignUpSuccess,
  emailSignUpFailed,
} from './user.action'

import {
  createUserSnapshotFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signOutUser,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

// consolidating logic for getting user snaphot here instead of doing it per component
export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    // getting the snapshot instead of the userDoc as the snapshot has the actual data of the user, whereas the userDoc only has the reference to the user/where the user is stored in the database
    const userSnapshot = yield call(createUserSnapshotFromAuth, userAuth, additionalDetails)
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithGoogle() {
  try {
    // yield is similar to await when in a generator
    const { user } = yield call(signInWithGooglePopup) // user is the user object from firebase auth
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    console.log("error with signInWithGoogle")
    yield put(signInFailed(error))
  }
}

export function* signInWithEmail({ payload: { email, password } }) { //can get the action payload that was passed to the reducer in order to get user auth
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
    console.log(user)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    console.log("error with signInWithEmail")
    yield put(signInFailed(error))
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(emailSignUpSuccess(user, { displayName }))
  } catch (error) {
    console.log("error with signInWithEmail")
    yield put(emailSignUpFailed(error))
  }
}

export function* isUserAuthenticatedAsync() {
  try {
    const user = yield call(getCurrentUser) // checks to see if user is logged in already -> getCurrentUser is now a promise that resolves to the user object
    if (!user) return
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signOutAll() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailed(error))
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticatedAsync)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutAll)
}

export function* onEmailSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUp) // email sign up is two seperate actions, one to signUp 1/2
}

export function* onEmailSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, signInAfterSignUp) // email sign up is two seperate actions, and another to authenticate and signIn 2/2
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onEmailSignUpStart),
    call(onEmailSignUpSuccess),
  ])
}