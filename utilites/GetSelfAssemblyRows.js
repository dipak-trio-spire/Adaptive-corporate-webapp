import { findClosest } from "./ClosestPercent";
import { addZeroes } from "./AddZeros";
import { formatContract } from './FormatContract';

export async function GetSelfAssemblyRows(self_assembly_data, selected_period, selected_percent) {
    
    var tp = self_assembly_data[selected_period];
    var percent = findClosest(tp, (selected_percent * 100) .toFixed(2));
    percent = addZeroes(Number((100 - percent).toFixed(2).toString()));
    console.log(" inside rows", percent, selected_percent, tp, selected_period)
    // Gauranteed Table
    try {
        var sa_lyst = [];
        var totalQty = 0;
        var totalValue = 0;
        const fisrt_inline_lyst = [];
        var currObj = {
            style: "currency",
            currency: "USD",
        };

        for (var i = 0; i < tp[percent]["optiondesc"].length; i++) {
            if (tp[percent]["oqty_diy"][i] > 0) {
                sa_lyst.push([
                    i + 1,
                    formatContract(tp[percent]["optiondesc"][i]),
                    Number(tp[percent]["oqty_diy"][i].toFixed(2)).toLocaleString("en-US"),
                    Number(
                        addZeroes(
                            Number(parseFloat(tp[percent]["ask"][i]).toFixed(2))
                        )
                    ).toLocaleString("en-US", currObj),
                    Number(
                        addZeroes(
                            Number(parseFloat((
                                tp[percent]["ask"][i] *
                                tp[percent]["oqty_diy"][i] *
                                100
                            )).toFixed(2))
                        )
                    ).toLocaleString("en-US", currObj)
                ]);
                totalValue =
                    totalValue +
                    tp[percent]["ask"][i] * tp[percent]["oqty_diy"][i] * 100;
                totalQty = totalQty + tp[percent]["oqty_diy"][i].toFixed(2);
            }
            fisrt_inline_lyst.push(
                (
                    tp[percent]["ask"][i] *
                    tp[percent]["oqty_diy"][i] *
                    100
                ).toFixed(2)
            );
        }
    } catch (e) {
        console.log(e.message);
    }

    return [sa_lyst, totalValue]
}