export default {
  namespace: 'reportWizard',

  state: {
    currentStep: 0,
    loading: true,
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
  },
};
