import { PropsWithChildren } from "react";

export const DefaultLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className="bg-gray-100 h-screen">{children}</div>;
};
