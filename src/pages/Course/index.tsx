import { create, page1, update } from '@/services/course/kechengmokuaiguanliduan';
import t from '@/utils/i18n';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProFormInstance, type ProColumns } from '@ant-design/pro-components';
import { ProTable, type RequestData } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

const getData = async (params: {
  current: number;
  pageSize: number;
  courseName: string;
}): Promise<Partial<RequestData<API.CourseVo>>> => {
  const msg = await page1({
    keyword: params.courseName,
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
  const [initialValues, setInitialValues] = useState<API.CourseVo | null>(null);
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [visible]);
  const columns: ProColumns<API.CourseVo>[] = [
    {
      title: t('courseName'),
      dataIndex: 'courseName',
    },
    {
      title: t('courseStatus'),
      dataIndex: 'courseStatus',
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
      title: t('price'),
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: t('priceType'),
      dataIndex: 'priceType',
      hideInSearch: true,
    },
    {
      title: t('fileIds'),
      dataIndex: 'fileIds',
      valueType: 'select',
      hideInSearch: true,
    },
    {
      title: t('fileInfos'),
      dataIndex: 'fileInfos',
      // render: (text) => (text as string)?.substring(0, 10),
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
        // <a
        //   key="delete"
        //   onClick={async () => {
        //     if (record.id !== undefined) {
        //       await deleteAccount({ id: record.id }).then(() => {
        //         action?.reload();
        //       });
        //     }
        //   }}
        // >
        //   <DeleteOutlined />
        // </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.CourseVo, API.page1Params>
        actionRef={actionRef}
        headerTitle={t('course')}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
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
                update({ ...value, id: String(initialValues?.id) } as API.UpdateCourseDto).then(
                  () => {
                    actionRef.current?.reload();
                    setVisible(false);
                  },
                );
              } else {
                create(value as API.CreateCourseDto).then(() => {
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
