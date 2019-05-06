import React from 'react';
import { ErrorMessage, Formik, Field, Form } from 'formik';

import * as yup from 'yup';


const contactValidationSchema = yup.object().shape({
  phones: yup.array().of(
    yup.string()
    .trim()
    .max(60, 'Limite de caracteres excedido')
  ),
  names: yup.array().of(
    yup.string()
    .trim()
    .max(60, 'Limite de caracteres excedido')
  ),
  fax: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido'),
  cellphone: yup.string()
    .trim()
    .max(20, 'Limite de caracteres excedido'),
  email: yup.string()
    .trim()
    .max(80, 'Limite de caracteres excedido'),
  email_nfe: yup.string()
    .trim()
    .max(80, 'Limite de caracteres excedido'),
  website: yup.string()
    .trim()
    .max(4000, 'Limite de caracteres excedido'),
});


class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      phones: ['', ''],
      names: ['', ''],
      fax: '',
      cellphone: '',
      email: '',
      email_nfe: '',
      website: ''
    };
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={this.onSubmit}
        validationSchema={contactValidationSchema}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>

            <label htmlFor="phones[0]">Fone 1 </label>
            <Field name="phones[0]" />
            <ErrorMessage name="phones[0]">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="fax">Fax </label>
            <Field name="fax" />
            <ErrorMessage name="fax">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="names[0]">Contato 1 </label>
            <Field name="names[0]" />
            <ErrorMessage name="names[0]">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="phones[1]">Fone 2 </label>
            <Field name="phones[1]" />
            <ErrorMessage name="phones[1]">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="cellphone">Celular </label>
            <Field name="cellphone" />
            <ErrorMessage name="cellphone">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="names[1]">Contato 2 </label>
            <Field name="names[1]" />
            <ErrorMessage name="names[1]">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="email">Email </label>
            <Field name="email" />
            <ErrorMessage name="email">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="email_nfe">Email NFe </label>
            <Field name="email_nfe" />
            <ErrorMessage name="email_nfe">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

            <label htmlFor="website">Website </label>
            <Field name="website" />
            <ErrorMessage name="website">
              {msg => <div className="error error-message">{msg}</div>}
            </ErrorMessage>

          </Form>
        )}
      />
    );
  }

  onSubmit(values, actions) {

    this.setState({...values});

    this.props.onFilled('contacts', this.state);
    actions.setSubmitting(false);
  }


}

export default ContactForm;
