/// <reference types="vitest" />

export interface CustomMatchers<R> extends Record<string, any> {
  toHaveBeenCalledAfter(
    mock:
      | jest.MockInstance<any, any[]>
      | import("vitest").MockInstance<any, any[]>,
    failIfNoFirstInvocation?: boolean
  ): R;

  toHaveBeenCalledBefore(
    mock:
      | jest.MockInstance<any, any[]>
      | import("vitest").MockInstance<any, any[]>,
    failIfNoSecondInvocation?: boolean
  ): R;

  toHaveBeenCalledExactlyOnceWith(...args: unknown[]): R;
  toBeInTheDocument(): R;
}
