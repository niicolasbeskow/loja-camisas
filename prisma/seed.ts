import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()
  await prisma.artist.deleteMany()

  const trece = await prisma.artist.create({
    data: {
      nome: "Anderson Fim (TRECE)",
      slug: "trece",
      categoria_arte: "Grafite e Intervenção Urbana",
      bio: "Artista urbano de Pelotas/RS trazendo a agressividade e a precisão do grafite para a nossa malha heavy suedine.",
      imagem_perfil: "https://via.placeholder.com/400",
    }
  })

  await prisma.product.createMany({
    data: [
      {
        nome: "Tag Minimalista TRECE",
        preco: 159.00,
        tipo: "Tag",
        artista_id: trece.id
      },
      {
        nome: "Camisa Collab: Caos Urbano",
        preco: 199.00,
        tipo: "Colecao",
        artista_id: trece.id
      }
    ]
  })
  console.log("✅ Seed finalizado! Artista TRECE e produtos inseridos no banco de dados com sucesso.")
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
