"use client";

import { redirect, usePathname, useSearchParams } from "next/navigation";
import {generatePaginationNumbers} from "@/lib/utils-pagination";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";


interface Props {
    totalPages: number;
}

export const MyPagination = ({ totalPages }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get("page") ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === "...") {
            return `${pathname}?${params.toString()}`;
        }

        if (+pageNumber <= 0) {
            return `${pathname}`; //   href="/kid";
        }

        if (+pageNumber > totalPages) {
            // Next >
            return `${pathname}?${params.toString()}`;
        }

        params.set("page", pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex text-center justify-center my-10">
            <nav aria-label="Page navigation example">
                <Pagination>
                    <PaginationContent>
                        <PaginationPrevious href={createPageUrl(currentPage - 1)} />
                        {allPages.map((page, index) =>
                            page === "..." ? (
                                <PaginationEllipsis key={index} />
                            ) : (
                                <PaginationLink
                                    key={index}
                                    isActive={page === currentPage}
                                    href={createPageUrl(page)}
                                >
                                    {page}
                                </PaginationLink>
                            ),
                        )}
                        <PaginationNext href={createPageUrl(currentPage + 1)} />
                    </PaginationContent>
                </Pagination>
            </nav>
        </div>
    );
};
