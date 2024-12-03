import React from "react";
import Image from "next/image";

export function CompareTable({ CompareTableHeadData, CompareTableBodyData }) {
  return (
    <div className="comparetablecon">
      <table className="comparetable" cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {CompareTableHeadData?.map((headItem, index) => (
              <td key={index}>
                {headItem.table_head_selection === "image" ? (
                  <Image
                    width={135}
                    height={34}
                    src={headItem.table_head_selection_image}
                    alt={`Header image for ${headItem.table_head_selection_image}`} 
                  />
                ) : (
                  headItem.table_head_selection_text
                )}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {CompareTableBodyData?.map((bodyItem, bodyIndex) => (
            <tr key={bodyIndex}>
              <td align="start">{bodyItem.growing_table_body_lable}</td>
              {bodyItem.growing_table_body_option_selection.map((option, optionIndex) => (
                <td key={optionIndex}>
                  {option.growing_table_body_options.includes("true.svg") ? (
                    <Image 
                      width={24} 
                      height={24} 
                      src={option.growing_table_body_options} 
                      alt="True option"
                    />
                  ) : option.growing_table_body_options.includes("false.svg") ? (
                    <Image 
                      width={24} 
                      height={24} 
                      src={option.growing_table_body_options} 
                      alt="False option"
                    />
                  ) : (
                    option.growing_table_body_options
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;
