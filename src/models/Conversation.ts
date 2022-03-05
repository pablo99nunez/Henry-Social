import { model, Schema } from "mongoose";

export interface IMessage {
  receiver: string;
  sender: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
}

export interface IConversation {
  userA: Schema.Types.ObjectId;
  userB: Schema.Types.ObjectId;
  messages: IMessage[];
}

const conversationSchema = new Schema<IConversation>({
  userA: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userB: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  messages: {
    type: [],
    ref: "Message",
    default: [],
  },
});

const messageSchema = new Schema<IMessage>({
  avatar: String,
  message: String,
  name: String,
  receiver: {
    type: String,
    ref: "User",
  },
  sender: {
    type: String,
    ref: "User",
  },
  time: String,
});

export const Message = model<IMessage>("Message", messageSchema);
export default model<IConversation>("Conversation", conversationSchema);
