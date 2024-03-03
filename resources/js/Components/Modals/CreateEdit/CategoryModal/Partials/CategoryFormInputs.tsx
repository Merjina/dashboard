import Input from "@/Components/Inputs/Input";
import TextArea from "@/Components/Inputs/TextArea";

export default function CategoryFormInputs({
  formProps,
  modalAction,
}) {
  return (
    <div className="">
      <div className="w-full">
        <Input
          id="name"
          label="Category Name"
          name="name"
          type="text"
          value={formProps.data.name ?? undefined}
          className="mt-1 block w-full"
          autoComplete="off"
          autoFocus
          disabled={modalAction.state === "show" || formProps.processing}
          onChange={(e) => formProps.setData("name", e.target.value)}
          required
          errorMsg={formProps.errors.name}
          hideError={formProps.isDirty("name")}
        />
      </div>
      <div className="mt-4">
        <TextArea
          label="Description"
          value={formProps.data.description ?? undefined}
          onChange={(e) => formProps.setData("description", e.target.value)}
          disabled={modalAction.state === "show" || formProps.processing}
          required
          errorMsg={formProps.errors.description}
          hideError={formProps.isDirty("description")}
        />
      </div>
    </div>
  );
}
