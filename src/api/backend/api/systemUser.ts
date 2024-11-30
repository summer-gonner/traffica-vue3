// @ts-ignore
/* eslint-disable */

/**
 * 该文件为 @umijs/openapi 插件自动生成，请勿随意修改。如需修改请通过配置 openapi.config.ts 进行定制化。
 * */

import {request, type RequestOptions} from '@/utils/request';

/** 获取用户列表 GET /api/system/users */
export async function userList(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    body: API.UserListParams,
    options?: RequestOptions,
) {
    return request<{
        data?: API.UserEntity[];
        itemCount?: number;
        total?: number;
        pageSize?: number;
        totalPages?: number;
        current?: number;
    }>('/api/sys/user/queryUserList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 新增用户 POST /api/system/users */
export async function userCreate(body: API.UserDto, options?: RequestOptions) {
    return request<any>('/api/sys/user/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {successMsg: '创建成功'}),
    });
}

/** 查询用户 GET /api/system/users/${param0} */
export async function userRead(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.UserReadParams,
    options?: RequestOptions,
) {
    const {id: param0, ...queryParams} = params;
    return request<API.UserEntity>(`/api/sys/user/queryUserDetail?id=${param0}`, {
        method: 'GET',
        params: {...queryParams},
        ...(options || {}),
    });
}

/** 更新用户 PUT /api/system/users/${param0} */
export async function userUpdate(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.UserUpdateParams,
    body: API.UserUpdateDto,
    options?: RequestOptions,
) {
    const {id: param0, ...queryParams} = params;
    return request<any>(`/api/sys/user/updateUser/${param0}`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        params: {...queryParams},
        data: body,
        ...(options || {successMsg: '更新成功'}),
    });
}

/** 删除用户 DELETE /api/system/users/${param0} */
export async function userDelete(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.UserDeleteParams,
    options?: RequestOptions,
) {
    const {id: param0, ...queryParams} = params;
    return request<any>(`/api/system/users/${param0}`, {
        method: 'DELETE',
        params: {...queryParams},
        ...(options || {successMsg: '删除成功'}),
    });
}

/** 更改用户密码 POST /api/system/users/${param0}/password */
export async function userPassword(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.UserPasswordParams,
    body: API.UserPasswordDto,
    options?: RequestOptions,
) {
    const {id: param0, ...queryParams} = params;
    return request<any>(`/api/system/users/${param0}/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        params: {...queryParams},
        data: body,
        ...(options || {}),
    });
}
