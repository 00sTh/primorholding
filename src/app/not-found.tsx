import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="font-serif text-8xl font-bold text-gradient-gold mb-4">
          404
        </h1>
        <p className="text-cream/80 text-lg mb-8">
          Pagina nao encontrada. A pagina que voce procura nao existe ou foi
          movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-gold text-navy-dark font-semibold h-11 px-6 text-base transition-all duration-200 hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        >
          Voltar ao Inicio
        </Link>
      </div>
    </main>
  );
}
