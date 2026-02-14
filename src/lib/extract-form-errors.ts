import { FieldErrors, FieldValues } from "react-hook-form";

export function extractFormErrors<T extends FieldValues>(
  errors: FieldErrors<T>,
) {
  const errorMessages: string[] = [];

  for (const key in errors) {
    errorMessages.push(errors[key]?.message as string);
  }

  return errorMessages;
}
