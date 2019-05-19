import React from 'react';
import { ErrorMessage, Field } from 'formik';

import * as yup from 'yup';


export const contactValidationSchema = yup.object().shape({
  phones: yup.array().of(
    yup.string()
    .trim()
    .max(60, 'Limite de caracteres excedido')
    .nullable()
  ),
  names: yup.array().of(
    yup.string()
    .trim()
    .max(60, 'Limite de caracteres excedido')
    .nullable()
  ),
  fax: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido')
    .nullable(),
  cellphone: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido')
    .nullable(),
  email: yup.string()
    .trim()
    .max(80, 'Limite de caracteres excedido')
    .nullable(),
  email_nfe: yup.string()
    .trim()
    .max(80, 'Limite de caracteres excedido')
    .nullable()
});


export class ContactForm extends React.Component {

  render() {
    return (
      <div className="people-contact">

        <label htmlFor="contact.phones[0]">Fone 1 </label>
        <Field name="contact.phones[0]" />
        <ErrorMessage name="contact.phones[0]">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.fax">Fax </label>
        <Field name="contact.fax" />
        <ErrorMessage name="contact.fax">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.names[0]">Contato 1 </label>
        <Field name="contact.names[0]" />
        <ErrorMessage name="contact.names[0]">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.phones[1]">Fone 2 </label>
        <Field name="contact.phones[1]" />
        <ErrorMessage name="contact.phones[1]">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.cellphone">Celular </label>
        <Field name="contact.cellphone" />
        <ErrorMessage name="contact.cellphone">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.names[1]">Contato 2 </label>
        <Field name="contact.names[1]" />
        <ErrorMessage name="contact.names[1]">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.email">Email </label>
        <Field name="contact.email" />
        <ErrorMessage name="contact.email">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.email_nfe">Email NFe </label>
        <Field name="contact.email_nfe" />
        <ErrorMessage name="contact.email_nfe">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="contact.website">Website </label>
        <Field name="contact.website" />
        <ErrorMessage name="contact.website">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

      </div>
    );
  }
}
