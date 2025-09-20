export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8"> Esta es una pagina de inicio para ver los autores y crear nuevos</h1>
      <a href="/authors" className="text-blue-500 hover:underline">Ver lista de autores</a>
      <a href="/crear" className="text-blue-500 hover:underline">Crear nuevo autor</a>
    </>
  );
}