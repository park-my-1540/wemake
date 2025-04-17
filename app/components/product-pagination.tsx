import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type ProductPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
export default function ProductPagination({
  totalPages,
  currentPage,
  onPageChange,
}: ProductPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const getUrlWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `?${params}`;
  };

  const page = Number(searchParams.get("page")) ?? "1";
  if (isNaN(page) || page < 1) {
    return null;
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationPrevious to={getUrlWithPage(page - 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to={getUrlWithPage(page - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink to={getUrlWithPage(page)} isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {page === totalPages ? null : (
            <>
              <PaginationItem>
                <PaginationLink to={getUrlWithPage(page + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext to={getUrlWithPage(page + 1)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
