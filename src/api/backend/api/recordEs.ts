// @ts-ignore
/* eslint-disable */

/**
 * 该文件为 @umijs/openapi 插件自动生成，请勿随意修改。如需修改请通过配置 openapi.config.ts 进行定制化。
 * */

import { request, type RequestOptions } from '@/utils/request';

/** 获取ES列表 GET /api/record/es/queryPage */
export async function esList(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    body: API.ESListParams,
    options?: RequestOptions,
) {
    return request<{
        pageSize?: number;
        totalSize?: number;
        totalPages?: number;
        currentPage?: number;
        records?: API.ESEntity[];
    }>('/api/record/es/queryPage', {
        method: 'POST',
        data:body,
        ...(options || {}),
    });
}

/** 新增角色 POST /api/system/roles */
export async function roleCreate(body: API.RoleDto, options?: RequestOptions) {
    return request<any>('/api/system/roles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || { successMsg: '创建成功' }),
    });
}

/** 获取角色信息 GET /api/system/roles/${param0} */
export async function roleInfo(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.RoleInfoParams,
    options?: RequestOptions,
) {
    const { id: param0, ...queryParams } = params;
    return request<API.RoleInfo>(`/api/system/roles/${param0}`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}

/** 更新角色 PUT /api/system/roles/${param0} */
export async function roleUpdate(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.RoleUpdateParams,
    body: API.RoleUpdateDto,
    options?: RequestOptions,
) {
    const { id: param0, ...queryParams } = params;
    return request<any>(`/api/system/roles/${param0}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        params: { ...queryParams },
        data: body,
        ...(options || { successMsg: '更新成功' }),
    });
}

/** 删除角色 DELETE /api/system/roles/${param0} */
export async function roleDelete(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.RoleDeleteParams,
    options?: RequestOptions,
) {
    const { id: param0, ...queryParams } = params;
    return request<any>(`/api/system/roles/${param0}`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || { successMsg: '删除成功' }),
    });
}
/** Es连接测试 GET /api/system/roles/${param0} */
export async function esConnect(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.RoleInfoParams,
    options?: RequestOptions,
) {
    const { id: param0, ...queryParams } = params;
    return request<API.RoleInfo>(`/api/record/es/connect?id=${param0}`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}