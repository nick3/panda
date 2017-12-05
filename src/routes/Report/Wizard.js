import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Steps, Button, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { wizardSelector } from './selector';
import styles from './Wizard.less';

const { Step } = Steps;

const steps = [{
  title: '填填填',
  content: 'First-content',
}, {
  title: '传传传',
  content: 'Second-content',
}, {
  title: '等等等',
  content: 'Last-content',
}];

@connect(wizardSelector)
export default class Wizard extends PureComponent {
  next() {
    const { dispatch, currentStep } = this.props;
    const current = currentStep + 1;
    dispatch({
      type: 'reportWizard/setStep',
      payload: current,
    });
  }

  prev() {
    const { dispatch, currentStep } = this.props;
    const current = currentStep - 1;
    dispatch({
      type: 'reportWizard/setStep',
      payload: current,
    });
  }

  render() {
    const { currentStep } = this.props;
    return (
      <PageHeaderLayout title="报告生成向导">
        <Steps current={currentStep}>
          {steps.map(item => <Step key={item.title} title={item.title} description={item.description} />)}
        </Steps>
        <div className={styles.content}>{steps[currentStep].content}</div>
        <div className={styles.stepsAction}>
          {
            currentStep > 0
            ?
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            : <div />
          }
          {
            currentStep < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            currentStep === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>提交</Button>
          }
        </div>
      </PageHeaderLayout>
    );
  }
}
