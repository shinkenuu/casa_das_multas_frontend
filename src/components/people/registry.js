import React from 'react';
import { ErrorMessage, Field } from 'formik';

import * as yup from 'yup';


export const registryValidationSchema = yup.object().shape({
  id: yup.string()
    .trim()
    .max(60, 'Limite de caracteres excedido')
    .nullable(),
  code: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido')
    .nullable(),
  uid: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido')
    .nullable(),
  updated_at: yup.string()
    .trim()
    .max(80, 'Limite de caracteres excedido')
    .nullable(),
  is_active: yup.boolean().required()
});


export class RegistryForm extends React.Component {

  render() {
    return (
      <div className="people-registry">

        <label htmlFor="registry.id">Localizar </label>
        <Field name="registry.id" disabled={this.props.isSubmitting} />
        <ErrorMessage name="registry.id">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <button type="button" onClick={() => {this.props.onFindPeopleById()}} >
          Pesquisar
        </button>

        <label htmlFor="registry.code">Código </label>
        <Field name="registry.code" disabled={true} />
        <ErrorMessage name="registry.code">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="registry.uid">Cadastro </label>
        <Field name="registry.uid" disabled={true} />
        <ErrorMessage name="registry.uid">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="registry.updated_at">Atualizado em </label>
        <Field name="registry.updated_at" disabled={true} />
        <ErrorMessage name="registry.updated_at">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="registry.is_active">Pessoa </label>
        <Field component="select" name="registry.is_active" disabled={this.props.isSubmitting}>
          <option value={true}>Ativo</option>
          <option value={false}>Inativo</option>
        </Field>
        <ErrorMessage name="registry.is_active">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

      </div>
    );
  }

}
