import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export function CategoryOptions({ requestEdit, requestShow, requestDelete, category }) {
  return (
    <div>
      <button onClick={requestShow}>Show</button>
      <button onClick={requestEdit}>Edit</button>
      <button onClick={requestDelete}>Delete</button>
    </div>
  );
}
