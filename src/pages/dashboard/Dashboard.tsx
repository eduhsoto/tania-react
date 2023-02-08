import { useAuth } from "../../auth/authContext"
import type { AuthContextModel } from "../../auth/authContext"
import Msg from "./Msg"
import Init from "./Init"


const Dashboard = () : JSX.Element => {
    const {isExistUser} = useAuth() as AuthContextModel
    return (
        isExistUser ? <Init /> : <Msg />
    )
}

export default Dashboard