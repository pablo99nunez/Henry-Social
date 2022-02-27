import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { RiHandCoinLine } from "react-icons/ri";
import ProgressBar from "./ProgressBar/ProgressBar";
import style from "./Present.module.scss";
import axios from "axios";

export default function Present() {
  async function handlePayment() {
    const url = await axios
      .post("http://localhost:3001/create-checkout-session")
      .then((e) => e.data.url);
    window.location.href = url;
  }
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const progress = await axios("total-revenue").then((e) => e.data);
      setProgress(progress);
    })();
  }, []);

  return (
    <aside className={style.container}>
      <h2>#HenryPresent</h2>
      <p>
        Participa del sorteo de una PC Gamer, donando solo 1 USD. Al llegar a la
        meta, se sortea entre los donadores!
      </p>
      <Button onClick={handlePayment}>
        Participa!
        <RiHandCoinLine />
      </Button>
      <ProgressBar progress={progress} total={1500}></ProgressBar>
    </aside>
  );
}
