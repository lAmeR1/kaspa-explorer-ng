import React, { type ReactNode } from "react";

interface PageTableProps {
  rows: ReactNode[][];
  headers: ReactNode[];
  additionalClassNames?: Record<number, string>;
  className?: string;
}

const PageTable = (props: PageTableProps) => {
  return (
    <table className={`table table-fixed ${props.className || ""}`}>
      <thead className="hidden sm:table-header-group border-b border-gray-100">
        <tr>
          {props.headers.map((headerName, i) => (
            <td
              className={`block sm:table-cell py-3 ps-4 text-gray-500 
              ${i + 1 === props.headers.length ? " text-right sm:pe-4" : ""}
              ${(props.additionalClassNames && props.additionalClassNames[i]) || ""}`}
            >
              {headerName}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rowNr) => (
          <tr className={`${rowNr > 0 ? "border-t" : ""} border-gray-100`}>
            {row.map((cell, cellNr) => (
              <>
                <td className={`block ${cellNr === 0 ? "pt-4" : "pt-2"} sm:hidden text-gray-500`}>
                  {props.headers[cellNr] || ""}
                </td>
                <td
                  className={`block sm:table-cell sm:py-3 sm:ps-4 ${cellNr + 1 === row.length ? " sm:text-right mb-4 sm:mb-0" : ""}
                  ${props.additionalClassNames && props.additionalClassNames[cellNr]}
                  `}
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
