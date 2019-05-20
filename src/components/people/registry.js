import React from 'react';
import { ErrorMessage, Field } from 'formik';

import * as yup from 'yup';

import '../../styles/people/registry.css';


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
  is_active: yup.boolean().required(),
  is_incomplete_data: yup.boolean().required()
});


export class RegistryForm extends React.Component {

  render() {
    return (
      <div className="people-registry">

        <div className="people-registry-search">

          <label htmlFor="registry.id">Localizar </label>
          <Field name="registry.id" disabled={this.props.isSubmitting} />
          <ErrorMessage name="registry.id">
            {msg => <div className="error error-message">{msg}</div>}
          </ErrorMessage>

          <button type="button" onClick={() => {this.props.onFindPeopleById()}} >
            Pesquisar
          </button>

        </div>

        <div className="people-registry-metadata">

          <div>

            <label htmlFor="registry.code">Código </label>
            <Field name="registry.code" disabled={true} />
            <ErrorMessage name="registry.code">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

          </div>
          <div>

          <label htmlFor="registry.uid">Cadastro </label>
          <Field name="registry.uid" disabled={true} />
          <ErrorMessage name="registry.uid">
            {msg => <div className="error error-message">{msg}</div>}
          </ErrorMessage>

          </div>
          <div>

          <label htmlFor="registry.updated_at">Atualizado em </label>
          <Field name="registry.updated_at" disabled={true} />
          <ErrorMessage name="registry.updated_at">
            {msg => <div className="error error-message">{msg}</div>}
          </ErrorMessage>

          </div>

        </div>

        <div className="people-registry-status">

          <div>

            <label htmlFor="registry.is_active">Status </label>
            <Field component="select" name="registry.is_active" disabled={this.props.isSubmitting}>
              <option value={true}>Ativo</option>
              <option value={false}>Inativo</option>
            </Field>
            <ErrorMessage name="registry.is_active">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

          </div>
          <div>

            <label htmlFor="registry.is_incomplete_data">Dados incompletos </label>
            <Field component="select" name="registry.is_incomplete_data" disabled={this.props.isSubmitting}>
              <option value={true}>Sim</option>
              <option value={false}>Não</option>
            </Field>
            <ErrorMessage name="registry.is_incomplete_data">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

          </div>

        </div>

      </div>
    );
  }

}
