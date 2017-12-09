import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Steps, Button } from 'antd';
import BasicInfoForm from './BasicInfoForm';
import Step2Form from './Step2Form';
import DownloadStep from './DownloadStep';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { wizardSelector } from './selector';

import styles from './Wizard.less';

const { Step } = Steps;

const steps = [{
  title: '项目情况反馈',
  content: (props) => {
    const { dispatch, basicInfo } = props;
    return (<BasicInfoForm
      value={basicInfo}
      onChange={(value) => {
        dispatch({
          type: 'reportWizard/setBasicInfo',
          payload: value,
        });
      }}
    />);
  },
}, {
  title: '染色质打断结果反馈',
  content: (props, setState) => {
    const { dispatch, step2Data } = props;
    return (<Step2Form
      value={step2Data}
      onChange={(value) => {
        const { key } = value;
        if (key === 'picList' || key === 'csvList') {
          setState({
            [value.key]: value.value,
          });
        }
        dispatch({
          type: 'reportWizard/setStep2Data',
          payload: value,
        });
      }}
    />);
  },
}, {
  title: '下载报告',
  content: (props) => {
    const { downloadPath } = props;
    return (<DownloadStep
      downloadPath={downloadPath}
    />);
  },
},
// {
//   title: '等等等',
//   content: (props) => {
//     const { dispatch, basicInfo } = props;
//     return (<BasicInfoForm
//       value={basicInfo}
//       onChange={(value) => {
//         dispatch({
//           type: 'reportWizard/setBasicInfo',
//           payload: value,
//         });
//       }}
//     />);
//   },
// }
];

@connect(wizardSelector)
export default class Wizard extends PureComponent {
  onSubmit = () => {
    this.next();
    const { dispatch, basicInfo, step2Data } = this.props;
    const { picList, csvList } = this.state;
    dispatch({
      type: 'reportWizard/submitAll',
      payload: {
        basicInfo,
        step2Data,
        picList,
        csvList,
      },
    });
  }

  next = () => {
    const { dispatch, currentStep } = this.props;
    const current = currentStep + 1;
    dispatch({
      type: 'reportWizard/setStep',
      payload: current,
    });
  }

  prev = () => {
    const { dispatch, currentStep } = this.props;
    const current = currentStep - 1;
    dispatch({
      type: 'reportWizard/setStep',
      payload: current,
    });
  }

  reset = () => {
    const { dispatch } = this.props;
    this.setState({
      picList: null,
      csvList: null,
    });
    dispatch({
      type: 'reportWizard/reset',
    });
  }

  render() {
    const { currentStep } = this.props;
    let leftBtn;
    if (currentStep === 0) {
      leftBtn = <div />;
    } else if (currentStep === steps.length - 1) {
      leftBtn = (
        <Button style={{ marginLeft: 8 }} onClick={this.reset}>
          生成新报告
        </Button>);
    } else {
      leftBtn = (
        <Button style={{ marginLeft: 8 }} onClick={this.prev}>
          上一步
        </Button>);
    }
    return (
      <PageHeaderLayout title="报告生成向导">
        <Steps current={currentStep}>
          {steps.map(item =>
            <Step key={item.title} title={item.title} description={item.description} />)}
        </Steps>
        <div className={styles.content}>
          {steps[currentStep].content(this.props, ::this.setState)}
        </div>
        <div className={styles.stepsAction}>
          {leftBtn}
          {
            currentStep < steps.length - 2
            &&
            <Button type="primary" htmlType="button" onClick={this.next}>下一步</Button>
          }
          {
            currentStep === steps.length - 2
            &&
            <Button type="primary" htmlType="button" onClick={this.onSubmit}>提交</Button>
          }
        </div>
      </PageHeaderLayout>
    );
  }
}
