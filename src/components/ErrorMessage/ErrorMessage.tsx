/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

function ErrorMessage({
  error,
}: {
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}) {
  return (
    <div className="error text-red-600">
      {(error as React.ReactNode) || null}
    </div>
  );
}

export default ErrorMessage;
