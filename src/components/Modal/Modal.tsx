import React, {
    type JSX,
    type PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import "./Modal.scss";
import { useWindowSize } from "@uidotdev/usehooks";
import { v4 as uuidv4 } from "uuid";
import Btn from "../Button/Btn.tsx";

interface IModalProps extends PropsWithChildren {
    id?: string | undefined;
    isOpen?: boolean;
    onClose: () => void;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    size?: "sm" | "lg" | "xl";
    addUrlOpen?: boolean;
    footer?: JSX.Element;
    draggable?: boolean;
}

// const ESC_KEY = 27;

export default function Modal({
    id,
    isOpen = true,
    onClose,
    children,
    closeOnOverlayClick = false,
    footer,
    draggable = false,
}: IModalProps) {
    const [modalId, setModalId] = useState<string | undefined>("");
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [size, setSize] = useState<{ height: number; width: number }>({
        height: 550,
        width: 700,
    });
    // const startSize = useRef<{height: number, width: number}>({height: 500, width: 500});
    const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const modalRef = useRef<HTMLDivElement | null>(null);
    const windowSize = useWindowSize();
    const [zIndex] = useState<number>(100);

    useEffect(() => {
        setPosition({ x: 0, y: 0 });
        setModalId(uuidv4());
    }, [id]);

    useEffect(() => {
        setSize({
            height: (75 * Number(windowSize?.height)) / 100,
            width: (75 * Number(windowSize?.width)) / 100,
        });
    }, [windowSize]);

    const onCloseModal = (
        e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    ) => {
        e.preventDefault();
        if (e.currentTarget.className == "modalClose") {
            setIsDragging(false);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            onClose();
        }

        if (e.currentTarget.className == "modalOverlay" && !closeOnOverlayClick)
            return;
        setIsDragging(false);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        onClose();
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (e.currentTarget.className != "modalHeaderDrag") return;
        setIsDragging(true);
        startPosition.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - startPosition.current.x,
                y: e.clientY - startPosition.current.y,
            });
        },
        [isDragging],
    );

    const onMouseUp = useCallback(() => {
        setIsDragging(false);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        setIsDragging(false);
    }, [onMouseMove]);

    const onModalClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    useEffect(() => {
        if (!isDragging || !draggable) return;
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [draggable, isDragging, onMouseMove, onMouseUp]);

    useEffect(() => {
        if (!isOpen) setPosition({ x: 0, y: 0 });
    }, [isOpen]);

    if (!isOpen) return <></>;

    const isOpacity = () => {
        return isDragging ? 0.4 : 1;
    };

    return (
        <div onClick={onCloseModal} className="modalOverlay">
            <div
                key={id}
                id={modalId}
                className="modal"
                ref={modalRef}
                onClick={onModalClick}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    height: `${size.height}px`,
                    width: `${size.width}px`,
                    opacity: isOpacity(),
                    transition: "ease-in 0s",
                    zIndex: zIndex,
                }}
            >
                <div className="modalBody">
                    <div className="modalHeader">
                        <div
                            className="modalHeaderDrag"
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                        >
                            <div className="modalIcon">📄</div>
                            <div className="modal-title">Adicionar Módulo</div>
                        </div>
                        <div className="modalActions">
                            <button
                                className="btn small"
                                onClick={onCloseModal}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="modalContent">
                        <div className="modalPP">{children}</div>
                    </div>
                    {footer ? (
                        footer
                    ) : (
                        <div className="modalFooter">
                            <Btn style={{ backgroundColor: "#329000" }}>
                                Cancelar
                            </Btn>
                            <Btn style={{ backgroundColor: "#329000" }}>
                                Salvar
                            </Btn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
