import axios from "axios";
import React, { useEffect, useState } from "react";
import { IDone, IRequest } from "../../../../../src/models/Request";
import ListUsers from "../ListUsers/ListUsers";
import { MdDone } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import {
  INotification,
  NotificationType,
} from "../../../../../src/models/User";
import { ErrorAlert, InfoAlert } from "../../../Components/Alert/Alert";
import Button from "../../../Components/Button/Button";
import useUser from "../../../Hooks/useUser";

export default function Solicitudes() {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const user = useUser();
  const handleReject = (id: string) => {
    axios.delete("/request", { data: { id } }).then(() => {
      InfoAlert.fire("Has rechazado la solicitud");
      axios.get("/request").then((e) => setRequests(e.data));
    });
  };
  const handleResolve = (
    userId: string | undefined,
    id: string,
    type: IDone,
    data: string
  ) => {
    axios
      .post("/resolve", { type, data })
      .then(async () => {
        InfoAlert.fire("Has aceptado la solicitud");
        await axios.delete("/request", { data: { id } });
        axios.get("/request").then((e) => setRequests(e.data));
      })
      .catch((e) => {
        ErrorAlert.fire("Algo salio mal");
      });
  };
  useEffect(() => {
    axios.get("/request").then((e) => setRequests(e.data));
  }, []);
  return (
    <div>
      {requests.map((e) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h2>{e.solicitud}</h2>
            <ListUsers users={[e.user]} header={false}></ListUsers>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Button
                color="#f22"
                backgroundColor="#1c1c1c"
                onClick={() => handleReject(e._id)}
              >
                Rechazar
              </Button>
              <Button
                color="#2f2"
                backgroundColor="#1c1c1c"
                onClick={
                  () => handleResolve(e.user._id, e._id, e.done, e.data)
                  //   console.log(e.data)
                }
              >
                Aceptar
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
