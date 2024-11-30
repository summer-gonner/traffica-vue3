import type { TableColumn } from '@/components/core/dynamic-table';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.DeptEntity;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'deptSort',
    width: 50,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
    hideInSearch: true,
    customRender({ text }) {
      return text.createTime===""?"":formatToDateTime(text.createTime);
    },
  },
];
