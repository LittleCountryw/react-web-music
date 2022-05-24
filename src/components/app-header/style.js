import styled from 'styled-components'
export const HeaderWrapper = styled.div`
  height: 75px;
  font-size: 14px;
  color: #fff;
  background-color: #242424;

  .content {
    height: 70px;
    display: flex;
    justify-content: space-between;
  }
  .divider {
    height: 5px;
    background-color: #c20c0c;
  }
`
export const HeaderLeft = styled.div`
  display: flex;

  .logo {
    display: inline-block;
    height: 69px;
    width: 176px;
    background-position: 0 0;
    text-indent: -9999px;
  }
  .select-list {
    display: flex;
    /* align-items: center; */
    line-height: 70px;

    .select-item {
      position: relative;
      a {
        display: block;
        padding: 0 20px;
        color: #ccc;
      }

      :last-of-type a {
        position: relative;

        ::after {
          content: '';
          width: 28px;
          height: 19px;
          background-image: url(${require('@/assets/img/sprite_01.png')});
          /* 相当于将图片向左移190px */
          background-position: -190px 0;
          /* 行内元素添加绝对定位或固定定位，可以直接设置宽度和高度 */
          position: absolute;
          top: 20px;
          right: -15px;
        }
      }

      &:hover a,
      a.active {
        color: #fff;
        background-color: #000;
        text-decoration: none;
      }

      .active .icon {
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 12px;
        height: 7px;
        background-position: -226px 0;
      }
    }
  }
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 12px;

  .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    margin: 0 16px;
    background-color: transparent;
  }
`
