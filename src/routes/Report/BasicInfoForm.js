import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
import { forEach, reduce } from 'lodash';

const FormItem = Form.Item;

@Form.create({
  mapPropsToFields: (props) => {
    const { value } = props;
    return reduce(value, (ret, v, k) => ({
      ...ret,
      [k]: Form.createFormField({
        value: v,
      }),
    }), {});
  },
  onFieldsChange: (props, fields) => {
    const { onChange } = props;
    forEach(fields, (value, key) => {
      onChange({
        key,
        value: value.value,
      });
    });
  },
})
class BasicInfoForm extends PureComponent {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="客户姓名"
        >
          {getFieldDecorator('customerName', {
            // rules: [{
            //   required: true, message: '请输入客户名称！',
            // }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="单位名称"
        >
          {getFieldDecorator('unitName', {
            // rules: [{
            //   required: true, message: '请输入单位名称！',
            // }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            // rules: [{
            //   required: true, message: '请输入联系电话！',
            // }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="服务内容"
        >
          {getFieldDecorator('serviceName', {
            // rules: [{
            //   required: true, message: '请输入服务内容！',
            // }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="样本信息"
        >
          {getFieldDecorator('sampleInfo', {
            // rules: [{
            //   required: true, message: '请输入样本信息！',
            // }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default BasicInfoForm;
