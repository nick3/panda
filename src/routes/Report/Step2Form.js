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
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

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
      <Form>
        <FormItem
          {...formItemLayout}
          label="注"
        >
          {getFieldDecorator('comment', {
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
        >
          {getFieldDecorator('picList', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="cpic"
              listType="picture"
              multiple={false}
              beforeUpload={() => {
                return false;
              }}
            >
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上传CSV"
        >
          {getFieldDecorator('csvList', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="ccsv"
              listType="text"
              multiple={false}
              beforeUpload={() => {
                return false;
              }}
            >
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
