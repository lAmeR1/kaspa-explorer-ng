import React, { type ReactNode } from "react";

interface PageTableProps {
  rows: ReactNode[][];
  headers: ReactNode[];
  additionalClassNames?: Record<number, string>;
  className?: string;
  alignTop?: boolean;
}

const PageTable = (props: PageTableProps) => {
  return (
    <table className={` ${props.className || ""}`}>
      <thead className="hidden md:table-header-group border-b border-gray-100">
        <tr>
          {props.headers.map((headerName, i) => (
            <td
              className={`block md:table-cell py-2 ps-4 text-gray-500 last:text-right md:last:pe-4 md:pe-4" : ""}
              ${(props.additionalClassNames && props.additionalClassNames[i]) || ""}`}
            >
              {headerName}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row) => (
          <tr
            className={`grid grid-cols-1 gap-x-10 hover:bg-gray-25
             transition-colors duration-200 ease-out
             md:table-row pt-2 md:pt-0 border-t first:border-t-0 border-gray-100`}
          >
            {row.map((cell, cellNr) => (
              <>
                {props.headers[cellNr] && (
                  <td className={`pt-2 md:hidden text-gray-500`}>{props.headers[cellNr] || ""}</td>
                )}
                <td
                  className={`break-all pt-0 md:ps-4 md:last:pe-4 md:py-3 text-left xs:text-left md:last:text-right last:pb-4 ${props.additionalClassNames && (props.additionalClassNames[cellNr] || "")} ${props.alignTop && " align-text-top "}`}
                >
                  {cell}
                </td>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PageTable;
