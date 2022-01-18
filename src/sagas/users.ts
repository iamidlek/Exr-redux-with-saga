import {
  takeEvery,
  call,
  fork,
  put,
  take,
  takeLatest,
} from "redux-saga/effects";
import * as actions from "../actions/users";
import * as api from "../api/users";

interface Iresult {
  data: {
    data: {
      id: number;
      firstName: string;
      lastName: string;
    }[];
  };
}

// try catch문은 다른  saga에 영향을 주지 않기 위해
// worker saga 내에서 작성하여 에러를 핸들링해줄 필요가 있다
function* getUsers() {
  try {
    // call 은 응답이 오는 것을 기다려 줌
    const result: Iresult = yield call(api.getUsers);
    // 데이터 가져오기 성공 시 이하의 코드가 실행됨
    // console.log(result);
    yield put(
      actions.getUsersSuccess({
        // action 함수에 정보 넘기기
        items: result.data.data,
      })
    );
  } catch (e) {
    yield put(
      actions.usersError({
        error: "error to get data",
      })
    );
  }
}

// takeEvery => while (true) loop 안에 있는 것과 같은 효과 항상 지켜보는 효과
function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}
// 첫번째 인자 pattern은
// 스토어(리듀서)에서 해당 타입의 처리가 끝나고 (없으면 바로 saga로)
// 해당 타입(get_users_request)을 바라보고 있는 패터너이 있으면 실행됨

// 두번째 인자 제너레이터는
// 해당 제너레이터를 실행 시킨다

function* deleteUser(userId: string) {
  try {
    // console.log("1");
    yield call(api.deleteUser, userId); // 파라미터 전달

    yield call(getUsers); // 다시 통신하여 유저 목록 갱신
  } catch (e) {
    yield put(
      actions.usersError({
        error: "An error occurred when trying to delete the user",
      })
    );
  }
}

// take를 사용하여 넘어온 데이터 꺼내서 부르기
function* watchDeleteUserRequest() {
  while (true) {
    const { payload } = yield take(actions.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, payload.userId);
    // console.log("2");
    // call은 resolve 혹은 제너레이터가 done 될 때까지 기다린 후 다음을 실행한다
  }
}

// action에서 넘어온 payload 또는 정해진 이름 으로 사용 할 수 있다
function* createUser({
  payloads,
}: ReturnType<typeof actions.createUserRequest>) {
  try {
    // console.log(payloads);
    yield call(api.createUser, {
      firstName: payloads.firstName,
      lastName: payloads.lastName,
    });

    yield call(getUsers); // call 어떠한 함수를 실행
  } catch (e) {
    yield put(
      // dispatch an action to the store => store의 값을 변화시킴
      actions.usersError({
        error: "An error occurred when trying to create the user",
      })
    );
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

// fork로 root 에서 watch 하는 프로세스들을 분기 시켜 놓는다.
const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchDeleteUserRequest),
  fork(watchCreateUserRequest),
];

export default userSagas;
