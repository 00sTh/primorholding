import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Pencil, Plus } from "lucide-react";

interface BlogPostRow {
  id: string;
  title: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

export default async function BlogListPage() {
  const posts: BlogPostRow[] = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      published: true,
      publishedAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-cream">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-gold text-navy-dark px-4 py-2 rounded-md text-sm font-medium hover:bg-gold-light transition-colors"
        >
          <Plus size={16} />
          Novo Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-navy rounded-lg border border-navy-light p-12 text-center">
          <p className="text-slate">Nenhum post cadastrado.</p>
          <Link
            href="/admin/blog/new"
            className="mt-4 inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm"
          >
            <Plus size={14} />
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div className="bg-navy rounded-lg border border-navy-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-light">
                <th className="text-left text-slate font-medium px-4 py-3">
                  Titulo
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Status
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Data de publicacao
                </th>
                <th className="text-left text-slate font-medium px-4 py-3">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-navy-light last:border-0 hover:bg-navy-dark transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-cream hover:text-gold transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {post.published ? (
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs text-white"
                        style={{ backgroundColor: "#16a34a" }}
                      >
                        Publicado
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-slate/20 text-slate">
                        Rascunho
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="p-1.5 inline-flex text-slate hover:text-cream transition-colors rounded hover:bg-navy-dark"
                      title="Editar"
                    >
                      <Pencil size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
