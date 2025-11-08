// React and core dependencies
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// UI Components
import type { ToastActionElement } from '@/components/ui/toast';

/**
 * Maximum number of toasts that can be shown at once
 */
const MAX_TOASTS = 5;

/**
 * Delay in milliseconds before removing a dismissed toast
 */
const TOAST_DISMISS_DELAY = 1000000;

/**
 * Represents a toast notification with all its properties
 */
export interface ToasterToast {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Action types for the toast reducer
 */
export const ToastActionType = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

/**
 * Type for the toast action types
 */
export type ToastActionType = typeof ToastActionType[keyof typeof ToastActionType];

/**
 * Counter for generating unique toast IDs
 */
let toastCounter = 0;

/**
 * Generates a unique ID for a toast
 * @returns A unique string ID
 */
function generateToastId(): string {
  toastCounter = (toastCounter + 1) % Number.MAX_VALUE;
  return toastCounter.toString();
}

/**
 * Action types for the toast reducer
 */
export type ToastAction =
  | {
      type: typeof ToastActionType.ADD_TOAST;
      toast: ToasterToast;
    }
  | {
      type: typeof ToastActionType.UPDATE_TOAST;
      toast: Partial<ToasterToast>;
    }
  | {
      type: typeof ToastActionType.DISMISS_TOAST;
      toastId?: ToasterToast['id'];
    }
  | {
      type: typeof ToastActionType.REMOVE_TOAST;
      toastId?: ToasterToast['id'];
    };

/**
 * State interface for the toast reducer
 */
export interface ToastState {
  toasts: ToasterToast[];
}

/**
 * Map of toast IDs to their removal timeouts
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adds a toast to the removal queue
 * @param toastId - The ID of the toast to remove
 */
const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ToastActionType.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_DISMISS_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Reducer function for managing toast state
 * @param state - Current toast state
 * @param action - Action to perform
 * @returns New toast state
 */
export const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case ToastActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, MAX_TOASTS),
      };

    case ToastActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case ToastActionType.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }

    case ToastActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

/**
 * Array of state change listeners
 */
const stateListeners: Array<(state: ToastState) => void> = [];

/**
 * Current toast state in memory
 */
let currentState: ToastState = { toasts: [] };

/**
 * Dispatches an action to update the toast state
 * @param action - Action to dispatch
 */
function dispatch(action: ToastAction): void {
  currentState = toastReducer(currentState, action);
  stateListeners.forEach((listener) => {
    listener(currentState);
  });
}

/**
 * Type for toast creation props
 */
export type ToastProps = Omit<ToasterToast, 'id'>;

/**
 * Creates a new toast notification
 * @param props - Toast properties
 * @returns Object with toast ID and control methods
 */
export function createToast(props: ToastProps) {
  const id = generateToastId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: ToastActionType.UPDATE_TOAST,
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: ToastActionType.DISMISS_TOAST, toastId: id });

  dispatch({
    type: ToastActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

/**
 * Hook for managing toast notifications
 * @returns Object with toast state and control methods
 */
export function useToast() {
  const [state, setState] = useState<ToastState>(currentState);

  useEffect(() => {
    stateListeners.push(setState);
    return () => {
      const index = stateListeners.indexOf(setState);
      if (index > -1) {
        stateListeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast: createToast,
    dismiss: (toastId?: string) => dispatch({ type: ToastActionType.DISMISS_TOAST, toastId }),
  };
} 