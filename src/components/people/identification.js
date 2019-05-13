import React from 'react';
import { ErrorMessage, Field } from 'formik';

import * as yup from 'yup';

import Checkbox from '../checkbox';


export const identificationValidationSchema = yup.object().shape({
  name: yup.string()
    .max(60, 'Limite de caracteres excedido'),
  nickname: yup.string()
    .max(60, 'Limite de caracteres excedido'),
  cpf_cnpj: yup.string()
    .trim()
    .matches(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    {message: 'Formato inválido'})
    .max(20, 'Limite de caracteres excedido'),
  rg_ie: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido'),
  legal_type: yup.string()
    .matches(/(FÍSICA|JURÍDICA)/, {message: 'Tipo inválido'}),
  partner_types: yup.array().of(
    yup.string()
      .matches(/(CUSTOMER|PROVIDER|COLLABORATOR|CONTRATANTE)/, {message: 'Pessoa inválida'})
  )
});


export class IdentificationForm extends React.Component {

  render() {
    return (
      <div className="people-identification">

        <label htmlFor="identification.legal_type">Pessoa </label>
        <Field component="select" name="identification.legal_type" disabled={this.props.isSubmitting}>
          <option value="FÍSICA">Física</option>
          <option value="JURÍDICA">Jurídica</option>
        </Field>
        <ErrorMessage name="identification.legal_type">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <div className="people-identification-partner-type-wrapper">

          <Checkbox name="identification.partner_types" value="CUSTOMER" displayValue="Cliente" disabled={this.props.isSubmitting}/>

          <Checkbox name="identification.partner_types" value="PROVIDER" displayValue="Fornecedor" disabled={this.props.isSubmitting}/>

          <Checkbox name="identification.partner_types" value="COLLABORATOR" displayValue="Colaborador" disabled={this.props.isSubmitting}/>

          <Checkbox name="identification.partner_types" value="CONTRATANTE" displayValue="Contratante" disabled={this.props.isSubmitting}/>

          <ErrorMessage name="identification.partner_types">
            {msg => <div className="error error-message">{msg}</div>}
          </ErrorMessage>

        </div>

        <label htmlFor="identification.name">Nome/Razão Social </label>
        <Field type="text" name="identification.name" disabled={this.props.isSubmitting}/>
        <ErrorMessage name="identification.name">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="identification.nickname">Apelido/Fantasia </label>
        <Field type="text" name="identification.nickname" disabled={this.props.isSubmitting}/>
        <ErrorMessage name="identification.nickname">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="identification.cpf_cnpj">CPF/CNPJ </label>
        <Field type="text" name="identification.cpf_cnpj" disabled={this.props.isSubmitting}/>
        <ErrorMessage name="identification.cpf_cnpj">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

        <label htmlFor="identification.rg_ie">RG/IE </label>
        <Field type="text" name="identification.rg_ie" disabled={this.props.isSubmitting}/>
        <ErrorMessage name="identification.rg_ie">
          {msg => <div className="error error-message">{msg}</div>}
        </ErrorMessage>

      </div>
    );
  }

}
