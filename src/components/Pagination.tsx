import React from 'react';
import cx from 'classnames';

export type PaginationProps = {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ page, lastPage, onPageChange }) => {
  const onPageClick = (page: number | null): void => {
    if (!page) {
      return;
    }

    onPageChange(page);
  };

  const generateMidItems = (): number[] => {
    const maxLength = 7;
    const initial = Math.max(2, Math.min(lastPage - maxLength, page - 3));
    const length = Math.min(lastPage - initial, 7);

    return Array.from({ length }, (_, i) => i + initial);
  };

  const midItems = generateMidItems();
  const firstItems = midItems[0] - 1 > 1 ? [1, null] : [1];
  const lastItems = midItems[midItems.length - 1] + 1 < lastPage ? [null, lastPage] : [lastPage];

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPageClick(Math.max(1, page - 1))}
          >
            Previous
          </button>
        </li>
        {[...firstItems, ...midItems, ...lastItems].map((item, i) => (
          <li key={i}>
            <button
              disabled={item === page || item === null}
              className={cx(
                'flex h-8 items-center justify-center border border-gray-300 px-3 dark:border-gray-700',
                item === page && 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white',
                item !== page &&
                  item !== null &&
                  'bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              )}
              onClick={() => onPageClick(item)}
            >
              {item ?? '...'}
            </button>
          </li>
        ))}
        <li>
          <button
            className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => onPageClick(Math.min(lastPage, page + 1))}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
