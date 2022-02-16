import {Schema, model} from 'mongoose';

interface User{
    name: string,
    email:string
    username: string
    avatar?: Buffer,    
    createdAt: string
}

const userSchema = new Schema<User>({
    name:{
        type: String,
        require:true
    },
    username: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    avatar: Buffer,
    createdAt: new Date().toDateString()
})
export default model<User>('User', userSchema) 
