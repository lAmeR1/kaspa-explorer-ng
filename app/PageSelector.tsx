import ChevronLeft from "./assets/chevron-left.svg";
import ChevronRight from "./assets/chevron-right.svg";

enum PageSelectorClick {
  FIRST = 0,
  LAST = 3,
  PREVIOUS = 2,
  NEXT = 1,
}

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: PageSelectorClick) => void;
}

const PageSelector = ({ currentPage, totalPages, onPageChange }: PageSelectorProps) => {
  return (
    <div className="flex flex-row items-center gap-x-[5px]">
      <div
        className={currentPage !== 1 ? "text-black cursor-pointer select-none" : "text-gray-500 select-none"}
        onClick={() => currentPage !== 1 && onPageChange(PageSelectorClick.FIRST)}
      >
        First
      </div>
      <ChevronLeft
        className={currentPage !== 1 ? "h-8 w-8 fill-black p-1 cursor-pointer" : "fill-gray-500 h-8 w-8 p-1"}
        onClick={() => currentPage !== 1 && onPageChange(PageSelectorClick.PREVIOUS)}
      />
      <div className="py-2 px-3 h-8 flex flex-row items-center">
        {currentPage} of {totalPages}
      </div>
      <ChevronRight
        className={currentPage !== totalPages ? "h-8 w-8 fill-black p-1 cursor-pointer" : "fill-gray-500 h-8 w-8 p-1"}
        onClick={() => currentPage !== totalPages && onPageChange(PageSelectorClick.NEXT)}
      />
      <div
        className={currentPage !== totalPages ? "text-black cursor-pointer select-none" : "text-gray-500 select-none"}
        onClick={() => currentPage !== totalPages && onPageChange(PageSelectorClick.LAST)}
      >
        Last
      </div>
    </div>
  );
};

export default PageSelector;
