import style from "../../Components/LoginInput/LoginInput.module.scss";

export default function (input: HTMLInputElement, name: string, usernames?: Array<string>): boolean {
  let regExp;
  switch (name) {
    case "email":
      regExp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
      return validate(regExp.test(input.value));
    case "password":
      regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      return validate(regExp.test(input.value));
    case "name": 
      regExp = new RegExp(/^([A-Z][a-z]{2,}) ?([A-Z][a-z]{2,})? ?([A-Z][a-z]{2,})? ([A-Z][a-z]{2,})$/)
      return validate(regExp.test(input.value))
    case "username":
      regExp = new RegExp(/^[a-zA-Z0-9_-]{3,15}$/);
      return validate(regExp.test(input.value) && !usernames?.includes(input.value));
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