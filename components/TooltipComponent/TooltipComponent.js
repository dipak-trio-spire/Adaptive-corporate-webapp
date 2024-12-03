import React from "react";
import { Tooltip } from 'react-tooltip';
import tooltipContent from './TooltipText';

export default function TooltipComponent(props) {
    const tooltipValue = tooltipContent[props.id];
    if(tooltipValue){
        const tooltipId = `tooltip-${props.id.replace(/[\s()%]/g, "")}`;
        return (
            <>
                &nbsp;<img id={tooltipId} src="/Assets/risk-info.png"></img>
                <Tooltip anchorSelect={`#${tooltipId}`} place="top" variant="dark" clickable={true} html={tooltipValue}>
                    
                </Tooltip>
            </>
        );
    }
}
