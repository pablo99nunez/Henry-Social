import nodemailer from "nodemailer";

interface emailNeeds {
  transporter: nodemailer.Transporter;
  deleted?: boolean;
  from: string | undefined;
  to: string | undefined;
  username: string | undefined;
  _id: string;
}

const sendEmail = ({transporter, deleted, from, to, username, _id}: emailNeeds) => {

  const resolution = (err: Error | null, info: any) => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(`sent: ${info.response}`);
  };

  if(from === to) {
    deleted ? 
    transporter.sendMail({
      from, to,
      subject: `POST ${_id} deleted`,
      text: `The post ${_id} has reached 5 reports so it has been deleted`
    }, resolution)
    : 
    transporter.sendMail({
      from, to,
      subject: `POST ${_id} reported`,
      text: `${username} has reported the post ${_id}`
    }, resolution);
  } else {
    deleted ? 
    transporter.sendMail({
      from, to,
      subject: `Thanks you!! POST ${_id} deleted`,
      text: `You reported the post ${_id} and it has been deleted, thank you!!`
    }, resolution)
    : 
    transporter.sendMail({
      from, to,
      subject: `You reported the post ${_id} `,
      text: `You, ${username} reported the post ${_id}, thank you!!`
    }, resolution);
  };
};


export default sendEmail;