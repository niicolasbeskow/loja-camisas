import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// No Next.js 15+, 'params' é uma Promise que precisamos fazer 'await'
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });

    // Espera os parâmetros carregarem
    const params = await context.params;
    const pedidoId = params.id;

    const order = await prisma.order.findUnique({ where: { id: pedidoId } });
    
    // Aceita deletar tanto o status novo quanto o fantasma antigo
    if (!order || order.userId !== user.id || (order.status !== 'PENDENTE' && order.status !== 'PENDING')) {
      return NextResponse.json({ error: 'Pedido inválido para exclusão' }, { status: 400 });
    }

    await prisma.orderItem.deleteMany({ where: { orderId: pedidoId } });
    await prisma.order.delete({ where: { id: pedidoId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar:", error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
