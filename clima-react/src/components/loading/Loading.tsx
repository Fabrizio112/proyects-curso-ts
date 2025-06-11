import style from "./Loading.module.css"

function Loading() {
    return (
    <div className={style.container}>
        <span className={style.loader}></span>
    </div> );
}

export default Loading;