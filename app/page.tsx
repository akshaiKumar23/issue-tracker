import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  return (
    <Pagination currentPage={searchParams.page} itemCount={100} pageSize={10} />
  );
}
