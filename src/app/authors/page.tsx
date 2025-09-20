import List from "../components/lista/page";

export default function listar() {
    return (
        <div>
            <List />
            <a href="/crear" className="text-4xl font-bold mb-8 underline">Crear un autor</a>
        </div>
    );
}