import React from "react";
import { CategoryOptions } from "./CategoryOptions";

export function Category({ category, requestEdit, requestShow, requestDelete }) {
  return (
    <div>
      {/* Display category details */}
      <h3>{category.name}</h3>
      <p>{category.description}</p>

      {/* Display category options (edit, show, delete) */}
      <CategoryOptions
        requestEdit={requestEdit}
        requestShow={requestShow}
        requestDelete={requestDelete}
        category={category}
      />
    </div>
  );
}
