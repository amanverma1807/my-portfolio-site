import { redirect } from '@remix-run/cloudflare';

export const loader = () => {
  return redirect('/#project-1');
};

export default function SliceRedirect() {
  return null;
}
