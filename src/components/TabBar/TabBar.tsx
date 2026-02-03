import {DynaicIcon} from "../../icons.tsx";

export default function TabBar() {
    return (
        <div
            style={{
                height: "50px",
                backgroundColor: "#1a1a1a",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <span
                style={{
                    color: "white",
                    float: "left",
                }}
            >
                <div
                    style={{
                        height: "25px",
                        width: "170px",
                        borderRadius: "5px",
                        border: "1px solid white",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        backgroundColor: "#252525",
                        position: "relative",
                    }}
                >
                    <DynaicIcon name={"User"} fontSize={45}/>
                    <span
                        style={{
                            marginLeft: "5px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        white-space: nowrap; overflow: hidden; text-overflow:
                        ellipsis;
                    </span>
                    <i
                        className="fa-solid fa-xmark"
                        style={{
                            color: "tomato",
                            fontSize: "7px",
                            marginLeft: "5px",
                            position: "absolute",
                            top: "0",
                            right: "0",
                        }}
                    />
                </div>
            </span>
        </div>
    );
}
