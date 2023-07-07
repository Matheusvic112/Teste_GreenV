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
    .required("O CPF é obrigatório").max(11 , "O cpf deve ter no máximo 11 caracteres"),

  phone: Yup.string()
    .matches(/^\(\d{2}\)\s\d{4,5}\-\d{4}$/, "Digite um telefone válido (99) 89999-9999")
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
  brand: Yup.string().required("A marca é obrigatório").max(100, "A marca deve ter no máximo 50 caracteres"),
  model: Yup.string().required("O modelo é obrigatório"),
  year: Yup.string().required("O Ano do veiculo é obrigatório").max(4, "O ano deve ter no máximo 4 caracteres"),
  plate: Yup.string().required("A placa é obrigatório"),

})
export const VeiculoPachtSchema = Yup.object().shape({
  brand: Yup.string().max(100, "A marca deve ter no máximo 50 caracteres"),
  model: Yup.string(),
  year: Yup.string().max(4, "O ano deve ter no máximo 4 caracteres"),
  plate: Yup.string()

})

export const CompanySchema = Yup.object().shape({
  name: Yup.string().required("Nome da companhia é obrigatório"),
  email: Yup.string().required("Email da companhia é obrigátorio"),
  phone: Yup.string()
  .matches(/^\(\d{2}\)\s\d{4,5}\-\d{4}$/, "Digite um telefone válido (99) 89999-9999")
  .required("O telefone é obrigatório"),
    cnpj:Yup.string().required("Cnpj da companhia é obrigátorio").max(14,"O cnpj deve ter no máximo 14 caracteres")
})
export const CompanyPachtSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
  phone: Yup.string().matches(/^\(\d{2}\)\s\d{4,5}\-\d{4}$/, "Digite um telefone válido (99) 89999-9999"),
  cnpj:Yup.string().max(14,"O cnpj deve ter no máximo 14 caracteres")
})


export const loginSchema =Yup.object().shape({
  email: Yup.string().required("Email da companhia é obrigátorio"),
  password: Yup.string().required("password da companhia é obrigátorio"),

})