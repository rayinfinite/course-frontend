// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询:OK GET /api/v1/consumer/course */
export async function page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageParams,
  options?: { [key: string]: any },
) {
  return request<API.PageInfoCourseVo>('/api/v1/consumer/course', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 课程详情 GET /api/v1/consumer/course/${param0} */
export async function detail1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detail1Params,
  options?: { [key: string]: any },
) {
  const { courseId: param0, ...queryParams } = params;
  return request<API.CourseVo>(`/api/v1/consumer/course/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 我的选课 GET /api/v1/consumer/order */
export async function pageList1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageList1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageInfoCourseOrderVo>('/api/v1/consumer/order', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 选课 PUT /api/v1/consumer/order */
export async function chooseCourse(body: API.ChooseCourseDto, options?: { [key: string]: any }) {
  return request<API.ResultCourseOrder>('/api/v1/consumer/order', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 订单详情 GET /api/v1/consumer/order/${param0} */
export async function orderDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.orderDetailParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.ResultCourseOrderDetailVo>(`/api/v1/consumer/order/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
