import * as yup from 'yup';


const peopleSchema = yup.object().shape({
  id: yup.number().required(),
  uid: yup.string().trim().nullable(),
  updated_at: yup.string().required(),
  legal_type: yup.string().trim().max(8).matches(/(FÍSICA|JURÍDICA)/).nullable(),
  name: yup.string().trim().max(60).nullable(),
  nickname: yup.string().trim().max(60).nullable(),
  rg_ie: yup.string().trim().max(20).nullable(),
  cpf_cnpj: yup.string().trim().max(20).nullable(),
  partner_types: yup.array().of(
    yup.string().trim().matches(/(CUSTOMER|PROVIDER|COLLABORATOR|CONTRATANTE)/)
  ),
  contact: yup.object().shape({
     name_1: yup.string().trim().max(60).nullable(),
     name_2: yup.string().trim().max(60).nullable(),
     phone_1: yup.string().trim().max(20).nullable(),
     phone_2: yup.string().trim().max(20).nullable(),
     fax: yup.string().trim().max(20).nullable(),
     cellphone: yup.string().trim().max(20).nullable(),
     email: yup.string().trim().max(80).nullable(),
     email_nfe: yup.string().trim().max(80).nullable(),
  }),
  location: yup.object().shape({
     public_name: yup.string().trim().max(60).nullable(),
     number: yup.string().trim().max(10).nullable(),
     neighborhood: yup.string().trim().max(60).nullable(),
     reference: yup.string().trim().max(60).nullable(),
     zip_code: yup.string().trim().max(20).nullable(),
     city: yup.object().shape({
        id: yup.number().required(),
        name: yup.string().trim().max(100).nullable(),
        ibge_code: yup.string().trim().max(5).nullable(),
     }),
     state: yup.object().shape({
        id: yup.number().required(),
        name: yup.string().trim().max(50).nullable(),
        federative_unity: yup.string().trim().max(2).nullable(),
        ibge_code: yup.string().trim().max(2).nullable(),
     })
  }),
  observation: yup.string().trim().nullable(),
  is_incomplete_data: yup.boolean().required()
});


export const getPeople = people_id => {
  return fetch(`http://192.168.0.250:5000/people/${people_id}`)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw Error('Response from backend API not OK' + response);
      }
    }).then(people => {
      if (peopleSchema
        .isValid(people)
        .then(valid => {return valid})) {
        return people;
      } else {
        const peopleStringified = JSON.stringify(people);
        throw Error('People schema validation failed' + peopleStringified)
      }
    }).catch(error => {
      console.error(error);
      alert('Ocorreu um erro na busca pelo cadastro da pessoa');
    });
}

export const postPeople = people => {
  const isValidPeople = peopleSchema.isValid(people).then(valid => valid);

  if(!isValidPeople) {
    console.log('Attempt to post an invalid schema people: ' + people);
    return null;
  }

  console.log('POSTing people: ' + people);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(people)
  }

  return fetch('http://192.168.0.250:5000/people/', fetchOptions)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw Error('Response from backend API not OK' + response);
      }
    })
    .catch(error => {
      console.error(error);
      alert('Ocorreu um erro na criação do cadastro da pessoa');
    });
}


export const putPeople = people => {
  const isValidPeople = peopleSchema.isValid(people).then(valid => valid);

  if(!isValidPeople) {
    console.log('Attempt to post an invalid schema people: ' + people);
    return null;
  }

  console.log('PUTting people: ' + people);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(people)
  }

  return fetch(`http://192.168.0.250:5000/people/${people.id}`, fetchOptions)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw Error('Response from backend API not OK' + response);
      }
    })
    .catch(error => {
      console.error(error);
      alert('Ocorreu um erro na atualização do  cadastro da pessoa');
    });
}
