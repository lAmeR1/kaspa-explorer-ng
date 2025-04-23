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
            className={`grid grid-cols-[auto_1fr] gap-x-10 md:table-row pt-2 md:pt-0 border-t first:border-t-0 border-gray-100`}
          >
            {row.map((cell, cellNr) => (
              <>
                {props.headers[cellNr] && (
                  <td className={`pt-2 md:hidden text-gray-500`}>{props.headers[cellNr] || ""}</td>
                )}
                <td
                  className={`pt-2 md:ps-4 md:last:pe-4 md:py-3 text-right xs:text-left md:last:text-right last:pb-4 ${props.additionalClassNames && (props.additionalClassNames[cellNr] || "")}`}
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
