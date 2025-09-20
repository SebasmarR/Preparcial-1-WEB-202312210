"use client"
import { useEffect, useState } from "react";

export default function List() {

    const [authors, setAuthors] = useState<any[]>([]);
    const [editAuthor, setEditAuthor] = useState({
        name: "",
        description: "",
        birthDate: "",
        image: ""
    })
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://127.0.0.1:8080/api/authors");
            const data = await response.json();
            setAuthors(data);
        }
        fetchData();

    }, []);

    function editAuthorForm(id: number, author: any) {
        if (editId === id) {
            setEditId(null);
        } else {
            setEditId(id);
            setEditAuthor({
                name: author.name,
                description: author.description,
                birthDate: author.birthDate,
                image: author.image ? author.birthDate.split("T")[0] : ""
            });
        }
    }

    async function editAuthorSubmit(id: number, e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Editando autor con id:", id);
        console.log(editAuthor);
        const response = await fetch("http://localhost:8080/api/authors/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editAuthor)
        })

        if (!response.ok) {
            throw new Error("Error al editar el autor");
        }

        const data = await response.json();
        console.log("Autor editado:", data);
        setEditId(null);
        setAuthors(authors.map((author) => author.id === id ? data : author));
    }

    async function deleteAuthor(id: number, author: any) {
        console.log("Eliminando autor con id:", id);
        console.log(author);
        const books = author.books;
        if (books.length > 0) {
            for (const book of books) {
                const deleteAuthorBook = await fetch(`http://localhost:8080/api/authors/${id}/books/${book.id}`, {
                    method: "DELETE"
                });
                if (!deleteAuthorBook.ok) {
                    throw new Error(`Error al eliminar el libro con id ${book.id}`);
                }
            }
            console.log(`Libros del autor con id ${id} eliminados`);
        }
        const prizes = author.prizes;
        if (prizes.length > 0) {
            for (const prize of prizes) {
                const deleteAuthorPrize = await fetch(`http://localhost:8080/api/prizes/${prize.id}/author`, {
                    method: "DELETE"
                });
                if (!deleteAuthorPrize.ok) {
                    throw new Error(`Error al eliminar el premio con id ${prize.id}`);
                }
            }
            console.log(`Premios del autor con id ${id} eliminados`);
        }


        const response = await fetch("http://localhost:8080/api/authors/" + id, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error("Error al eliminar el autor");
        }
        console.log(`Autor con id ${id} eliminado`);
        window.location.reload();
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Authors List</h1>
            <div className="flex flex-wrap">
                {authors.map((author) => (
                    <div className="ml-12 mb-20" key={author.id}>
                        <img className="size-50 mb-4 object-cover" src={author.image} alt={author.name} />
                        <h2 className="font-bold text-2xl">{author.name}</h2>
                        <p className="text-justify w-60">Description: {author.description}</p>
                        <p>Birth Date: {author.birthDate}</p>
                        <div className="mt-4">
                            <button onClick={() => editAuthorForm(author.id, author)} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Edit</button>
                            <button onClick={() => deleteAuthor(author.id, author)} className="bg-red-500 text-white px-4 py-2 rounded ml-2 cursor-pointer">Delete</button>
                        </div>
                        {editId === author.id && (
                            <div>
                                <h3 className="text-xl font-bold mt-2">Edit Author</h3>
                                <form onSubmit={(e) => editAuthorSubmit(author.id, e)}>
                                    <div className="flex flex-col">
                                        <label className="block font-bold mb-2">Name: </label>
                                        <input className="bg-white rounded-xl text-black px-2" type="text" value={editAuthor.name} onChange={(e) => setEditAuthor({ ...editAuthor, name: e.target.value })} />
                                        <label className="block font-bold mb-2">Description: </label>
                                        <input className="bg-white rounded-xl text-black px-2" type="text" value={editAuthor.description} onChange={(e) => setEditAuthor({ ...editAuthor, description: e.target.value })} />
                                        <label className="block font-bold mb-2">Birth Date: </label>
                                        <input className="bg-white rounded-xl text-black px-2" type="date" value={editAuthor.birthDate} onChange={(e) => setEditAuthor({ ...editAuthor, birthDate: e.target.value })} />
                                        <label className="block font-bold mb-2">Image: </label>
                                        <input className="bg-white rounded-xl text-black px-2" type="text" value={editAuthor.image} onChange={(e) => setEditAuthor({ ...editAuthor, image: e.target.value })} />
                                        <button type="submit" className="bg-green-500 text-white rounded mt-4">Save</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}   