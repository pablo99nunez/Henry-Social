/* import {Schema, model} from 'mongoose';

interface User{
    name: string,
    email:string
    username: string,
    password: string,
    avatar?: Buffer,    

}


const userSchema = new Schema<User>({
    name:{
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    username: {
        type: String,
        require:true
    },
    avatar: Buffer,
    createdAt: new Date()
})
export default new model<User>('User', userSchema)
 */
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
  name: string;
  email: string;
  avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});