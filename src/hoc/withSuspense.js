import React, {Suspense} from 'react'
import Preloader from "../components/common/Preloader/Preloader";


export const withSuspense = (Component) => {
    return (props) => {
        return (
            //Preloader will be executed while the js file of the component will be loading
            <Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </Suspense>
        )
    }
}

