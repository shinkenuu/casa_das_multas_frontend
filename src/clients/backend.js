import * as yup from 'yup';


const peopleSchema = yup.object().shape({
  id: yup.number().required(),
  uid: yup.string().trim(),
  updated_at: yup.string().required(),
  legal_type: yup.string().trim().max(8).matches(/(FÍSICA|JURÍDICA)/),
  name: yup.string().trim().max(60),
  nickname: yup.string().trim().max(60),
  rg_ie: yup.string().trim().max(20),
  cpf_cnpj: yup.string().trim().max(20),
  partner_types: yup.array().of(
    yup.string().trim().matches(/(CUSTOMER|PROVIDER|COLLABORATOR|CONTRATANTE)/)
  ),
  contact: yup.object().shape({
     name_1: yup.string().trim().max(60),
     name_2: yup.string().trim().max(60),
     phone_1: yup.string().trim().max(20),
     phone_2: yup.string().trim().max(20),
     fax: yup.string().trim().max(20),
     cellphone: yup.string().trim().max(20),
     email: yup.string().trim().max(80),
     email_nfe: yup.string().trim().max(80),
  }),
  location: yup.object().shape({
     public_name: yup.string().trim().max(60),
     number: yup.string().trim().max(10),
     neighborhood: yup.string().trim().max(60),
     reference: yup.string().trim().max(60),
     zip_code: yup.string().trim().max(20),
     city: yup.object().shape({
        id: yup.number().required(),
        name: yup.string().trim().max(100),
        ibge_code: yup.string().trim().max(5),
     }),
     state: yup.object().shape({
        id: yup.number().required(),
        name: yup.string().trim().max(50),
        federative_unity: yup.string().trim().max(2),
        ibge_code: yup.string().trim().max(2),
     })
  }),
  observation: yup.string().trim(),
  is_incomplete_data: yup.boolean().required()
});


export const fetchPeople = people_id => {
  return fetch(`http://localhost:5000/people/${people_id}`)
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
