import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Se tentar aceder a qualquer página que comece por /admin...
  if (path.startsWith('/admin')) {
    // Verifica se tem a "pulseira VIP" (o cookie)
    const session = request.cookies.get('admin_session');
    
    // Se não tiver, recusa a entrada e manda para o /login
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configura o middleware para rodar apenas nas rotas do admin
export const config = {
  matcher: '/admin/:path*',
};
