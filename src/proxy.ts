import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const acceptLang = request.headers.get('accept-language') ?? '';
  const locale = acceptLang.toLowerCase().includes('hr') ? 'hr' : 'en';
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ['/'],
};
