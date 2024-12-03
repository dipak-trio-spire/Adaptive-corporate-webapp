import React from "react";
import { useEffect, useState } from "react";

export function withHostname(Component) {
    return function WrappedComponent(props) {
        const [hostLabel, setHostLabel] = useState(null);

        useEffect(() => {
            const hostname = window.location.hostname;

            if (hostname.startsWith('halo') || hostname.startsWith('www.halo')) {
                setHostLabel("halo");
            } else {
                setHostLabel("main");
            }
        }, []);

        return <Component {...props} hostLabel={hostLabel} />;
    }
}
