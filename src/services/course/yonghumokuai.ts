// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 后台管理员获取用户详情:页面单开:OK GET /api/v1/sysUser/detail/${param0} */
export async function detail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.ResultUserInfo>(`/api/v1/sysUser/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 下来菜单:Ok GET /api/v1/sysUser/findAll */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListSysUser>('/api/v1/sysUser/findAll', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询:OK GET /api/v1/sysUser/list */
export async function query(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoUserPageResp>('/api/v1/sysUser/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改:OK PUT /api/v1/sysUser/modify/role */
export async function modifyUserRole(
  body: API.ModifyUserRoleReq,
  options?: { [key: string]: any },
) {
  return request<API.ResultUserInfo>('/api/v1/sysUser/modify/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
