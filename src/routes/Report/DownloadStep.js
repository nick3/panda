import React from 'react';
import { Button, Spin } from 'antd';
import Result from 'ant-design-pro/lib/Result';

export default function DownloadStep({
  downloadPath,
}) {
  const actions =
    downloadPath ? (
      <Button
        type="primary"
        icon="download"
        size="large"
        href={downloadPath}
        target="_blank"
      >
        下载
      </Button>) :
      <Spin size="large" />;
  return (
    <Result
      type="success"
      title="提交成功"
      description={downloadPath ? '您的报告已生成成功。' : '正在生成你的报告，稍等片刻后即可下载。'}
      actions={actions}
      style={{ width: '100%' }}
    />
  );
}
