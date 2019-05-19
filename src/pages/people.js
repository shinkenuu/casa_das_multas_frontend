import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { fetchPostmonLocation } from '../clients/postmon';
import { getPeople, postPeople, putPeople } from '../clients/backend';

import { ContactForm, contactValidationSchema } from '../components/people/contact';
import { IdentificationForm, identificationValidationSchema } from '../components/people/identification';
import { LocationForm, locationValidationSchema, mapPostmonLocationToLocation } from '../components/people/location';
import { RegistryForm, registryValidationSchema }  from '../components/people/registry';


const peopleValidationSchema = yup.object().shape({
  registry: registryValidationSchema,
  identification: identificationValidationSchema,
  contact: contactValidationSchema,
  location: locationValidationSchema
});


class PeoplePage extends React.Component {

  constructor(props) {
    super(props);
    this.resetPeopleForm = this.resetPeopleForm.bind(this);
    this.resetLocationForm = this.resetLocationForm.bind(this);
    this.setFormikFromFormValues = this.setFormikFromFormValues.bind(this);
    this.state = {
      formValues: peopleFormInitialValues,
      poeple: mapPeopleFormValuesToPeople(peopleFormInitialValues)
    };
  }

  render() {

    return (
      <Formik
        initialValues={this.state.formValues}
        validationSchema={peopleValidationSchema}
        render={( form ) => {

          const hasPeopleId = form.values.registry.id && form.values.registry.id !== '';

          return (

            <div className="people-page">

              <RegistryForm
                onFindPeopleById={() => {
                  this.resetPeopleForm(form);
                }}
              />
              <IdentificationForm />
              <ContactForm />
              <LocationForm
                onFindLocationByZipCode={() => {
                  this.resetLocationForm(form);
                }}
              />

              <button type="button"
                onClick={() => {this.createPeople(form)}}
                disabled={hasPeopleId}
                >Criar<
              /button>

              <button type="button"
                onClick={() => {this.updatePeople(form)}}
                disabled={!hasPeopleId}
                >Atualizar<
              /button>

            </div>

          );
        }}
      />
    );
  }


  async resetPeopleForm(form) {
    const people = await getPeople(form.values.registry.id);

    const peopleFormValues = mapPeopleToPeopleFormValues(people);

    await this.setState({
      formValues: peopleFormValues
    });

    this.setFormikFromFormValues(form);
  }

  async resetLocationForm(form) {
    const zipCode = form.values.location.zipCode;

    const postmonLocation = await fetchPostmonLocation(zipCode);

    if (!postmonLocation) {
      // error
      return;
    }

    const location = mapPostmonLocationToLocation(postmonLocation);

    await this.setState({
      location
    });

    this.setFormValuesFromState(form);
  }

  setFormikFromFormValues(form) {
    form.setValues({
      registry: this.state.formValues.registry,
      identification: this.state.formValues.identification,
      contact: this.state.formValues.contact,
      location: this.state.formValues.location
    });
  }

  async createPeople(form) {
    console.log('Create people');

    const people = mapPeopleFormValuesToPeople(form.values);
    this.setState({ people });

    const createdPeople = await postPeople(people);

    if (createdPeople) {
      await this.setState({
        formValues: mapPeopleToPeopleFormValues(createdPeople),
        people: createdPeople
      });
      this.setFormikFromFormValues(form);
      alert('Pessoa cadastrada com sucesso');
      return;
    }

    alert('Erro ao cadastrar pessoa');
    console.log('Create people result: ',  createdPeople);
  }

  async updatePeople(form) {
    console.log('Update people');

    const people = mapPeopleFormValuesToPeople(form.values);
    this.setState({ people });

    const updatedPeople = await putPeople(people);

    if (updatedPeople) {
      await this.setState({
        formValues: mapPeopleToPeopleFormValues(updatedPeople),
        people: updatedPeople
      });
      this.setFormikFromFormValues(form);
      alert('Pessoa atualizada com sucesso');
      return;
    }

    alert('Erro ao atualizar pessoa');
    console.log('Update people result: ',  updatedPeople);
  }


}

const mapPeopleToPeopleFormValues = people => {
  return {
    registry: {
      id: people.id,
      code: 'b5eb5c8d5bce87de87d5ce7db8ce7d',
      uid: people.uid,
      updated_at: people.updated_at,
      is_active: false,
      is_incomplete_data: people.is_incomplete_data
    },
    identification: {
      legal_type: people.legal_type,
      partner_types: people.partner_types,
      name: people.name,
      nickname: people.nickname,
      cpf_cnpj: people.cpf_cnpj,
      rg_ie: people.rg_ie
    },
    contact: {
      phones: [people.contact.phone_1, people.contact.phone_2],
      names: [people.contact.name_1, people.contact.name_2],
      fax: people.contact.fax,
      cellphone: people.contact.cellphone,
      email: people.contact.email,
      email_nfe: people.contact.email_nfe,
      website: ''
    },
    location: {
      publicName: people.location.public_name,
      number: people.location.number,
      neighborhood: people.location.neighborhood,
      zipCode: people.location.zip_code,
      city: {
        id: people.location.city.id,
        name: people.location.city.name,
        ibgeCode: people.location.ibge_code
      },
      state: {
        id: people.location.state.id,
        name: people.location.state.name,
        federativeUnity: people.location.state.federative_unity,
        ibgeCode: people.location.state.ibge_code
      }
    }
  };
}

const mapPeopleFormValuesToPeople = formValues => {
  const { registry, identification, contact, location } = formValues;
  return {
    id: registry.id,
    uid: registry.uid,
    code: registry.code,
    updated_at: registry.updated_at,
    is_active: registry.is_active,
    is_incomplete_data: registry.is_incomplete_data,

    legal_type: identification.legal_type,
    partner_types: identification.partner_types,
    name: identification.name,
    nickname: identification.nickname,
    cpf_cnpj: identification.cpf_cnpj,
    rg_ie: identification.rg_ie,

    contact: {
      name_1: contact.names[0],
      name_2: contact.names[1],
      phone_1: contact.phones[0],
      phone_2: contact.phones[1],
      fax: contact.fax,
      cellphone: contact.cellphone,
      email: contact.email
    },

    location: {
      public_name: location.publicName,
      number: location.number,
      neighborhood: location.neighborhood,
      zip_code: location.zipCode,
      city: {
        id: location.city.id,
        name: location.city.name,
        ibge_code: location.city.ibgeCode
      },
      state: {
        id: location.state.id,
        name: location.state.name,
        federative_unity: location.state.federativeUnity,
        ibge_code: location.state.ibgeCode
      }
    }
  };
}

const peopleFormInitialValues = {
  registry: {
    id: '',
    code: '',
    registry: '',
    updated_at: '',
    is_active: false
  },
  identification: {
    legal_type: '',
    partner_types: [],
    name: '',
    nickname: '',
    cpf_cnpj: '',
    rg_ie: ''
  },
  contact: {
    phones: ['', ''],
    names: ['', ''],
    fax: '',
    cellphone: '',
    email: '',
    email_nfe: '',
    website: ''
  },
  location: {
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
  }
};

export default PeoplePage;
