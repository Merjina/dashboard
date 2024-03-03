import React, { FormEvent } from "react";
import { IModalAction, ICategory } from "@/types";
import useBetterForm from "@/Utilities/useBetterForm";
import CategoryFormInputs from "./CategoryFormInputs";
import TemplateModal from "@/Components/Modals/TemplateModal";

export default function CategoryForm({
  modalAction,
  setModalAction,
}: {
  modalAction: IModalAction<ICategory>;
  setModalAction: React.Dispatch<React.SetStateAction<IModalAction<ICategory>>>;
}) {
  const form = useBetterForm<ICategory>(
    modalAction.state === "create"
      ? {
          name: "",
          description: "",
          created_by: null,
          createdBy_id: "",
          id: "",
          created_at: "",
          updated_at: "",
          deleted_at: null,
        }
      : { ...modalAction.data },
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    form.post(
      route(
        `category.${
          modalAction.state === "edit" ? "update" : "store"
        }`,
        modalAction.state === "edit" ? modalAction.data.id : undefined,
      ),
      {
        onSuccess: () => {
          form.clearErrors();
          form.reset();
          setModalAction(() => ({
            state: "create",
            data: null,
            open: false,
          }));
        },
      },
    );
  }

  return (
    <TemplateModal
      title={getTitle(modalAction.state)}
      open={modalAction.open}
      closeModal={() => setModalAction((prev) => ({ ...prev, open: false }))}
    >
      <form onSubmit={handleSubmit}>
        <CategoryFormInputs formProps={form} modalAction={modalAction} />

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={form.processing}
          >
            {modalAction.state === "create" ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </TemplateModal>
  );
}

function getTitle(state: IModalAction<ICategory>["state"]): string {
  if (state === "create") return "Add New Category";
  if (state === "edit") return "Edit Category";
  return "View Category";
}
