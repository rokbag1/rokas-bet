"use client";

import {
  EActionTypes,
  EModalView,
  type CloseModalAction,
  type ModalViewTypes,
  type OpenModalAction,
  type SetModalViewAction,
} from "@lib/constants/ui";
import {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useContext,
  type FC,
  type ReactNode,
} from "react";

export type TModalProps = any;

export interface State {
  displayModal: boolean;
  modalView: ModalViewTypes;
  modalProps?: any;
}

const initialState = {
  displayModal: false,
  modalView: EModalView.Login,
  modalProps: null,
};

interface IContext extends State {
  openModal: () => void;
  closeModal: () => void;
  setModalView: (view: ModalViewTypes, props?: TModalProps) => void;
}

export type Action = OpenModalAction | CloseModalAction | SetModalViewAction;

export const UIContext = createContext<State | any>(initialState);

//Kadangi Context yra pastatytas ant Observable pattern, lengviau debuginti kai context turi name
UIContext.displayName = "UIContext";

export function uiReducer(state: State, action: Action): State {
  switch (action.type) {
    case EActionTypes.OpenModal:
      return {
        ...state,
        displayModal: true,
      };

    case EActionTypes.CloseModal:
      return {
        ...state,
        displayModal: false,
      };

    case EActionTypes.SetModalView:
      return {
        ...state,
        modalView: action.view,
        modalProps: action.props,
      };

    default:
      return state;
  }
}
export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const openModal = useCallback(
    () => dispatch({ type: EActionTypes.OpenModal }),
    [dispatch],
  );
  const closeModal = useCallback(
    () => dispatch({ type: EActionTypes.CloseModal }),
    [dispatch],
  );
  const setModalView = useCallback(
    (view: ModalViewTypes, props?: TModalProps) =>
      dispatch({ type: EActionTypes.SetModalView, view, props }),
    [dispatch],
  );

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
    }),
    [state],
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context: IContext = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }

  return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({
  children,
}) => <UIProvider>{children}</UIProvider>;
