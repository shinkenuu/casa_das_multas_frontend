import React from 'react';
import { ErrorMessage, Formik, Field, Form } from 'formik';

import * as yup from 'yup';

import Checkbox from '../checkbox';


const identificationValidationSchema = yup.object().shape({
  name: yup.string()
    .max(60, 'Limite de caracteres excedido'),
  nickname: yup.string()
    .max(60, 'Limite de caracteres excedido'),
  cpf_cnpf: yup.string()
    .trim()
    .matches(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    {message: 'Formato inválido'})
    .max(20, 'Limite de caracteres excedido'),
  rg_ie: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido'),
  legal_type: yup.string()
    .matches(/(FÍSICA|JURÍDICA)/, {message: 'Tipo inválido'}),
  partner_type: yup.array().of(
    yup.string()
      .matches(/(CLIENTE|FORNECEDOR|COLABORADOR|CONTRATANTE)/, {message: 'Pessoa inválida'})
  )
});


class IdentificationForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      nickname: '',
      cpf_cnpf: '',
      rg_ie: '',
      legal_type: '',
      partner_type: []
    };
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={this.onSubmit}
        validationSchema={identificationValidationSchema}
        render={({ isSubmitting }) => (
          <Form>

            <label htmlFor="legal_type">Pessoa </label>
            <Field component="select" name="legal_type" disabled={isSubmitting}>
              <option value="FÍSICA">Física</option>
              <option value="JURÍDICA">Jurídica</option>
            </Field>
            <ErrorMessage name="legal_type">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <div className="person-type-wrapper">

              <Checkbox name="partner_type" value="CLIENTE" displayValue="Cliente" disabled={isSubmitting}/>

              <Checkbox name="partner_type" value="FORNECEDOR" displayValue="Fornecedor" disabled={isSubmitting}/>

              <Checkbox name="partner_type" value="COLABORADOR" displayValue="Colaborador" disabled={isSubmitting}/>

              <Checkbox name="partner_type" value="CONTRATANTE" displayValue="Contratante" disabled={isSubmitting}/>

              <ErrorMessage name="partner_type">
                {msg => <div className="error error-message">{msg}</div>}
              </ErrorMessage>

            </div>

            <label htmlFor="name">Nome/Razão Social </label>
            <Field type="text" name="name" disabled={isSubmitting}/>
            <ErrorMessage name="name">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="nickname">Apelido/Fantasia </label>
            <Field type="text" name="nickname" disabled={isSubmitting}/>
            <ErrorMessage name="nickname">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="cpf_cnpf">CPF/CNPJ </label>
            <Field type="text" name="cpf_cnpf" disabled={isSubmitting}/>
            <ErrorMessage name="cpf_cnpf">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="rg_ie">RG/IE </label>
            <Field type="text" name="rg_ie" disabled={isSubmitting}/>
            <ErrorMessage name="rg_ie">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

          </Form>
        )}
      />
    );
  }

  onSubmit(values, actions) {

    this.setState({...values});

    this.props.onFilled('identification', this.state);
    actions.setSubmitting(false);
  }

}

export default IdentificationForm;
