import * as Yup from "yup";



const passwordRegexUppercase = /^(?=.*[A-Z]).+$/;
const passwordRegexNumber = /^(?=.*[0-9]).+$/;
const passwordRegexSpecialChar = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>§~`[\]\\/]).+$/;

export const UserSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),

  email: Yup.string()
    .email("Digite um email válido")
    .required("O email é obrigatório"),

  cpf: Yup.string()
    .required("O CPF é obrigatório"),

  phone: Yup.string()
    .matches(/^\(\d{2}\)\s\d{4,5}\-\d{4}$/, "Digite um telefone válido")
    .required("O telefone é obrigatório"),

 
  password: Yup.string()
    .matches(
      passwordRegexUppercase,
      "A senha deve conter pelo menos uma letra maiúscula"
    )
    .matches(passwordRegexNumber, "A senha deve conter pelo menos um número")
    .matches(
      passwordRegexSpecialChar,
      "A senha deve conter pelo menos um caractere especial"
    )
    .required("A senha é obrigatória"),

});

export const VeiculoSchema = Yup.object().shape({
  brand: Yup.string().required("A marca é obrigatório"),
  model: Yup.string().required("O modelo é obrigatório"),
  year: Yup.string().required("O Ano do veiculo é obrigatório"),
  plate: Yup.string().required("A placa é obrigatório"),

})

export const CompanySchema = Yup.object().shape({
  name: Yup.string().required("Nome da companhia é obrigatório"),
  email: Yup.string().required("Email da companhia é obrigátorio"),
  phone: Yup.string().required("Phone da companhia é obrigátorio"),
  cnpj:Yup.string().required("Cnpj da companhia é obrigátorio")
})