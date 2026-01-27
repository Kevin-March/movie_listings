export type CommentPayload = {
  body: string;
  postId: number;
  userId: number;
};

export async function createComment(payload: CommentPayload) {
  const res = await fetch("https://dummyjson.com/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error creando comentario");
  return res.json();
}

export async function editComment(id: number, body: string) {
  const res = await fetch(`https://dummyjson.com/comments/${id}`, {
    method: "PUT", // o PATCH
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  });

  if (!res.ok) throw new Error("Error editando comentario");
  return res.json();
}

export async function deleteComment(id: number) {
  const res = await fetch(`https://dummyjson.com/comments/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error borrando comentario");
  return res.json();
}
