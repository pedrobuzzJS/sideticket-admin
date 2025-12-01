import { useState } from "react";
import { useClick, useMenuState } from "@szhsin/react-menu";

export const useControlledMenu = (options) => {
    const [anchorRef, setAnchorRef] = useState();
    const [anchorPoint, setAnchorPoint] = useState();
    const [menuProps, toggleMenu] = useMenuState(options);

    const anchorProps = useClick(menuProps.state, (isOpen, e) => {
        setAnchorRef({ current: e.currentTarget });
        setAnchorPoint(null);
        toggleMenu(isOpen);
    });

    const contextProps = {
        onContextMenu: (e) => {
            e.preventDefault();
            setAnchorRef(null);
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            toggleMenu(true);
        },
    };

    return {
        anchorProps,
        contextProps,
        menuProps: {
            ...menuProps,
            anchorRef,
            anchorPoint,
            onClose: () => toggleMenu(false),
        },
    };
};
