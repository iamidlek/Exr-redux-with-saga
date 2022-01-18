export const Types = {
  GET_USERS_REQUEST: "users/get_users_request",
  GET_USERS_SUCCESS: "users/get_users_success",
  DELETE_USER_REQUEST: "users/delete_user_request",
  CREATE_USER_REQUEST: "users/create_user_request",
  USERS_ERROR: "users/user_error",
};

// dispatch(Action)
// actions => dispatch type과 payload를 설정 sagas에서 put
// 실제 클라이언트에서 부를 때도 사용

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export interface Iitem {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Iitems {
  items: Iitem[];
}

// saga 에서 불려짐
export const getUsersSuccess = ({ items }: Iitems) => {
  return <const>{
    type: Types.GET_USERS_SUCCESS,
    payload: {
      items,
    },
  };
};

export const createUserRequest = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => ({
  type: Types.CREATE_USER_REQUEST,
  payloads: {
    firstName,
    lastName,
  },
});

export const deleteUserRequest = (userId: number) => ({
  type: Types.DELETE_USER_REQUEST,
  payload: {
    userId,
  },
});

export const usersError = ({ error }: { error: string }) =>
  <const>{
    type: Types.USERS_ERROR,
    payload: {
      error,
    },
  };

export type TypeOfAction = ReturnType<typeof getUsersSuccess> &
  ReturnType<typeof usersError>;
// reducer 에서 작업이 없는
// 즉 switch 문에 해당하지 않는 엑션은 추가할 필요 없음
