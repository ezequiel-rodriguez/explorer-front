'use server';

import { API_URL } from '@/common/constants';
import { DataResponse } from '@/common/interfaces/IResponse';

export async function fetchData<T>(
  url: string,
  params?: object,
  revalidate: number = 10,
): Promise<DataResponse<T>> {
  try {
    const queryString = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    const PATH_URL = `${API_URL}${url}${queryString}`;
    const response = await fetch(PATH_URL, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      next: {
        revalidate,
      },
      ...params,
    });

    if (!response.ok) {
      throw new Error('Fetch error');
    }

    const data = await response.json();
    return data as DataResponse<T>;
  } catch (error) {
    console.log('error: ', error);
    throw new Error('fetch error');
  }
}
