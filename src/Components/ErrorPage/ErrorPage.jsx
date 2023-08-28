import style from "./ErrorPage.module.css"
export default function ErrorPage(){
    return(
        <div className={style.container}>
            <div className={style.errorContainer}>
                <img src="https://wsastaging1.wpengine.com/wp-content/uploads/2023/02/404.svg" />
                <h1>Page Not Found</h1>
            </div>
        </div>
    )
}
