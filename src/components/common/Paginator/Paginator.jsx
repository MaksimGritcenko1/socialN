import React, {useState} from "react";
import styles from './Paginator.module.css'
import s from './../commonStyles/commonStyles.module.css'
import cn from 'classnames'


let Paginator = ({totalItemsCount, pageSize, currentPage, changeCurrentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    let portionCount = Math.ceil(pagesCount / portionSize)
    let [currentPortion, setCurrentPortion] = useState(1)
    let leftPortionBorder = (currentPortion - 1) * portionSize + 1
    let rightPortionBorder = (currentPortion * portionSize)

    return (
        <div className={styles.wrapper}>
            <div>
                {currentPortion > 1 &&
                <button className={s.button} onClick={() => setCurrentPortion(currentPortion - 1)}>Prev</button>}
            </div>

            <div>
                {pages
                    .filter(p => p >= leftPortionBorder && p <= rightPortionBorder)
                    .map(p => {
                        return (
                            <span
                                key={p}
                                onClick={() => {
                                    changeCurrentPage(p)
                                }}
                            ><div className={cn({[styles.selectedPage]: currentPage === p}, styles.listItem)}>{p}</div></span>
                        )
                    })}
            </div>
            <div>
                {currentPortion < portionCount &&
                <button className={s.button} onClick={() => setCurrentPortion(currentPortion + 1)}>Next</button>}
            </div>
        </div>
    )
}

export default Paginator;


