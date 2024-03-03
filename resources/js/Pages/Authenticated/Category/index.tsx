import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { AuthPageProps, IFilterCategory, ILaravelPaginate, IModalAction, ICategory } from "@/types";
import { Head } from "@inertiajs/react";
import {Category} from "./Partials/Category";
import { FaSearch } from "react-icons/fa";
import CategoryHeader from "./Partials/CategoryHeader";
import Footer from "@/Layouts/GuestLayout/Partials/Footer";
import CategoryForm from "@/Components/Modals/CreateEdit/CategoryModal/Partials/CategoryForm";

export default function CategoryIndex({
  auth,
  categories: paginateCategories,
}: AuthPageProps<{ categories: ILaravelPaginate<ICategory>; filter: IFilterCategory }>) {
  const categories: ICategory[] = paginateCategories.data;
  const [modalAction, setModalAction] = useState<IModalAction<ICategory>>({
    state: "create",
    open: false,
    data: null,
  });

  const handleCreateCategory = () => {
    setModalAction({ state: "create", open: true, data: null });
  };

  return (
    <>
      <Head title="Categories" />
      <AuthenticatedLayout user={auth.user} header={undefined}>
        <CategoryHeader
          totalResult={paginateCategories.total}
          requestCreateCategory={handleCreateCategory}
        />

        <div className="flex min-h-[75vh] flex-col justify-between">
          <div className="flex flex-wrap justify-center py-6">
            {categories.length === 0 ? (
              <div className="my-20 flex gap-4 opacity-50">
                <FaSearch className="mt-1" />
                <p>No categories found!</p>
              </div>
            ) : (
              categories.map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  requestShow={() =>
                    setModalAction({ state: "show", open: true, data: category })
                  }
                  requestEdit={() =>
                    setModalAction({
                      state: "edit",
                      data: category,
                      open: true,
                    })
                  }
                />
              ))
            )}
          </div>

          { }
          {modalAction.open && (
            <CategoryForm
              modalAction={modalAction}
              setModalAction={setModalAction}
            />
          )}

          <Footer />
        </div>
      </AuthenticatedLayout>
    </>
  );
}