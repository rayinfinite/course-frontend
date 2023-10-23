import { Footer } from '@/components';
import { login, register } from '@/services/course/dengluzhucemokuai';
import t from '@/utils/i18n';
import {
  AlipayCircleOutlined,
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  PhoneOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../config/defaultSettings';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('login');
  const [hasError, setHasError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setInitialState } = useModel('@@initialState');
  const intl = useIntl();
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleAuthentication = async (values: API.LoginParam | API.RegisterReq) => {
    const auth = type === 'login';
    if (!auth) {
      const msg = await register({ ...values });
      console.log(msg);
      if (msg.code !== 0) messageApi.open({ type: 'error', content: msg.message });
      else messageApi.open({ type: 'success', content: '注册成功' });
      return;
    }
    try {
      const msg = await (auth ? login({ ...values }) : register({ ...values }));
      if (msg.code !== 0) throw new Error(msg.message);
      console.log(msg.data);
      const successMessage = auth
        ? intl.formatMessage({ id: 'pages.login.success' })
        : intl.formatMessage({ id: 'pages.login.register.success' });
      setInitialState((s) => ({
        ...s,
        currentUser: msg.data?.userInfo,
        type: msg.data?.token,
      }));
      messageApi.open({ type: 'success', content: successMessage });
      localStorage.setItem('token', msg.data?.token || '');
      const urlParams = new URL(window.location.href).searchParams;
      //等待，避免setInitialState没有执行完毕
      setTimeout(() => {
        history.push(urlParams.get('redirect') || '/');
      }, 300);
    } catch (error) {
      const failureMessage = t(auth ? 'pages.login.failure' : 'pages.login.register.failure');
      console.log(error);
      messageApi.open({ type: 'error', content: failureMessage });
      setHasError(true);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {t('menu.login')}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      {contextHolder}
      <div style={{ flex: '1', padding: '32px 0' }}>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={t('pages.layouts.userLayout.title')}
          initialValues={{
            autoLogin: true,
          }}
          actions={[t('pages.login.loginWith'), <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            await handleAuthentication(values as API.LoginParam | API.RegisterReq);
          }}
          submitter={{
            // 配置按钮文本
            searchConfig: {
              submitText: type === 'login' ? '登录' : '注册',
            },
          }}
        >
          <Tabs
            activeKey={type}
            onChange={(activeKey) => {
              setType(activeKey);
              setHasError(false);
            }}
            centered
            items={[
              {
                key: 'login',
                label: t('pages.login.login.tab'),
              },
              {
                key: 'register',
                label: t('pages.login.register.tab'),
              },
            ]}
          />
          {hasError === true && type === 'login' && (
            <LoginMessage content={t('pages.login.accountLogin.errorMessage')} />
          )}
          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={t('pages.login.username.placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('pages.login.username.required'),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={t('pages.login.password.placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('pages.login.password.required'),
                  },
                ]}
              />
            </>
          )}

          {hasError === true && type === 'register' && <LoginMessage content="注册失败" />}
          {type === 'register' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                name="username"
                placeholder={t('pages.login.register.username.placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('pages.login.register.username.required'),
                  },
                  {
                    pattern: /^[a-zA-Z0-9]{3,16}$/,
                    message: t('pages.login.register.username.invalid'),
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                name="password"
                placeholder={t('pages.login.register.password.placeholder')}
                rules={[
                  {
                    required: true,
                    message: t('pages.login.register.password.required'),
                  },
                  {
                    pattern: /^.{6,}$/,
                    message: t('pages.login.register.password.invalid'),
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={t('pages.login.phoneNumber.placeholder')}
                rules={[
                  {
                    pattern: /^\d{8,}$/,
                    message: t('pages.login.phoneNumber.invalid'),
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="email"
                placeholder={t('pages.login.register.email.placeholder')}
                rules={[
                  {
                    pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: t('pages.login.register.email.invalid'),
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <PhoneOutlined />,
                }}
                name="smsCode"
                placeholder={t('smsCode.placeholder')}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="realName"
                placeholder={t('realName.placeholder')}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <IdcardOutlined />,
                }}
                name="identityCode"
                placeholder={t('identityCode.placeholder')}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                name="avatarId"
                placeholder={t('avatarId.placeholder')}
              />
            </>
          )}
          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              {t('pages.login.rememberMe')}
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
