import space from "../assets/lostInSpace.jpeg"
import Button from "../uiComponents/buttons/Button.tsx";
import {BiHome} from "react-icons/bi";
import {useNavigate} from "react-router-dom";


export default function LostPage(){
    const navigate = useNavigate();

    return (
        <div className={"page w-full h-full flex"} >
            <span className={"max-w-md grid grid-flow-row auto-rows-max gap-4 justify-around m-auto"}>
                <img src={space} alt={"lost"} className={"w-[30vh] rounded-xl top-[-10%] animate-bounce m-auto"}/>
                <h1>Looks to me like someone's lost🌚</h1>
                <p>Or we are still building this and its not ready</p>
                <Button
                    icon={BiHome}
                    kind={"acc"}
                    text={"Take me home"}
                    className={"m-auto pl-4"}
                    onClick={()=>navigate("/")}
                />
            </span>
        </div>
    )
}

