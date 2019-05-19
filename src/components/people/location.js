import React from 'react';
import { Field } from 'formik';

import * as yup from 'yup';


export const locationValidationSchema = yup.object().shape({
  publicName: yup.string().nullable(),
  number: yup.string().nullable(),
  neighborhood: yup.string().nullable(),
  zipCode: yup.string().nullable(),
  city: yup.object().shape({
    id: yup.number().required(),
    name: yup.string().nullable(),
    ibgeCode: yup.string().nullable()
  }),
  state: yup.object().shape({
    id: yup.number().required(),
    name: yup.string().nullable(),
    federativeUnity: yup.string().nullable(),
    ibgeCode: yup.string().nullable()
  }),
});

export class LocationForm extends React.Component {

  render() {
    return (
      <div className="people-location">

        <label htmlFor="location.publicName">Logradouro </label>
        <Field type="text" name="location.publicName" disabled={true}/>

        <label htmlFor="location.neighborhood">Bairro </label>
        <Field type="text" name="location.neighborhood" disabled={true}/>

        <label htmlFor="location.number">Nº </label>
        <Field type="text" name="location.number" disabled={this.props.isSubmitting}/>

        <label htmlFor="location.zipCode">CEP </label>
        <Field type="text" name="location.zipCode" disabled={this.props.isSubmitting}/>

        <label htmlFor="location.city.name">Cidade </label>
        <Field type="text" name="location.city.name" disabled={true}/>

        <label htmlFor="location.state.name">Estado </label>
        <Field type="text" name="location.state.name" disabled={true}/>

        <button type="button" onClick={() => {this.props.onFindLocationByZipCode()}}>
          Pesquisar
        </button>

      </div>
    );
  }


}


export const mapPostmonLocationToLocation = postmonLocation => {
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
