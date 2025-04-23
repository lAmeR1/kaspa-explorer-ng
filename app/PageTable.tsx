import React, { type ReactNode } from "react";

interface PageTableProps {
  rows: ReactNode[][];
  headers: ReactNode[];
  additionalClassNames?: Record<number, string>;
  className?: string;
}

const PageTable = (props: PageTableProps) => {
  return (
    <table className={` ${props.className || ""}`}>
      <thead className="hidden sm:table-header-group border-b border-gray-100">
        <tr>
          {props.headers.map((headerName, i) => (
            <td
              className={`block sm:table-cell py-2 ps-4 text-gray-500 last:text-right sm:last:pe-4 sm:pe-4" : ""}
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
            className={`grid grid-cols-[1fr_auto] sm:table-row pt-2 sm:pt-0 border-t first:border-t-0 border-gray-100`}
          >
            {row.map((cell, cellNr) => (
              <>
                {props.headers[cellNr] && (
                  <td className={`pt-2 sm:hidden text-gray-500`}>{props.headers[cellNr] || ""}</td>
                )}
                <td
                  className={`pt-2 sm:ps-4 sm:last:pe-4 sm:py-3 text-right sm:text-left sm:last:text-right last:pb-4 ${props.additionalClassNames && (props.additionalClassNames[cellNr] || "")}`}
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
