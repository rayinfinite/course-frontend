// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 课程分页查询 GET /api/v1/admin/course */
export async function page1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page1Params,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoCourseVo>('/api/v1/admin/course', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 课程发布 PUT /api/v1/admin/course */
export async function create(body: API.CreateCourseDto, options?: { [key: string]: any }) {
  return request<API.ResultCourse>('/api/v1/admin/course', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 课程修改 POST /api/v1/admin/course */
export async function update(body: API.UpdateCourseDto, options?: { [key: string]: any }) {
  return request<API.ResultCourse>('/api/v1/admin/course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 课程详情 GET /api/v1/admin/course/${param0} */
export async function detail2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detail2Params,
  options?: { [key: string]: any },
) {
  const { courseId: param0, ...queryParams } = params;
  return request<API.CourseVo>(`/api/v1/admin/course/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
