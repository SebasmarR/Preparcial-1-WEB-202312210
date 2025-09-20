"use client"
import { useState } from "react"

export default function Crear() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        birthDate: "",
        image: ""
    })

    async function submitForm() {
        const response = await fetch("http://127.0.0.1:8080/api/authors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        if (!response.ok) {
            throw new Error("Error al crear el autor");
        }

        const data = await response.json();
        console.log("Autor creado:", data);
        console.log(form);
    }


    return (
        <>
            <h1 className="text-4xl font-bold mb-8 text-center mt-20"> Formulario para crear un autor</h1>
            <form onSubmit={submitForm}>
                <div className="mb-4 flex flex-col items-center">
                    <label className="font-bold mb-2">Name</label>
                    <input placeholder="Nombre del autor" className="border-gray-400 text-black bg-white p-2 w-80" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <label className="font-bold mb-2">Description</label>
                    <input placeholder="Descripción del autor" className="border-gray-400 text-black bg-white p-2 w-80" type="text" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <label className="font-bold mb-2">Birth Date</label>
                    <input placeholder="Fecha de nacimiento" className="border-gray-400 text-black bg-white p-2 w-80" type="date" required value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
                    <label className="font-bold mb-2">Image URL</label>
                    <input placeholder="URL de la imagen" className="border-gray-400 text-black bg-white p-2 w-80" type="text" required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-80 mt-5">Crear Autor</button>
                    <a href="/authors" className="mt-4 text-blue-500 underline">Volver a la lista de autores</a>
                    <div />
                </div>
            </form>
        </>

    )
}