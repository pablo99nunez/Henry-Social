import style from "../../Components/LoginInput/LoginInput.module.scss";

export default function (input: HTMLInputElement, name: string, username?: never): boolean {
  let regExp;
  switch (name) {
    case "email":
      regExp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
      return validate(regExp.test(input.value));
    case "password":
      regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/)
      return validate(regExp.test(input.value));
    case "firstName": 
      regExp = new RegExp(/^([A-Z][a-z]{2,}) ?([A-Z][a-z]{2,})?$/)
      return validate(regExp.test(input.value));
    case "lastName": 
      regExp = new RegExp(/^([A-Z][a-z]{2,}) ?([A-Z][a-z]{2,})?$/)
      return validate(regExp.test(input.value))
    case "username":
      regExp = new RegExp(/^[a-zA-Z0-9_-]{3,15}$/);
      return !username ? validate(regExp.test(input.value)) :
      validate(username !== input.value);
    case "avatar":
      return true;
    default:
      return false
  }

  function validate(validation: boolean) {
    if(!validation) {
      input.className = style.invalid
      return false;
    } else {
      input.className = ""
      return true
    }
  }
}