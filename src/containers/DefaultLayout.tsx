import { PropsWithChildren } from "react";

export const DefaultLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return <div>{children}</div>;
};
