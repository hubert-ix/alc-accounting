import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import * as api from '$lib/api';

export async function load({ data, depends, fetch, url }) {
  depends('main');
  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, { global: { fetch } })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: { fetch },
        cookies: { getAll: () => data.cookies }
      });

  const { data: { session } } = await supabase.auth.getSession();

  if (!data.user) {
    return { supabase, session, user: null, categories: [], operations: [] };
  }

  const year = url.searchParams.get('year') ?? String(dayjs().year());
  const month = url.searchParams.get('month') ?? String(dayjs().month() + 1);
  const category_id = url.searchParams.get('category_id') ?? 'all';

  let [ response1, response2 ] = await Promise.all([
    api.get(fetch, "/api/categories"),
    api.get(fetch, '/api/operations', { year, month, category_id })
  ]);

  let categories = response1.categories;
  categories.sort((a, b) => a.name.localeCompare(b.name));
  let operations = response2.operations;

  return { supabase, session, user: data.user, categories, operations, year, month, categoryId: category_id };
}