import React, { lazy, Suspense } from "react";
import { IconQuestionMark } from "@tabler/icons-react";

type DynamicIconProps = {
    name: string;
    size?: number;
    stroke?: number;
};

const iconCache: Record<string, React.LazyExoticComponent<any>> = {};

function loadIcon(name: string) {
    if (!iconCache[name]) {
        iconCache[name] = lazy(() =>
            import("@tabler/icons-react").then((mod) => ({
                default: mod[`${name}`] ?? IconQuestionMark,
            })),
        );
    }
    return iconCache[name];
}

export function DynamicTablerIcon({
    name,
    size = 18,
    stroke = 1.25,
}: DynamicIconProps) {
    const Icon = loadIcon(name);

    return (
        <Suspense fallback={<span style={{ width: size, height: size }} />}>
            <Icon size={size} stroke={stroke} />
        </Suspense>
    );
}
