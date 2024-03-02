'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import ReactPaginate from 'react-paginate';
import React from 'react';

export default function Pagination({ searchParams, router, setItemOffset, items, itemsPerPage }: any) {
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;

  React.useEffect(() => {
    const newOffset = ((currentPage - 1) * itemsPerPage) % items.length;
    if (newOffset || newOffset === 0) {
      setItemOffset(() => newOffset);
    }
  }, [items])


  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    createPageURL(event.selected + 1)
  };

  return <ReactPaginate
    breakLabel="..."
    nextLabel="next >"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pageCount}
    previousLabel="< previous"
    renderOnZeroPageCount={null}
    initialPage={currentPage - 1}
  />
}
