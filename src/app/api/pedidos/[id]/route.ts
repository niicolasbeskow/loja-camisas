import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

    const order = await prisma.order.findUnique({ where: { id: params.id } });
    if (!order || order.userId !== user.id || order.status !== 'PENDENTE') {
      return NextResponse.json({ error: 'Pedido inválido para exclusão' }, { status: 400 });
    }

    // Exclui os itens e o pedido
    await prisma.orderItem.deleteMany({ where: { orderId: params.id } });
    await prisma.order.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
