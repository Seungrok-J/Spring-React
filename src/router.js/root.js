import { Suspense,lazy } from "react"

const {createBrowserRouter} = require("react-router-dom"); 

const Loding = <div>Loading</div>
const Main = lazy(()=> import("../pages/Mainpage"))
const About = lazy(()=> import("../pages/AboutPage"))
const TodoIndex = lazy(()=> import("../pages/todo/IndexPage"))
const TodoList = lazy(()=> import("../pages/todo/ListPage"));


const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loding}><Main/></Suspense>
    },
    {
        path: 'about',
        element: <Suspense fallback={Loding}><About/></Suspense>
    },
    {
        path: 'todo',
        element: <Suspense fallback={Loding}><TodoIndex/></Suspense>,
        children: [
            {
                path: 'list',
                element: <Suspense fallback={Loding}><TodoList/></Suspense>
            }
        ]
    }
])
 
export default root