import { useIntl } from '@umijs/max';

export default (id: string, args?: Record<string, any>) => {
  const intl = useIntl();
  // setLocale('en-US', true);
  // setLocale('zh-CN', true);
  return intl.formatMessage({ id: id }, { ...args });
};
