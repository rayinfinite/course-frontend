import { page } from '@/services/course/dingdanmokuaiyonghuduan';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, List } from 'antd';
import React, { useState } from 'react';

const { Meta } = Card;

interface StyledCardProps {
  title?: string;
  description?: string;
}

const StyledCard: React.FC<StyledCardProps> = ({
  title = 'Card title',
  description = 'This is the description',
}) => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title={title}
      description={description}
    />
  </Card>
);

const App: React.FC = () => {
  const [initialValues, setInitialValues] = useState<API.CourseVo[] | []>([]);
  const getData = async () => {
    const msg = await page({ pageSize: 100 });
    console.log(msg);
    setInitialValues(msg?.data?.records || []);
    return msg?.data?.records || [];
  };
  getData();
  return (
    <List<API.CourseVo>
      rowKey="id"
      grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
      dataSource={initialValues}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <StyledCard title={item.courseName} description={item.createTime} />
        </List.Item>
      )}
    ></List>
  );
};

export default App;
