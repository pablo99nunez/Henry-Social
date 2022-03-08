export default function validate(input: any, typePost: string) {
  const errors = {
     text: "",
     company: "",
     companyLink: "",
     salary: "",
     position: "",
     /*tecnologíaClases:"",
     costoClases: "", */
     imageCompany: "",
     pregunta: "",
     getError: false,
  };

  if (typePost === "empleo") {
     if (!input.company || input.company.trim() === "") {
        errors.company = "Nombre de compañia es requerido";
     } else if (!/^[a-z ,.'-]+$/i.test(input.company)) {
        errors.company = "Nombre de compañia invalido";
     }

     if (!input.companyLink || input.companyLink.trim() === "") {
        errors.companyLink = "Ingrese la URL del sitio de la empresa";
     } else if (
        !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
           input.companyLink
        )
     ) {
        errors.companyLink = "URL invalida";
     }

     if (input.salary < 0) {
        errors.salary = "Salario tiene que ser minimo 0";
     } else if (!/^[0-9]+$/.test(input.salary)) {
        errors.salary = "Solo se permiten numeros";
     }

     if (!input.position || input.position.trim() === "") {
        errors.position = "Debes ingresar un puesto";
     }

     if (
        errors.position ||
        errors.salary ||
        errors.company ||
        errors.companyLink
     ) {
        errors.getError = true;
     } else {
        errors.getError = false;
     }
  }

  if (typePost === "boom") {
     if (!input.company || input.company.trim() === "") {
        errors.company = "Nombre de compañia es requerido";
     } else if (!/^[a-z ,.'-]+$/i.test(input.company)) {
        errors.company = "Nombre de compañia invalido";
     }

     if (!input.position || input.position.trim() === "") {
        errors.position = "Debes ingresar un puesto";
     }

     if (errors.position || errors.company) {
        errors.getError = true;
     } else {
        errors.getError = false;
     }
  }

  if (typePost === "pregunta") {
     if (!input.pregunta || input.pregunta.trim() === "") {
        errors.pregunta = "Debes definir tu pregunta";
     }

     if (errors.pregunta) {
        errors.getError = true;
     } else {
        errors.getError = false;
     }
  }

  /* if (!input.tecnologíaClases) {
     errors.tecnologíaClases = "Nombre de tecnologia es requerido";
  } else if (!/^[a-z ,.'-]+$/i.test(input.tecnologíaClases)) {
     errors.tecnologíaClases = "Nombre de tecnologia invalido";
  }
  if (!input.costoClases) {
     errors.costoClases = "Solo se permiten numeros";
  }  */

  return errors;
}