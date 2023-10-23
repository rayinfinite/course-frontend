// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 角色删除:OK DELETE /api/v1/sysRole/${param0}/delete */
export async function deleteUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResultVoid>(`/api/v1/sysRole/${param0}/delete`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 角色修改:OK PUT /api/v1/sysRole/${param0}/modify */
export async function modify(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyParams,
  body: API.ModifyRoleReq,
  options?: { [key: string]: any },
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.ResultSysRole>(`/api/v1/sysRole/${param0}/modify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 角色创建:OK POST /api/v1/sysRole/create */
export async function create1(body: API.ModifyRoleReq, options?: { [key: string]: any }) {
  return request<API.ResultSysRole>('/api/v1/sysRole/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询:OK GET /api/v1/sysRole/list */
export async function pageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageListParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageSysRole>('/api/v1/sysRole/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 下拉列表:OK GET /getAll */
export async function getAll(options?: { [key: string]: any }) {
  return request<API.ResultListSysRole>('/getAll', {
    method: 'GET',
    ...(options || {}),
  });
}
