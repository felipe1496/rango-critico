import { handleAPI } from "@/utils/api/handleAPI";
import { deleteReviewById } from "../core";

export const DELETE = handleAPI<{ id: string }>().fn(async (req) => {
  const id = req.params.id;

  await deleteReviewById(id);
});
