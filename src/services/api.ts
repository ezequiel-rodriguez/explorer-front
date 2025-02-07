'use server';

import { API_URL } from '@/common/constants';
import { DataResponse } from '@/common/interfaces/IResponse';

export async function fetchData<T>(
  url: string,
  params?: object,
  revalidate: number = 60,
  isExternal: boolean = false,
): Promise<DataResponse<T>> {
  try {
    const queryString = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    const PATH_URL = isExternal
      ? `${url}${queryString}`
      : `${API_URL}${url}${queryString}`;
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
    throw new Error(`fetch error ${error}`);
  }
}

export async function fetchDataExt<T>(
  url: string,
  params?: object,
  revalidate: number = 60,
): Promise<T> {
  try {
    const queryString = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    const PATH_URL = `${url}${queryString}`;
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
    return data as T;
  } catch (error) {
    throw new Error(`fetch error ${error}`);
  }
}

export async function postData<T>(
  url: string,
  body: object,
  files: File[],
): Promise<T> {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(body));
    if (files.length > 0) {
      formData.append('file', files[0], files[0].name);
    }
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Fetch error');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`fetch error ${error}`);
  }
}
