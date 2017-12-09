import { forEach, isArray } from 'lodash';
import { submitData } from '../services/report';

const initalState = {
  currentStep: 0,
  loading: false,
  basicInfo: {},
  step2Data: {},
  downloadPath: null,
};

export default {
  namespace: 'reportWizard',

  state: initalState,
  effects: {
    *submitAll({ payload }, { call, put }) {
      yield put({
        type: 'setSubmitting',
        payload: true,
      });
      const formData = new FormData();
      forEach(payload, (v, k) => {
        if (isArray(v)) {
          forEach(v, (f) => {
            formData.append(k, f);
          });
        } else {
          forEach(v, (val, key) => {
            formData.append(key, val);
          });
        }
      });
      const response = yield call(submitData, formData);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      yield put({
        type: 'setDownloadPath',
        payload: response.downloadPath,
      });
      yield put({
        type: 'setSubmitting',
        payload: false,
      });
    },
  },

  reducers: {
    reset() {
      return initalState;
    },
    setStep(state, { payload }) {
      return {
        ...state,
        currentStep: payload,
      };
    },
    setBasicInfo(state, { payload }) {
      const { key, value } = payload;
      return {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          [key]: value,
        },
      };
    },
    setStep2Data(state, { payload }) {
      const { key, value } = payload;
      return {
        ...state,
        step2Data: {
          ...state.step2Data,
          [key]: value,
        },
      };
    },
    setSubmitting(state, { payload }) {
      return {
        ...state,
        isSubmitting: payload,
      };
    },
    setDownloadPath(state, { payload }) {
      return {
        ...state,
        downloadPath: payload,
      };
    },
  },
};
