import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Grid({ children }: Props) {
  return (
    <section
      className="   
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        max-w-4xl
        max-h-[40vh]
        overflow-y-auto
        scrollbar-thin
        scrollbar-thumb-zinc-700
      "
    >
      {children}
    </section>
  );
}

export default Grid;
