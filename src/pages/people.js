import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import { fetchPostmonLocation } from '../clients/postmon';
import { fetchPeople } from '../clients/backend';

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
    this.setFormValuesFromState = this.setFormValuesFromState.bind(this);
    this.mapPeopleToPeopleForm = this.mapPeopleToPeopleForm.bind(this);
    this.state = {
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
        cpf_cnpf: '',
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
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={peopleValidationSchema}
        render={( form ) => {

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

            </div>

          );
        }}
      />
    );
  }


  async resetPeopleForm(form) {
    const people = await fetchPeople(form.values.registry.id);

    const peopleForm = this.mapPeopleToPeopleForm(people);

    await this.setState(peopleForm);

    this.setFormValuesFromState(form);
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

  mapPeopleToPeopleForm(people) {
    return {
      registry: {
        id: people.id,
        code: 'b5eb5c8d5bce87de87d5ce7db8ce7d',
        uid: people.uid,
        updated_at: people.updated_at,
        is_active: false
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

  setFormValuesFromState(form) {
    form.setValues({
      registry: this.state.registry,
      identification: this.state.identification,
      contact: this.state.contact,
      location: this.state.location
    });
  }


}

export default PeoplePage;

/*
{
  registry: {
    id: people_id,
    code: 'b5eb5c8d5bce87de87d5ce7db8ce7d',
    uid: '1236456234',
    updated_at: '2019-04-23',
    is_active: true
  },
  identification: {
    legal_type: 'FÍSICA',
    partner_type: ['FORNECEDOR', 'COLABORADOR'],
    name: 'Natanael Delatorre Junior',
    nickname: 'Junin',
    cpf_cnpj: '123.534.234-84',
    rg_ie: '23.423.645-2'
  },
  contact: {
    phones: ['(19) 3866-4507', ''],
    names: ['Natanael Delatorre', ''],
    fax: '',
    cellphone: '',
    email: 'natdel@gmail.com',
    email_nfe: '',
    website: ''
  },
  location: {
    publicName: 'Rua Remanso',
    number: 21,
    neighborhood: 'Vila Mariana',
    zipCode: '04013010',
    city: {
      id: null,
      name: 'São Paulo',
      ibgeCode: null
    },
    state: {
      id: null,
      name: 'São Paulo',
      federativeUnity: 'SP',
      ibgeCode: null
    }
  }
};
*/
