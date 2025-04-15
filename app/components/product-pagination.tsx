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
  return <div>ProductPagination</div>;
}
