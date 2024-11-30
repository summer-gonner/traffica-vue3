import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.ESEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '#',
    dataIndex: 'id',
    width: 55,
    hideInSearch: true,
  },
  {
    title: 'ES名称',
    width: 200,
    dataIndex: 'name',
  },
  {
    title: 'ES地址',
    width: 180,
    dataIndex: 'address',
  },
  {
    title: '连接结果',
    dataIndex: 'result',
    width: 80,
    formItemProps: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '成功',
            value: "Y",
          },
          {
            label: '失败',
            value: "N",
          },
        ],
      },
    },
    customRender: ({ record }) => {
      const enable = record.result === "Y";
      return <Tag color={enable ? 'green' : 'red'}>{enable ? '成功' : '失败'}</Tag>;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true,
    customRender: ({ record }) => {
      return record.createTime===""?"":formatToDateTime(record.createTime);
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    hideInSearch: true,
    customRender: ({ record }) => {
      return record.updateTime===""?"":formatToDateTime(record.updateTime);
    },
  },
];
