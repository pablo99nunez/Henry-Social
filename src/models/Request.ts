import { model, Schema } from "mongoose";
import { IUser } from "./User";

export enum IDone {
  "Rol",
}

export interface IRequest {
  user: IUser;
  solicitud: string;
  done: IDone;
  data: string;
  _id: string;
}

const requestSchema = new Schema<IRequest>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  solicitud: String,
  done: Number,
  data: String,
});

export default model<IRequest>("Request", requestSchema);
