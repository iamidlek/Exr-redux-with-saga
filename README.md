# redux, redux-saga 기초

- (참고) 동작확인 완료, api는 read만 가능해서 CRUD 확인은 불가

## takeEvery

- 특정 redux action 이 dispatch 되는 것을 항상 감시
- 또 다른 제너레이터를 실행 시키는 용도로 많이 사용

```javascript
function* watchGetUsersRequest() {
  yield takeEvery(action.Types.GET_USERS_REQUEST, getUsers);
}
```

## takeLatest

- takeEvery와 다른점은 계속된 요청이 있을 시 전 요청을 취소하고 마지막 요청을 처리한다는 점이다

## take

- 특정 redux action이 dispatch 되는 것을 바라본다.
- 바라보는 action이 완료될 때까지 중복되는 action이 dispatch되는 것을 바라보는 것이 "blocking" 된다.
- 하나의 트랜잭션이 끝나기 전에 또 시도가 되는 걸 막아야 하는 경우 사용(결제 같은 경우)

```javascript
function* watchDeleteUserRequest() {
  while (true) {
    const { userId } = yield take(action.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, { userId });
  }
}
```

## call

- 함수 또는 promise 객체를 반환하는 통신이 resolve 되는 것을 기다릴 필요가 있을 때 사용
- 제너레이터 함수도 동일하게 불려진 제너레이터 함수가 done 될 때까지 기다린다.
- take과 함께 사용

```javascript
function* User() {
  try {
    yield call(getUsers);
  } catch (e) {}
}
```

## put

- saga 내부에서 redux action을 dispatch 하는 경우 사용
- redux state(reducer의 action type => store update) 업데이트가 필요한 경우

```javascript
function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        users: result.data.users,
      })
    );
  } catch (e) {}
}
```

## 흐름

컴포넌트에서
액션을 실행시킴

액션의 타입과
리듀서의 타입이 일치하는 부분 실행

리덕스 사가에서 매치되는 타입 실행

ex
createUserRequest 액션을
컴포넌트에서 dispatch

리듀서 에서 스위치 구문에 해당 되는
작업이 실행되거나 없으면 스킵

takeLatest 로 바라보고 있는 제너레이터가
있으므로 실행

연결된 제너레이터가 실행

제너레이터 안에서
call통신, 또다른 put(dispatch)가능
