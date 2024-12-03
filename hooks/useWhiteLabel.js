import React from 'react';

function useWhiteLabel() {
    const [host, setHost] = React.useState(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;

            if (hostname.startsWith('halo') || hostname.startsWith('www.halo')) {
                document.documentElement.style.setProperty('--Primary', '#081A66');
                document.documentElement.style.setProperty('--Secondary', '#FFA654');
                document.documentElement.style.setProperty('--Bgprimary', '#E6E8F0');
                document.documentElement.style.setProperty('--Bgprimary1', '#E6E8F0');
                document.documentElement.style.setProperty('--Bgsecondary', '#ffffff');
                document.documentElement.style.setProperty('--Peach', '#ffffff');
                
                setHost('halo');
                updateFavicon('/app/halo-favicon.ico');
            } else {
                setHost('main');
                updateFavicon('/app/favicon.ico');
            }
        }
    }, []);

    const updateFavicon = (iconPath) => {
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = iconPath;
    };

    return host;
}

export default useWhiteLabel;
