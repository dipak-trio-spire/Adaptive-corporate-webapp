import React from "react";
import Header from "@/components/Header/Header";
import CsvImportSummary from "@/components/CsvImportSummary/CsvImportSummary";
import { withHostname } from '@/hocs/withHostname';

function CsvImportSummaryScreen({hostLabel, props}) {

    if (!hostLabel) {
        return <div className="blank-screen"></div>;
    }
    return (
        <>
            <Header content={hostLabel === "halo" ? "Portfolio Risk Contribution" : "Adaptive Risk Contribution"}
                page_head="Risk Contribution"
                show_info={false}
                hostname={hostLabel}
            />
            <CsvImportSummary {...props} hostname={hostLabel} />
        </>
    )
}

export default withHostname(CsvImportSummaryScreen);
// export default CsvImportSummaryScreen;