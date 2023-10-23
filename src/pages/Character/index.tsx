import { create1, deleteUsingDELETE, getAll, modify } from '@/services/course/jiaosemokuai';
import t from '@/utils/i18n';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProFormInstance, type ProColumns } from '@ant-design/pro-components';
import { ProTable, type RequestData } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

const getData = async (): Promise<Partial<RequestData<API.SysRole>>> => {
  const msg = await getAll();

  return {
    data: msg?.data || [],
    success: true,
    total: msg?.data?.length || 0,
  };
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<API.SysRole | null>(null);
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [visible]);
  const columns: ProColumns<API.SysRole>[] = [
    {
      title: t('roleName'),
      dataIndex: 'roleName',
      hideInSearch: true,
    },
    {
      title: t('roleCode'),
      dataIndex: 'roleCode',
      hideInSearch: true,
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
        <a
          key="delete"
          onClick={async () => {
            if (record.id !== undefined) {
              await deleteUsingDELETE({ roleId: record.id }).then(() => {
                action?.reload();
              });
            }
          }}
        >
          <DeleteOutlined />
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.SysRole>
        actionRef={actionRef}
        headerTitle={t('character')}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setInitialValues(null);
              setVisible(true);
            }}
          >
            <PlusOutlined /> {t('add')}
          </Button>,
        ]}
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
              if (initialValues?.id) {
                modify({ roleId: initialValues?.id }, value).then(() => {
                  actionRef.current?.reload();
                  setVisible(false);
                });
              } else {
                create1(value as API.ModifyRoleReq).then(() => {
                  actionRef.current?.reload();
                  setVisible(false);
                });
              }
            }}
          />
        </Modal>
      )}
    </>
  );
};
