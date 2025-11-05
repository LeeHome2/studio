import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      <path d="M12 15.5A3.5 3.5 0 0 0 8.5 12 3.5 3.5 0 0 0 12 8.5a3.5 3.5 0 0 0 3.5-3.5" />
      <path d="M12 15.5a3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 0 7" />
    </svg>
  );
}
