declare namespace API {
  type ChooseCourseDto = {
    /** 课程id */
    courseId?: string;
  };

  type Course = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 课程名称 */
    courseName?: string;
    /** 课程状态 0正常 1禁用 */
    courseStatus?: number;
    /** 课程价格 */
    price?: string;
    /** 价格类型 */
    priceType?: number;
    /** 价格类型 */
    fileIds?: string;
  };

  type CourseOrder = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 用户id */
    userId?: string;
    /** 订单状态 */
    orderStatus?: string;
    /** 课程id */
    courseId?: string;
  };

  type CourseOrderDetailVo = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 用户id */
    userId?: string;
    /** 订单状态 */
    orderStatus?: string;
    /** 课程id */
    courseId?: string;
    /** 课程 */
    course?: string;
  };

  type CourseOrderVo = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 用户id */
    userId?: string;
    /** 订单状态 */
    orderStatus?: string;
    /** 课程id */
    courseId?: string;
    /** 课程名称 */
    courseName?: string;
  };

  type CourseVo = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 课程名称 */
    courseName?: string;
    /** 课程状态 0正常 1禁用 */
    courseStatus?: number;
    /** 课程价格 */
    price?: string;
    /** 价格类型 */
    priceType?: number;
    /** 价格类型 */
    fileIds?: string;
    /** 文件信息 */
    fileInfos?: string;
  };

  type CreateCourseDto = {
    /** 课程名称 */
    courseName?: string;
    /** 课程价格 */
    price?: string;
    /** 价格类型 */
    priceType?: number;
    /** 价格类型 */
    fileIds: string;
  };

  type deleteUsingDELETEParams = {
    roleId: number;
  };

  type detail1Params = {
    courseId: number;
  };

  type detail2Params = {
    courseId: number;
  };

  type detailParams = {
    userId: number;
  };

  type downloadParams = {
    id: string;
  };

  type downloadStaticParams = {
    staticKey: string;
  };

  type FileInfo = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    默认本地?: string;
    '文件原始名称, 带后缀'?: string;
    '文件后缀名称 不要[.]符号'?: string;
    文件MimeType?: string;
    '文件大小 单位 kb'?: string;
    文件存放的相对路径?: string;
    文件对外访问地址?: string;
    文件对外下载地址?: string;
  };

  type getParams = {
    id: string;
  };

  type getUsersParams = {
    position: number;
  };

  type LoginInfo = {
    token?: string;
    userInfo?: UserInfo;
  };

  type LoginParam = {
    username?: string;
    password?: string;
  };

  type modifyParams = {
    roleId: number;
  };

  type ModifyPasswordReq = {
    /** 手机 */
    mobile?: string;
    /** 验证码 */
    smsCode?: string;
    /** 验证码 */
    password?: string;
  };

  type ModifyRoleReq = {
    /** 角色名称 */
    roleName?: string;
    /** 角色编号 */
    roleCode?: string;
  };

  type ModifyUserInfoReq = {
    /** 手机号 */
    mobile?: string;
    /** 真实姓名 */
    realName?: string;
    /** 身份证号码 */
    identityCode?: string;
    /** 头像url */
    avatarUrl?: string;
  };

  type ModifyUserRoleReq = {
    /** 用户id */
    userId: number;
    /** 角色id */
    roleId: number;
  };

  type orderDetailParams = {
    orderId: number;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type page1Params = {
    status?: number;
    keyword?: string;
    /** 当前页,不输入默认第1页 */
    pageNumber?: number;
    /** 每页数据量,不输入默认10条记录 */
    pageSize?: number;
  };

  type PageCourseOrderVo = {
    records?: CourseOrderVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageCourseVo = {
    records?: CourseVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageInfoCourseOrderVo = {
    data?: PageCourseOrderVo;
    message?: string;
    code?: number;
  };

  type PageInfoCourseVo = {
    data?: PageCourseVo;
    message?: string;
    code?: number;
  };

  type PageInfoUserPageResp = {
    data?: PageUserPageResp;
    message?: string;
    code?: number;
  };

  type pageList1Params = {
    status?: number;
    keyword?: string;
    /** 当前页,不输入默认第1页 */
    pageNumber?: number;
    /** 每页数据量,不输入默认10条记录 */
    pageSize?: number;
  };

  type pageListParams = {
    roleName?: string;
    roleId?: string;
    /** 当前页,不输入默认第1页 */
    pageNumber?: number;
    /** 每页数据量,不输入默认10条记录 */
    pageSize?: number;
  };

  type pageParams = {
    status?: number;
    keyword?: string;
    /** 当前页,不输入默认第1页 */
    pageNumber?: number;
    /** 每页数据量,不输入默认10条记录 */
    pageSize?: number;
  };

  type PageSysRole = {
    records?: SysRole[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserPageResp = {
    records?: UserPageResp[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type queryParams = {
    keyword?: string;
    roleId?: string;
    /** 当前页,不输入默认第1页 */
    pageNumber?: number;
    /** 每页数据量,不输入默认10条记录 */
    pageSize?: number;
  };

  type RegisterReq = {
    /** 密码 */
    username?: string;
    /** 短信验证码 */
    smsCode?: string;
    /** 密码 */
    password?: string;
    /** 手机号 */
    mobile?: string;
    /** 真实姓名 */
    realName?: string;
    /** 身份证号码 */
    identityCode?: string;
    /** 头像:传id */
    avatarId?: number;
  };

  type Result = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ResultCourse = {
    code?: number;
    message?: string;
    data?: Course;
  };

  type ResultCourseOrder = {
    code?: number;
    message?: string;
    data?: CourseOrder;
  };

  type ResultCourseOrderDetailVo = {
    code?: number;
    message?: string;
    data?: CourseOrderDetailVo;
  };

  type ResultListSysRole = {
    code?: number;
    message?: string;
    data?: SysRole[];
  };

  type ResultListSysUser = {
    code?: number;
    message?: string;
    data?: SysUser[];
  };

  type ResultLoginInfo = {
    code?: number;
    message?: string;
    data?: LoginInfo;
  };

  type ResultObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type ResultPageInfoCourseOrderVo = {
    code?: number;
    message?: string;
    data?: PageInfoCourseOrderVo;
  };

  type ResultPageSysRole = {
    code?: number;
    message?: string;
    data?: PageSysRole;
  };

  type ResultString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResultSysRole = {
    code?: number;
    message?: string;
    data?: SysRole;
  };

  type ResultUserInfo = {
    code?: number;
    message?: string;
    data?: UserInfo;
  };

  type ResultVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type SysRole = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    角色姓名?: string;
    角色编号?: string;
  };

  type SysUser = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 手机号 */
    mobile?: string;
    /** 用户名 */
    username?: string;
    /** 真实姓名 */
    displayName?: string;
    /** 身份证号码 */
    identityCode?: string;
    /** 头像文件id */
    avatarId?: number;
    /** 头像地址 */
    avatarUrl?: string;
    /** 头像地址 */
    roleId?: number;
  };

  type UpdateCourseDto = {
    id?: string;
    /** 课程名称 */
    courseName?: string;
    /** 课程价格 */
    price?: string;
    /** 价格类型 */
    priceType?: number;
    /** 价格类型 */
    fileIds: string;
  };

  type UserInfo = {
    /** 主键id */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 手机号 */
    mobile?: string;
    /** 用户名 */
    username?: string;
    /** 真实姓名 */
    displayName?: string;
    /** 身份证号码 */
    identityCode?: string;
    /** 头像文件id */
    avatarId?: number;
    /** 头像地址 */
    avatarUrl?: string;
    /** 头像地址 */
    roleId?: number;
    sysRole?: SysRole;
  };

  type UserPageResp = {
    /** 手机号 */
    id?: number;
    /** 创建时间 */
    createTime?: string;
    /** 手机号 */
    mobile?: string;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 真实姓名 */
    realName?: string;
    /** 身份证号码 */
    identityCode?: string;
    /** 头像文件id */
    avatarId?: number;
    /** 头像地址 */
    avatarUrl?: string;
    /** 头像地址 */
    roleId?: number;
    /** 角色名称 */
    roleName?: string;
  };
}
