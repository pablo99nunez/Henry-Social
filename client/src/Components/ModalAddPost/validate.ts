export function validateChange(input:any) {
    const errors = {
       company: "",
       companyLink: "",
       salary: "",
       position: "",
       tecnologíaClases: "",
       costoClases: "",
       imageCompany: "",
       question: "",
       body: ""
    };
    if (!input.company) {
       errors.company = "Nombre de compañia es requerido";
    } else if (!/^[a-z ,.'-]+$/i.test(input.company)) {
       errors.company = "Nombre de compañia invalido";
    }
 
    if(!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(input.companyLink) && input.companyLink.length > 0){
       errors.companyLink = "URL invalida";
    } else if(!input.companyLink){
      errors.companyLink = 'Debes ingresar una URL'
    }
 
    if(input.salary < 0){
       errors.salary = "Salario tiene que ser minimo 0"
    } else if(!/^[0-9]+$/.test(input.salary)){
       errors.salary = "Solo se permiten numeros";
    }
    if(!input.position){
      errors.position = 'Debes ingresar un puesto'
    }
    /*
    if(!input.imageCompany){
      errors.imageCompany = "Debes ingresar una imagen"
    } else if(!/\.(jpg|png)$/i.test(input.imageCompany)){
       errors.imageCompany = 'Debes ingresar una URL valida'
    }*/
    if (!input.tecnologíaClases) {
       errors.tecnologíaClases = "Nombre de tecnologia es requerido";
    } else if (!/^[a-z ,.'-]+$/i.test(input.tecnologíaClases)) {
       errors.tecnologíaClases = "Nombre de tecnologia invalido";
    }
 
    if (!input.costoClases) {
       errors.costoClases = "Solo se permiten numeros";
    } 
 
    if(!input.question){
      errors.question = "Debes ingresar una pregunta"
    }

    if(input.body.length <= 0){
        errors.body = 'Debes ingresar contenido'
    }
 
    return errors;
 };
 