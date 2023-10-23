// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查看 GET /api/v1/file/${param0} */
export async function get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/file/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 下载 GET /api/v1/file/${param0}/download */
export async function download(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/v1/file/${param0}/download`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 下载静态文件 GET /api/v1/file/static/${param0}/download */
export async function downloadStatic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadStaticParams,
  options?: { [key: string]: any },
) {
  const { staticKey: param0, ...queryParams } = params;
  return request<any>(`/api/v1/file/static/${param0}/download`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 上传 POST /api/v1/file/upload */
export async function upload(body: {}, options?: { [key: string]: any }) {
  return request<API.FileInfo>('/api/v1/file/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
