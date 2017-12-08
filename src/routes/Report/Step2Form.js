import React, { PureComponent } from 'react';
import { Form, Input, Button, Upload, Icon } from 'antd';
import { forEach, reduce } from 'lodash';

const { TextArea } = Input;
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
class Step2Form extends PureComponent {
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
          label="注"
        >
          {getFieldDecorator('customerName', {
            // rules: [{
            //   required: true, message: '请输入客户名称！',
            // }],
          })(
            <TextArea autosize />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传图片"
          extra="可以上传多张图片"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="cpic" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Step2Form;
