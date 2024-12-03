import React, { useState, useEffect } from 'react';
import HeaderTextContext from '@/contexts/HeaderTextContext';
import { fetchHeaderText } from '@/utils/fetchHelpers'

function HeaderTextProvider({ children }) {
    const [headerText, setHeaderText] = useState("");

    useEffect(() => {
        async function loadData() {
            const data = await fetchHeaderText();
            if (data && data.header_banner_text) {
                setHeaderText(data.header_banner_text);
            }
        }
        loadData();
    }, []);

    
    return (
        <HeaderTextContext.Provider value={headerText}>
            {children}
        </HeaderTextContext.Provider>
    );
}

export default HeaderTextProvider;
