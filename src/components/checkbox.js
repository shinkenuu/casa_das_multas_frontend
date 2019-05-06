import React from 'react';
import { Field } from 'formik';


export default function Checkbox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <div className={props.className}>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          <label htmlFor={props.name}>{props.displayValue}</label>
        </div>
      )}
    </Field>
  );
}
