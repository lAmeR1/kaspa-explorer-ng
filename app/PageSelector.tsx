import Button from "~/Button";
// @ts-ignore
import ChevronLeft from "./assets/chevron-left.svg?react";
// @ts-ignore
import ChevronRight from "./assets/chevron-right.svg?react";

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

const SHOW_DIFF_RANGE = 1;

const PageSelector = ({
  currentPage,
  totalPages,
  onPageChange,
}: PageSelectorProps) => {
  const showPages = [1];

  if (currentPage - SHOW_DIFF_RANGE <= 3 && totalPages > 2) {
    showPages.push(2);
  } else if (currentPage - SHOW_DIFF_RANGE > 3) {
    showPages.push(Number.NaN);
  }

  for (
    let i = Math.max(3, currentPage - SHOW_DIFF_RANGE);
    i <= Math.min(totalPages - 1, currentPage + SHOW_DIFF_RANGE);
    i++
  ) {
    showPages.push(i);
  }

  if (totalPages > showPages[showPages.length - 1] + 2) {
    showPages.push(Number.NaN);
  } else if (totalPages === showPages[showPages.length - 1] + 2) {
    showPages.push(totalPages - 1);
  }

  if (totalPages > 1) {
    showPages.push(totalPages);
  }

  return (
    <div className="flex flex-row items-center gap-x-[5px]">
      <ChevronLeft className="fill-gray-500 h-8 w-8 p-1 hover:cursor-pointer hover:text-gray-800" />
      {showPages.map((i) => (
        <Button
          key={i}
          value={isNaN(i) ? "..." : i.toString()}
          primary={i === currentPage}
          onClick={(e) =>
            onPageChange(
              Number.parseInt((e.target as HTMLElement).textContent || ""),
            )
          }
        />
      ))}
      <ChevronRight className="fill-gray-500 h-8 w-8 p-1 hover:cursor-pointer hover:text-gray-800" />
    </div>
  );
};

export default PageSelector;
