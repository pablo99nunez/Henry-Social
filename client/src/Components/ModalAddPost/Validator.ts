export default function Validator(entry:any){
    let error = {
        company: '',
        position: '',
        companyLink: '',


    };

    if(!entry.company){
        error.company = 'Debes ingresar un nombre'
    }
    else if(!entry.position){
        error.position = 'Debes ingresar un puesto'
    }
    else if(!entry.companyLink){
        error.companyLink = 'Debes ingresar una URL valida'
    }
    return error
}
