    import React from "react";
    import { LuCircleUser } from "react-icons/lu";
import { useSelector } from "react-redux";

    const Avtar = ({userId, name, imageUrl, width, height}) => {
        const onlineUser = useSelector(state => state?.user?.onlineUser)

        // console.log("onlineUser",onlineUser)
        // console.log("currentUserid",userId)
        let avtarName = "";

    if (name) {
        const splitName = name?.split(" ");

        if (splitName.length > 1) {
        avtarName = splitName[0][0] + splitName[1][0];
        } else {
        avtarName = splitName[0][0];
        }
    }

    const bGColors =[
        'bg-sky-50',
        'bg-slat-100',
        'bg-blue-200',
        'bg-slat-300',
        'bg-sky-400',
        'bg-sky-500',
    ]

    const rendomNumber = Math.floor(Math.random() *7);

    // const isOnline = onlineUser.includes(userId)
  const isOnline = onlineUser?.some(u => String(u) === String(userId));

    // console.log("isOnline",isOnline)
    
        

    return (
        <div className={`text-slate-800 relative rounded-full shadow  text-xl font-bold`} style={{ width: width+"px", height: height+"px" }}>
        {imageUrl ? (
            <img src={imageUrl} width={width} height={height} alt={name}  className="overflow-hidden rounded-full" />
        ) : name ? (
            <div style={{ width: width+"px", height: height+"px" }} className={`overflow-hidden rounded-full  flex justify-center items-center  ${bGColors[rendomNumber]}`}>{avtarName}</div>
        ) : (
            <LuCircleUser size={width} />
        )}

        {
            isOnline && (
                <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full" ></div>
            )
        }

        </div>
    );
    };

    export default Avtar;
