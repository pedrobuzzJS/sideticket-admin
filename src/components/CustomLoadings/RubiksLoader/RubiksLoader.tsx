import "./RubiksLoader.scss";

export default function RubiksLoader() {
    return (
        <div className="rubiks-loader">
            <div className="cube">
                <div className="face front piece row-top    col-left   yellow"></div>
                <div className="face front piece row-top    col-center green "></div>
                <div className="face front piece row-top    col-right  white "></div>
                <div className="face front piece row-center col-left   blue  "></div>
                <div className="face front piece row-center col-center green "></div>
                <div className="face front piece row-center col-right  blue  "></div>
                <div className="face front piece row-bottom col-left   green "></div>
                <div className="face front piece row-bottom col-center yellow"></div>
                <div className="face front piece row-bottom col-right  red   "></div>
                w
                <div className="face down  piece row-top    col-center green "></div>
                <div className="face down  piece row-center col-center red   "></div>
                <div className="face down  piece row-bottom col-center white "></div>
                <div className="face right piece row-center col-left   yellow"></div>
                <div className="face right piece row-center col-center green "></div>
                <div className="face right piece row-center col-right  blue  "></div>
                <div className="face up    piece row-top    col-left   yellow"></div>
                <div className="face up    piece row-center col-left   blue  "></div>
                <div className="face up    piece row-bottom col-left   green "></div>
                <div className="face left  piece row-bottom col-left   green "></div>
                <div className="face left  piece row-bottom col-center yellow"></div>
                <div className="face left  piece row-bottom col-right  red   "></div>
            </div>
        </div>
    );
}
