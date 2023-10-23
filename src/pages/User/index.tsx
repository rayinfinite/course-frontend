import { modifyUserRole, query } from '@/services/course/yonghumokuai';
import t from '@/utils/i18n';
import { EditOutlined } from '@ant-design/icons';
import { ActionType, ProFormInstance, type ProColumns } from '@ant-design/pro-components';
import { ProTable, type RequestData } from '@ant-design/pro-table';
import { Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

const getData = async (params: {
  current: number;
  pageSize: number;
  username: string;
  roleId: string;
}): Promise<Partial<RequestData<API.UserPageResp>>> => {
  const msg = await query({
    keyword: params.username,
    roleId: params.roleId,
    pageNumber: params.current,
    pageSize: params.pageSize,
  });
  console.log(msg, params);

  return {
    data: msg?.data?.records || [],
    success: true,
    total: msg?.data?.total || 0,
  };
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<API.UserPageResp | null>(null);
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [visible]);
  const columns: ProColumns<API.UserPageResp>[] = [
    {
      title: t('id'),
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('mobile'),
      dataIndex: 'mobile',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('createTime'),
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('username'),
      dataIndex: 'username',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('password'),
      dataIndex: 'password',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('realName'),
      dataIndex: 'realName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('identityCode'),
      dataIndex: 'identityCode',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('avatarId'),
      dataIndex: 'avatarId',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('avatarUrl'),
      dataIndex: 'avatarIUrl',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('roleId'),
      dataIndex: 'roleId',
    },
    {
      title: t('roleName'),
      dataIndex: 'roleName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: t('operation'),
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <EditOutlined
          key="edit"
          onClick={() => {
            setInitialValues(record);
            setVisible(true);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.UserPageResp, API.queryParams>
        actionRef={actionRef}
        headerTitle={t('course')}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        request={getData}
      />
      {visible && (
        <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
          <ProTable
            type="form"
            formRef={formRef}
            columns={columns}
            onSubmit={async (value) => {
              console.log(value);
              await modifyUserRole({ roleId: value.roleId, userId: initialValues?.id ?? 0 });
              setVisible(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};
