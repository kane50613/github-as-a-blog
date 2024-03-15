import { type ReactNode } from "react";

const formatter = new Intl.NumberFormat("en-US");

export const Stats = ({ icon, count }: { icon: ReactNode; count: number }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{formatter.format(count)}</span>
  </div>
);
