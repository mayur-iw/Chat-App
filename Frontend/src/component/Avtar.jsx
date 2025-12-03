import { LuCircleUser } from "react-icons/lu";

    const Avtar = (userId, name, imageUrl, width, height) => {
        console.log(width,"width")
        console.log(height,"height")
    const avtarName = "";

    if (name) {
        const splitName = name?.split(" ");

        if (splitName.length > 1) {
        avtarName = splitName[0][0] + splitName[1][0];
        } else {
        avtarName = splitName[0][0];
        }
    }
    return (
        <div className="text-slate-800 overflow-hidden rounded-full">
        {imageUrl ? (
            <img src={imageUrl} width={width} height={height} alt={name}  className="overflow-hidden rounded-full" />
        ) : name ? (
            <div style={{ width: width+"px", height: height+"px" }} className="overflow-hidden rounded-full">{avtarName}</div>
        ) : (
            <LuCircleUser size={width} />
        )}
        </div>
    );
    };

    export default Avtar;
