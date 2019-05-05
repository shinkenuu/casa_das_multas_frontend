import React from 'react';
import { ErrorMessage, Formik, Field, Form } from 'formik';

import * as yup from 'yup';


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
    .max(20, 'Limite de caracteres excedido')
});


class IdentificationForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      nickname: '',
      cpf_cnpf: '',
      rg_ie: ''
    };
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={this.onSubmit}
        validationSchema={identificationValidationSchema}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>

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

            <button type="submit" disabled={isSubmitting}>
              Pesquisar
            </button>

          </Form>
        )}
      />
    );
  }

  async onSubmit(values, actions) {

    this.setState({...values});

    this.props.onFilled('identification', this.state);
    actions.setSubmitting(false);
  }

}

export default IdentificationForm;
