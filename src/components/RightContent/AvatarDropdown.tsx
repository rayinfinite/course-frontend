import {
  modifyPassword,
  modifyUserInfo,
  loginOut as outLogin,
} from '@/services/course/dengluzhucemokuai';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { FormInstance, Spin, message } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.username}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<FormInstance>();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue({ ...initialState?.currentUser, smsCode: '132456' });
    }
  }, [initialState?.currentUser, visible1, visible2]);
  const modifyPasswordModal = () => {
    setVisible1(true);
  };
  const modifyUserInfoModal = () => {
    setVisible2(true);
  };
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'modifyPassword') {
        modifyPasswordModal();
        return;
      }
      if (key === 'modifyUserInfo') {
        modifyUserInfoModal();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.username) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
    {
      key: 'modifyPassword',
      icon: <LogoutOutlined />,
      label: '忘记密码/修改密码',
    },
    {
      key: 'modifyUserInfo',
      icon: <LogoutOutlined />,
      label: '修改个人信息',
    },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        {children}
      </HeaderDropdown>
      <ModalForm
        title="忘记密码/修改密码"
        open={visible1}
        formRef={formRef}
        modalProps={{ destroyOnClose: false }}
        onOpenChange={setVisible1}
        autoFocusFirstInput
        onFinish={async (values) => {
          await modifyPassword(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText name="mobile" label="mobile" />
        <ProFormText name="smsCode" label="smsCode" />
        <ProFormText name="password" label="password" />
      </ModalForm>
      <ModalForm
        title="修改个人信息"
        open={visible2}
        formRef={formRef}
        modalProps={{ destroyOnClose: false }}
        onOpenChange={setVisible2}
        autoFocusFirstInput
        onFinish={async (values) => {
          await modifyUserInfo(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText name="mobile" label="mobile" />
        <ProFormText name="realName" label="realName" />
        <ProFormText name="identityCode" label="identityCode" />
        <ProFormText name="avatarUrl" label="avatarUrl" />
      </ModalForm>
    </>
  );
};
