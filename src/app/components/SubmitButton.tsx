'use client';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
 // const { pending, data, method, action } = useFormStatus();

  return (
    <button className ="button-8" role="button"
      type="submit">
        Submit Button
    </button>
  );
}