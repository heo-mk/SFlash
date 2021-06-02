import React from "react";
import styled from "styled-components";
import Swal from 'sweetalert2'
// import { Grid } from "../elements/index";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as qnaActions } from "../redux/modules/qna";
// import { actionCreators as imageActions } from "../redux/modules/image";

const QnaWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector ((state) => state.user.is_login)
  const qnaId = props.match.params.id;
  const is_edit = qnaId ? true : false; //qna_id는 게시물이 존재하므로 수정 가능함
  const qna = useSelector((state) => state.qna.qna);

  React.useEffect(() => {
    if (!is_login){
      Swal.fire({
        text: "로그인이 필요한 서비스 입니다.",
        confirmButtonColor: "#ffb719",
      }); 
      history.goBack();
    }
    if (!qnaId) {
      return false;
    }
    dispatch(qnaActions.getQnaDetailAPI(qnaId));
  }, []);

  // 제목 입력 값 가져오기
  const [title, setTitle] = React.useState(
    is_edit? qna.title : ""
  );
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 입력 값 가져오기
  const [content, setContent] = React.useState(
    is_edit? qna.content : ""
  );
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const onAddQna = () => {
    if(!is_login){
      Swal.fire({
        text: "로그인이 필요한 서비스 입니다.",
        confirmButtonColor: "#ffb719",
      });
    }else if (!title || !content) {
      Swal.fire({
        text: '제목과 내용을 모두 입력해주세요 :(',
        confirmButtonColor: "#ffb719",
      })
    }
    let qna = {
      title: title,
      content: content,
    };
    dispatch(qnaActions.addQnaAPI(qna));
  };

  const onEditQna = () => {
    if (!title || !content) {
      Swal.fire({
        text: '제목과 내용을 모두 입력해주세요 :(',
        confirmButtonColor: "#ffb719",
      })
    }
    let qna = {
      title: title,
      content: content,
    };
    dispatch(qnaActions.editQnaAPI(qna, qnaId));
  };

  return (
    <React.Fragment>
      <Container>
        <Title>문의하기</Title>
        <ContentContainer>
          <InputStyle
            value={title}
            placeholder="제목 입력"
            type="type"
            width="100%"
            onChange={changeTitle}
          />
          <TextField
            value={content}
            placeholder="문의내용을 입력해주세요."
            onChange={changeContent}
          />

          {is_edit ? (
            <SolidBtn width="150px" onClick={onEditQna}>
              수정하기
            </SolidBtn>
          ) : (
            <SolidBtn
              width="150px"
              onClick={onAddQna}
            >
              저장하기
            </SolidBtn>
          )}
        </ContentContainer>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  margin: auto;
  height: 100%;

  margin-top: 12vh;
  @media (min-width: 1280px) {
    width: 1024px;
  }
  @media (max-width: 1280px) {
    width: 800px;
  }
  @media (max-width: 960px) {
    width: calc(100% - 5rem);
    max-width: 800px;
  }
  @media (max-width: 400px) {
    width: calc(100% - 2rem);
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
  color: ${(props) => props.theme.main_grey};
`;

const ContentContainer = styled.div`
  max-width: 800px;
`;

const InputStyle = styled.input`
  border: 1px solid grey;
  width: 60%;
  min-width: 380px;
  height: 38px;
  border: 1px solid grey;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 1rem;
  font-weight: 500;
  margin: 16px 0px;
  color: grey;
  input:focus {
    outline: none !important;
    border: 1px solid red;
  }
  cursor: pointer;
`;

const TextField = styled.textarea`
  display: block;
  border: 1px solid grey;
  border-radius: 8px;
  width: 100%;
  height: 300px;
  padding: 16px 16px;
  box-sizing: border-box;

  font-size: 1.1rem;
  line-height: 1.5rem;
`;

const SolidBtn = styled.button`
  display: block;
  border: none;
  margin: 20px 0px;
  ${(props) => (props.width ? `width:${props.width};` : "")}
  height: 48px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.main_color};
  border: 1.5pt solid ${(props) => props.theme.main_color};
  color: #ffffff;
  outline: none;
  &:hover {
    color: ${(props) => props.theme.main_color};
    background-color: #ffffff;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;

export default QnaWrite;
