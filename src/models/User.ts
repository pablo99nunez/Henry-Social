import {Schema, model} from 'mongoose';
import '../../db.ts'

interface User{
    name: string,
    email:string
    username?: string
    avatar?: Buffer,    
    createdAt: object
}

const userSchema = new Schema<User>({
    name:{
        type: String,
        require:true
    },
    username: {
        type: String,
        default: null
    },
    email: {
        type: String,
        require:true
    },
    avatar: String,
    createdAt: {
        type: Date,
        default: new Date().toDateString()
    }
})
export default model<User>('User', userSchema) 
