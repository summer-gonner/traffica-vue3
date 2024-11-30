import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
import { Icon } from '@/components/basic/icon';
import { formatToDateTime } from '@/utils/dateUtil';

export type TableListItem = API.MenuItemInfo;
export type TableColumnItem = TableColumn<TableListItem>;

/**
 * 将对应菜单类型转为字符串字意
 */
const getMenuType = (type) => {
  switch (type) {
    case 0:
      return <Tag color="warning">目录</Tag>;
    case 1:
      return <Tag color="success">菜单</Tag>;
    case 2:
      return <Tag color="error">按钮</Tag>;
    default:
      return '';
  }
};

export const baseColumns: TableColumnItem[] = [
  {
    title: '名称',
    dataIndex: 'menuName',
    align: 'left',
    fixed: 'left',
    width: 200,
  },
  {
    title: '图标',
    width: 40,
    dataIndex: 'menuIcon',
    hideInSearch: true,
    customRender: ({ record }) => record.menuIcon && <Icon icon={record.menuIcon} size="22" />,
  },
  {
    title: '类型',
    width: 80,
    dataIndex: 'menuType',
    hideInSearch: true,
    customRender: ({ record }) => getMenuType(record.menuType),
  },
  {
    title: '节点路由',
    dataIndex: 'menuPath',
    width: 180,
    ellipsis: true,
  },
  {
    title: '文件路径',
    width: 180,
    dataIndex: 'vueComponent',
  },
  {
    title: '权限标识',
    width: 180,
    dataIndex: 'permission',
    hideInSearch: true,
    customRender: ({ record }) =>
      record.menuPerms && <Tag color="processing">{record.menuPerms}</Tag>,
  },
  {
    title: '排序',
    width: 50,
    dataIndex: 'menuSort',
    hideInSearch: true,
  },
  {
    title: '路由缓存',
    dataIndex: 'keepalive',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => record.menuStatus === 1 && (record.keepAlive ? '是' : '否'),
  },
  {
    title: '是否显示',
    dataIndex: 'isVisible',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => {
      const show = record.isVisible;
      const enable = ~~show === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '显示' : '隐藏';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'menuStatus',
    width: 80,
    hideInSearch: true,
    customRender: ({ record }) => {
      const status = record.menuStatus;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: '更新时间',
    width: 180,
    dataIndex: 'updateTime',
    hideInSearch: true,
    customRender({ text }) {
      return text.updateTime===""?"":formatToDateTime(text.updateTime);
    },
  },
];
