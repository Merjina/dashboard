import React from "react";
import { IModalAction, IProduct } from "@/types";
import Form from "./Partials/Form";
import TemplateModal from "../../TemplateModal";
import ViewProductInfo from "./Partials/ViewProductInfo";

export default function CreateEditProductModal({
  modalAction,
  setModalAction,
}: {
  modalAction: IModalAction<IProduct>;
  setModalAction: React.Dispatch<React.SetStateAction<IModalAction<IProduct>>>;
}) {
  return (
    <TemplateModal
      title={getTitle(modalAction.state)}
      open={modalAction.open}
      closeModal={() => setModalAction((prev) => ({ ...prev, open: false }))}
    >
      {modalAction.state === "show" ? (
        <ViewProductInfo product={modalAction.data} />
      ) : (
        <>
          <Form modalAction={modalAction} setModalAction={setModalAction} />
        </>
      )}
    </TemplateModal>
  );
}

function getTitle(state: IModalAction<IProduct>["state"]): string {
  if (state === "create") return "Add New Product";
  if (state === "edit") return "Edit Product";
  return "View Product";
}
