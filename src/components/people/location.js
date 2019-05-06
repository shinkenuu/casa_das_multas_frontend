import React from 'react';
import { Formik, Field, Form } from 'formik';

import * as yup from 'yup';


const postmonLocationSchema = yup.object().shape({
  logradouro: yup.string().required(),
  bairro: yup.string().required(),
  cep: yup.string().required(),
  cidade: yup.string(),
  estado: yup.string(),
  cidade_info: yup.object().shape({
    codigo_ibge: yup.string().required()
  }),
  estado_info: yup.object().shape({
    nome: yup.string(),
    codigo_ibge: yup.string().required()
  }),
});


class LocationForm extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.getLocationDataFromPostmon = this.getLocationDataFromPostmon.bind(this);
    this.mapPostmonLocationToLocationForm = this.mapPostmonLocationToLocationForm.bind(this);
    this.state = {
      publicName: '',
      number: 0,
      neighborhood: '',
      zipCode: '04013010',
      city: {
        id: null,
        name: '',
        ibgeCode: null
      },
      state: {
        id: null,
        name: '',
        federativeUnity: '',
        ibgeCode: null
      }
    };
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={this.onSubmit}
        render={({ errors, status, touched, isSubmitting }) => (
          <Form>

            <label htmlFor="publicName">Logradouro </label>
            <Field type="text" name="publicName" value={this.state.publicName} disabled={true}/>

            <label htmlFor="neighborhood">Bairro </label>
            <Field type="text" name="neighborhood" value={this.state.neighborhood} disabled={true}/>

            <label htmlFor="number">Nº </label>
            <Field type="text" name="number" disabled={isSubmitting}/>

            <label htmlFor="zipCode">CEP </label>
            <Field type="text" name="zipCode" disabled={isSubmitting}/>

            <label htmlFor="city.name">Cidade </label>
            <Field type="text" name="city.name" value={this.state.city.name} disabled={true}/>

            <label htmlFor="state.name">Estado </label>
            <Field type="text" name="state.name" value={this.state.state.name} disabled={true}/>

            <button type="submit" disabled={isSubmitting}>
              Pesquisar
            </button>

          </Form>
        )}
      />
    );
  }

  async onSubmit(values, actions) {

    const postmonLocation = await this.getLocationDataFromPostmon(values.zipCode);
    const locationForm = this.mapPostmonLocationToLocationForm(postmonLocation);

    this.setState({...locationForm});

    this.props.onFilled('location', this.state);
    actions.setSubmitting(false);
  }

  mapPostmonLocationToLocationForm(postmonLocation) {
    const location = {
      publicName: postmonLocation.logradouro,
      number: null,
      neighborhood: postmonLocation.bairro,
      zipCode: postmonLocation.cep,
      city: {
          id: null,
          name: postmonLocation.cidade,
          ibgeCode: postmonLocation.cidade_info.codigo_ibge
      },
      state: {
          id: null,
          name: postmonLocation.estado_info.nome,
          federativeUnity: postmonLocation.estado,
          ibgeCode: postmonLocation.estado_info.codigo_ibge
      }
    };

    return location;
  }

  getLocationDataFromPostmon(zipCode) {
    return fetch(`https://api.postmon.com.br/v1/cep/${zipCode}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Response from postmon API not OK');
        }
      }).then(postmonLocation => {
        if (postmonLocationSchema
          .isValid(postmonLocation)
          .then(valid => {return valid})) {
          return postmonLocation;
        } else {
          const postmonLocationStringified = JSON.stringify(postmonLocation);
          throw Error('PostmonLocation schema validation failed' + postmonLocationStringified)
        }
      }).catch(error => {
        console.error(JSON.stringify(error));
        alert('Ocorreu um erro ao consultar o endereço');
      });
  }

}

export default LocationForm;
