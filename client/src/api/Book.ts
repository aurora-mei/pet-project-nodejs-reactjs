import { API_URL } from "./config";
export type DBook = {
  _id?: string;
  title?: string;
  author?: string;
};
export async function getBooks(): Promise<DBook[]> {
  const response = await fetch(`${API_URL}/books`); //fetch từ backend
  return await response.json();
}
export async function getBookById(id: string) {
  const response = await fetch(`${API_URL}/books/${id}`); //fetch từ backend
  return await response.json();
}
export async function createBooks(book: DBook) {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: book.title, author: book.author }),
  });
  return await response.json();
}
export async function updateBooks(book: DBook) {
  const response = await fetch(`${API_URL}/books/${book._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: book.title, author: book.author }),
  });
  return await response.json();
}
export async function deleteBooks(id: string) {
  await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
}
