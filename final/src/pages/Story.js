import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as profileActions } from "../redux/modules/profile";
import { actionCreators as storypostActions } from "../redux/modules/storypost";
import { actionCreators as postActions } from "../redux/modules/post";

import StoryUserProfile from "../components/StoryUserProfile";
import StoryContent from "../components/StoryContent";

import { FiImage } from "react-icons/fi";
import { HiOutlineMap } from "react-icons/hi";
import lib from "react-kakao-maps";

// 유저가 작성한/좋아요한 게시물들을 모아볼 수 있는 페이지 입니다.
// 다른 사람들도 유저의 스토리를 열람할 수 있습니다.

const Story = (props) => {
  const dispatch = useDispatch();

  //  url에서 userId 불러오기
  const userId = props.match.params.id;
  // console.log("userId:", userId);

  // 스토리 페이지는 크게 3가지로 나뉩니다.
  // (1) 유저 정보: user_info (2) 유저가 올린 게시물: user_post_list (3)유저가 좋아요한 게시물: user_like_list
  const user_info = useSelector((state) => state.profile.user);
  const user_post_list = useSelector((state) => state.storypost.user_post_list);
  const user_like_list = useSelector((state) => state.storypost.user_like_list);
  console.log("user_post_list", user_post_list);
  console.log("user_like_list", user_like_list);

  // Map Marker Icon
  const userPostMarkerImgUrl = "https://i.postimg.cc/3w264rbs/2x.png";
  const userLikeMarkerImgUrl = "https://i.postimg.cc/3rZTf11s/2x.png";

  React.useEffect(() => {
    dispatch(profileActions.getUserInfoAPI(userId));
    dispatch(storypostActions.getUserPostAPI(userId));
    dispatch(storypostActions.getUserLikeAPI(userId));
    dispatch(postActions.getPostAPI());
  }, []);

  
  const [content, setContent] = React.useState(
    <StoryContent
      post_list={user_post_list}
      marker_icon={userPostMarkerImgUrl}
    />
  );

//   const tab_list = [
//    { 
//      tabId: 1,
//      title: `${user_info.nickname} 님의 게시물`,
//     content: 
//     <StoryContent
//     post_list={user_post_list}
//     marker_icon={userPostMarkerImgUrl}
// /> 
// },
// { 
//   tabId: 2,
//   title: `${user_info.nickname} 님의 좋아요`,
//  content: 
//  <StoryContent
//  post_list={user_like_list}
//  marker_icon={userLikeMarkerImgUrl}
// />
// },
//   ]


  return (
    <React.Fragment>
      <Wrapper>
        {/* 상단 유저 프로필 부분 컴포넌트 */}
        <StoryUserProfile user_info={user_info} userId={userId} />

        {/* <List>
          {category_list.map ((t, idx) => {
            return (
              <li 
              key={idx}
              id={t.tabId}
              onClick = {() => {

              }}
              className={t.tabId === ? 'active' : ''}>
                <Tab><span>{t.title}</span></Tab>
              </li>
            )
          })}
        </List>
          <Content>{t[idx].content}</Content> */}





        {/* '내 게시물'과 '좋아요한 게시물'을 나눠주는 탭: active 값을 이용해 제어
    active 의 값에 따라 content 부분의 내용이 바뀐다. 
    (content 내 Story_Content 컴퍼넌트에서는 리스트와 지도로 볼수 있도록 다시 나눠지는데
    active 를 활용해 같은 방법으로 제어해준다.*/}

        <Tabs>
          <Tab
          //  id={"myPost"}
          // active={active === "myPost"}
            onClick={() =>
              setContent(
                <StoryContent
                  post_list={user_post_list}
                  marker_icon={userPostMarkerImgUrl}
                />
              )
            }
          >
            <b>{user_info.nickname}</b> 님의 게시물
            <TabUnderBar />
          </Tab>

          <VerticalBar></VerticalBar>

          <Tab
          //  id={"myLike"}
          // active={active === "myLike"}
            onClick={() =>
              setContent(
                <StoryContent
                  post_list={user_like_list}
                  marker_icon={userLikeMarkerImgUrl}
                />
              )
            }
          >
            <b>{user_info.nickname}</b> 님의 좋아요
            <TabUnderBar />
          </Tab>
        </Tabs>

        <Content>{content}</Content>

      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  ${(props) => props.theme.responsiveContainer};
`;

const List = styled.ul`
  list-style: none;
  font-size: 19px;
  margin-top: 25px;
  letter-spacing: -0.57px;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media only screen and (max-width: 1024px) {
    font-size: 16px;
    letter-spacing: -0.39px;
    padding: 0 15px 0 26px;
    box-sizing: border-box;
  }
  & li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 255.37px;
    height: 49px;
    padding: 8px 13px;
    @media only screen and (max-width: 1024px) {
      width: 149px;
    }
    &:hover {
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 7px;
      .arr span::after {
        content: '';
        display: flex;
        width: 8px;
        height: 8px;
        border-top: 1px solid #333;
        border-right: 1px solid #333;
        transform: rotate(45deg);
      }
    }
  }
  & span {
    cursor: pointer;
  }
  .active {
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 7px;
    .arr span::after {
      content: '';
      display: flex;
      width: 8px;
      height: 8px;
      border-top: 1px solid #333;
      border-right: 1px solid #333;
      transform: rotate(45deg);
    }
  }
`;

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  margin: 0 auto;
  margin-bottom: 3%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  width: 49%;
  padding: 25px;
  font-size: 1.3rem;
  color: ${(props) => (props.active ? props.theme.main_color : "grey")};
  font-weight: ${(props) => (props.active ? 600 : 400)};
  background-color: ${(props) => (props.active ? "white" : "white")};
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: grey;
  }
  @media (min-width: 1280px) {
  }
  @media (max-width: 1280px) {
  }
  @media (max-width: 960px) {
    font-size: 1.1rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const TabUnderBar = styled.div`
  width: 55%;
  height: 3pt;
  margin: 20px auto -20px auto;
  background-color: ${(props) => (props.active ? props.theme.main_color : "")};
`;

const Content = styled.div``;

const VerticalBar = styled.div`
  height: 30px;
  width: 2px;
  background-color: #eee;
`;

export default Story;
