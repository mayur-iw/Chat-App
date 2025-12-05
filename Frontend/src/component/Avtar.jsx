    import React from "react";
    import { LuCircleUser } from "react-icons/lu";

    const Avtar = ({userId, name, imageUrl, width, height}) => {
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

    
        

    return (
        <div className={`text-slate-800 overflow-hidden rounded-full shadow  text-xl font-bold`} style={{ width: width+"px", height: height+"px" }}>
        {imageUrl ? (
            <img src={imageUrl} width={width} height={height} alt={name}  className="overflow-hidden rounded-full" />
        ) : name ? (
            <div style={{ width: width+"px", height: height+"px" }} className={`overflow-hidden rounded-full  flex justify-center items-center  ${bGColors[rendomNumber]}`}>{avtarName}</div>
        ) : (
            <LuCircleUser size={width} />
        )}
        </div>
    );
    };

    export default Avtar;
