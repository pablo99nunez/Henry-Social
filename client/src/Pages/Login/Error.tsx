import style from "./Error.module.scss";
export default function Error({ e }: { e: string | undefined }) {
    return (
        <div className={style.error} style={{display: `${e ? "block" : "none"}`}}>
            <span className={style.errorArrow}></span>
            <p>{e}</p>
        </div>
    )
}