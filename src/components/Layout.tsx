import { Navigate, Outlet , useParams} from "react-router-dom";
import { Note } from "../type";


type LayoutPropsType = {
    notes:Note[];
}

const Layout = ({notes}:LayoutPropsType) => {
    const { id } = useParams();
    const found = notes.find((n) => n.id === id);
    //eğerki bulunmazsa anasayfaya yönlendir
    if(!found) return <Navigate to={"/"} replace/>
    return (
        <Outlet context={found}/>
    )
}

export default Layout; 