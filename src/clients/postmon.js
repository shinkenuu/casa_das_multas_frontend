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

export const fetchPostmonLocation = async (zipCode) => {
  return fetch(`https://api.postmon.com.br/v1/cep/${zipCode}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error('Response from postmon API not OK' + response);
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
      console.error(error);
      alert('Ocorreu um erro ao consultar o CEP');
    });
}
