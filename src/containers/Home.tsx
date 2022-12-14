import { CollectionList } from "components/CollectionList";
import { Header } from "components/Header";
import { DefaultLayout } from "./DefaultLayout";

export const Home = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto ">
        <Header />
        <CollectionList />
      </div>
    </DefaultLayout>
  );
};
