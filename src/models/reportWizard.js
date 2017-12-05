export default {
  namespace: 'reportWizard',

  state: {
    currentStep: 0,
    loading: true,
    basicInfo: {},
  },

  effects: {
    // *fetch({ payload }, { call, put }) {
    //   yield put({
    //     type: 'changeLoading',
    //     payload: true,
    //   });
    //   const response = yield call(queryRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   yield put({
    //     type: 'changeLoading',
    //     payload: false,
    //   });
    // },
  },

  reducers: {
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
  },
};
