import { redirect } from '@remix-run/cloudflare';

export async function loader() {
  return redirect('/');
}

export default function ArticlesIndexRoute() {
  return null;
}

