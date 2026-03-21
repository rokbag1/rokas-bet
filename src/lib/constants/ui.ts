//Typescript nebenaudoja ENUM :(
// export enum EModalView {
//   Login = 'LOGIN_VIEW',
//   Singup = 'SIGN_UP',
//   Forgot = 'APPROVE',
// }

export type ModalViewTypes = (typeof EModalView)[keyof typeof EModalView];
export const EModalView = {
  Login: "LOGIN_VIEW",
  Signup: "SIGN_UP",
  ForgetPassword: "FORGET_PASSWORD",
  Approve: "APPROVE",
  PlaceItem: "PLACE_ITEM",
} as const;

export const EActionTypes = {
  OpenModal: "OPEN_MODAL",
  CloseModal: "CLOSE_MODAL",
  SetModalView: "SET_MODAL_VIEW",
} as const;

export type ActionTypesKeys = keyof typeof EActionTypes;
export type ActionTypesValues =
  (typeof EActionTypes)[keyof typeof EActionTypes];

export type OpenModalAction = { type: typeof EActionTypes.OpenModal };
export type CloseModalAction = { type: typeof EActionTypes.CloseModal };
export type SetModalViewAction = {
  type: typeof EActionTypes.SetModalView;
  view: ModalViewTypes;
  props?: any;
};
