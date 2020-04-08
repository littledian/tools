import http from '@/utils/http';

export async function getAccountInfo() {
  return http.get('/api/account/info');
}
